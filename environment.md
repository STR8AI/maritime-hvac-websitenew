Environment and deployment notes
================================

Create a local `.env` file by copying `.env.example` and filling in any values required for local development or CI. Example:

```bash
cp .env.example .env
# then edit .env
```

Important:
- Never commit the `.env` file to the repository. Keep sensitive keys out of source control.
- For Cloudflare Pages, set environment variables in the Pages dashboard (Project > Settings > Environment Variables) instead of committing them.

Suggested variables in `.env.example`:
- `NODE_ENV` — `development` or `production`
- `PORT` — local server port (e.g., `8000`)
- `PUBLIC_URL` — base URL when served from another host
- `API_URL` — backend API endpoint (if used)
- `GHL_ASSETS_BASE_URL` — (optional) GoHighLevel hosted asset base URL
- `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_PAGES_PROJECT_NAME` — (optional) for automations

Local test server:
```bash
cd "Maritime Hvac website/highlevel-site"
python3 -m http.server 8000
# open http://localhost:8000
```

Cloudflare Pages:
- Publish directory: `highlevel-site`
- No build command required for this static site
- Add any secrets via the Pages UI
