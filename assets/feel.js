/* How the site answers a visitor, on every page.

   1. Press and spring. Every button and every link that is a block (a
      card, a door, a nav item, a CTA) dips when pressed and springs back
      with a small overshoot on release. Keyboard presses get the same.
      The spring animates the standalone `scale` property through the Web
      Animations API, so it layers over the transforms components already
      drive (the pinned work tiles, the X bands) instead of fighting them.
      Inline links in prose cannot scale, so they get the colour state.
   2. The email address copies itself to the clipboard as it opens mail,
      and says so. A recruiter on webmail gets the address either way.
   3. Section headlines rise out of a clip as they enter.

   Reduced motion: no scale and no clip; the state changes remain. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root=document.documentElement;
  var PRESSABLE='a[href],button,summary,[role="button"],.tile-q';

  function target(e){
    var el=e.target&&e.target.closest?e.target.closest(PRESSABLE):null;
    if(!el||el.disabled) return null;
    if(getComputedStyle(el).display==='inline') return null; /* prose links: colour only */
    return el;
  }
  function depth(el){ var w=el.getBoundingClientRect().width; return w>320?.985:w>120?.97:.93; }
  function stop(el){ (el._pressAnims||[]).forEach(function(a){ a.cancel(); }); el._pressAnims=[]; }
  function down(el){
    el.classList.add('is-pressed');
    if(reduce||!el.animate) return;
    stop(el);
    el._pressAnims=[el.animate([{scale:'1'},{scale:String(depth(el))}],{duration:90,easing:'ease-out',fill:'forwards'})];
  }
  function up(el){
    setTimeout(function(){ el.classList.remove('is-pressed'); },120);
    if(reduce||!el.animate) return;
    var from=depth(el); stop(el);
    el._pressAnims=[el.animate(
      [{scale:String(from)},{scale:'1.025',offset:.45},{scale:'.995',offset:.75},{scale:'1'}],
      {duration:460,easing:'ease-out'})];
  }

  var held=null;
  document.addEventListener('pointerdown',function(e){
    if(e.button!==0) return; var el=target(e); if(!el) return; held=el; down(el);
  },{passive:true});
  ['pointerup','pointercancel'].forEach(function(t){
    document.addEventListener(t,function(){ if(held){ up(held); held=null; } },{passive:true});
  });
  document.addEventListener('pointerout',function(e){
    if(held&&e.target===held&&!held.contains(e.relatedTarget)){ up(held); held=null; }
  },{passive:true});
  document.addEventListener('keydown',function(e){
    if(e.repeat||(e.key!=='Enter'&&e.key!==' ')) return;
    var el=target(e); if(!el) return;
    if(e.key===' '&&el.tagName==='A') return; /* space scrolls on links */
    down(el); setTimeout(function(){ up(el); },110);
  });

  /* 2. email copies itself */
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="mailto:"]'); if(!a) return;
    var addr=a.getAttribute('href').replace(/^mailto:/,'').split('?')[0];
    var note=a.nextElementSibling&&a.nextElementSibling.classList.contains('copied-note')?a.nextElementSibling:null;
    if(!note){
      note=document.createElement('span'); note.className='copied-note';
      note.setAttribute('role','status'); note.setAttribute('aria-live','polite');
      a.insertAdjacentElement('afterend',note);
    }
    function say(t){ note.textContent=t; note.classList.add('on'); clearTimeout(note._t);
      note._t=setTimeout(function(){ note.classList.remove('on'); },2600); }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(addr).then(function(){ say('Copied. Opening your mail app too.'); },
        function(){ say('Opening your mail app.'); });
    } else say('Opening your mail app.');
  });

  /* 3. headline clip reveal */
  function clips(){
    var els=[].slice.call(document.querySelectorAll('.shead h2,.phead h1,.proof h2,.wk-title'));
    if(!els.length||reduce||!('IntersectionObserver' in window)) return;
    root.classList.add('js-clip');
    els.forEach(function(el){ el.classList.add('clip'); });
    /* watch the headline's container, not the headline: Chrome counts the
       element's own clip-path, so a fully clipped line never reads as visible */
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){ if(!en.isIntersecting) return;
        var h=en.target._clipHead; if(h) h.classList.add('in'); io.unobserve(en.target); });
    },{threshold:.15});
    els.forEach(function(el){ var box=el.parentElement||el; box._clipHead=el; io.observe(box); });
    /* backstop: nothing that was clipped stays clipped */
    function unclip(){ els.forEach(function(el){ var r=el.getBoundingClientRect();
      if(r.top<innerHeight&&r.bottom>0) el.classList.add('in'); }); }
    setTimeout(unclip,3000);
    var pending=false;
    addEventListener('scroll',function(){ if(pending) return; pending=true;
      setTimeout(function(){ pending=false; unclip(); },250); },{passive:true});
    addEventListener('visibilitychange',function(){ if(!document.hidden) setTimeout(unclip,600); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',clips); else clips();
})();
