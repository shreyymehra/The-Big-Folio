#!/usr/bin/env node
/* Validator for content/proof/*.json.
   It must FAIL or WARN, never silently pass: the whole point of the proof
   layer is that an unverified claim cannot reach a page by accident.

   No dependencies. This repo has no npm and is not getting one for this.
     node tools/validate-proof.js
     node tools/validate-proof.js --strict   (exit 1 on warnings too) */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'content', 'proof');
const STRICT = process.argv.includes('--strict');

const TYPES = ['ad', 'email', 'landing', 'deck', 'doc', 'chart', 'storyboard',
  'video', 'quote', 'canvas', 'messaging-house', 'timeline', 'before-after'];
const SKILLS = ['positioning-messaging', 'launch-gtm', 'lifecycle', 'creative-ads',
  'research', 'comms-enablement', 'analytics'];
const STATUS = ['shipped', 'recreated', 'spec', 'in-build'];
/* the types that put an image on the page and therefore need real alt text */
const IMAGE_TYPES = ['ad', 'email', 'landing', 'deck', 'doc', 'chart', 'storyboard', 'video', 'before-after'];

let errors = 0, warnings = 0, ready = 0, waiting = 0;
const err = (f, m) => { console.log('  FAIL  ' + f + ': ' + m); errors++; };
const warn = (f, m) => { console.log('  warn  ' + f + ': ' + m); warnings++; };

if (!fs.existsSync(DIR)) {
  console.log('No content/proof directory. Nothing to validate.');
  process.exit(0);
}

const files = fs.readdirSync(DIR)
  .filter(n => n.endsWith('.json'))
  .filter(n => !n.startsWith('_'));

const ids = new Set();

for (const name of files) {
  const full = path.join(DIR, name);
  let raw, item;
  try { raw = fs.readFileSync(full, 'utf8'); } catch (e) { err(name, 'unreadable'); continue; }
  try { item = JSON.parse(raw); } catch (e) { err(name, 'invalid JSON: ' + e.message); continue; }

  const placeholders = raw.match(/\{\{[^}]*\}\}/g) || [];

  /* an unpublished item is allowed to be incomplete. That is what it is for. */
  if (item.published !== true) {
    waiting++;
    console.log('  wait  ' + name + ': published:false' +
      (placeholders.length ? ' (' + placeholders.length + ' slot' + (placeholders.length > 1 ? 's' : '') + ' open)' : ''));
    continue;
  }

  /* from here down the item claims to be ready, so everything is checked */
  if (placeholders.length) {
    err(name, 'published:true but still contains ' + placeholders.length +
      ' placeholder(s): ' + [...new Set(placeholders)].join(' '));
  }
  for (const f of ['id', 'project', 'title', 'type', 'status', 'skills']) {
    if (!item[f] || (Array.isArray(item[f]) && !item[f].length)) err(name, 'missing required field "' + f + '"');
  }
  if (item.id) {
    if (ids.has(item.id)) err(name, 'duplicate id "' + item.id + '"');
    ids.add(item.id);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(item.id)) err(name, 'id must be kebab-case: "' + item.id + '"');
  }
  if (item.type && !TYPES.includes(item.type)) err(name, 'unknown type "' + item.type + '"');
  if (item.status && !STATUS.includes(item.status)) err(name, 'unknown status "' + item.status + '"');
  for (const s of (item.skills || [])) if (!SKILLS.includes(s)) err(name, 'unknown skill "' + s + '"');

  if (['shipped', 'recreated'].includes(item.status)) {
    for (const f of ['org', 'period', 'role']) {
      if (!item[f]) err(name, 'status "' + item.status + '" requires "' + f + '"');
    }
  }
  if (item.result) {
    for (const f of ['baseline', 'measuredBy']) {
      if (!item.result[f]) err(name, 'result present, so result.' + f + ' is required');
    }
    if (!item.result.value || !item.result.metric) err(name, 'result needs value and metric');
  }
  if (item.type === 'quote' && item.permission !== true) {
    err(name, 'quote without permission:true is never rendered');
  }
  if (IMAGE_TYPES.includes(item.type)) {
    if (item.alt === undefined) err(name, 'image type needs alt (use "" only if decorative)');
    else if (typeof item.alt === 'string' && item.alt.length > 125) err(name, 'alt is ' + item.alt.length + ' chars, max 125');
    if (!item.width || !item.height) err(name, 'width and height are required or the card shifts the layout');
    if (item.src && !fs.existsSync(path.join(__dirname, '..', item.src.replace(/^\//, '')))) {
      warn(name, 'src not on disk: ' + item.src);
    }
  }
  if (item.caption && item.caption.length > 140) err(name, 'caption is ' + item.caption.length + ' chars, max 140');
  if (item.status === 'spec' && !item.brand) {
    warn(name, 'spec item has no "brand", so the disclaimer line cannot be built');
  }
  ready++;
}

console.log('');
console.log('proof items: ' + ready + ' publishable, ' + waiting + ' waiting on content, ' +
  errors + ' error' + (errors === 1 ? '' : 's') + ', ' + warnings + ' warning' + (warnings === 1 ? '' : 's'));
if (errors) { console.log('FAILED'); process.exit(1); }
if (warnings && STRICT) { console.log('FAILED (--strict)'); process.exit(1); }
console.log(ready ? 'OK' : 'OK (nothing publishable yet, which is expected)');
