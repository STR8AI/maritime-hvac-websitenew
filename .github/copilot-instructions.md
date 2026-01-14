# Copilot Instructions

## Project snapshot
- Vite + React 18 single-page marketing site for Maritime HVAC; entry at src/main.jsx mounts App.
- App renders sticky top bar, hero, service grid, and a slide-in chat/booking widget; styles concentrated in src/styles.css and components/ChatBookingWidget.css.
- Service content is inline data in App.jsx; no CMS or API calls.

## Run/build
- Dev server: `npm install` then `npm run dev` (Vite default port 5173, host exposed; preview on 4174 via `npm run preview`).
- Production bundle: `npm run build` (outputs to dist/ per Vite defaults).

## File layout & patterns
- Global styles and theme tokens live in src/styles.css (navy/red palette, hero background, responsive rules). The file also has broad selectors that hide all iframes and any element with "chat" in the class/id; override with more specific selectors when embedding iframes (see ChatBookingWidget.css).
- Components: Hero.jsx (hero layout, APPLY NOW button triggers booking open callback) and ChatBookingWidget.jsx (floating CTA + slide-in iframe). Asset paths assume files in public/assets (logo, hero-person, van, services imagery).
- App.jsx controls bookingOpen state but the widget currently manages its own `open` state and ignores props; coordinate behavior by lifting state or passing handlers if you need external control.

## UI notes
- Chat/Booking panel uses an iframe pointed at https://maritimehvac.info/bookingservice; CSS class .cbw-iframe counteracts the global iframe hide rule. When adding other iframes, add a specific class and display rule.
- Global CSS hides `[class*="chat"]` and `[id*="chat"]`; avoid naming clashes for new elements that should remain visible.
- Typography uses system fonts; colors defined as CSS variables in :root; background is dark (#0a0f18).

## Content & links
- Navigation anchors expect sections with ids home/services/about/contact; only services and hero exist—add matching sections or update links to avoid dead anchors.
- Service cards presently share one "View Service" CTA without routing; extend via additional components or links in App.jsx services array.

## Testing & linting
- No tests or linters configured; changes run purely via Vite. Keep modifications small and smoke-test in the browser.

## Asset handling
- Static assets are served from public/; reference via absolute paths (e.g., /assets/hero-person.png). Update public/assets/services/* for service imagery.
