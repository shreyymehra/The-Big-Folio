/* Shared behaviour for every page. Home adds assets/home.js after this
   for the hero, ticker and vinyl, which exist nowhere else. */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* base.css turns on cross-document view transitions with
     @view-transition{navigation:auto}. When the browser skips one, which it
     does on a fast or interrupted navigation, it rejects its own internal
     promise and the console shows
       Uncaught (in promise) AbortError: Transition was skipped
     on a page that owns no promise to catch it. Nothing is broken, the page
     simply loads without the crossfade, but an error in the console is an
     error in the console to anyone who opens one. This swallows that exact
     rejection and nothing else: any other unhandled rejection still surfaces. */
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
    addEventListener('load',function(){ setTimeout(drop,220); });
    setTimeout(drop,900);
    ['click','keydown','wheel','touchstart'].forEach(function(ev){ addEventListener(ev,drop,{once:true,passive:true}); });
  })();

  /* the grid comes up with the scroll (12 Oct). One variable, written on a
     rAF tick and only when it has actually changed, so the paint is the only
     cost. Full strength by the end of the second screen. */
  (function(){
    var root=document.documentElement, last=-1, queued=false;
    function write(){
      queued=false;
      var v=Math.min(1, scrollY/(innerHeight*1.6));
      v=Math.round(v*100)/100;
      if(v!==last){ last=v; root.style.setProperty('--paper-in', v); }
    }
    function onScroll(){ if(!queued){ queued=true; requestAnimationFrame(write); } }
    write(); addEventListener('scroll', onScroll, {passive:true});
    addEventListener('resize', onScroll);
  })();

  addEventListener('unhandledrejection', function(e){
    var r = e.reason;
    if(r && r.name === 'AbortError' && /transition was skipped/i.test(r.message || '')) e.preventDefault();
  });

  /* the pressed-ink filter the display headings use (base.css, INK) */
  (function(){
    if(document.getElementById('ink')) return;
    var d=document.createElement('div'); d.setAttribute('aria-hidden','true');
    d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
    d.innerHTML='<svg width="0" height="0"><filter id="ink" x="-2%" y="-5%" width="104%" height="110%">'+
      '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n"/>'+
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="d"/>'+
      '<feMorphology in="d" operator="dilate" radius="0.22" result="m"/>'+
      '<feGaussianBlur in="m" stdDeviation="0.18"/></filter></svg>';
    (document.body||document.documentElement).appendChild(d);
  })();

  /* Melbourne local time in the home footer. The zone name comes from the
     browser's time-zone data, so it reads AEST in winter and AEDT once
     daylight saving starts (first Sunday in October). Updates each minute. */
  (function(){
    var el=document.getElementById('mel-time'); if(!el||!window.Intl) return;
    var fmt=new Intl.DateTimeFormat('en-AU',{timeZone:'Australia/Melbourne',hour:'numeric',minute:'2-digit',hour12:true,timeZoneName:'short'});
    function tick(){ var d=new Date(); el.textContent=fmt.format(d).replace(/\s?(am|pm)/i,function(m,x){ return ' '+x.toLowerCase(); }); el.setAttribute('datetime',d.toISOString()); }
    tick(); setInterval(tick,60000);
  })();

  /* year stamp */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* reading progress: the star fills on home, the rail grows on essays.
     The nav is the island now, driven by feel.js. */
  var rail = document.querySelector('.rail');
  /* The page height is cached and the write is rAF throttled. Reading
     document.body.scrollHeight forces a synchronous layout, and Lenis fires
     scroll on every frame it animates, so this was one forced layout per frame
     for a number that only moves when the page resizes. It was 5.3% of the
     home profile. */
  var _railMax = 0, _railQueued = false;
  var _railFill = document.getElementById('starfill');
  function _railMeasure(){ _railMax = document.body.scrollHeight - innerHeight; }
  var _railLast = -1;
  function _railPaint(){
    _railQueued = false;
    var p = _railMax > 0 ? Math.min(1, scrollY / _railMax) : 0;
    /* Only write when the rounded value has actually moved. clipPath on the
       star forces a repaint, and at 0.1% steps on a 9000px page most frames
       were repainting it to the value it already had. Same guard as
       --paper-in and --star-in, which is the pattern this file already uses. */
    var q = Math.round(p * 1000);
    if (q === _railLast) return;
    _railLast = q;
    var pct = q / 10;
    if (_railFill) _railFill.style.clipPath = 'inset(' + (100 - pct).toFixed(1) + '% 0 0 0)';
    if (rail) rail.style.width = pct.toFixed(1) + '%';
  }
  _railMeasure(); _railPaint();
  addEventListener('resize', function(){ _railMeasure(); _railPaint(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ _railMeasure(); _railPaint(); });
  addEventListener('scroll', function(){
    if (!_railQueued) { _railQueued = true; requestAnimationFrame(_railPaint); }
  }, {passive:true});

  /* scroll reveals */
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.rv').forEach(function(el,k){
      el.style.transitionDelay = (Math.min(k,6)*60) + 'ms'; io.observe(el);
    });
  } else {
    document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('in'); });
  }

  /* staggered entrances, shared by several pages */
  function stagger(sel, cls, step){
    var els = [].slice.call(document.querySelectorAll(sel));
    if (!els.length) return;
    if (!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add(cls); }); return; }
    var o = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(!e.isIntersecting) return;
        var i = els.indexOf(e.target);
        setTimeout(function(){ e.target.classList.add(cls); }, reduce ? 0 : Math.min(i,8)*step);
        o.unobserve(e.target); });
    }, {threshold:.2});
    els.forEach(function(e){ o.observe(e); });
  }
  stagger('.tile-q', 'in', 70);
  stagger('.prose p', 'in', 80);

  /* brain dump steps deal in */
  (function(){
    var steps = [].slice.call(document.querySelectorAll('.step'));
    if (!steps.length) return;
    if (!('IntersectionObserver' in window)){ steps.forEach(function(s){ s.classList.add('dealt'); }); return; }
    var o = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(!e.isIntersecting) return;
        var i = steps.indexOf(e.target);
        setTimeout(function(){ e.target.classList.add('dealt'); }, reduce ? 0 : i*90);
        o.unobserve(e.target); });
    }, {threshold:.25});
    steps.forEach(function(s){ o.observe(s); });
  })();

  /* FAQ accordion */
  document.querySelectorAll('.tile-q').forEach(function(t){
    t.addEventListener('click', function(){
      t.setAttribute('aria-expanded', t.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  });

  /* CTA reveals line by line */
  (function(){
    var cta = document.querySelector('.cta'); if (!cta) return;
    cta.innerHTML = cta.innerHTML.split('<br>').map(function(l){ return '<span class="ln">'+l+'</span>'; }).join('');
    var sp = [].slice.call(cta.querySelectorAll('.ln'));
    if (!('IntersectionObserver' in window)){ sp.forEach(function(s){ s.classList.add('in'); }); return; }
    new IntersectionObserver(function(es,o){
      es.forEach(function(e){ if(!e.isIntersecting) return;
        sp.forEach(function(s,i){ setTimeout(function(){ s.classList.add('in'); }, reduce ? 0 : i*110); });
        o.disconnect(); });
    }, {threshold:.3}).observe(cta);
  })();

  /* word-by-word fill: any [data-scrub] paragraph inks in as it is read,
     scrubbed by scroll. Home (the short Me) and /about/ (the long version).
     Each paragraph is fully inked by the time it reaches mid-screen. */
  (function(){
    var ps=[].slice.call(document.querySelectorAll('[data-scrub]')); if(!ps.length) return;
    var groups=ps.map(function(p){
      var walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT), nodes=[], n;
      while((n=walker.nextNode())) nodes.push(n);
      nodes.forEach(function(t){
        var frag=document.createDocumentFragment();
        t.textContent.split(/(\s+)/).forEach(function(part){
          if(!part) return;
          if(/^\s+$/.test(part)){ frag.appendChild(document.createTextNode(part)); return; }
          var s=document.createElement('span'); s.className='w'; s.textContent=part; frag.appendChild(s);
        });
        t.parentNode.replaceChild(frag,t);
      });
      return {p:p,words:[].slice.call(p.querySelectorAll('.w'))};
    });
    if(reduce){ groups.forEach(function(g){ g.words.forEach(function(w){ w.classList.add('on'); }); }); return; }
    var tick=false;
    function paint(){ tick=false; var vh=innerHeight;
      groups.forEach(function(g){
        var r=g.p.getBoundingClientRect();
        var prog=Math.min(1,Math.max(0,(vh*.95-r.top)/(r.height*.55+vh*.2)));
        var k=Math.round(prog*g.words.length);
        for(var i=0;i<g.words.length;i++) g.words[i].classList.toggle('on',i<k);
      });
    }
    addEventListener('scroll',function(){ if(!tick){ tick=true; requestAnimationFrame(paint); setTimeout(function(){ if(tick) paint(); },120); } },{passive:true});
    addEventListener('resize',paint);
    paint();
  })();
})();


