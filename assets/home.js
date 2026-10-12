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
  var ul=document.getElementById('rollul'),n=ul.children.length-1,i=0;
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
  if(reduce){ ul.style.transform='translateY(-'+(n*1.25)+'em)'; }
  if(!reduce){ var rollT=setInterval(function(){i++;ul.style.transition='transform 420ms var(--ease)';
    ul.style.transform='translateY(-'+(i*1.25)+'em)'; fitRoll(i);
    if(i>=n) clearInterval(rollT); /* one pass through the list, then it rests
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

  /* ---- tickers: the quote tape, the logo loop and the two crossing bands ----
     They scroll themselves (Shrey, 21 Sep 2026), and scrolling the page pushes
     them along on top. Clash, marked: WCAG 2.2.2 wants a way to stop anything
     that moves on its own for more than five seconds. So: each one eases to a
     stop while pointed at or focused, a "Pause tickers" button beside each
     stops all of them (remembered across visits), and under reduced motion
     they never move. Each loop only runs while it is on screen. */
  var PAUSE_KEY='sm-tickers';
  var paused=false; try{ paused=localStorage.getItem(PAUSE_KEY)==='paused'; }catch(e){}
  var toggles=[].slice.call(document.querySelectorAll('[data-tick-toggle]'));
  function syncToggles(){ toggles.forEach(function(b){
    b.setAttribute('aria-pressed',paused?'true':'false');
    b.querySelector('span').textContent=paused?'Play motion':'Pause motion'; }); window.__smPaused=paused;
    /* CSS loops (the carousel) read this class, since they cannot read a variable */
    document.documentElement.classList.toggle('sm-paused',paused); }
  toggles.forEach(function(b){ b.addEventListener('click',function(){
    paused=!paused; try{ localStorage.setItem(PAUSE_KEY,paused?'paused':'playing'); }catch(e){} syncToggles(); }); });
  syncToggles();
  if(reduce) toggles.forEach(function(b){ b.hidden=true; }); /* nothing moves, nothing to pause */

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

  /* ---- vinyl: Spotify's embed behind a record ----
     Never autoplays. The Spotify iframe API is not requested on page load; it
     loads the first time someone points at, focuses or touches the player, so
     it never costs first paint. A click before it is ready is remembered and
     played once the embed reports ready.

     State comes from Spotify's playback_update events, not from the click, so
     the record only spins while audio is actually playing. Visitors signed in
     to Spotify in that browser hear the whole song; everyone else hears
     Spotify's 30-second preview. Hosting the MP3 would lift that limit and is a
     licensing problem on a public site in his name, so it is not done. */
  (function(){
    var vw=document.getElementById('vinyl'); if(!vw) return;
    var btn=vw.querySelector('.vinyl-btn'), host=vw.querySelector('[data-spotify-host]'),
        ring=vw.querySelector('.vinyl-ring circle'), uri=vw.getAttribute('data-track');
    if(!btn||!host||!ring) return; /* markup out of step with this script: stay silent, never break the page */
    var ctrl=null, requested=false, wantPlay=false;

    function setPlaying(on){
      vw.classList.toggle('playing',on);
      btn.setAttribute('aria-pressed',on?'true':'false');
      btn.setAttribute('aria-label',(on?'Pause':'Play')+' I Want You by Savage Garden');
    }
    function load(){
      if(requested||!host||!uri) return; requested=true;
      window.onSpotifyIframeApiReady=function(API){
        API.createController(host,{uri:uri,width:'100%',height:'80'},function(c){
          ctrl=c;
          c.addListener('ready',function(){
            vw.classList.add('ready');
            if(wantPlay){ wantPlay=false; vw.classList.remove('queued'); c.togglePlay(); }
          });
          c.addListener('playback_update',function(e){
            var d=e.data||{};
            setPlaying(!d.isPaused&&!d.isBuffering);
            if(d.duration) ring.style.strokeDashoffset=(100-100*Math.min(1,d.position/d.duration)).toFixed(2);
          });
        });
      };
      var s=document.createElement('script');
      s.src='https://open.spotify.com/embed/iframe-api/v1'; s.async=true;
      document.body.appendChild(s);
    }
    ['pointerenter','focusin','touchstart'].forEach(function(ev){
      vw.addEventListener(ev,load,{once:true,passive:true});
    });
    btn.addEventListener('click',function(){
      if(!ctrl||!vw.classList.contains('ready')){
        wantPlay=!wantPlay; vw.classList.toggle('queued',wantPlay); load(); return;
      }
      ctrl.togglePlay();
    });
  })();

  /* ---- loader: under a second, first visit only (brief, 22 Sep 2026) ----
     A rule draws under the name, then the loader wipes into the hero and the
     hero assembles. Repeat visits (a stored flag) and reduced motion skip it
     entirely; any click, key, scroll or touch skips it at once. */
  var loader=document.getElementById('loader');
  (function(){
    if(!loader) return;
    var seen=false; try{ seen=localStorage.getItem('sm-seen')==='1'; }catch(e){}
    if(reduce||seen){ loader.remove(); assemble(); return; }
    try{ localStorage.setItem('sm-seen','1'); }catch(e){}
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
    timers.push(setTimeout(function(){ var r=document.getElementById('lrule'); if(r) r.classList.add('draw'); },140));
    timers.push(setTimeout(finish,760));
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

    /* the stars trail the ghost type: first one starts where the text ends */
    function placeStars(offsetPct){
      if(!curve||!txt||!stars.length) return;
      var L=curve.getTotalLength(), tl=0;
      try{ tl=txt.getComputedTextLength(); }catch(e){}
      var start=offsetPct/100*L+tl+STAR_GAP*.35;
      stars.forEach(function(g,i){
        var d=start+i*STAR_GAP;
        if(d<0||d>L){ g.style.display='none'; return; }
        var a=curve.getPointAtLength(d), b=curve.getPointAtLength(Math.min(L,d+1));
        var ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI, k=STAR_SIZE/100;
        g.style.display='';
        g.setAttribute('transform','translate('+a.x.toFixed(1)+' '+a.y.toFixed(1)+') rotate('+ang.toFixed(2)+') scale('+k+') translate(-50 -70)');
      });
    }

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
      var w=Math.max(180,Math.min(innerWidth*.8,440,avail*1.6));
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
      tiles.forEach(function(t){
        var cp=clamp((p-(+t.dataset.reveal||0))/.13);
        t.classList.toggle('is-visible',cp>0);
        t.style.setProperty('--p',cp.toFixed(4));
      });
      /* the tile that most recently landed is the top of the pile: on narrow
         screens only its label shows, and on touch it is the one that plays */
      var active=null;
      tiles.forEach(function(t){ if(+t.style.getPropertyValue('--p')>=.999) active=t; });
      tiles.forEach(function(t){ t.classList.toggle('is-top',t===active); });
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
  function spin(){ if(window.__smPaused) return;
    var img=imgs[Math.floor(Math.random()*imgs.length)];
    gsap.fromTo(img,{rotationY:0},{rotationY:360,duration:.75,ease:'steps(9)',overwrite:false});
  }
  var every=setInterval(spin,3200);
  setInterval(function(){ tl.forEach(function(t){ window.__smPaused?t.pause():t.resume(); }); },300);
  document.addEventListener('visibilitychange',function(){ if(document.hidden) clearInterval(every); else every=setInterval(spin,3200); });
})();

/* ---- Hero6, "what I listen to": the mark plays the record ---- */
(function(){
  var a=document.querySelector('[data-listen]'), btn=document.querySelector('#vinyl .vinyl-btn'); if(!a||!btn) return;
  a.addEventListener('click',function(e){ e.preventDefault(); btn.focus(); btn.click(); });
})();

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

  /* ---- the ring is fitted, not guessed ----
     A stylesheet cannot read one element’s box to size another, so the radii
     were hand-picked numbers and the marks ran straight over the hero panel at
     every width above 1280: measured, every one of the six, by 12,000 to
     20,000 square pixels per orbit.
     The arithmetic the stylesheet could not do: a mark riding the top edge
     needs centreHeight/2 + markHeight/2 + a gap of vertical radius to clear the
     centre-piece, and it has only stageCentre - markHeight/2 - an edge before
     it leaves the hero. At 1440x900 that wanted 391px against 335px available,
     which is why it could never be written as a constant.
     When it does not fit, the PANEL gives, not the marks and not the copy.
     That is his call from 6 Oct, that the marks must clear the identity, with
     one correction found by looking: squeezing the whole centre starved the
     claim into five short lines, because the grid hands width to the copy.
     Only when the panel reaches its floor do we fall back to the row. */
  (function(){
    var hero=document.querySelector(".stage-hero"); if(!hero) return;
    var centre=hero.querySelector(".stage-centre"),
        floats=hero.querySelector(".floats"),
        mark=hero.querySelector(".fl");
    if(!centre||!floats||!mark) return;

    var FLOOR=210, STEP=14, GAP=14, EDGE=18;

    function clear(){
      hero.style.removeProperty("--panel-w");
      floats.style.removeProperty("--rx");
      floats.style.removeProperty("--ry");
    }

    function fit(){
      /* under 1280 the media query already lays the marks out as a row, and
         the fitter has nothing to say */
      if(innerWidth<1280){ hero.classList.remove("is-row"); clear(); return; }

      hero.style.removeProperty("--panel-w");
      var panel=hero.querySelector(".hero-panel");
      var w=panel?Math.round(panel.getBoundingClientRect().width):0;
      var need=null;
      for(var i=0;i<14;i++){
        var h=hero.getBoundingClientRect(),
            c=centre.getBoundingClientRect(),
            m=mark.getBoundingClientRect();
        /* the ring is centred on the centre-piece, so measure the room from
           there to each edge of the hero and take the tighter side */
        var cy=c.top+c.height/2, cx=c.left+c.width/2;
        var maxRy=Math.min(cy-h.top, h.bottom-cy)-m.height/2-EDGE;
        var maxRx=Math.min(cx-h.left, h.right-cx)-m.width/2-EDGE;
        var needRy=c.height/2+m.height/2+GAP;
        var needRx=c.width/2+m.width/2+GAP;
        if(needRy<=maxRy&&needRx<=maxRx){ need={rx:needRx,ry:needRy,maxRx:maxRx,maxRy:maxRy}; break; }
        if(!panel||w<=FLOOR) break;
        w=Math.max(FLOOR,w-STEP);
        hero.style.setProperty("--panel-w",w+"px");
      }

      if(!need){ hero.classList.add("is-row"); clear(); return; }
      hero.classList.remove("is-row");
      /* sit a little outside the minimum where there is room to, so the ring
         reads as an orbit rather than as a box drawn around the photograph */
      var rx=Math.min(need.maxRx,need.rx+40), ry=Math.min(need.maxRy,need.ry+16);
      floats.style.setProperty("--rx",Math.round(rx)+"px");
      floats.style.setProperty("--ry",Math.round(ry)+"px");
    }

    var tid;
    function schedule(){ clearTimeout(tid); tid=setTimeout(fit,120); }
    fit();
    addEventListener("resize",schedule);
    /* the tiles and the face land after the fonts and the images do, and both
       change the panel’s height, so measure again once they have */
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
    addEventListener("load",fit);
  })();

  /* ---- Me: the card deck ----
     The markup is an ordered list and stays one. A screen reader reads every
     card in order and never has to drive anything; this upgrades the look for
     a pointer and a keyboard only. With the script off the list stacks down
     the column and all of it is readable, the same arrangement the VoiceDNA
     tablist uses.
     A throw sends the card off the edge and puts it at the back, so the deck
     never ends and nobody gets stuck on a card they cannot leave. Short drags
     spring back, which is what makes a mis-grab cost nothing. */
  (function(){
    var list=document.querySelector("[data-deck]"); if(!list) return;
    var cards=[].slice.call(list.children); if(cards.length<2) return;
    list.classList.add("is-deck");

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
})();
