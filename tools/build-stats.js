#!/usr/bin/env node
/* Build the "What it moved" scatter into index.html from content/stats.json.
 *
 *   node tools/build-stats.js            write it
 *   node tools/build-stats.js --check    verify only, exit 1 if stale
 *
 * WHY A GENERATOR AND NOT A FETCH. The reveal text has to be in the DOM for a
 * screen reader whether or not the reveal is open, and the site has no build
 * step at deploy time, so a runtime fetch would mean an empty block on first
 * paint and nothing at all over file://. The markup is generated here, once,
 * by hand, and committed - the same shape as tools/build-experience.js.
 *
 * WHY SEEDED AND BALANCED. A plain seeded random can deal four of the five
 * large tiles into one row, which reads as a mistake rather than a rhythm. So
 * each of the three size classes, three tilts and two offsets comes out of a
 * fixed-size pool that is shuffled, not sampled: the mix is guaranteed and the
 * order is still arbitrary. One seed, in stats.json, so it never reshuffles.
 *
 * THE NUMBERS ARE FROZEN. Every value, caption and employer is checked below
 * against the copy that was live on 28 Oct 2026. The script refuses to write
 * if any of them has moved, because a figure quietly changing in a data file
 * is exactly the failure this portfolio cannot afford.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

/* ---- the freeze. Do not edit to make the script pass. ---- */
const FROZEN = [
  '+310%|click-through, new product and pricing launches|Tickertape',
  '+140%|customer experience score|Tickertape',
  '160k|customers reached across 20 locations|Tickertape',
  '−16%|churn, month on month, through lifecycle marketing|Tickertape',
  '20k|monthly active users grown through ad campaigns|Tickertape',
  '+170%|engagement, year on year|Tickertape',
  '+46%|engagement, month on month|iSelect and Compare the Market',
  '700+|employees aligned across APAC|iSelect and Compare the Market',
  '−78%|vendor costs, renegotiated across 20+ events|iSelect and Compare the Market',
  '+56%|sales uplift, with profit up 32% in Q2|Bliss and Birch',
  '−30%|event costs, through vendor and budget management|TEDxUniMelb',
  '1.2M|views, sold out in two days|TEDxVIPS',
  '130+|volunteers led|TEDxVIPS',
  '+65%|sign-ups, engagement up 40%|TEDxUniMelb'
];

const stats = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/stats.json'), 'utf8'));
const figs = stats.figures;

if (figs.length !== FROZEN.length) fail('stats.json holds ' + figs.length + ' figures, the freeze holds ' + FROZEN.length);
figs.forEach((f, i) => {
  const key = [f.value, f.what, f.who].join('|');
  if (key !== FROZEN[i]) fail('figure ' + (i + 1) + ' has moved.\n  frozen: ' + FROZEN[i] + '\n  file:   ' + key);
});

function fail(msg) { console.error('REFUSING TO WRITE: ' + msg); process.exit(1); }

