/* Home-only behaviour: hero assembly, rolling verticals, cut-out drift and
   drag, the tickers, vinyl, the loader. None of
   these exist on any other page.

   Everything shared (year stamp, nav, star fill, scroll reveals, card landing,
   brain dump, FAQ, staggers, CTA lines) lives in site.js, which loads first.
   This file used to be a 250-line inline script that duplicated all of that,
   so home and the rest of the site drifted apart. Do not add a shared
   behaviour here; add it to site.js. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero=document.getElementById('hero');

  /* hero assembly */
  function assemble(){
    hero.classList.add('anim');
    var els=[].slice.call(hero.querySelectorAll('[data-t]'));
    els.forEach(function(e){e.className=e.className.replace(/ ?(snap|rise|fade)\b/g,'');e.style.animation='none'});
    var bg=hero.querySelector('.bg'); bg.style.animation='none'; void hero.offsetWidth;
    if(reduce){hero.classList.remove('anim');return}
    bg.style.animation=''; bg.classList.add('fade');
    els.forEach(function(e){setTimeout(function(){e.style.animation='';
      e.classList.add(e.classList.contains('tile')||e.classList.contains('roll')?'snap':(e.classList.contains('cue')?'fade':'rise'))},+e.dataset.t)});
  }
  if(!document.getElementById('loader')) assemble(); /* otherwise the loader calls it */

  /* The claim's rolling word.
     The frame is sized to the word in it, not to the longest word in the
     list, otherwise "brands" settles inside a plane cut for "campaigns" and
     the gap after it reads as a rendering fault. One measurement per word at
     init, then the width is animated with the same timing as the step. */
  /* The words are built here, not shipped in the markup: in the markup they
     concatenated, so a crawler, a link preview and a JS-off reader all saw
     "I build worldsstoriesbrandscampaignsbrands people want to belong to".
     The page ships the finished sentence; this turns it into the roll. */
  var rollHost=document.querySelector("[data-roll]"), rollStatic=document.getElementById("rollword");
  /* NOT an early return. This file is one IIFE, so a return here would take
     the tickers, the vinyl, the loader and the parallax with it if the hero
     markup ever changes. A detached stack keeps the code below harmless. */
  var stack=document.createElement("span");
  stack.className="rollstack"; stack.id="rollul";
  if(rollHost&&rollStatic){
    (rollHost.getAttribute("data-roll")||"").split(",").filter(Boolean).forEach(function(w){
      var sp=document.createElement("span"); sp.textContent=w; stack.appendChild(sp); });
    rollHost.appendChild(stack);
    /* the static word stays for the screen reader, which never sees the roll */
    rollStatic.classList.add("vh");
  } else { stack.appendChild(document.createElement("span")); }

  var ul=stack,n=ul.children.length-1,i=0;
  var rollBox=ul.parentElement,
      rollW=[].map.call(ul.children,function(el){return el.getBoundingClientRect().width});
  function fitRoll(k){ if(rollBox&&rollW[k]) rollBox.style.width=Math.ceil(rollW[k])+'px'; }
  function measureRoll(){
    rollW=[].map.call(ul.children,function(el){return el.getBoundingClientRect().width});
    fitRoll(i); }
  fitRoll(reduce?n:0);
  /* The display face loads async. Measuring before it arrives sizes the frame
     to the fallback and the plane ends up the wrong width for the rest of the
     visit, so measure again once the real face is in. */
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){
    if(reduce){i=n;} measureRoll();});}
  addEventListener('resize',measureRoll);
  if(reduce){ ul.style.transform='translateY(-'+(n*1.7)+'em)'; }
  /* TWO CYCLES, then it rests (block E). It used to make one pass and
     stop on the last word, which reads as a thing that broke rather than a
     thing that finished. Two passes say "this is a list" and then settle.
     It also holds while pointed at or focused, like every other moving
     thing on the site: a word that changes under the cursor is the reason
     people stop reading a line. */
  var rollCycles = 2, rollHold = false;
  if (rollHost) {
    ['pointerenter','focusin'].forEach(function(ev){ rollHost.addEventListener(ev,function(){ rollHold=true }) });
    ['pointerleave','focusout'].forEach(function(ev){ rollHost.addEventListener(ev,function(){ rollHold=false }) });
  }
  if(!reduce){ var rollT=setInterval(function(){if(rollHold)return;i++;ul.style.transition='transform 420ms var(--e-out)';
    ul.style.transform='translateY(-'+(i*1.7)+'em)'; fitRoll(i);
    if(i>=n){ rollCycles--; if(rollCycles>0){ i=-1; } else clearInterval(rollT); } /* one pass through the list, then it rests
       on the last item. The list ends on the word it must settle on, so the
       resting state is authored rather than whatever index the loop stopped
       at. Was i===n-1, which stopped one short and rested on the wrong word. */ },1500); }

  /* cut-out drift + drag */
  var tiles=[].slice.call(document.querySelectorAll('.tile'));
  var mx=0,my=0,tx=0,ty=0,base=[-2.2,1.6,-1.1,2.4,-1.0];
  hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2});
  hero.addEventListener('pointerleave',function(){tx=0;ty=0});
  (function drift(now){mx+=(tx-mx)*.06;my+=(ty-my)*.06;
    tiles.forEach(function(el,k){ if(el.dataset.held)return;
      var d=+el.dataset.depth||1,f=reduce?0:Math.sin(now/1800+k*2.1),g=reduce?0:Math.cos(now/2100+k*1.3);
      el.style.transform='translate('+(-mx*7*d+f*1.8).toFixed(2)+'px,'+(-my*6*d+g*1.8).toFixed(2)+'px) rotate('+(base[k]+f*.45).toFixed(2)+'deg)'});
    requestAnimationFrame(drift)})(0);
  tiles.forEach(function(el){el.addEventListener('pointerdown',function(e){
    el.setPointerCapture(e.pointerId);el.style.cursor='grabbing';el.dataset.held='1';
    var sx=e.clientX,sy=e.clientY;
    function mv(ev){el.style.transform='translate('+(ev.clientX-sx)+'px,'+(ev.clientY-sy)+'px) rotate(0deg)'}
    function up(){el.style.cursor='grab';delete el.dataset.held;
      el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up)}
    el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up)})});

  /* ---- tickers moved to site.js (13 Oct) ----
     /about/ now carries the orange process band, so the engine is a shared
     behaviour and this file is for home-only behaviour. Moved, not copied. */

  /* ---- the disc player ----
     Separate from the music list, which is an embed and drives itself. This
     is the object: the platter spins while his file plays, and the state
     comes from the audio element's own events so the record can never be
     turning while nothing is audible. */
  (function(){
    var fig=document.getElementById('disc'); if(!fig) return;
    var btn=fig.querySelector('.disc-btn'), au=fig.querySelector('.disc-audio');
    if(!btn||!au) return;
    function set(on){
      fig.classList.toggle('spinning',on);
      btn.setAttribute('aria-pressed',on?'true':'false');
      btn.setAttribute('aria-label',(on?'Pause':'Play')+' Take A Chance On Me by ABBA');
    }
    au.addEventListener('play',function(){ set(true); });
    au.addEventListener('pause',function(){ set(false); });
    au.addEventListener('ended',function(){ set(false); });
    au.addEventListener('error',function(){
      fig.classList.add('dead'); btn.setAttribute('aria-label','Track unavailable');
    });
    btn.addEventListener('click',function(){
      if(au.paused){ var p=au.play(); if(p&&p.catch) p.catch(function(){ set(false); }); }
      else au.pause();
    });
  })();

  /* ---- loader: under a second, first visit only (brief, 22 Sep 2026) ----
     A rule draws under the name, then the loader wipes into the hero and the
     hero assembles. Repeat visits (a stored flag) and reduced motion skip it
     entirely; any click, key, scroll or touch skips it at once. */
  var loader=document.getElementById('loader');
  (function(){
    if(!loader) return;
    /* every full load, at his instruction (13 Oct). The first-visit flag made
       the loader a thing almost nobody saw: a returning recruiter, or anyone
       who had opened the link once from an email, never got it. Reduced motion
       still skips it, because it is motion and nothing else. */
    if(reduce){ loader.remove(); assemble(); return; }
    hero.classList.add('anim');
    var done=false, timers=[];
    function finish(){
      if(done) return; done=true;
      timers.forEach(clearTimeout);
      loader.classList.add('gone');
      setTimeout(function(){ loader.remove(); },660);
      assemble();
    }
    timers.push(setTimeout(function(){ [].forEach.call(loader.querySelectorAll('.lmeta'),function(e){ e.classList.add('in'); }); },60));
    timers.push(setTimeout(function(){ var s=document.getElementById('lstar'); if(s) s.classList.add('spin'); },90));
    timers.push(setTimeout(function(){ var r=document.getElementById('lrule'); if(r) r.classList.add('draw'); },200));
    timers.push(setTimeout(finish,980));
    ['click','keydown','wheel','touchstart'].forEach(function(ev){ addEventListener(ev,finish,{once:true,passive:true}); });
  })();

  /* ---- selected work: pinned collage ----
     Mechanics translated from alaris.studio and measured from the live site.
     Progress p is how far through the 400vh section the pinned frame has
     travelled. Each tile owns a reveal point and lands over the next 13% of p.
     The ghost type slides along its curve by 62% of the path across the whole
     scroll, and the stars trail it.

     Tiles are hidden before they land, so the hiding is only switched on
     (.wk-live) once this script is running, updates run on scroll events with
     a timer backstop rather than on rAF alone. Under reduced motion nothing is
     scroll-driven: tiles stack and fade up by IntersectionObserver.

     Progress is read in Lenis' own scroll callback when Lenis is running, so
     tiles move in the same frame the page does. There is deliberately no CSS
     transition on the tile transform: easing it again on top of Lenis made the
     tiles trail the scroll. */
  (function(){
    var sec=document.querySelector('[data-work]'); if(!sec) return;
    var tiles=[].slice.call(sec.querySelectorAll('[data-tile]'));
    var tp=sec.querySelector('[data-ghost]'), txt=sec.querySelector('.wk-ghost-text'),
        curve=sec.querySelector('#wk-curve'), starG=sec.querySelector('[data-ghost-stars]');
    var STAR='M50 2 L59 30 L88 22 L70 46 L96 62 L66 65 L72 94 L50 74 L28 94 L34 65 L4 62 L30 46 L12 22 L41 30 Z';
    var NS='http://www.w3.org/2000/svg', stars=[], STAR_N=8, STAR_SIZE=190, STAR_GAP=250;
    var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    var pinnedMq=matchMedia('(prefers-reduced-motion:no-preference)'); /* every width; narrow screens get the deck layout */
    function clamp(v){ return v<0?0:v>1?1:v; }

    sec.classList.add('wk-live');

    if(starG) for(var s=0;s<STAR_N;s++){
      var g=document.createElementNS(NS,'g'), p=document.createElementNS(NS,'path');
      p.setAttribute('d',STAR); g.appendChild(p); starG.appendChild(g); stars.push(g);
    }

    /* The curve is sampled once into a table, not measured every frame.
       getTotalLength, getComputedTextLength and sixteen getPointAtLength calls
       per frame came to 12.3% of the profile, and not one of their inputs
       changes while the page is scrolling. SAMPLES is 360 over a path about
       2600 units long, so a step is ~7 units and the angle is read across two
       table entries rather than re-sampled. */
    var SAMPLES=360, pathL=0, textL=0, lut=null;
    function sampleCurve(){
      if(!curve){ lut=null; return; }
      pathL=curve.getTotalLength();
      try{ textL=txt?txt.getComputedTextLength():0; }catch(e){ textL=0; }
      lut=new Float32Array(SAMPLES*2);
      for(var i=0;i<SAMPLES;i++){
        var pt=curve.getPointAtLength(pathL*i/(SAMPLES-1));
        lut[i*2]=pt.x; lut[i*2+1]=pt.y;
      }
    }
    function placeStars(offsetPct){
      if(!lut||!stars.length) return;
      var start=offsetPct/100*pathL+textL+STAR_GAP*.35, k=STAR_SIZE/100;
      for(var i=0;i<stars.length;i++){
        var g=stars[i], d=start+i*STAR_GAP;
        if(d<0||d>pathL){ g.style.display='none'; continue; }
        var fi=d/pathL*(SAMPLES-1), i0=fi|0, i1=i0+1<SAMPLES?i0+1:i0, fr=fi-i0;
        var ax=lut[i0*2]+(lut[i1*2]-lut[i0*2])*fr,
            ay=lut[i0*2+1]+(lut[i1*2+1]-lut[i0*2+1])*fr;
        var ang=Math.atan2(lut[i1*2+1]-lut[i0*2+1], lut[i1*2]-lut[i0*2])*180/Math.PI;
        g.style.display='';
        g.setAttribute('transform','translate('+ax.toFixed(1)+' '+ay.toFixed(1)+') rotate('+ang.toFixed(2)+') scale('+k+') translate(-50 -70)');
      }
    }
    sampleCurve();
    addEventListener('resize',sampleCurve);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(sampleCurve);

    var io=null;
    function stacked(){
      sec.style.removeProperty('--wp');
      tiles.forEach(function(t){ t.style.removeProperty('--p'); });
      if(reduce||!('IntersectionObserver' in window)){ tiles.forEach(function(t){ t.classList.add('is-visible'); }); return; }
      if(!io) io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      },{rootMargin:'0px 0px -12% 0px',threshold:.12});
      tiles.forEach(function(t){ if(!t.classList.contains('is-visible')) io.observe(t); });
    }

    /* narrow deck layout: fixed offsets cannot suit every phone shape, so the
       link sits under the copy and the deck is sized into whatever height is
       left above the footer note. Measured on resize, never per scroll frame. */
    var copyEl=sec.querySelector('.wk-copy'), linkEl=sec.querySelector('.wk-note--left'), noteEl=sec.querySelector('.wk-note--right');
    function layout(){
      if(innerWidth>=760||!copyEl||!linkEl||!noteEl){ ['--link-top','--deck-top','--deck-w'].forEach(function(k){ sec.style.removeProperty(k); }); return; }
      var linkTop=copyEl.offsetTop+copyEl.offsetHeight+16;
      var deckTop=linkTop+linkEl.offsetHeight+30;
      var shellH=copyEl.offsetParent?copyEl.offsetParent.clientHeight:innerHeight;
      var avail=noteEl.offsetTop-22-deckTop-shellH*.06-48; /* dy spread and label */
      var w=Math.max(180,Math.min(innerWidth*.8,440,avail*1.7));
      sec.style.setProperty('--link-top',linkTop+'px');
      sec.style.setProperty('--deck-top',deckTop+'px');
      sec.style.setProperty('--deck-w',Math.round(w)+'px');
    }
    layout();
    addEventListener('resize',layout);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(layout);
    var ticking=false;
    function update(){
      ticking=false;
      if(!pinnedMq.matches){ stacked(); return; }
      var r=sec.getBoundingClientRect(), span=Math.max(sec.offsetHeight-innerHeight,1), p=clamp(-r.top/span);
      sec.style.setProperty('--wp',p.toFixed(4));
      var off=14-p*62;
      if(tp) tp.setAttribute('startOffset',off.toFixed(2)+'%');
      placeStars(off);
      /* one pass. The tile that most recently landed is the top of the pile:
         on narrow screens only its label shows, and on touch it is the one
         that plays. It used to be found by writing --p and then reading it
         back out of the style object on a second pass, which is a CSSOM round
         trip for a number this loop already has. */
      var active=null;
      for(var ti=0;ti<tiles.length;ti++){
        var t=tiles[ti], rv=+t.dataset.reveal||0;
        var cp=clamp((p-rv)/.13);
        /* --q is the LEAVE phase: each project holds the stage alone and hands
           it to the next, instead of three posters accumulating in scattered
           positions with blue space between them.
           A tile leaves exactly when the NEXT one arrives, read off that
           tile rather than from a constant, so the handoff stays correct if
           the reveals are ever re-spaced. THE LAST TILE NEVER LEAVES: --wp
           reaches 1 well before the pin releases and then holds, so an exit
           on the final tile empties the stage for the rest of the section.
           That is exactly what the first version did, and it is only visible
           in a screenshot. */
        var nxt=tiles[ti+1];
        var cq=nxt ? clamp((p-((+nxt.dataset.reveal||1)-.055))/.055) : 0;
        t.classList.toggle('is-visible',cp>0&&cq<1);
        t.style.setProperty('--p',cp.toFixed(4));
        t.style.setProperty('--q',cq.toFixed(4));
        if(cp>=.999&&cq<=0) active=t;
      }
      for(var tj=0;tj<tiles.length;tj++) tiles[tj].classList.toggle('is-top',tiles[tj]===active);
      if(!fine){
        tiles.forEach(function(t){
          var on=t.classList.contains('is-playing');
          if(t===active&&!on) play(t); else if(t!==active&&on) rewind(t);
        });
      }
    }
    function request(){
      if(ticking) return; ticking=true;
      requestAnimationFrame(update);
      setTimeout(function(){ if(ticking) update(); },120); /* rAF is paused in background tabs */
    }
    update();
    addEventListener('scroll',request,{passive:true});
    addEventListener('resize',request);
    addEventListener('pageshow',request);
    if(pinnedMq.addEventListener) pinnedMq.addEventListener('change',request);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(request);
    /* scroll-feel.js is deferred, so Lenis exists by DOMContentLoaded, not now */
    document.addEventListener('DOMContentLoaded',function(){
      if(window.lenis&&window.lenis.on) window.lenis.on('scroll',update);
    });

    /* hover: poster out, inside plays; leave: stop and rewind.
       Touch screens have no hover, so a tile plays while it is mostly in view. */
    function play(t){
      if(reduce) return;
      t.classList.add('is-playing');
    }
    function rewind(t){
      t.classList.remove('is-playing');
    }
    tiles.forEach(function(t){
      if(fine){
        t.addEventListener('mouseenter',function(){ play(t); });
        t.addEventListener('mouseleave',function(){ rewind(t); });
      }
      t.addEventListener('focusin',function(){ play(t); });
      t.addEventListener('focusout',function(){ rewind(t); });
    });
    if(!fine&&'IntersectionObserver' in window){
      var pio=new IntersectionObserver(function(es){
        if(pinnedMq.matches) return; /* pinned mode picks the active tile in update() */
        es.forEach(function(e){ if(e.isIntersecting&&e.intersectionRatio>=.42) play(e.target); else rewind(e.target); });
      },{threshold:[0,.42,.72],rootMargin:'-8% 0px -14% 0px'});
      tiles.forEach(function(t){ pio.observe(t); });
    }
  })();
  /* ---- ideas desk: the magazine is in the page; magazine.js binds it.
     Props drift at their own depth on scroll. ---- */
  (function(){
    /* parallax: each prop moves by its depth times the desk's distance from
       the viewport centre. Transform only, so nothing reflows. */
    var props=[].slice.call(document.querySelectorAll('.desk [data-par]'));
    var desk=document.querySelector('.desk-surface');
    if(!props.length||!desk||reduce) return;
    var ticking=false;
    function place(){
      ticking=false;
      var r=desk.getBoundingClientRect();
      var d=(r.top+r.height/2)-innerHeight/2;
      props.forEach(function(p){ p.style.setProperty('--py',(d*+p.dataset.par).toFixed(1)+'px'); });
    }
    function req(){ if(!ticking){ ticking=true; requestAnimationFrame(place); setTimeout(function(){ if(ticking) place(); },120); } }
    place();
    addEventListener('scroll',req,{passive:true});
    addEventListener('resize',req);
    document.addEventListener('DOMContentLoaded',function(){ if(window.lenis&&window.lenis.on) window.lenis.on('scroll',place); });
  })();
})();


