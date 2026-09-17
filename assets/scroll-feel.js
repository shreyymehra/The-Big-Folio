/* Lenis scroll feel, shared by every page.

   Why this file exists: Lenis used to be initialised inside scroll.js, below a
   `if (!plates.length) return;` guard. That guard belongs to the Work index
   plate wipe, so scroll feel was welded to a component that exists on exactly
   one route. Every other page — including the home page, which has the longest
   scroll on the site — fell back to raw wheel scrolling against
   `html{scroll-behavior:smooth}`, which only ever affects anchor jumps. That is
   the whole of "the site does not flow".

   Scroll feel is a site-wide property, so it gets a site-wide module. It owns
   Lenis and nothing else. scroll.js keeps the plate wipe and no longer touches
   scrolling.

   Load order on every page: vendor/lenis.min.js, then this.

   Lenis drives real scrollTop, so scrollY, IntersectionObserver, position:
   sticky and the existing scroll listeners in site.js all keep working
   untouched. Nothing here is load-bearing for anything being readable: if Lenis
   is absent or refused, the page is a normal scrolling page. */
(function () {
  if (window.lenis) return;                        /* already owned; never init twice */
  if (!window.Lenis) return;                       /* vendor missing — native scroll, fine */
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Lenis' CSS contract travels with the module rather than living in
     site.css, because the five case pages carry their own inline styles and do
     not link site.css yet. Four rules, scoped to classes Lenis sets itself.
     The scroll-behavior override is the important one. Upstream documents it as
     .lenis.lenis-smooth, but Lenis only carries lenis-smooth WHILE a smooth
     scroll is in flight, so that rule lands after the native smooth scroll has
     already started fighting it. Scoping to html.lenis kills native smooth
     scrolling for as long as Lenis is alive, which is the whole point. */
  var css = document.createElement('style');
  css.textContent =
    'html.lenis,html.lenis body{height:auto}' +
    'html.lenis{scroll-behavior:auto!important}' +
    '.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}' +
    '.lenis.lenis-stopped{overflow:hidden}';
  document.head.appendChild(css);

  /* lerp 0.115 is the value the Work index was already tuned to. Keeping it
     means one scroll feel across the site rather than two. syncTouch stays off:
     on a phone, native momentum is better than anything we would simulate. */
  var lenis = new window.Lenis({
    lerp: 0.115,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false
  });
  window.lenis = lenis;

  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);

  /* Lenis owns the scroll position, so in-page anchors have to route through it
     or they jump while Lenis is mid-interpolation. Delegated, so anchors added
     later by other scripts are covered too. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target);
  });
})();