/* ---- the seeded, balanced deal ---- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(stats.seed);

/* Fisher-Yates on the fixed pool, so the mix is exact and only the order rolls */
function deal(pool, n) {
  const out = [];
  while (out.length < n) out.push(...pool);
  out.length = n;
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
/* H4: size, tilt and offset are gone with the scatter. A ledger has one
   size per column and no tilt - that is what makes it a ledger. The deal
   helper stays because the ORDER still uses it. */

/* ORDER IS DEALT TOO, AND IT HAS TO BE. Source order runs the five groups in
   blocks, so the first render put "Launch and funnel" on three tiles in a row
   and "Lifecycle and retention" on the next two. A tag printed three times
   down one row reads as a mistake, not as a scatter. The shuffle interleaves
   them and the repair pass below MINIMISES, not eliminates, the touching
   pairs: 14 tiles over 5 uneven groups, scored at every column count the
   grid produces, bottoms out at 3 of roughly 110 adjacencies. The script
   prints that number on every run so it is a measurement, not a claim. */
const COLS = [1, 2, 3, 4, 5];   /* the column counts the grid actually produces */
const g = i => figs[i].group;

/* Count every pair of tiles that would touch and carry the same tag, across
   all five column counts: left-right within a row, and above-below in the
   same column. Scored rather than asserted, because 14 tiles over 5 groups
   may not have a zero-violation arrangement and pretending otherwise is how
   a comment ends up describing behaviour the code does not have. */
function clashes(ix) {
  let n = 0;
  for (const c of COLS) {
    for (let i = 0; i < ix.length; i++) {
      if (i % c !== 0 && g(ix[i]) === g(ix[i - 1])) n++;          /* left */
      if (i >= c && g(ix[i]) === g(ix[i - c])) n++;               /* above */
    }
  }
  return n;
}

/* THE LEAD FIGURE IS PINNED. +310% is the number the closed pill previews and
   the strongest thing in the block; a free shuffle dealt it eighth, which is a
   scattered LAYOUT quietly demoting the EVIDENCE. Only tile 1 is fixed. The
   other thirteen are dealt. */
const order = (function () {
  let best = null, bestScore = Infinity;
  for (let attempt = 0; attempt < 4000; attempt++) {
    const ix = figs.map((_, i) => i);
    for (let i = ix.length - 1; i > 1; i--) {
      const j = 1 + Math.floor(rnd() * i);   /* never index 0: the lead is pinned */
      [ix[i], ix[j]] = [ix[j], ix[i]];
    }
    /* greedy repair: keep the swap that lowers the score */
    let score = clashes(ix);
    for (let pass = 0; pass < 60 && score > 0; pass++) {
      let improved = false;
      for (let a = 1; a < ix.length && !improved; a++) {   /* from 1: tile 1 never moves */
        for (let b = a + 1; b < ix.length; b++) {
          [ix[a], ix[b]] = [ix[b], ix[a]];
          const s = clashes(ix);
          if (s < score) { score = s; improved = true; break; }
          [ix[a], ix[b]] = [ix[b], ix[a]];
        }
      }
      if (!improved) break;
    }
    if (score < bestScore) { bestScore = score; best = ix.slice(); }
    if (bestScore === 0) break;
  }
  console.log('tag adjacency across 1-5 columns: ' + bestScore + ' touching pairs share a tag');
  return best;
})();

/* ---- markup ---- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/* the markup has always written the true minus as an entity; keep that */
const num = s => esc(s).replace(/−/g, '&minus;');

const LEAD = 6;   /* rows shown before the toggle, his number */

/* EVERY LABEL IS CHECKED AGAINST HIS 8-WORD CAP. All fourteen already
   pass, so none of his copy is rewritten here; the check exists so that
   a label added later cannot quietly blow the column. */
order.forEach((src, i) => {
  const w = figs[src].what.trim().split(/\s+/).length;
  if (w > 8) fail('label ' + (i + 1) + ' is ' + w + ' words, over the 8-word cap: "' + figs[src].what + '"');
});

const rows = order.map((src, i) => {
  const f = figs[src];
  const how = (f.measuredBy || '').trim();
  const period = (f.period || '').trim();
  /* EMPTY PERIOD IS AN EMPTY CELL. Never TBC, never n/a, never a guess:
     a placeholder in a date column reads as an unfinished ledger, and a
     wrong date in front of a recruiter is worse than no date. */
  const cls = ['lg-row'];
  if (i >= LEAD) cls.push('lg-more');
  const parts = [
    '<span class="lg-n"' + (i < LEAD ? ' data-countup' : '') + '>' + num(f.value) + '</span>',
    '<span class="lg-l">' + esc(f.what) + '</span>',
    '<span class="lg-o">' + esc(f.who) + '</span>',
    '<span class="lg-p">' + (period ? esc(period) : '') + '</span>'
  ];
  if (how) parts.push('<span class="lg-how">' + esc(how) + '</span>');
  return '            <li class="' + cls.join(' ') + '"' +
    (i >= LEAD ? ' data-more' : '') + '>' + parts.join('') + '</li>';
}).join('\n');

const withPeriod = figs.filter(f => (f.period || '').trim()).length;


const block = [
  '          <!-- stats:start  generated by tools/build-stats.js from content/stats.json. Do not hand-edit. -->',
  '          <p class="mv-k mono">What it moved</p>',
  '          <ol class="ledger" id="ledger">',
  rows,
  '          </ol>',
  /* The toggle is markup, not script-injected, so it is in the tab order
     and announced before any JS runs. It is HIDDEN until html.js is set:
     with no script every row is visible and a control that does nothing
     would be a lie. 44px tall, his number. */
  '          <button class="lg-toggle" type="button" aria-expanded="false" aria-controls="ledger">' +
    'All ' + figs.length + ' results</button>',
  '          <!-- stats:end -->'
].join('\n');

/* ---- splice ---- */
const P = path.join(ROOT, 'index.html');
const raw = fs.readFileSync(P, 'utf8');
const crlf = /\r\n/.test(raw);
const src = raw.replace(/\r\n/g, '\n');

const RE = /^[ \t]*<!-- stats:start[\s\S]*?<!-- stats:end -->/m;
if (!RE.test(src)) fail('the stats:start / stats:end markers are not in index.html');
const out = src.replace(RE, block);

if (process.argv.includes('--check')) {
  if (out === src) { console.log('stats block is current'); process.exit(0); }
  console.error('stats block is STALE: run node tools/build-stats.js'); process.exit(1);
}

fs.writeFileSync(P, crlf ? out.replace(/\n/g, '\r\n') : out);
const withHow = figs.filter(f => (f.measuredBy || '').trim()).length;
console.log('wrote ' + figs.length + ' ledger rows, seed ' + stats.seed + ', ' + LEAD + ' shown before the toggle');
console.log(withHow + ' carry a method, ' + withPeriod + ' carry a period; the rest render an empty cell, never TBC');
