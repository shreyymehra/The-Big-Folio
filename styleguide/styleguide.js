/* styleguide/styleguide.js
   Drives the few components that need a script, using design/motion.js -
   the same presets the real pages will use, so the styleguide cannot
   demonstrate behaviour that does not ship. */
import presets, { reduced } from '../design/motion.js';

/* say which motion mode the page is in, so a reduced-motion screenshot
   is self-evidently one */
const note = document.getElementById('sg-rm');
if (note) note.innerHTML = reduced()
  ? '<strong>prefers-reduced-motion is ON.</strong> Every preset below is showing its static final state.'
  : '<strong>prefers-reduced-motion is off.</strong> Turn it on at the OS and reload to see every fallback.';

/* the stitch draw, replayable */
const drawBtn = document.querySelector('[data-sg-draw]');
const drawTarget = document.getElementById('sg-draw');
if (drawBtn && drawTarget) {
  const go = () => { drawTarget.classList.remove('is-in'); void drawTarget.offsetWidth; drawTarget.classList.add('is-in'); };
  drawBtn.addEventListener('click', go);
  go();
}

/* the ticker pause: the MECHANISM, not the pointer hold */
const ticker = document.getElementById('sg-ticker');
const pause = ticker && ticker.querySelector('.c-ticker__pause');
if (ticker && pause) {
  pause.addEventListener('click', () => {
    const on = !ticker.classList.contains('is-paused');
    ticker.classList.toggle('is-paused', on);
    pause.setAttribute('aria-pressed', on ? 'true' : 'false');
    pause.textContent = on ? 'Play motion' : 'Pause motion';
  });
}

/* press/release on every button, through the preset */
document.querySelectorAll('.c-button:not([disabled])').forEach(b => {
  b.addEventListener('pointerdown', () => presets.press(b));
  b.addEventListener('pointerup', () => presets.release(b));
  b.addEventListener('pointerleave', () => presets.release(b));
});
