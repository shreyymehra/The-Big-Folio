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
      navigator.clipboard.writeText(addr).then(function(){ say('Copied. Opening your mail app too.'); if(window.islandSay) window.islandSay('Email copied',2400); },
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

  /* 4. the island: contracts on the way down, opens on the way up, and while
     compact shows the section in view, the song playing, or the address just
     copied. Styles live in base.css under THE ISLAND. */
  function island(){
    var nav=document.getElementById('nav'); if(!nav||nav._island) return; nav._island=true;
    var sig=nav.querySelector('.sig'); if(!sig) return;
    var now=document.createElement('span'); now.className='island-now'; now.setAttribute('aria-hidden','true');
    now.innerHTML='<i class="inow-dot"></i><span class="inow-t"></span>';
    sig.insertAdjacentElement('afterend',now);
    var txt=now.querySelector('.inow-t'), dot=now.querySelector('.inow-dot'), section='', live='', liveT=0;
    function vinylLive(){ var v=document.getElementById('vinyl'); return v&&v.classList.contains('playing')?'I Want You, playing':''; }
    function render(){
      txt.textContent=live||section||'Menu';
      nav.classList.toggle('is-live',!!live);
      dot.style.visibility=(live||section)?'visible':'hidden';
      if(typeof measureIsland==='function'&&innerWidth>820){ wShut=0; requestAnimationFrame(sizeIsland); }
    }
    window.islandSay=function(msg,ms){
      live=msg; render(); clearTimeout(liveT);
      if(ms) liveT=setTimeout(function(){ liveT=0; live=vinylLive(); render(); },ms);
    };

    /* the section in the middle of the screen names itself */
    var secs=[].slice.call(document.querySelectorAll('section')).filter(function(s){ return !s.closest('.mag'); });
    function label(s){
      var k=s.querySelector('.no,.eyebrow,.wk-eyebrow'); if(!k) return '';
      return k.textContent.replace(/^\s*\d+\s*\/\s*/,'').trim();
    }
    if('IntersectionObserver' in window&&secs.length){
      var sio=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ section=label(e.target); render(); } });
      },{rootMargin:'-45% 0px -50% 0px'});
      secs.forEach(function(s){ sio.observe(s); });
    }
    var v=document.getElementById('vinyl');
    if(v&&'MutationObserver' in window){
      new MutationObserver(function(){ if(!liveT){ live=vinylLive(); render(); } })
        .observe(v,{attributes:true,attributeFilter:['class']});
    }

    /* Measure both shapes once, then drive the shell between them. Animating
       the pill's own width (rather than squeezing its contents) is what makes
       the morph read as one object changing shape. Re-measured on resize and
       whenever the readout text changes length. */
    var wOpen=0,wShut=0,measuring=false;
    function measureIsland(){
      if(measuring||innerWidth<=820) return; measuring=true;
      var wasCompact=nav.classList.contains('is-compact');
      var prev=nav.style.getPropertyValue('--island-w'); /* put it back: measuring must not move the island */
      var end=nav.querySelector('.nav-end');
      nav.style.transition='none'; nav.style.width='auto';
      nav.classList.remove('is-compact'); now.style.display='none'; wOpen=nav.offsetWidth; now.style.display='';
      /* the shut shape is the name plus the readout: take the links out of flow
         and put the readout back in it, or the shell cannot measure smaller */
      nav.classList.add('is-compact');
      if(end) end.style.display='none';
      now.style.opacity='1';
      wShut=nav.offsetWidth;
      if(end) end.style.display='';
      now.style.opacity='';
      nav.classList.toggle('is-compact',wasCompact);
      nav.style.width='';
      if(prev) nav.style.setProperty('--island-w',prev); else nav.style.removeProperty('--island-w');
      nav.offsetWidth; nav.style.transition=''; measuring=false;
    }
    function sizeIsland(){
      if(innerWidth<=820){ nav.style.removeProperty('--island-w'); return; }
      if(!wOpen||!wShut) measureIsland();
      var open=!nav.classList.contains('is-compact')||nav.matches(':hover,:focus-within');
      nav.style.setProperty('--island-w',(open?wOpen:wShut)+'px');
    }
    addEventListener('resize',function(){ wOpen=wShut=0; sizeIsland(); });
    nav.addEventListener('pointerenter',sizeIsland);
    nav.addEventListener('pointerleave',sizeIsland);
    nav.addEventListener('focusin',sizeIsland);
    nav.addEventListener('focusout',sizeIsland);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ wOpen=wShut=0; sizeIsland(); });

    /* compact on the way down, open on the way up */
    var last=scrollY, tick=false;
    function onScroll(){
      tick=false; var y=scrollY, dy=y-last;
      var was=nav.classList.contains('is-compact');
      if(y<140) nav.classList.remove('is-compact');
      else if(dy>6) nav.classList.add('is-compact');
      else if(dy<-6) nav.classList.remove('is-compact');
      if(nav.classList.contains('is-compact')!==was) sizeIsland();
      last=y;
    }
    addEventListener('scroll',function(){
      if(tick) return; tick=true; requestAnimationFrame(onScroll);
      setTimeout(function(){ if(tick) onScroll(); },120);
    },{passive:true});
    /* a tap on the compact island, anywhere but a link, opens it */
    nav.addEventListener('click',function(e){
      if(nav.classList.contains('is-compact')&&!(e.target.closest&&e.target.closest('a,button'))){ nav.classList.remove('is-compact'); sizeIsland(); }
    });
    render();
    sizeIsland();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',island); else island();
})();