/* ---- section personalities (21 Sep 2026): each home section its own device ---- */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* contact: the highlighter pulls under "always" when the ask arrives */
  (function(){
    var c=document.querySelector('.contact .cta'); if(!c) return;
    if(reduce||!('IntersectionObserver' in window)){ c.classList.add('lit'); return; }
    new IntersectionObserver(function(es,o){ if(es[0].isIntersecting){ c.classList.add('lit'); o.disconnect(); } },{threshold:.5}).observe(c);
  })();

})();

/* ---- 01 Hero, Reference Book: the ransom letters move like a comic panel ----
   Spider-Verse style: the cut-outs jitter on twos (stepped, 12 frames a
   second, not smooth), and every few seconds one of them spins a full turn
   on its own frame count. GSAP drives the inner image so the scroll and
   pointer drift on the tile stay separate. Stops with Pause motion; never
   runs under reduced motion. */
(function(){
  if(!window.gsap) return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches; if(reduce) return;
  var imgs=[].slice.call(document.querySelectorAll('.hero-name .tile img')); if(!imgs.length) return;
  var tl=[];
  imgs.forEach(function(img,i){
    tl.push(gsap.to(img,{rotation:'random(-5,5)',x:'random(-2.5,2.5)',y:'random(-3,3)',duration:1/6,ease:'steps(1)',
      repeat:-1,repeatRefresh:true,delay:i*.04}));
  });
  function spin(){
    var img=imgs[Math.floor(Math.random()*imgs.length)];
    gsap.fromTo(img,{rotationY:0},{rotationY:360,duration:.75,ease:'steps(9)',overwrite:false});
  }
  var every=setInterval(spin,3200);
  document.addEventListener('visibilitychange',function(){ if(document.hidden) clearInterval(every); else every=setInterval(spin,3200); });
})();

