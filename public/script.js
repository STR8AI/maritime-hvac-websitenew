/* ==// Maritime HVAC Website Script
// Single Page Application routing and interactions
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

// small wrapper so you don't push raw objects everywhere
export function trackEvent(name, props = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // event name in dataLayer makes GTM triggers easy
  window.dataLayer.push(Object.assign({ event: name, timestamp: Date.now() }, props));
}

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initRouting();
  initMobileDrawer();
  initReviews();
  initYear();

  // Handle initial route
  const initialRoute = getRouteFromURL();
  routeTo(initialRoute || 'home');
});

// ROUTING SYSTEM
function initRouting() {
  // Handle navigation clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('[data-route]');
    if (link) {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      routeTo(route);
      updateURL(route);
    }
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function(e) {
    const route = e.state ? e.state.route : 'home';
    routeTo(route);
  });
}

function routeTo(route) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
    page.setAttribute('aria-hidden', 'true');
  });

  // Show target page
  const targetPage = document.getElementById(`page-${route}`);
  if (targetPage) {
    targetPage.classList.add('active');
    targetPage.setAttribute('aria-hidden', 'false');
  }

  // Update nav active state
  document.querySelectorAll('.navlink').forEach(link => {
    link.classList.remove('active');
  });
  document.querySelectorAll(`[data-route="${route}"]`).forEach(link => {
    link.classList.add('active');
  });

  // Close mobile drawer if open
  closeMobileDrawer();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateURL(route) {
  const url = route === 'home' ? '/' : `/${route}`;
  history.pushState({ route }, '', url);
}

function getRouteFromURL() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') return 'home';
  return path.substring(1); // Remove leading slash
}

// MOBILE DRAWER
function initMobileDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const drawerClose = document.getElementById('drawer-close');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function() {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      drawer.setAttribute('aria-hidden', isExpanded);
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeMobileDrawer);
  }

  // Close on outside click
  drawer.addEventListener('click', function(e) {
    if (e.target === drawer) {
      closeMobileDrawer();
    }
  });
}

function closeMobileDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');

  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  if (drawer) drawer.setAttribute('aria-hidden', 'true');
}

// REVIEWS CAROUSEL
function initReviews() {
  const reviews = [
    { text: "Excellent workmanship and prompt service — highly recommend!", name: "Jamie R." },
    { text: "Professional team that knows what they're doing. Very satisfied with our new HVAC system.", name: "Mike T." },
    { text: "Great communication throughout the entire process. Will definitely use again.", name: "Sarah L." },
    { text: "Fast response time and fair pricing. Five stars!", name: "David K." }
  ];

  let currentReview = 0;
  const reviewText = document.getElementById('reviewText');
  const reviewName = document.getElementById('reviewName');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');

  if (!reviewText || !reviewName) return;

  function updateReview() {
    reviewText.textContent = reviews[currentReview].text;
    reviewName.textContent = `— ${reviews[currentReview].name}`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      currentReview = (currentReview - 1 + reviews.length) % reviews.length;
      updateReview();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      currentReview = (currentReview + 1) % reviews.length;
      updateReview();
    });
  }

  updateReview();
}

// YEAR UPDATE
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// SMOOTH SCROLLING
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href^="#"]');
  if (link && !link.hasAttribute('data-route')) {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});