/* Home-only behaviour: hero assembly, rolling verticals, cut-out drift and
   drag, the ticker cross, vinyl, loader, hero parallax, pixel trail. None of
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
  assemble();

  /* rolling verticals */
  var ul=document.getElementById('rollul'),n=ul.children.length-1,i=0;
  if(!reduce) setInterval(function(){i++;ul.style.transition='transform 420ms var(--ease)';
    ul.style.transform='translateY(-'+(i*1.3)+'em)';
    if(i===n)setTimeout(function(){ul.style.transition='none';ul.style.transform='translateY(0)';i=0},440)},1900);

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

  /* ---- the cross: two bands, driven by time and by the scroll ----
     Each band drifts at a base speed in its own direction. Scroll velocity,
     read from Lenis when it is running, is added on top, signed, so scrolling
     down pushes the bands along and scrolling back reverses them. Pointing at
     a band eases it to a stop. The loop only runs while the cross is on
     screen, and under reduced motion it never starts: the bands sit still. */
  (function(){
    var cross=document.querySelector('[data-cross]'); if(!cross||reduce) return;
    var bands=[].slice.call(cross.querySelectorAll('[data-xband]')).map(function(el){
      var b={el:el,track:el.querySelector('.xtrack'),dir:+el.getAttribute('data-dir')||1,x:0,half:0,hold:0,holdTarget:0};
      el.addEventListener('pointerenter',function(){ b.holdTarget=1; });
      el.addEventListener('pointerleave',function(){ b.holdTarget=0; });
      return b;
    });
    function measure(){ bands.forEach(function(b){ b.half=b.track.scrollWidth/2; }); }
    measure();
    addEventListener('resize',measure);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(measure);

    var BASE=38, PUSH=.7, vel=0, lastY=scrollY, lastT=0, running=false, raf=0;
    function frame(t){
      if(!running){ raf=0; return; }
      var dt=lastT?Math.min(.05,(t-lastT)/1000):0; lastT=t;
      /* px per frame from Lenis, or from the raw scroll delta without it */
      var v=window.lenis&&typeof window.lenis.velocity==='number'?window.lenis.velocity:(scrollY-lastY);
      lastY=scrollY;
      vel+=(v-vel)*.12;
      bands.forEach(function(b){
        b.hold+=(b.holdTarget-b.hold)*.08;
        var speed=(BASE+vel*PUSH*60)*(1-b.hold);
        b.x+=b.dir*speed*dt;
        if(b.half){ b.x%=b.half; if(b.x>0) b.x-=b.half; }
        b.track.style.transform='translate3d('+b.x.toFixed(2)+'px,0,0)';
      });
      raf=requestAnimationFrame(frame);
    }
    function start(){ if(running) return; running=true; lastT=0; lastY=scrollY; if(!raf) raf=requestAnimationFrame(frame); }
    function stop(){ running=false; }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){ es[0].isIntersecting?start():stop(); },{rootMargin:'120px 0px'}).observe(cross);
    } else start();
  })();

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

  /* ---- loading sequence: S -> M -> star, 1400ms hard cap, session-capped ---- */
  var loader=document.getElementById('loader');
  (function(){
    if(!loader) return;
    var seen=false; try{seen=sessionStorage.getItem('sm_seen')==='1'}catch(e){}
    if(reduce||seen||innerWidth<1024){ loader.remove(); return; }
    try{sessionStorage.setItem('sm_seen','1')}catch(e){}
    var st  = document.getElementById('lstar'),
        band= document.getElementById('lband'),
        rule= document.getElementById('lrule'),
        cnt = document.getElementById('lcount'),
        done= false, timers = [];

    function at(ms, fn){ timers.push(setTimeout(fn, ms)); }

    function finish(){
      if(done) return; done = true;
      timers.forEach(clearTimeout);
      st.classList.add('blow');
      loader.classList.add('gone');
      setTimeout(function(){ loader.remove(); }, 660);
    }

    /* the count is the honest part: it tracks the hero art actually
       decoding, so the loader ends when the page is genuinely ready */
    var heroImgs = [].slice.call(document.querySelectorAll('.hero img, .hero source'))
                     .map(function(n){ return n.currentSrc || n.src || n.srcset; })
                     .filter(Boolean);
    var total = heroImgs.length || 1, loaded = 0, ready = false;

    function tick(){
      loaded++;
      var pct = Math.round((loaded / total) * 100);
      if(cnt) cnt.textContent = pct < 10 ? '0' + pct : String(pct);
      if(loaded >= total) ready = true;
    }
    heroImgs.forEach(function(src){
      var i = new Image();
      i.onload = i.onerror = tick;
      i.src = src;
    });

    /* beat 1 — corners set the frame */
    at(120, function(){ document.querySelectorAll('.lmeta[data-b="1"]').forEach(function(e){ e.classList.add('in'); }); });
    /* beat 2 — a rule draws across the empty frame */
    at(520, function(){ rule.classList.add('draw'); });
    at(900, function(){ document.querySelectorAll('.lmeta[data-b="2"]').forEach(function(e){ e.classList.add('in'); }); });
    /* beat 3 — the rule becomes the opening of the letterbox */
    at(1150, function(){ rule.classList.add('part'); band.classList.add('open'); });
    /* beat 4 — the fluoro wash clears off the photograph */
    at(1900, function(){ band.classList.add('warm'); });
    /* beat 5 — the star punches, then hand off to the hero */
    at(2400, function(){ st.classList.add('show'); });
    at(2850, function(){
      if(ready) return finish();
      var wait = setInterval(function(){ if(ready){ clearInterval(wait); finish(); } }, 80);
      setTimeout(function(){ clearInterval(wait); finish(); }, 1800); /* hard cap */
    });

    ['click','keydown','wheel','touchstart'].forEach(function(ev){
      addEventListener(ev, finish, {once:true, passive:true});
    });
  })();

  /* ---- hero photo parallax on scroll ---- */
  (function(){
    var fr=document.querySelector('.hero .frame'); if(!fr||reduce) return;
    addEventListener('scroll',function(){
      var y=scrollY; if(y>innerHeight) return;
      fr.style.transform='translateY('+(y*0.14).toFixed(1)+'px)';
    },{passive:true});
  })();

  /* pixel trail — hero only, desktop only */
  var cv=document.getElementById('trail');
  if(cv&&!reduce&&innerWidth>1024){
    var ctx=cv.getContext('2d'),pts=[],G=14,A=250;
    function sz(){cv.width=hero.clientWidth;cv.height=hero.clientHeight}sz();addEventListener('resize',sz);
    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();
      pts.push({x:Math.round((e.clientX-r.left)/G)*G,y:Math.round((e.clientY-r.top)/G)*G,t:performance.now()});
      if(pts.length>140)pts.shift()});
    (function l(now){ctx.clearRect(0,0,cv.width,cv.height);
      for(var i=0;i<pts.length;i++){var a=now-pts[i].t;if(a>A)continue;
        ctx.globalAlpha=(1-a/A)*.40;ctx.fillStyle='#F13C20';ctx.fillRect(pts[i].x,pts[i].y,G,G)}
      ctx.globalAlpha=1;requestAnimationFrame(l)})(performance.now());
  }

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
      var v=t.querySelector('video');
      if(v){ v.muted=true; v.playsInline=true; var pr=v.play(); if(pr&&pr.catch) pr.catch(function(){}); }
    }
    function rewind(t){
      t.classList.remove('is-playing');
      var v=t.querySelector('video');
      if(v){ try{ v.pause(); v.currentTime=0; }catch(e){} }
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
})();

/* ---------- PROOF figure roll ----------
   Each number rolls up into a clipped frame as the section enters, staggered.
   Follows the same contract as the work-index wipe: the hiding class is added
   by script, every path ends with the numbers visible, and a timeout backstop
   catches the case where the observer never fires. Reduced motion is handled
   in CSS, so the class is still added and the transition is simply none. */
(function () {
  var figs = [].slice.call(document.querySelectorAll('.proof .fig'));
  if (!figs.length) return;
  if (!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-roll');

  function roll(fig, i) {
    fig.style.transitionDelay = '';
    fig.querySelector('.n i').style.transitionDelay = Math.min(i, 8) * 55 + 'ms';
    fig.classList.add('rolled');
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      roll(e.target, figs.indexOf(e.target));
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -15% 0px' });

  figs.forEach(function (f) { io.observe(f); });

  /* Backstop. Whatever happened above, no number stays hidden. */
  setTimeout(function () {
    figs.forEach(function (f, i) { if (!f.classList.contains('rolled')) roll(f, i); });
  }, 4000);
})();
