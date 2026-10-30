/* assets/loader.js - the page loader (30 Oct 2026).
   Loaded from the <head> of every page except home, so the curtain is up
   before the first paint. Home has its own loader in the markup because it
   hands off to the hero assembly, and this file stands down when it sees it.
   Moved out of site.js: six case pages never loaded site.js and so had no
   loader at all. The styles are in base.css (#sm-page-loader). */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* ---- the loading page (13 Oct, at his instruction) ----
     Home has its own loader in the markup because it hands off to the hero
     assembly. Every other route gets this one, built here so no page carries
     markup for it: the same star, drawn, then gone. It never blocks: the page
     is already rendered underneath and this is a curtain over it, removed on
     load or after 900ms, whichever comes first.
     Reduced motion never sees it. */
  (function(){
    if(reduce || document.getElementById('loader')) return;
    var el=document.createElement('div');
    el.id='sm-page-loader'; el.className='loader'; el.setAttribute('aria-hidden','true');
    el.innerHTML='<div class="lgrid"><svg class="lstar spin" viewBox="0 0 40 40" aria-hidden="true" focusable="false">'+
      '<path d="M20 3c1.4 5.6 2.1 9.8 3.8 12.7 4.6.3 9.3-.4 13.4 1.2-3.8 2.4-7.9 3.9-10.9 6.7 1 4.3 3 8.8 3.4 12.9-3.8-2.6-6.6-6-10.1-7.9-3.3 2.4-6.7 5.6-10.6 7.6 1.2-4.4 3.2-8.3 3.9-12.8C9.9 20.6 5.6 18.9 2.6 16.6c4.4-.9 8.9-.2 13.2-1.1C17.7 11.9 18.4 7.2 20 3z"/></svg><div class="lrule draw"></div></div>';
    document.documentElement.appendChild(el);
    var gone=false;
    function drop(){ if(gone) return; gone=true;
      el.classList.add('gone'); setTimeout(function(){ el.remove(); },660); }
    /* A MINIMUM, NOT A RACE. It used to drop 220ms after load or at 900ms, whichever
       came first, so on a fast connection or a cached page it was a flash nobody saw
       and the site read as having no loader at all. Now it stays for at least 850ms
       once the page has loaded, with a 3s ceiling so a stalled load never traps it. */
    var t0=Date.now(), MIN=850, loaded=false;
    function settle(){ if(!loaded) return; setTimeout(drop,Math.max(0,MIN-(Date.now()-t0))); }
    addEventListener('load',function(){ loaded=true; settle(); });
    if(document.readyState==='complete'){ loaded=true; settle(); }
    setTimeout(drop,3000);
    ['click','keydown','wheel','touchstart'].forEach(function(ev){ addEventListener(ev,drop,{once:true,passive:true}); });
  })();

})();
