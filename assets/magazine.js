/* The Ideas magazine: binding and turning.

   Wide screens (>= 900px): pages are bound in pairs into leaves. Leaf i
   carries page 2i+1 on its front and 2i+2 on its back, and turns on the
   spine from right to left. The closed book sits centred on its cover,
   and centred on the back cover at the end.
   Phones: a horizontal swipe track with scroll snap, one page at a time.
   Without JS the pages stack in reading order and everything is readable.

   Turning: the buttons, the arrow keys, a click on either half of the
   spread, a horizontal drag, and the contents page, which jumps straight
   to its page. Pages that are not showing are inert, so keyboard and
   screen reader focus only ever lands on what is visible.

   One source: /ideas/ holds the pages. The home page fetches them and calls
   window.initMagazine on its copy, so the issue is never written twice. */
(function(){
function initMagazine(mag){
  if(!mag||mag._magInit) return; mag._magInit=true;
  var book=mag.querySelector('[data-book]');
  var pages=[].slice.call(book.querySelectorAll('.mag-page'));
  var prev=mag.querySelector('[data-prev]'), next=mag.querySelector('[data-next]'), count=mag.querySelector('[data-count]');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide=matchMedia('(min-width:900px)');
  var N=pages.length, leaves=[], flipped=0, mode=null;

  function label(p){ return p.getAttribute('aria-label')||('Page '+p.dataset.page); }
  function setInert(el,on){ if(on){ el.setAttribute('inert',''); el.setAttribute('aria-hidden','true'); } else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); } }

  /* ---------- bound ---------- */
  function bind(){
    mode='bound'; mag.classList.add('is-bound'); mag.classList.remove('is-track');
    for(var i=0;i<N;i+=2){
      var leaf=document.createElement('div'); leaf.className='mag-leaf';
      var front=pages[i], back=pages[i+1];
      leaf.appendChild(front);
      if(back){ back.classList.add('is-back'); leaf.appendChild(back); }
      book.appendChild(leaf); leaves.push(leaf);
    }
    renderBound(false);
  }
  function unbind(){
    leaves.forEach(function(l){ while(l.firstChild){ var p=l.firstChild; p.classList.remove('is-back'); book.appendChild(p); } l.remove(); });
    leaves=[]; pages.forEach(function(p){ book.appendChild(p); setInert(p,false); });
  }
  function renderBound(){
    var L=leaves.length;
    leaves.forEach(function(l,i){
      var isF=i<flipped;
      l.classList.toggle('is-flipped',isF);
      /* stacking: unturned leaves lie in reverse order, turned leaves in order */
      l.style.zIndex=isF?(i+1):(L-i+1);
    });
    /* closed on the cover or the back cover: centre the single page */
    book.style.setProperty('--shift',flipped===0?'-25%':flipped===L?'25%':'0%');
    var showing=[];
    leaves.forEach(function(l,i){
      var f=l.children[0], b=l.children[1];
      var fOn=(i===flipped), bOn=(i===flipped-1);
      setInert(f,!fOn); if(fOn) showing.push(f);
      if(b){ setInert(b,!bOn); if(bOn) showing.unshift(b); }
    });
    prev.disabled=flipped===0; next.disabled=flipped===L;
    count.textContent=showing.map(label).join(' and ');
  }
  function turnTo(n){
    n=Math.max(0,Math.min(leaves.length,n));
    if(n===flipped) return;
    var step=n>flipped?1:-1;
    /* turn one leaf at a time so a jump reads as pages riffling, not a cut */
    (function go(){
      flipped+=step; renderBound();
      if(flipped!==n) setTimeout(go,reduce?0:140);
    })();
  }

  /* ---------- track ---------- */
  var io=null, current=0;
  function track(){
    mode='track'; mag.classList.add('is-track'); mag.classList.remove('is-bound');
    pages.forEach(function(p){ setInert(p,false); });
    if('IntersectionObserver' in window){
      io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting&&e.intersectionRatio>.6){ current=pages.indexOf(e.target); renderTrack(); } });
      },{root:book,threshold:[.6]});
      pages.forEach(function(p){ io.observe(p); });
    }
    renderTrack();
  }
  function untrack(){ if(io){ io.disconnect(); io=null; } book.scrollLeft=0; }
  function renderTrack(){
    prev.disabled=current===0; next.disabled=current===N-1;
    count.textContent=label(pages[current])+' · '+(current+1)+' of '+N;
  }
  function slideTo(i){
    i=Math.max(0,Math.min(N-1,i)); current=i;
    book.scrollTo({left:pages[i].offsetLeft-book.offsetLeft,behavior:reduce?'auto':'smooth'}); renderTrack();
  }

  /* ---------- shared controls ---------- */
  function step(d){ if(mode==='bound') turnTo(flipped+d); else slideTo(current+d); }
  prev.addEventListener('click',function(){ step(-1); });
  next.addEventListener('click',function(){ step(1); });
  /* arrow keys turn pages only while this magazine is mostly on screen, or holds
     focus, so on the home page they never hijack reading the rest of it */
  var onScreen=false;
  if('IntersectionObserver' in window) new IntersectionObserver(function(es){ onScreen=es[0].intersectionRatio>=.5; },{threshold:[0,.5,1]}).observe(mag);
  else onScreen=true;
  document.addEventListener('keydown',function(e){
    if(e.target.closest&&e.target.closest('input,textarea,select')) return;
    if(!onScreen&&!mag.contains(document.activeElement)) return;
    if(e.key==='ArrowRight'){ step(1); } else if(e.key==='ArrowLeft'){ step(-1); } else return;
    e.preventDefault();
  });
  /* contents: jump to a page */
  book.addEventListener('click',function(e){
    var go=e.target.closest&&e.target.closest('[data-goto]');
    if(go){ e.preventDefault(); var p=+go.dataset.goto;
      if(mode==='bound') turnTo(Math.floor(p/2)); else slideTo(p-1); return; }
    if(dragged){ dragged=false; return; } /* the drag already turned it */
    if(mode!=='bound'||(e.target.closest&&e.target.closest('a,button'))) return;
    /* a click on either half of the spread turns that way */
    var r=book.getBoundingClientRect(); step(e.clientX>r.left+r.width/2?1:-1);
  });
  /* drag to turn, on the bound book */
  var sx=null, dragged=false;
  book.addEventListener('pointerdown',function(e){ if(mode==='bound') sx=e.clientX; },{passive:true});
  book.addEventListener('pointerup',function(e){
    if(sx===null) return; var dx=e.clientX-sx; sx=null;
    if(Math.abs(dx)>60){ dragged=true; step(dx<0?1:-1); }
  },{passive:true});

  function setup(){
    if(mode==='bound'){ unbind(); } else if(mode==='track'){ untrack(); }
    if(wide.matches) bind(); else track();
  }
  setup();
  if(wide.addEventListener) wide.addEventListener('change',function(){ flipped=0; current=0; setup(); });
}
window.initMagazine=initMagazine;
[].forEach.call(document.querySelectorAll('[data-mag]'),initMagazine);
})();
