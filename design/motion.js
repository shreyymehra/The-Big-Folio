/* =========================================================================
   design/motion.js — the motion presets. Baseline System v1, B2.

   THE NUMBERS LIVE IN tokens.css. This file reads them, so changing a
   duration is one edit in one place and every preset follows. Nothing
   here hard-codes a millisecond.

   TRANSFORM AND OPACITY ONLY. Every preset below animates one or both
   and nothing else. `clip` is the single documented exception and it is
   the stitch draw, because a background-image has no stroke to offset -
   his spec asks for pathLength and there is no path in the document.

   REDUCED MOTION IS A STATIC FINAL STATE, not a shortened one. Each
   preset exposes .final(), and every entry point checks the query
   first: collapsing a duration does not stop a loop, which this repo
   has recorded twice.

   NO LIBRARY. His brief names the Motion library; this uses the Web
   Animations API, which every target browser has had for years and
   which costs nothing to download. Same three arguments (keyframes,
   duration, easing), same promise, and `el.animate()` is what Motion
   calls underneath. Dropping Motion in later means replacing the four
   lines marked RUNNER.
   ========================================================================= */

const read = (name, fallback) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};
const ms = v => parseFloat(v) * (/\bs$/.test(v) && !/\bms$/.test(v) ? 1000 : 1);

export const tokens = {
  get fast()    { return ms(read('--dur-fast', '150ms')); },
  get base()    { return ms(read('--dur-base', '300ms')); },
  get slow()    { return ms(read('--dur-slow', '600ms')); },
  get ease()    { return read('--ease', 'cubic-bezier(.2,.8,.2,1)'); },
  get stagger() { return ms(read('--stagger', '60ms')); },
  get tick()    { return ms(read('--tick-comic', '83ms')); },
  get marquee() { return ms(read('--dur-marquee', '40s')); },
  get drift()   { return ms(read('--dur-drift', '8s')); },
  get driftPx() { return parseFloat(read('--drift-distance', '6px')); },
  spring: { stiffness: 300, damping: 24 }
};

export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* RUNNER — the four lines a different library would replace. */
function run(el, frames, opts) {
  if (!el || !el.animate) return null;
  return el.animate(frames, { fill: 'both', easing: tokens.ease, ...opts });
}

/* A spring as a duration and a curve. stiffness 300 / damping 24 is
   under-damped, so it overshoots once and settles: ~380ms with a curve
   that passes 1 before coming back. Used for press release only, which
   is the one place an overshoot means something. */
function springTiming() {
  const { stiffness: k, damping: c } = tokens.spring;
  const duration = Math.round(1000 * (4 / Math.sqrt(k)) * (1 + c / 40));
  return { duration, easing: 'cubic-bezier(.2,1.5,.4,1)' };
}

/* ---------------------------------------------------------------------
   PRESETS. Each returns the animation, or null under reduced motion
   after putting the element in its final state.
   --------------------------------------------------------------------- */
export const presets = {

  /* reveal: y16 -> 0, once */
  reveal(el, { delay = 0 } = {}) {
    if (reduced()) return presets.final.reveal(el);
    return run(el, [{ opacity: 0, transform: 'translateY(16px)' },
                    { opacity: 1, transform: 'translateY(0)' }],
               { duration: tokens.base, delay });
  },

  /* lift: -4px and straighten to true. `rest` is the element's own
     resting angle, read from --tilt so a tile returns to where it was
     rather than to zero. */
  lift(el, { rest = null } = {}) {
    const from = rest !== null ? rest : (getComputedStyle(el).getPropertyValue('--tilt') || '0deg');
    if (reduced()) return presets.final.lift(el, from);
    return run(el, [{ transform: `rotate(${from}) translateY(0)` },
                    { transform: 'rotate(0deg) translateY(-4px)' }],
               { duration: tokens.fast });
  },

  press(el) {
    if (reduced()) return null;
    return run(el, [{ transform: 'scale(1)' }, { transform: 'scale(.97)' }],
               { duration: tokens.fast });
  },

  release(el) {
    if (reduced()) return null;
    return run(el, [{ transform: 'scale(.97)' }, { transform: 'scale(1)' }], springTiming());
  },

  /* flip: steps(3) over 250ms. A stepped flip, not a smooth one - the
     comic idiom this site already animates the ransom tiles on. */
  flip(el) {
    if (reduced()) return presets.final.flip(el);
    return run(el, [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(360deg)' }],
               { duration: 250, easing: 'steps(3, end)' });
  },

  /* draw: his spec says pathLength. Where there IS an SVG path this
     uses it; where the artwork is a background-image (the stitch) there
     is no path in the document, so it falls back to a clip wipe, which
     reads identically. The caller does not need to know which. */
  draw(el, { duration = 700 } = {}) {
    if (reduced()) return presets.final.draw(el);
    const path = el.tagName === 'path' ? el : el.querySelector && el.querySelector('path');
    if (path && path.getTotalLength) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len;
      return run(path, [{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration });
    }
    return run(el, [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration });
  },

  /* marquee: 40s linear, infinite, -50% of a doubled track */
  marquee(track) {
    if (reduced()) return presets.final.marquee(track);
    return run(track, [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
               { duration: tokens.marquee, easing: 'linear', iterations: Infinity });
  },

  /* drift: 6px over 8s, alternating, infinite */
  drift(el, { delay = 0 } = {}) {
    if (reduced()) return null;
    const d = tokens.driftPx;
    return run(el, [{ transform: 'translate(0,0)' },
                    { transform: `translate(${d / 2}px, ${-d}px)` },
                    { transform: 'translate(0,0)' }],
               { duration: tokens.drift, delay, iterations: Infinity, easing: 'ease-in-out' });
  },

  /* comic-boil: swap variants on the 83ms tick. Needs an asset - three
     cuts of each letter - so with one variant it does nothing and says
     so rather than faking a wobble. */
  comicBoil(el, variants) {
    if (reduced() || !variants || variants.length < 2) return null;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % variants.length;
      el.setAttribute('src', variants[i]);
    }, tokens.tick);
    return { cancel: () => clearInterval(id) };
  },

  /* stagger a list through any preset */
  staggered(els, preset, opts = {}) {
    return [...els].map((el, i) =>
      presets[preset](el, { ...opts, delay: (opts.delay || 0) + i * tokens.stagger }));
  },

  /* the static end state of every preset, for reduced motion and for
     anything that needs to skip to the end */
  final: {
    reveal(el) { el.style.opacity = '1'; el.style.transform = 'none'; return null; },
    lift(el, rest = '0deg') { el.style.transform = `rotate(${rest})`; return null; },
    flip(el) { el.style.transform = 'none'; return null; },
    draw(el) { el.style.clipPath = 'none'; return null; },
    marquee(track) { track.style.transform = 'none'; return null; }
  }
};

export default presets;
