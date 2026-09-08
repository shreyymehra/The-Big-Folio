/* Scroll reveal for the Work index.

   Design note — why this is inView + CSS and not scroll-linked:
   the wipe uses clip-path, which HIDES content. Anything that hides
   content must be guaranteed to un-hide it. A scroll-linked animation
   depends on requestAnimationFrame, and rAF does not run in a
   backgrounded tab; a visitor who opens the page in a background tab
   and switches to it would find an index of blank rectangles.
   inView is IntersectionObserver, and the wipe itself is a CSS
   transition on the compositor, so neither depends on rAF.

   Lenis is scoped to scroll feel only, at a light lerp, and is not
   load-bearing for anything being readable.

   The plate is a slot: swap the typographic composition for a real
   artefact image later and none of this changes. */
(function () {
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var plates = [].slice.call(document.querySelectorAll('.plate'));
  if (!plates.length) return;

  /* Reduced motion: show everything, animate nothing. */
  if (reduce) {
    root.classList.remove('js-wipe');
    return;
  }

  var M = window.Motion;

  function reveal(plate) {
    plate.classList.add('wiped');
  }

  /* Preferred: Motion's inView. Falls back to IntersectionObserver,
     then to showing everything. Every path ends with content visible. */
  if (M && typeof M.inView === 'function') {
    plates.forEach(function (plate, i) {
      plate.style.transitionDelay = Math.min(i, 3) * 70 + 'ms';
      M.inView(plate, function () { reveal(plate); }, { margin: '0px 0px -12% 0px' });
    });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    plates.forEach(function (plate, i) {
      plate.style.transitionDelay = Math.min(i, 3) * 70 + 'ms';
      io.observe(plate);
    });
  } else {
    root.classList.remove('js-wipe');
    return;
  }

  /* Last-resort guarantee: whatever happened above, nothing stays
     hidden. If a plate is still covered after this, show it. */
  setTimeout(function () {
    plates.forEach(function (plate) {
      var r = plate.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) reveal(plate);
    });
  }, 2500);
  addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      plates.forEach(function (plate) {
        var r = plate.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) reveal(plate);
      });
    }
  });

  /* Lenis: scroll feel only. Light lerp, native touch, and it owns the
     scroll position so in-page anchors have to route through it. */
  if (window.Lenis) {
    var lenis = new window.Lenis({ lerp: 0.115, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    window.lenis = lenis;
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); lenis.scrollTo(t); }
      });
    });
  }
})();
