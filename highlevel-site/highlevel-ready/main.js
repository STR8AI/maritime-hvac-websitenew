/* main.js — small site behaviors: current year, smooth scroll, mobile nav toggle, simple client-side validation */

document.addEventListener('DOMContentLoaded', function () {
  // year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // smooth scrolling for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // focus target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({preventScroll: true});
      }
    });
  });

  // mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      // toggle nav visibility via aria-hidden
      var hidden = primaryNav.getAttribute('aria-hidden') === 'true';
      primaryNav.setAttribute('aria-hidden', String(!hidden));
    });
    // initialize hidden state for small screens
    if (window.innerWidth <= 920) {
      primaryNav.setAttribute('aria-hidden', 'true');
    }
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) {
        primaryNav.removeAttribute('aria-hidden');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        primaryNav.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // client-side form validation (helpful but server validation required)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      if (!name || !email) return;
      if (!name.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        e.preventDefault();
        alert('Please provide your name and a valid email address so we can get back to you.');
        if (!name.value.trim()) name.focus();
        else email.focus();
      }
    });
  }
});

docker-compose logs -f web
