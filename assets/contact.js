/* /contact/ behaviour. P0-8 (29 Oct 2026, at his instruction).
 *
 * One behaviour: tap the address, it copies, a toast says so for two
 * seconds. No dialog - a modal to confirm a clipboard write is a modal to
 * dismiss.
 *
 * This file used to drive the composer (four chips, four fill-in letters,
 * a four-button row). That is all removed from the page, so it is removed
 * from here rather than left running against markup that is not there.
 * `git log --follow assets/contact.js` finds it.
 */
(function () {
  'use strict';

  var btn = document.querySelector('[data-copy]');
  var toast = document.querySelector('.ctoast');
  if (!btn || !toast) return;

  var addr = btn.getAttribute('data-copy') || '';
  var timer = 0;

  /* The toast element is in the DOM from first paint with role="status".
     A live region created at the moment of the message is announced by
     nobody: a screen reader has to be watching the region before the text
     lands in it. */
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('is-up');
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      toast.classList.remove('is-up');
      /* the text is cleared only after the exit, or the toast announces an
         empty string on the way out */
      setTimeout(function () { if (!toast.classList.contains('is-up')) toast.textContent = ''; }, 220);
      timer = 0;
    }, 2000);
  }

  function fallback(text) {
    /* execCommand is deprecated and is still the only thing that works
       without the async clipboard permission, which is denied over file://
       and in some locked-down browsers. If even this fails, the address is
       the button's own visible label, so the reader is never stuck. */
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  btn.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(addr).then(
        function () { say('Copied'); },
        function () { say(fallback(addr) ? 'Copied' : 'Select and copy: ' + addr); }
      );
      return;
    }
    say(fallback(addr) ? 'Copied' : 'Select and copy: ' + addr);
  });
})();
