Cloudflare Pages deployment instructions
-------------------------------------

This folder (`highlevel-site`) contains the static site to deploy to Cloudflare Pages.

Quick local test
1. Serve locally from this folder:

```bash
cd "highlevel-site"
python3 -m http.server 8000
# or: npx serve .
```

Open http://localhost:8000 to verify assets load.

Cloudflare Pages setup
1. In the Cloudflare dashboard, create a new Pages project and connect your repository.
2. Set the **Build settings** as follows:
   - Framework preset: None
   - Build command: (leave blank)
   - Build output directory: `highlevel-site`
3. (Optional) If you use a custom domain, follow the dashboard steps to assign it.

Notes
- All site assets are in `highlevel-site/04-assets/images/other/` and `00-global/` contains the main CSS.
- `index.html` references `styles.css` and `script.js` at the site root; wrappers are provided so the site works when `highlevel-site` is the publish directory.

If you want, I can create a Pages project and add a `cloudflare-pages` config file, or prepare optimized images before deployment.
