GoHighLevel deployment — quick steps
----------------------------------

1) Upload assets to GoHighLevel
   - In GHL, open "Sites" → "Assets" (or use the Assets area in your funnel/site editor).
   - Upload: `peggys-cove.jpg`, `logo.png`, `technician.png`, `van.png` (and any others).
   - Copy the public base URL where GHL stores those assets. It usually looks like:
     `https://assets.gohighlevel.com/<your-account-id>/uploads`

2) Set the GHL asset base in the page HTML
   - Open `highlevel-ready/index.html` and locate the meta tag near the top:
     `<meta name="ghl-assets" content="" />`
   - Paste your GHL base URL into the `content` attribute (no trailing slash). Example:
     `<meta name="ghl-assets" content="https://assets.gohighlevel.com/abc123/uploads" />`
   - The small script in the head will automatically rewrite the relative paths used in this HTML to point at your uploaded GHL assets.

3) Import HTML & CSS into GHL
   - Option A: Paste the HTML body into a GHL custom HTML block and add the CSS from `styles.css` into the page head (or the site/global CSS).
   - Option B: Copy the full `index.html` into a Code Editor block (if GHL supports full HTML) and ensure the meta tag value is set.

4) Verify and tweak
   - Publish or preview the page in GHL and confirm images load.
   - If any images still show placeholders, verify the uploaded filenames match exactly (case-sensitive) and the meta `content` URL is correct.

Notes
   - If you prefer to hardcode GHL asset URLs instead of using the meta/script approach, replace the `src` and `background-image` values in `index.html` with the full GHL URLs.
   - The included script is intentionally simple to work inside GHL's code blocks without additional build steps.
