/* Light / dark theme, shared by every page.

   Loaded as a plain script in <head>, before the stylesheet paints, so a
   visitor who chose dark never sees a light flash on the next page. It is
   deliberately tiny and blocking; everything else stays deferred.

   Contract: the choice lives on <html data-theme="light|dark">. Every colour
   system in the repo keys off that attribute. It is always set:
     - no stored choice -> light;
     - a stored choice  -> that choice.
   The toggle is added to #nav by script. Without JS there is no toggle and
   the system setting still applies. */
(function(){
  var KEY='sm-theme', root=document.documentElement;

  function stored(){ try{ var v=localStorage.getItem(KEY); return v==='light'||v==='dark'?v:null; }catch(e){ return null; } }
  /* Always opens light (Shrey, 18 Sep 2026): cream is the identity a first-time
     visitor should meet. The system setting no longer decides; a visitor who
     picks dark keeps it on every page and every return visit. */
  function effective(){ return stored()||'light'; }
  function apply(){
    var s=stored();
    root.setAttribute('data-theme',s||'light'); /* explicit, so dark-system CSS never engages */
    root.style.colorScheme=effective(); /* form controls and scrollbars follow the page */
  }
  apply();

  function label(btn){
    var dark=effective()==='dark';
    btn.setAttribute('aria-pressed',dark?'true':'false');
    btn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
    btn.setAttribute('title',dark?'Light mode':'Dark mode');
  }

  function mount(){
    var nav=document.getElementById('nav'); if(!nav||nav.querySelector('.theme-toggle')) return;
    var css=document.createElement('style');
    css.textContent=
      '.nav-end{display:flex;align-items:center}'+
      '.theme-toggle{display:inline-grid;place-items:center;width:32px;height:32px;margin-left:.9rem;padding:0;border:0;'+
        'background:none;color:inherit;cursor:pointer;vertical-align:middle;flex:none}'+
      '.theme-toggle svg{width:18px;height:18px;overflow:visible;transition:transform .5s cubic-bezier(.16,1,.3,1)}'+
      '.theme-toggle circle{fill:none;stroke:currentColor;stroke-width:1.6}'+
      '.theme-toggle path{fill:currentColor}'+
      'html[data-theme-shown="dark"] .theme-toggle svg{transform:rotate(180deg)}'+
      '.theme-toggle:focus-visible{outline:2px solid #F13C20;outline-offset:3px}'+
      /* colours ease across only at the moment of switching, never on load */
      'html.theme-switching,html.theme-switching *,html.theme-switching *::before,html.theme-switching *::after{'+
        'transition:background-color .35s ease,color .35s ease,border-color .35s ease,fill .35s ease,stroke .35s ease!important}'+
      '@media (prefers-reduced-motion:reduce){.theme-toggle svg{transition:none}'+
        'html.theme-switching,html.theme-switching *,html.theme-switching *::before,html.theme-switching *::after{transition:none!important}}';
    document.head.appendChild(css);

    var btn=document.createElement('button');
    btn.type='button'; btn.className='theme-toggle';
    /* a circle, half filled: the filled half is the side you are on */
    btn.innerHTML='<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">'+
      '<circle cx="10" cy="10" r="8.2"/><path d="M10 1.8a8.2 8.2 0 0 1 0 16.4z"/></svg>';
    /* the links hide on small screens; the toggle must not go with them, so both
       sit in one right-hand group and only the links collapse */
    var links=nav.querySelector('.links'), end=document.createElement('span');
    end.className='nav-end';
    if(links){ nav.insertBefore(end,links); end.appendChild(links); } else nav.appendChild(end);
    end.appendChild(btn);
    root.setAttribute('data-theme-shown',effective());
    label(btn);

    btn.addEventListener('click',function(){
      var next=effective()==='dark'?'light':'dark';
      try{ localStorage.setItem(KEY,next); }catch(e){}
      root.classList.add('theme-switching');
      apply();
      root.setAttribute('data-theme-shown',next);
      label(btn);
      setTimeout(function(){ root.classList.remove('theme-switching'); },400);
    });

  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();