/* Hero6 needs no script: the mark is an anchor to #listening and the
   browser already scrolls to it. The handler it had existed to press a
   button on a widget that no longer exists. */


/* ---- the brush (6 Oct 2026, Shrey, after Up bank's reveal cursor) ----
   The photograph is printed black and white and the pointer paints the
   colour back in. Nothing animates per frame: the pointer writes two custom
   properties and CSS moves the mask. The brush grows a little while the
   pointer is over the print and shrinks away when it leaves, so the edge of
   the effect is never a hard switch. Keyboard focus reveals the whole frame,
   because there is no pointer to paint with. */
(function(){
  var mount=document.querySelector('[data-reveal]'); if(!mount) return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf=0, px=0, py=0;
  function paint(){ raf=0;
    mount.style.setProperty('--bx',px+'px');
    mount.style.setProperty('--by',py+'px');
  }
  function move(e){
    var r=mount.getBoundingClientRect();
    px=e.clientX-r.left; py=e.clientY-r.top;
    if(!raf) raf=requestAnimationFrame(paint);
  }
  mount.addEventListener('pointerenter',function(e){
    mount.style.setProperty('--brush',reduce?'150px':'0px');
    move(e);
    if(!reduce) requestAnimationFrame(function(){ mount.style.setProperty('--brush','150px'); });
  });
  mount.addEventListener('pointermove',move);
  mount.addEventListener('pointerleave',function(){
    mount.style.setProperty('--brush','0px');
  });
  /* the transition lives here rather than in the stylesheet, so it only ever
     applies to the brush size and never to the position */
  if(!reduce) mount.style.transition='';
})();

