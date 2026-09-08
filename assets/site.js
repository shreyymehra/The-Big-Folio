/* Shared behaviour for every page. Home keeps its own extra script
   for the hero, ticker, loader and vinyl — those exist nowhere else. */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* year stamp */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* nav: solid once scrolled, hides on the way down */
  var nav = document.getElementById('nav'), last = 0;
  var rail = document.querySelector('.rail');
  addEventListener('scroll', function(){
    var y = scrollY;
    if (nav){
      nav.classList.toggle('solid', y > 40);
      nav.classList.toggle('hide', y > last && y > 240);
    }
    last = y;
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

  /* work cards land one at a time */
  (function(){
    var cards = [].slice.call(document.querySelectorAll('[data-card]'));
    if (!cards.length) return;
    if (!('IntersectionObserver' in window)){ cards.forEach(function(c){ c.classList.add('landed'); }); return; }
    var o = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(!e.isIntersecting) return;
        var vis = cards.filter(function(c){ return c.offsetParent !== null; });
        var i = vis.indexOf(e.target); if (i < 0) i = 0;
        setTimeout(function(){ e.target.classList.add('landed'); }, reduce ? 0 : i*110);
        o.unobserve(e.target); });
    }, {threshold:.15, rootMargin:'0px 0px -6% 0px'});
    cards.forEach(function(c){ o.observe(c); });

    var mb = document.getElementById('moreBtn');
    if (mb) mb.addEventListener('click', function(){
      setTimeout(function(){
        cards.forEach(function(c,i){
          if (!c.classList.contains('landed'))
            setTimeout(function(){ c.classList.add('landed'); }, reduce ? 0 : i*70);
        });
      }, 20);
    });
  })();

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

  /* "all projects" toggle */
  (function(){
    var pile = document.getElementById('pile'), mb = document.getElementById('moreBtn');
    if (!pile || !mb) return;
    var total = pile.querySelectorAll('[data-card]').length;
    mb.addEventListener('click', function(){
      var open = pile.classList.toggle('open');
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
      mb.textContent = open ? 'Show fewer' : 'All projects (' + total + ')';
    });
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
})();