/* ============================================================
   TICKERS (moved here from home.js, 13 Oct 2026)
   Any self-running band on any page: the quote tape, the logo loop, the
   orange process band. It was home-only until /about/ took the process band,
   and a behaviour on two pages belongs in the shared file.
   Every page that has no [data-cross]/[data-tape]/[data-logos] runs the
   querySelectorAll, finds nothing and does nothing.
   ============================================================ */
(function(){
  /* ---- tickers: the quote tape, the logo loop and the two crossing bands ----
     They scroll themselves (Shrey, 21 Sep 2026), and scrolling the page pushes
     them along on top. Clash, marked: WCAG 2.2.2 wants a way to stop anything
     that moves on its own for more than five seconds. So: each one eases to a
     stop while pointed at or focused, a "Pause tickers" button beside each
     stops all of them (remembered across visits), and under reduced motion
     they never move. Each loop only runs while it is on screen. */
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* The Pause motion controls came off on 6 Oct at his instruction and no
     markup has carried [data-tick-toggle] since. What was left was not just
     dead weight, it was a LATENT BUG: this block read
     localStorage['sm-tickers'] on every load, so anyone who had pressed
     Pause before 6 Oct still had 'paused' stored, the tickers started
     frozen, and there was no longer a control anywhere to unfreeze them.
     The stored key is cleared once, on sight, so those visitors recover.
     html.sm-paused went with the CSS carousel it drove; no stylesheet has
     referenced it since. */
  try{ localStorage.removeItem('sm-tickers'); }catch(e){}
  var paused=false;

  if(!reduce) [].forEach.call(document.querySelectorAll('[data-cross],[data-tape],[data-logos]'),function(box){
    var BASE=+box.getAttribute('data-speed')||40, PUSH=+box.getAttribute('data-push')||.5; /* px per second; scroll push */
    var bands=[].slice.call(box.querySelectorAll('[data-xband]')).map(function(el){
      var track=el.querySelector('.xtrack');
      var b={el:el,track:track,dir:+el.getAttribute('data-dir')||-1,x:0,span:0,hold:0,holdTarget:0};
      el.addEventListener('pointerenter',function(){ b.holdTarget=1; });
      el.addEventListener('pointerleave',function(){ b.holdTarget=0; });
      return b;
    });
    box.addEventListener('focusin',function(){ bands.forEach(function(b){ b.holdTarget=1; }); });
    box.addEventListener('focusout',function(){ bands.forEach(function(b){ b.holdTarget=0; }); });
    /* the track holds identical copies; one copy's width is the loop length */
    function measure(){ bands.forEach(function(b){ b.span=b.track.scrollWidth/b.track.children.length; }); }
    measure(); addEventListener('resize',measure);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(measure);

    var vel=0,lastY=scrollY,lastT=0,running=false,raf=0,go=0;
    function frame(t){
      if(!running){ raf=0; return; }
      var dt=lastT?Math.min(.05,(t-lastT)/1000):0; lastT=t;
      var v=window.lenis&&typeof window.lenis.velocity==='number'?window.lenis.velocity:(scrollY-lastY);
      lastY=scrollY; vel+=(v-vel)*.12;
      go+=((paused?0:1)-go)*.08; /* pause eases out rather than snapping */
      bands.forEach(function(b){
        b.hold+=(b.holdTarget-b.hold)*.08;
        var speed=(BASE*go+Math.abs(vel)*PUSH*60)*(1-b.hold);
        b.x+=b.dir*speed*dt;
        if(b.span){ b.x%=b.span; if(b.x>0) b.x-=b.span; }
        b.track.style.transform='translate3d('+b.x.toFixed(2)+'px,0,0)';
      });
      raf=requestAnimationFrame(frame);
    }
    function start(){ if(running) return; running=true; lastT=0; lastY=scrollY; if(!raf) raf=requestAnimationFrame(frame); }
    function stop(){ running=false; }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){ es[0].isIntersecting?start():stop(); },{rootMargin:'120px 0px'}).observe(box);
    } else start();
  });

})();
