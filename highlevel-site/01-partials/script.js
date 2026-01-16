// Maritime HVAC Website Script
// Single Page Application routing and interactions

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