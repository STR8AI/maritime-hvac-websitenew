// Small loader to include the real SPA script from `01-partials`.
(function(){
  try {
    var s = document.createElement('script');
    s.src = '01-partials/scripts.js';
    s.defer = true;
    document.head.appendChild(s);
  } catch (e) {
    console.error('Failed to load main script:', e);
  }
})();
