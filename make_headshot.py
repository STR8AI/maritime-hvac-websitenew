#!/usr/bin/env python3
"""
make_headshot.py
Usage: python make_headshot.py input.jpg
Produces:
  - maritime-headshot-hero.png     (140x140)
  - maritime-headshot-hero@2x.png  (280x280)
Behavior:
  - Uses GrabCut to separate subject from background
  - Soft-feathers edges, color-match (cooler, slightly desaturated), contrast/brightness tweak
  - Circular crop with soft edge, soft shadow
"""
import sys, os
import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageChops, ImageDraw

def grabcut_mask(img_rgb, iter_count=5):
    h,w = img_rgb.shape[:2]
    mask = np.zeros((h,w), np.uint8)
    # generous rect around center (adjust if your subject is at edge)
    rect = (int(w*0.05), int(h*0.03), int(w*0.9), int(h*0.9))
    bgdModel = np.zeros((1,65), np.float64)
    fgdModel = np.zeros((1,65), np.float64)
    cv2.grabCut(img_rgb, mask, rect, bgdModel, fgdModel, iter_count, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask==2)|(mask==0), 0, 1).astype('uint8')
    # clean up with morphological ops
    kernel = np.ones((5,5), np.uint8)
    mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel, iterations=2)
    mask2 = cv2.morphologyEx(mask2, cv2.MORPH_OPEN, kernel, iterations=1)
    return mask2

def feather_mask(mask, radius):
    # mask: binary (0/1) numpy array
    maskf = (mask.astype(np.float32) * 255.0)
    # gaussian blur to feather edges
    # OpenCV's GaussianBlur takes kernel size; use sigma as radius
    mask_blur = cv2.GaussianBlur(maskf, (0,0), sigmaX=radius, sigmaY=radius)
    mask_blur = np.clip(mask_blur, 0, 255).astype(np.uint8)
    return mask_blur

def crop_to_square_around_subject(rgba_np, alpha_mask, pad_factor=1.4):
    ys, xs = np.where(alpha_mask > 127)
    if len(xs) == 0:
        return rgba_np  # fallback
    minx, maxx = xs.min(), xs.max()
    miny, maxy = ys.min(), ys.max()
    w_box = maxx - minx
    h_box = maxy - miny
    size = int(max(w_box, h_box) * pad_factor)
    cx = int((minx + maxx) / 2)
    cy = int((miny + maxy) / 2)
    x0 = max(0, cx - size//2)
    y0 = max(0, cy - size//2)
    x1 = min(rgba_np.shape[1], x0 + size)
    y1 = min(rgba_np.shape[0], y0 + size)
    # adjust if we hit border
    if x1 - x0 < size:
        x0 = max(0, x1 - size)
    if y1 - y0 < size:
        y0 = max(0, y1 - size)
    return rgba_np[y0:y1, x0:x1].copy()

def color_match_pil(pil_rgb):
    # Apply slight cooling, less saturation, a touch of contrast & brightness
    arr = np.array(pil_rgb).astype(np.float32)
    # cool the image: slightly reduce red, increase blue
    arr[:,:,0] *= 0.92   # reduce red
    arr[:,:,2] *= 1.08   # increase blue
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    pil = Image.fromarray(arr)
    pil = ImageEnhance.Color(pil).enhance(0.88)     # desaturate a bit
    pil = ImageEnhance.Contrast(pil).enhance(1.05)  # small contrast boost
    pil = ImageEnhance.Brightness(pil).enhance(1.03) # slight brighten
    return pil

def rounded_mask(size, radius):
    mask = Image.new('L', (size, size), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0,0,size,size], radius=radius, fill=255)
    return mask

def add_soft_shadow(pil_rgba, offset=(0,12), blur=20, opacity=0.2):
    w,h = pil_rgba.size
    # create shadow alpha
    ellipse = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(ellipse)
    # draw a flattened ellipse near the bottom to mimic ground shadow
    d.ellipse([int(w*0.05), int(h*0.65), int(w*0.95), int(h*0.95)], fill=int(255*opacity))
    ellipse = ellipse.filter(ImageFilter.GaussianBlur(radius=blur))
    shadow = Image.new('RGBA', (w, h), (0,0,0,0))
    shadow.putalpha(ellipse)
    # compose: place shadow with offset then paste the portrait above it
    base = Image.new('RGBA', (w, h), (0,0,0,0))
    base.paste(shadow, offset, shadow)
    result = Image.alpha_composite(base, pil_rgba)
    return result

def process_image(infile, out1='maritime-headshot-hero.png', out2='maritime-headshot-hero@2x.png'):
    bgr = cv2.imread(infile, cv2.IMREAD_COLOR)
    if bgr is None:
        print("Error: cannot read", infile)
        return
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    h,w = rgb.shape[:2]

    # 1) extract subject mask with GrabCut
    mask = grabcut_mask(rgb, iter_count=5)

    # 2) feather mask (adaptive radius)
    radius = max(8, int(min(w,h) / 100.0))  # ~12 at typical full-res
    alpha = feather_mask(mask, radius)

    # 3) compose RGBA numpy
    rgba = np.dstack([rgb, alpha])

    # 4) crop to square around subject
    cropped = crop_to_square_around_subject(rgba, alpha, pad_factor=1.4)

    # 5) convert to PIL, separate RGB and alpha
    pil = Image.fromarray(cropped)
    if pil.mode != 'RGBA':
        pil = pil.convert('RGBA')
    rgb_pil = pil.convert('RGB')
    alpha_chan = pil.split()[-1]

    # 6) color match
    rgb_matched = color_match_pil(rgb_pil)

    # 7) recompose with alpha
    pil_rgba = Image.merge('RGBA', (
        rgb_matched.split()[0],
        rgb_matched.split()[1],
        rgb_matched.split()[2],
        alpha_chan
    ))

    # Target sizes: produce @2x first (280 px), then 1x (140 px)
    size_2x = 280
    # resize larger before creating circular mask for best quality
    pil_rgba = pil_rgba.resize((size_2x, size_2x), Image.LANCZOS)

    # 8) circular mask with feather
    circle = rounded_mask(size_2x, radius=size_2x//2)
    circle = circle.filter(ImageFilter.GaussianBlur(radius=6))
    # multiply alpha with circle
    a = pil_rgba.split()[-1]
    a = ImageChops.multiply(a, circle)
    r,g,b,_ = pil_rgba.split()
    final_2x = Image.merge('RGBA', (r,g,b,a))

    # 9) shadow
    final_2x_shadow = add_soft_shadow(final_2x, offset=(0,12), blur=20, opacity=0.22)

    # save @2x
    final_2x_shadow.save(out2, optimize=True)

    # produce 1x by downsampling
    final_1x = final_2x_shadow.resize((size_2x//2, size_2x//2), Image.LANCZOS)
    final_1x.save(out1, optimize=True)

    print("Saved:", out1, out2)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python make_headshot.py input.jpg")
        sys.exit(1)
    infile = sys.argv[1]
    if not os.path.exists(infile):
        print("Input file not found:", infile)
        sys.exit(1)
    process_image(infile)