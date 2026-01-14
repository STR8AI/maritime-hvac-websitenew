**Title:** Review: Homepage visual polish & Water + Air Treatment addition

**Description:**  
This issue tracks remaining tasks and review points for the updated homepage PR. The goal is to verify visuals, functionality, and build/deploy readiness before merging.

---

### Hero Section
- [ ] Verify **Peggy's Cove** hero is visible and legible on all breakpoints (desktop / tablet / mobile)  
  **Acceptance:** hero image shows, text contrast OK, no large white band hiding the photo.
- [ ] Confirm `hero-person.png` is a true transparent cutout and positioned/anchored per design  
  **Acceptance:** transparent PNG (RGBA), no boxed background, positioned bottom-right on desktop.
- [ ] Confirm `van.png` resolution and placement match the design  
  **Acceptance:** van sits in front of water fade and is not clipped.
- [ ] Verify the thin white swoosh under navigation renders correctly (SVG or image) and does not obscure the hero.

### Services Section
- [ ] Confirm Services section lists **Water + Air Solutions** with **"Alkaline Water Conditioners (Not RO)"** listed.  
- [ ] Verify the 4-panel layout displays correctly on desktop / tablet / mobile.  
- [ ] Check all service images load properly and are not placeholders (no blown-up logos).  
- [ ] Confirm service copy matches the PR (Heating + Cooling, Electrical, Water + Air Solutions, Service & Maintenance).

### Booking Widget
- [ ] Verify booking widget iframe loads and is accessible.  
- [ ] Test ChatBookingWidget slide-in functionality and close behavior.  
- [ ] Confirm iframe loads the booking URL: `https://maritimehvac.info/bookingservice`.

### Configuration & Build
- [ ] Confirm `.gitignore` contains `node_modules/`, `dist/`, `.vite/` and no built assets are tracked.  
- [ ] Run a production build and verify `dist/` renders correctly (`npm run build && npx vite preview --host`).  
- [ ] Add a Cloudflare Pages deploy preview and validate the final public URL.

### Local Testing Passed
1. `npm install`  
2. `npm run dev -- --host`  
3. Verified hero + services + booking widget on the Local/LAN URL

---

**Notes / Acceptance Criteria for Reviewer**
- All screenshots and examples were tested on desktop and mobile.  
- If any image is low-quality (<= ~30KB) it should be swapped for a high-res photo or rendered as an icon/contain mode.  
- After merge, confirm Cloudflare Pages build passes and preview URL is reachable.

**Labels:** review, ui, deployment
**Assignees:** @LUKAIRO (please adjust)