/* ---- the hero stage ----
   The marks ride the carousel now (site.css, THE CAROUSEL), so there is no
   per-frame work here and nothing to drag: the orbit is one CSS animation
   and a click lands on the section. All this does is stand the record
   player down while the hero holds the screen, because the Listening mark
   is the way into it. */
(function(){
  var hero=document.querySelector('.stage-hero'); if(!hero) return;
  if(!('IntersectionObserver' in window)) return;
  var th=[]; for(var s=0;s<=20;s++) th.push(s/20);
  new IntersectionObserver(function(es){
    var e=es[0], covers=e.intersectionRect.height/(innerHeight||1);
    document.documentElement.classList.toggle('at-hero',e.isIntersecting&&covers>.6);
  },{threshold:th}).observe(hero);

  /* ---- the marks float on their own, in CSS ----
     They orbited, then drifted on a GSAP ticker, then answered the pointer.
     All three are gone, the last at his word: "loops should be there, pointer
     is not something we implement well." Each mark now runs one of two
     keyframe loops at its own duration and delay, declared in site.css, so
     nothing is computed per frame, nothing writes an inline transform over
     the CSS, and each one only travels a few pixels around a fixed position,
     which is why they cannot collide and cannot lag. Reduced motion stops
     them in place. Nothing for this file to do. */

  /* ---- the star settles as the contact section arrives ----
     One variable, written on a rAF tick and only when the rounded value
     changes, exactly like --paper-in. No layout, no observer churn. */
  (function(){
    var sec=document.getElementById("contact"); if(!sec) return;
    var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduce){ sec.style.setProperty("--star-in",1); return; }
    var last=-1, queued=false;
    function write(){
      queued=false;
      var r=sec.getBoundingClientRect();
      /* 0 when the section is a screen away, 1 once its top has risen past
         a third of the viewport */
      var v=1-Math.max(0,Math.min(1,(r.top-innerHeight*0.33)/(innerHeight*0.67)));
      v=Math.round(v*100)/100;
      if(v!==last){ last=v; sec.style.setProperty("--star-in", v); }
    }
    function onScroll(){ if(!queued){ queued=true; requestAnimationFrame(write); } }
    write(); addEventListener("scroll",onScroll,{passive:true}); addEventListener("resize",onScroll);
  })();

  /* ---- the strip of marks opens the metrics ----
     He asked for the logos to be a second way into the drawer below them, so a
     click anywhere on the strip toggles it. The strip is not a button: the
     real control is the <summary>, which keeps the keyboard path and the
     announcement correct. This only adds a pointer shortcut on top. */
  (function(){
    var strip=document.querySelector(".logo-strip"), mv=document.getElementById("mv");
    if(!strip||!mv) return;
    strip.addEventListener("click",function(){ mv.open=!mv.open;
      if(mv.open) mv.querySelector(".mv-pill").focus({preventScroll:true}); });
  })();

  /* ---- Me: the card deck ----
     The markup is an ordered list and stays one. A screen reader reads every
     card in order and never has to drive anything; this upgrades the look for
     a pointer and a keyboard only. With the script off the list stacks down
     the column and all of it is readable, the same arrangement the Voice'D
     tablist uses.
     A throw sends the card off the edge and puts it at the back, so the deck
     never ends and nobody gets stuck on a card they cannot leave. Short drags
     spring back, which is what makes a mis-grab cost nothing. */
  (function(){
    var list=document.querySelector("[data-deck]"); if(!list) return;
    var cards=[].slice.call(list.children); if(cards.length<2) return;
    list.classList.add("is-deck");

    /* same reason as the parallax: the IIFE that declared reduce closes above */
    var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

    var order=cards.slice(), busy=false;
    function paint(){
      order.forEach(function(c,i){ c.setAttribute("data-at",i); c.classList.toggle("is-gone",i>2); });
      count.textContent=(cards.indexOf(order[0])+1)+" of "+cards.length;
    }
    function rotate(dir){
      if(dir>0) order.push(order.shift()); else order.unshift(order.pop());
      paint();
    }
    /* the throw: the card leaves the way it was pushed, then rejoins the back
       of the deck once it is out of sight. Under reduced motion it just
       rotates, because a card flying across the screen is the thing that rule
       exists to stop. */
    function toss(dir){
      if(busy) return; 
      var card=order[0];
      if(reduce){ rotate(dir>0?1:-1); return; }
      busy=true;
      card.classList.add("is-thrown");
      card.style.transform="translateX("+(dir>0?140:-140)+"%) rotate("+(dir>0?16:-16)+"deg)";
      card.style.opacity="0";
      setTimeout(function(){
        card.classList.remove("is-thrown");
        card.style.transform=""; card.style.opacity="";
        rotate(dir>0?1:-1);
        busy=false;
      },320);
    }

    /* the controls, built here so they never exist without the behaviour */
    var nav=document.createElement("div"); nav.className="vouch-nav";
    var prev=document.createElement("button"), next=document.createElement("button"),
        count=document.createElement("span");
    prev.type=next.type="button";
    prev.innerHTML="<span aria-hidden=\"true\">&larr;</span>"; prev.setAttribute("aria-label","Previous card");
    next.innerHTML="<span aria-hidden=\"true\">&rarr;</span>"; next.setAttribute("aria-label","Next card");
    count.className="vouch-count"; count.setAttribute("aria-live","polite");
    nav.appendChild(prev); nav.appendChild(next); nav.appendChild(count);
    list.parentNode.appendChild(nav);
    prev.addEventListener("click",function(){ toss(-1); });
    next.addEventListener("click",function(){ toss(1); });
    /* on the nav, not the list: the list holds nothing focusable, so a keydown
       bound there could never fire. Arrows work once a button has focus, which
       is the only way a keyboard reaches the deck. */
    nav.addEventListener("keydown",function(e){
      if(e.key==="ArrowRight"){ e.preventDefault(); toss(1); }
      if(e.key==="ArrowLeft"){ e.preventDefault(); toss(-1); }
    });

    /* drag. The card follows the pointer and tilts into the direction of
       travel; past a quarter of its width the release becomes a throw. */
    var held=null,x0=0,dx=0;
    list.addEventListener("pointerdown",function(e){
      if(busy) return;
      var top=order[0]; if(!top.contains(e.target)) return;
      held=top; x0=e.clientX; dx=0; top.classList.add("is-held");
      try{ top.setPointerCapture(e.pointerId); }catch(err){}
    });
    list.addEventListener("pointermove",function(e){
      if(!held) return; dx=e.clientX-x0;
      var t=Math.min(1,Math.abs(dx)/(held.offsetWidth/2));
      held.style.transform="translateX("+dx+"px) rotate("+(dx/28)+"deg)";
      held.style.opacity=String(1-t*0.25);
    });
    function release(){
      if(!held) return;
      var card=held, threw=Math.abs(dx)>card.offsetWidth/4, dir=dx<0?1:-1;
      card.classList.remove("is-held");
      held=null;
      if(threw){ toss(dir); return; }
      card.style.transform=""; card.style.opacity="";   /* springs back */
    }
    list.addEventListener("pointerup",release);
    list.addEventListener("pointercancel",release);

    paint();
  })();

  /* ---- P0-10: the Pause motion control ----------------------
     WCAG 2.2.2 wants a MECHANISM to stop motion that starts by
     itself. Pointer-hold and focus-within are not one: a reader
     who never hovers and a keyboard-only reader both have no way
     to stop it. This is the control that came off on 6 Oct and
     that the handover has carried as an open item since.

     The marquee is pure CSS, so this toggles one class and sets
     animation-play-state. Nothing is driven per frame here.

     The choice is remembered, because a reader who stopped the
     motion once meant it. The key is NOT the old 'sm-tickers'
     one: that key stranded anyone who had pressed pause before
     the control was removed, with their tickers frozen and no
     control left to unfreeze them, and site.js now clears it on
     sight. Reusing it would re-create that trap. */
  (function () {
    var strip = document.querySelector('.wwstrip');
    var btn = strip && strip.querySelector('.ww-pause');
    if (!strip || !btn) return;

    var KEY = 'sm-ww-paused';
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}

    function apply(paused) {
      strip.classList.toggle('is-paused', paused);
      btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      btn.textContent = paused ? 'Play motion' : 'Pause motion';
      try { localStorage.setItem(KEY, paused ? '1' : '0'); } catch (e) {}
    }
    if (stored === '1') apply(true);

    btn.addEventListener('click', function () {
      apply(!strip.classList.contains('is-paused'));
    });
  })();

  /* ---- H4: the ledger shows six, then all fourteen -----------
     The button is in the markup, not injected, so it is in the
     tab order and announced before this runs. CSS hides it until
     html.js is set and hides rows 7+ in the same breath, so with
     no script every row is visible and there is no control that
     does nothing.

     It never collapses back to six on its own and it does not
     scroll: a reader who opened the list is reading it. */
  (function () {
    var list = document.getElementById('ledger');
    var btn = document.querySelector('.lg-toggle');
    if (!list || !btn) return;
    var hidden = list.querySelectorAll('[data-more]').length;
    if (!hidden) { btn.hidden = true; return; }
    var all = list.children.length;
    btn.addEventListener('click', function () {
      var open = !list.classList.contains('is-all');
      list.classList.toggle('is-all', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Fewer results' : 'All ' + all + ' results';
    });
  })();

  /* ---- "how it was measured", the tap half -------------------
     Hover and focus are CSS. Tap is not: a touch device fires a
     synthetic :hover that then sticks on the last tile touched,
     so the open state has to be something the page owns.

     Delegated from the list, so it costs one listener whatever
     the tile count and keeps working when the generator re-deals
     them. It is inert today: no figure in content/stats.json has
     a method yet, so no tile carries .has-how and no button is
     rendered. That is the point - an empty reveal is worse than
     no reveal, and this is here so the control works the day a
     method lands rather than needing a second pass. */
  (function () {
    var list = document.querySelector('.mv-scatter');
    if (!list) return;
    list.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.mv-how-btn') : null;
      if (!btn || !list.contains(btn)) return;
      var tile = btn.closest('.mv-tile');
      if (!tile) return;
      var open = !tile.classList.contains('is-open');
      tile.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  })();

})();
/* The easter egg came out on 20 Oct at his instruction: a floating head at
   the end of the page had been cut on 13 Oct and this reinstated it. The
   scroll-coverage trigger went with it rather than being left to drive
   nothing, which is the dead-listener pattern the last sweep removed. */

/* The playlist panel toggle went on 20 Oct: the embed is inline in Me now
   rather than hanging off a fixed corner widget, so there is nothing to
   open and nothing to collide with the copy. */

