/* Shared behaviour for every page. Home adds assets/home.js after this
   for the hero, ticker and vinyl, which exist nowhere else. */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  addEventListener('scroll', function(){
    var y = scrollY;
    var m = document.body.scrollHeight - innerHeight, p = m > 0 ? Math.min(1, y/m) : 0;
    var fill = document.getElementById('starfill');
    if (fill) fill.style.clipPath = 'inset(' + ((1-p)*100).toFixed(1) + '% 0 0 0)';
    if (rail) rail.style.width = (p*100).toFixed(2) + '%';
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
