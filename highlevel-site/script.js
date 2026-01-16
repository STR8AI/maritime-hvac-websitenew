// Loader: check images and fallback to placeholders, then load main SPA script.
(function(){
  function basename(url){
    try{return url.split('/').pop().split('?')[0].split('#')[0];}catch(e){return ''}
  }

  function testImage(url, ok, fail){
    var img = new Image();
    img.onload = ok; img.onerror = fail; img.src = url;
  }

  function applyImgFallbacks(){
    var placeholders = {
      'peggys-cove.jpg': '04-assets/images/other/placeholder-bg.svg',
      'peggys-cove.jpeg': '04-assets/images/other/placeholder-bg.svg',
      'logo.png': '04-assets/images/other/placeholder-logo.svg',
      'technician.png': '04-assets/images/other/placeholder-tech.svg',
      'van.png': '04-assets/images/other/placeholder-van.svg',
      'van.jpg': '04-assets/images/other/placeholder-van.svg',
      'favicon.ico': '04-assets/images/other/favicon.svg'
    };

    // Img tags
    document.querySelectorAll('img').forEach(function(el){
      var src = el.getAttribute('src') || '';
      if(!src) return;
      var name = basename(src);
      var ph = placeholders[name];
      if(!ph) return;
      testImage(src,
        function(){},
        function(){ el.src = ph; }
      );
    });

    // Background-image inline (hero-bg)
    document.querySelectorAll('.hero-bg').forEach(function(el){
      var style = el.style.backgroundImage || getComputedStyle(el).backgroundImage || '';
      var m = style.match(/url\(["']?(.*?)["']?\)/);
      if(!m) return;
      var url = m[1];
      var name = basename(url);
      var ph = placeholders[name] || placeholders['peggys-cove.jpg'];
      testImage(url,
        function(){},
        function(){ el.style.backgroundImage = "url('"+ph+"')"; }
      );
    });
  }

  // Run after DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyImgFallbacks);
  } else applyImgFallbacks();

  // Load main SPA script after fallbacks are set
  try {
    var s = document.createElement('script');
    s.src = '01-partials/scripts.js';
    s.defer = true;
    document.head.appendChild(s);
  } catch (e) {
    console.error('Failed to load main script:', e);
  }
})();
