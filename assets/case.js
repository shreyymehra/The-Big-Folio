/* Behaviour for the five case pages. Was an inline copy on each of them;
   shared here 23 Sep 2026, because five copies of a script is how this repo
   got into trouble before. Loaded with defer, after feel.js.

   Three things happen: sections reveal as they are reached, the contents
   rail marks the section being read, and the decision blocks deal in one
   after another with their trade-off rule drawing down the side. */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('.rv,.dec').forEach(function(el){ el.classList.add('in'); });
    return;
  }

  /* sections reveal once */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.1});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  /* the contents rail follows the reading position */
  var links=[].slice.call(document.querySelectorAll('.side a'));
  var spy=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(!e.isIntersecting) return;
      links.forEach(function(a){ a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id); });
    });
  },{rootMargin:'-20% 0px -70% 0px'});
  document.querySelectorAll('.sec').forEach(function(s){ spy.observe(s); });

  /* Decisions deal in one at a time, and each trade-off rule draws down as
     its decision lands. The rule is the only motion on the page that means
     something: it marks what the choice cost. Reduced motion shows them all,
     already drawn. */
  var decs=[].slice.call(document.querySelectorAll('.dec'));
  if(!decs.length) return;
  if(reduce){ decs.forEach(function(d){ d.classList.add('in'); }); return; }
  var dio=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(!e.isIntersecting) return;
      var i=decs.indexOf(e.target);
      setTimeout(function(){ e.target.classList.add('in'); }, Math.min(i,4)*90);
      dio.unobserve(e.target);
    });
  },{threshold:.2});
  decs.forEach(function(d){ dio.observe(d); });
})();

/* The VoiceDNA gap map: two sample analyses behind a tablist. Arrow keys
   move between tabs, as a tablist should. Without JS the first panel is
   already open and the second is simply below it, so the page still reads. */
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.vd-tab'));
  if(!tabs.length) return;
  function show(tab){
    tabs.forEach(function(t){
      var on=t===tab, panel=document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected',on?'true':'false');
      t.tabIndex=on?0:-1;
      if(!panel) return;
      panel.hidden=!on;
      panel.classList.toggle('is-on',on);
    });
  }
  /* both panels are in the markup and open, so the page reads with JS off;
     the tablist only exists once there is script to drive it */
  show(tabs[0]);
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){ show(t); });
    t.addEventListener('keydown',function(e){
      var k=e.key, n=null;
      if(k==='ArrowRight'||k==='ArrowDown') n=tabs[(i+1)%tabs.length];
      else if(k==='ArrowLeft'||k==='ArrowUp') n=tabs[(i-1+tabs.length)%tabs.length];
      else if(k==='Home') n=tabs[0];
      else if(k==='End') n=tabs[tabs.length-1];
      if(!n) return;
      e.preventDefault(); show(n); n.focus();
    });
  });
})();
