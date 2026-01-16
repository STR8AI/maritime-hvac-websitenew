// script.js
// Basic SPA routing, mobile drawer, review carousel, nav active state.

document.addEventListener('DOMContentLoaded', function () {
  // Routing
  const pages = document.querySelectorAll('.page');
  const navlinks = document.querySelectorAll('.navlink');

  window.routeTo = function (pageKey) {
    pages.forEach(p => {
      if (p.dataset.page === pageKey) {
        p.classList.add('active');
        p.setAttribute('aria-hidden', 'false');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-hidden', 'true');
      }
    });

    navlinks.forEach(a => {
      a.classList.toggle('active', a.dataset.route === pageKey);
    });

    // Close drawer on navigation (mobile)
    closeDrawer();

    // Scroll to top of main content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nav link clicks
  document.querySelectorAll('[data-route]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const key = a.dataset.route;
      routeTo(key);
    });
  });

  // Initialize route from hash if present
  (function initRouteFromHash() {
    const hash = location.hash.replace('#', '');
    if (!hash) return;
    // If hash matches a route, route to it (strip query params)
    const key = hash.split('?')[0];
    const pageExists = Array.from(pages).some(p => p.dataset.page === key);
    if (pageExists) routeTo(key);
  })();

  // Mobile drawer
  const drawer = document.getElementById('drawer');
  const hamburger = document.getElementById('hamburger');
  const drawerClose = document.getElementById('drawer-close');

  function openDrawer() {
    if (!drawer) return;
    drawer.style.display = 'block';
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.style.display = 'none';
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  // Close drawer when clicking overlay (outside inner)
  if (drawer) drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  // Review carousel (simple)
  const reviews = [
    { text: "Excellent workmanship and prompt service — highly recommend!", name: "Jamie R." },
    { text: "Professional, tidy, and fair pricing. Fixed our HVAC quickly.", name: "Alex P." },
    { text: "Friendly team and clear communication — would definitely use again.", name: "Taylor S." }
  ];
  let reviewIndex = 0;
  const reviewText = document.getElementById('reviewText');
  const reviewName = document.getElementById('reviewName');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');

  function renderReview() {
    const r = reviews[reviewIndex];
    if (reviewText) reviewText.textContent = r.text;
    if (reviewName) reviewName.textContent = "— " + r.name;
  }
  if (prevBtn) prevBtn.addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
    renderReview();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    renderReview();
  });
  // Auto-advance every 6s
  setInterval(() => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    renderReview();
  }, 6000);
  renderReview();

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
