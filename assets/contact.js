/* The contact composer. Contact page only.

   No backend, no storage, no network. Nothing leaves the browser until the
   visitor presses a button, and no message content is ever measured.

   Everything here is ADDITIVE. With this file blocked the page still has a
   visible address, a working mailto, a readable letter and an operable
   FAQ: the inputs are real inputs and the fallback line is in the markup.
   That is deliberate, and it is checked by loading the page with scripts
   disabled rather than assumed. */
(function () {
  'use strict';

  var root = document.querySelector('.cz');
  if (!root) return;

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ADDR = 'shreyymehraa@gmail.com';
  /* a mailto body much past this is dropped or truncated by some clients */
  var MAX_BODY = 1800;

  var chips = [].slice.call(root.querySelectorAll('.cz-chip'));
  /* tells the stylesheet the indicator is live, so the checked chip can
     stop painting its own background. Without this the page would be
     cream type on cream paper whenever this file does not run. */
  var chipRow = root.querySelector('.cz-chips');
  if (chipRow) chipRow.setAttribute('data-js', '1');
  var letters = [].slice.call(root.querySelectorAll('.cz-letter'));
  var ind = root.querySelector('.cz-ind');
  var say = root.querySelector('.cz-say');
  var current = null;

  /* ---------- the blanks grow with what is typed ----------
     An <input> does not size to its content, so a name longer than the
     placeholder would scroll inside a box the width of the word "name".
     The letter has to read as a sentence, so the field is measured and
     resized on every keystroke. */
  function fit(input) {
    var len = (input.value || input.getAttribute('placeholder') || '').length;
    input.style.width = Math.max(4, len + 1) + 'ch';
  }

  /* ---------- which chip, and the sliding indicator (M3) ---------- */
  function select(key, focus) {
    if (current === key) return;
    current = key;
    chips.forEach(function (c) {
      var on = c.dataset.chip === key;
      c.setAttribute('aria-checked', on ? 'true' : 'false');
      c.tabIndex = on ? 0 : -1;
      if (on && focus) c.focus();
      if (on) move(c);
    });
    letters.forEach(function (l) {
      var on = l.dataset.letter === key;
      l.hidden = !on;
      if (on) {
        [].slice.call(l.querySelectorAll('.cz-blank')).forEach(fit);
        if (!reduce) {
          /* the paper wipes in when the letter changes, 250ms, his number */
          l.style.animation = 'none';
          void l.offsetWidth;
          l.style.animation = '';
          l.classList.add('cz-wipe');
          setTimeout(function () { l.classList.remove('cz-wipe'); }, 300);
        }
      }
    });
    if (history.replaceState) history.replaceState(null, '', '#' + key);
  }

  /* one indicator shared across the chips, so it slides between them
     rather than four backgrounds fading in and out */
  function move(chip) {
    if (!ind) return;
    var r = chip.getBoundingClientRect();
    var p = chip.parentNode.getBoundingClientRect();
    ind.style.width = r.width + 'px';
    /* Y as well as X: the chip row WRAPS at narrow widths, and an
       indicator that only tracks X sits under whichever chip happens to
       be below the selected one. Caught at 390. */
    ind.style.transform = 'translate(' + (r.left - p.left) + 'px,' + (r.top - p.top) + 'px)';
    ind.dataset.ready = '1';
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () { select(c.dataset.chip); });
  });

  /* a radiogroup is driven by the arrow keys, not by Tab */
  root.querySelector('.cz-chips').addEventListener('keydown', function (e) {
    var i = chips.findIndex(function (c) { return c.dataset.chip === current; });
    if (i < 0) return;
    var n = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % chips.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + chips.length) % chips.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = chips.length - 1;
    if (n === null) return;
    e.preventDefault();
    select(chips[n].dataset.chip, true);
  });

  root.addEventListener('input', function (e) {
    if (e.target.classList.contains('cz-blank')) fit(e.target);
  });

  /* ---------- build the message ----------
     An empty blank is written into the draft as its own visible
     placeholder, [role], so the sender sees the hole before they send
     rather than mailing a sentence with a gap in it. */
  function compose() {
    var l = letters.filter(function (x) { return !x.hidden; })[0];
    if (!l) return null;
    var body = '';
    [].slice.call(l.childNodes).forEach(function (n) {
      if (n.nodeType === 3) body += n.nodeValue;
      else if (n.classList && n.classList.contains('cz-blank')) {
        body += (n.value.trim() || '[' + n.dataset.field + ']');
      }
    });
    var subject = l.dataset.subject.replace(/\[(\w+)\]/g, function (m, f) {
      var input = l.querySelector('[data-field="' + f + '"]');
      return (input && input.value.trim()) || m;
    });
    return { body: body.replace(/\s+/g, ' ').trim(), subject: subject };
  }

  function tell(msg) { if (say) say.textContent = msg; }

  function copy(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { tell(label + ' copied.'); },
        function () { fallback(text); });
    } else fallback(text);
  }
  /* the Clipboard API is blocked in plenty of contexts, so the text is
     shown and selected instead of the action silently doing nothing */
  function fallback(text) {
    tell('Could not copy. Select and copy:');
    var box = root.querySelector('.cz-fallback') || document.createElement('textarea');
    box.className = 'cz-fallback';
    box.value = text;
    box.setAttribute('aria-label', 'Message to copy');
    box.rows = 4;
    if (!box.parentNode) say.insertAdjacentElement('afterend', box);
    box.select();
  }

  root.querySelector('.cz-acts').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var act = btn.dataset.act;
    if (act === 'addr') { copy(ADDR, 'Address'); return; }
    var m = compose();
    if (!m) return;
    if (act === 'copy') { copy(m.body, 'Message'); return; }

    var body = encodeURIComponent(m.body);
    if (body.length > MAX_BODY) {
      tell('That message is long. Copy it instead and paste it into your email.');
      return;
    }
    var su = encodeURIComponent(m.subject);
    if (act === 'mail') {
      location.href = 'mailto:' + ADDR + '?subject=' + su + '&body=' + body;
      tell('Opening your email app.');
    } else if (act === 'gmail') {
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(ADDR) +
        '&su=' + su + '&body=' + body, '_blank', 'noopener');
      tell('Opening Gmail in a new tab.');
    }
  });

  /* ---------- open on the chip the link asked for ---------- */
  var want = (location.hash || '').replace('#', '');
  select(LETTERS_HAS(want) ? want : chips[0].dataset.chip);
  function LETTERS_HAS(k) { return chips.some(function (c) { return c.dataset.chip === k; }); }

  /* the indicator is measured, so it has to be re-measured when the row
     rewraps or the display face finally lands */
  addEventListener('resize', function () {
    var on = chips.filter(function (c) { return c.getAttribute('aria-checked') === 'true'; })[0];
    if (on) move(on);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      var on = chips.filter(function (c) { return c.getAttribute('aria-checked') === 'true'; })[0];
      if (on) move(on);
    });
  }
})();
