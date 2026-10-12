/* motion.js — the motion reactor (13 Oct 2026, at his instruction)
   ============================================================
   One file owns the motion that GSAP is actually better at than CSS:
   scroll-linked travel, and choreography where three things have to move
   against each other on one timeline. Everything that is a simple state
   change stays in CSS, because a transition does not need a library.

   It is ADDITIVE. The existing reveal system (.anim / [data-t] / .rise,
   applied by site.js and home.js) is untouched, and every block below bails
   out quietly if its markup is not on the page. Nothing here is required for
   the page to be readable: with the script blocked, reduced motion on, or
   GSAP failing to load, every section renders in its finished state.

   Loaded after gsap.min.js and ScrollTrigger.min.js on home, /work and
   /about/. Keep it that way: it registers the plugin itself and does
   nothing if either is missing.
   ============================================================ */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';
  var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* Lenis owns scrolling site-wide, so ScrollTrigger has to be told when it
     moves or every trigger fires against a stale scroll position. scroll-feel.js
     publishes the instance on window.lenis. If it is not there yet we hook it
     on the first frame it appears, which is cheaper than polling forever. */
  if (hasST) {
    var hooked = false, tries = 0;
    (function hook() {
      if (hooked || tries++ > 60) return;
      if (window.lenis && window.lenis.on) {
        window.lenis.on('scroll', ScrollTrigger.update);
        hooked = true;
        ScrollTrigger.refresh();
        return;
      }
      requestAnimationFrame(hook);
    })();
  }

  /* ============================================================
     1. THE WORK WALL — the tile you are looking at straightens
     ============================================================
     The old hover was translateY(-8px) with a spring, which is the bounce he
     called underwhelming, and he was right: it says "this is a button" and
     nothing else. The collage is pinned posters at angles, so the move that
     means something is picking one off the wall: it rotates to true, lifts,
     and the poster pushes in behind its own frame, which is a camera move
     rather than a jump. The red band carrying "Read the case" wipes up from
     the bottom edge instead of sitting there all along.

     Three things on one timeline, which is the reason this is GSAP and not
     three transitions that drift out of step with each other. */
  (function () {
    if (reduce || !hasGsap) return;
    var tiles = [].slice.call(document.querySelectorAll('.wk-tile'));
    if (!tiles.length) return;

    tiles.forEach(function (tile) {
      var frame = tile.querySelector('.wk-frame'),
          poster = tile.querySelector('.wk-poster img'),
          open = tile.querySelector('.wk-open');
      if (!frame) return;

      /* the tile's resting angle is a custom property the pinned scroll also
         reads, so it is taken from the computed value rather than assumed */
      var rest = parseFloat(getComputedStyle(tile).getPropertyValue('--r')) || 0;

      var tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      tl.to(frame, { rotation: -rest, y: -14, duration: .42 }, 0);
      if (poster) tl.to(poster, { scale: 1.06, duration: .62 }, 0);
      if (open) tl.fromTo(open, { yPercent: 100 }, { yPercent: 0, duration: .34 }, .04);

      function enter() { tl.timeScale(1).play(); }
      /* out faster than in: a hover that lingers on exit feels broken */
      function leave() { tl.timeScale(1.5).reverse(); }
      tile.addEventListener('pointerenter', enter);
      tile.addEventListener('pointerleave', leave);
      tile.addEventListener('focus', enter);
      tile.addEventListener('blur', leave);
    });
  })();

  /* ============================================================
     2. /work — the row you are on is the only one lit
     ============================================================
     Eleven rows of equal weight is a list to scan past. Dimming the rest is
     the cheapest possible way to make the page answer a pointer, and unlike a
     lift it does not move anything, so nothing reflows and the row under the
     cursor cannot slide out from under it.

     Opacity only, and only down to .45, which keeps every dimmed row above
     the contrast floor: this is emphasis, not hiding. */
  (function () {
    if (reduce || !hasGsap) return;
    var list = document.querySelector('.wlist, [data-work-list]') ||
               (document.querySelector('.wrow') && document.querySelector('.wrow').parentNode);
    if (!list) return;
    var rows = [].slice.call(list.querySelectorAll('.wrow'));
    if (rows.length < 2) return;

    function focusRow(on) {
      rows.forEach(function (r) {
        var lit = !on || r === on;
        gsap.to(r, { opacity: lit ? 1 : .45, duration: .28, ease: 'power2.out', overwrite: 'auto' });
      });
      if (on) {
        var plate = on.querySelector('.plate img');
        if (plate) gsap.to(plate, { scale: 1.05, duration: .6, ease: 'power3.out', overwrite: 'auto' });
      }
    }
    function clear() {
      rows.forEach(function (r) {
        gsap.to(r, { opacity: 1, duration: .3, ease: 'power2.out', overwrite: 'auto' });
        var p = r.querySelector('.plate img');
        if (p) gsap.to(p, { scale: 1, duration: .45, ease: 'power2.out', overwrite: 'auto' });
      });
    }
    rows.forEach(function (r) {
      r.addEventListener('pointerenter', function () { focusRow(r); });
      r.addEventListener('focus', function () { focusRow(r); });
      r.addEventListener('blur', clear);
    });
    list.addEventListener('pointerleave', clear);
  })();

  /* ============================================================
     3. /about/ — the star-head strip travels on the scroll
     ============================================================
     It does not run itself. Home already carries one self-starting loop and
     he has twice said motion must not cost the content, so this one is driven
     entirely by the reader: scrolling down walks the strip left, stopping
     stops it, and scrolling back walks it right again.

     The distance is measured from the track, never assumed, and re-measured
     on refresh, because the faces are lazy images and the display face lands
     late: both change the track's width after first paint. */
  (function () {
    if (reduce || !hasST) return;
    var view = document.querySelector('.hs-view'),
        track = view && view.querySelector('.hs-track');
    if (!track) return;

    gsap.to(track, {
      x: function () {
        /* never positive: if the track is narrower than the viewport there is
           nothing to travel and the strip simply sits still */
        return Math.min(0, view.clientWidth - track.scrollWidth);
      },
      ease: 'none',
      scrollTrigger: {
        trigger: '.hstrip',
        start: 'top bottom',
        end: 'bottom top',
        scrub: .6,
        invalidateOnRefresh: true
      }
    });
  })();

  /* ============================================================
     4. Section arrivals
     ============================================================
     A heading, its rule and its body arriving together is one event; arriving
     on three separate observers is three. This replaces nothing: it only
     takes sections that opted in with [data-stage], so no existing reveal is
     touched and nothing double-animates.

     from() rather than fromTo(), so the finished state is whatever the
     stylesheet says. If this script never runs, the section is already there. */
  (function () {
    if (reduce || !hasST) return;
    var stages = [].slice.call(document.querySelectorAll('[data-stage]'));
    if (!stages.length) return;

    stages.forEach(function (sec) {
      var bits = [].slice.call(sec.querySelectorAll('[data-stage-item]'));
      if (!bits.length) return;
      gsap.from(bits, {
        y: 18, opacity: 0, duration: .62, ease: 'power3.out', stagger: .07,
        scrollTrigger: { trigger: sec, start: 'top 78%', once: true }
      });
    });
  })();
})();
