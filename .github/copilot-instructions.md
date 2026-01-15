
# Copilot Instructions

## Project snapshot
- Vite + React 18 single-page marketing site; entry is src/main.jsx -> App.jsx.
- Layout: sticky top nav, hero (Hero.jsx), services grid, and floating ChatBookingWidget; all data is inline, no API/CMS.
- Assets are served from public/assets with absolute paths (e.g., /assets/services/*.png, /assets/hero-person.png).


## Run/build
- Install deps: npm install.
- Dev: npm run dev -- --host (Vite default 5173).
- Prod preview: npm run build && npm run preview -- --host (serves dist/ output).
- Asset helper: fetch_mhvac_images.sh scrapes maritimehvac.ca for image URLs and downloads into public/assets/services when needed.


## File layout & patterns
- Styling lives in src/styles.css (navy/red palette, hero background, responsive rules) and src/components/ChatBookingWidget.css for the widget.
- Global CSS hides all iframes and any element whose class/id contains “chat”; whitelist new embeds with specific selectors (cbw-iframe does this for the widget).
- Nav links target #home/#services/#about/#contact; only hero and services sections exist—add sections or update anchors to avoid dead links.
- Services list is an inline array in App.jsx; keep image names in sync with public/assets/services.* files.
- Hero layers background peggys-cove-hero.png with hero-person.png and van.png; preserve positioning/z-index when swapping art.


## Component notes
- ChatBookingWidget currently owns its own open state and ignores props; App passes open/onClose but they are unused—lift state if central control is required.
- Hero APPLY NOW button calls onOpenBooking; wire this to the widget state if you refactor visibility.
- index.html only mounts #root and loads /src/main.jsx; no other HTML scaffolding.


## Testing/QA
- No automated tests or linters; rely on manual browser checks across breakpoints.
- mhvac-issue.md documents manual QA points: hero imagery/contrast, services copy/images (including Water + Air Solutions), and booking iframe URL https://maritimehvac.info/bookingservice.


## Repo hygiene
- .gitignore covers node_modules/, dist/, .vite/; keep dist/ and downloaded assets out of git unless intentional.
- Default branch main; current work on feature/some-change.

