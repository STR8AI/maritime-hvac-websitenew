#!/usr/bin/env bash
SITE="https://maritimehvac.ca"
DEST="public/assets"
SERVICES="$DEST/services"
TMP="/tmp/mhvac-images.txt"

mkdir -p "$DEST" "$SERVICES"
> "$TMP"

# pages to scan - add more if you want
PAGES=("/" "/services" "/about" "/contact")

for p in "${PAGES[@]}"; do
  echo "Scanning $SITE$p"
  curl -s "$SITE$p" \
    | grep -Eo '(https?:\/\/[^"'"'"']+\.(png|jpg|jpeg|svg|gif))' \
    | sed 's/\\u0026/&/g' \
    >> "$TMP"
done

sort -u "$TMP" -o "$TMP"

echo "Unique images found:"
cat "$TMP"

# download images, routing anything with "service" in the URL to the services folder
echo "Downloading images to $DEST ..."
while read -r url; do
  fname=$(basename "$url")
  target_dir="$DEST"
  # simple heuristic: if the URL contains "service" (any case), drop it in services
  if echo "$url" | grep -qi "service"; then
    target_dir="$SERVICES"
  fi
  mkdir -p "$target_dir"
  echo "Downloading $url -> $target_dir/$fname"
  curl -s -L "$url" --output "$target_dir/$fname"
done < "$TMP"

echo "Download complete. Listing files in $DEST:"
ls -lh "$DEST" | sed -n '1,200p'
echo
echo "Listing files in $DEST/services:"
ls -lh "$DEST/services" | sed -n '1,200p'
