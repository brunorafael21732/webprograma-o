/* Small progressive enhancement: set year and handle form submit */
(function(){
  'use strict';
  function setYears(){
    var y = new Date().getFullYear();
    var els = [document.getElementById('year'),document.getElementById('year-projects'),document.getElementById('year-cadastro')];
    els.forEach(function(el){ if(el) el.textContent = y; });
  }

  function enhanceForm(){
    var form = document.getElementById('cadastro-form');
    var msg = document.getElementById('form-message');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // perform basic native validity check
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      // here you would send the data to a server; we'll simulate success
      if(msg){ msg.className = ''; msg.textContent = 'Cadastro recebido com sucesso. Obrigado!'; }
      form.reset();
    });
  }

  if(typeof window !== 'undefined'){
    document.addEventListener('DOMContentLoaded', function(){
      // Decide incoming animation direction from sessionStorage (set by the previous page)
      try{
        var incoming = sessionStorage.getItem('nextPageEnter');
        if(incoming === 'from-left'){
          // replace default right-hidden with left-hidden so page enters from left
          document.body.classList.remove('page-hidden');
          document.body.classList.add('page-hidden-left');
        }
      }catch(err){}

      // trigger slide-in by removing the initial hidden class on next frame
      requestAnimationFrame(function(){
        try{
          // remove both hidden classes so body transitions to transform: translateX(0)
          document.body.classList.remove('page-hidden');
          document.body.classList.remove('page-hidden-left');
        }catch(e){}
      });

      // clear the flag after use
      try{ sessionStorage.removeItem('nextPageEnter'); }catch(e){}

      setYears(); enhanceForm();

      // intercept internal navigation to play a slide animation (left for forward, right for back)
      document.addEventListener('click', function(e){
        var a = e.target.closest && e.target.closest('a');
        if(!a) return;
        var href = a.getAttribute('href');
        if(!href) return;
        // ignore anchors, mailto, tel, external links
        if(href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        try{
          var url = new URL(href, location.href);
          if(url.origin !== location.origin) return; // external
        }catch(err){
          // malformed URL — allow default
          return;
        }

        // Determine direction: if the href equals document.referrer then user is likely going back
        var isBack = false;
        try{
          var targetHref = new URL(href, location.href).href;
          var ref = document.referrer || '';
          // normalize by removing trailing slash for comparison
          var normalize = function(u){ return u.replace(/\/$/, ''); };
          if(ref && normalize(targetHref) === normalize(ref)){
            isBack = true;
          }
        }catch(err){ /* ignore */ }

        e.preventDefault();
        if(isBack){
          // current page slides out to the right; next page should enter from left
          try{ sessionStorage.setItem('nextPageEnter', 'from-left'); }catch(e){}
          document.body.classList.add('slide-out-right');
        }else{
          // normal forward navigation: current slides left; next enters from right
          try{ sessionStorage.setItem('nextPageEnter', 'from-right'); }catch(e){}
          document.body.classList.add('slide-out-left');
        }

        // wait for the transition to complete then navigate
        setTimeout(function(){ location.href = href; }, 520);
      });
    });
  }

})();
