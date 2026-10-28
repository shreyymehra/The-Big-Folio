/* /contact/ behaviour, H9 (28 Oct 2026, at his instruction).
 *
 * This file used to drive the composer: four chips, four fill-in letters,
 * and a four-button row that built a mailto, a Gmail URL and two kinds of
 * copy. All of that is removed from the page, so all of it is removed from
 * here rather than left running against markup that is not there. The old
 * version is in git; `git log --follow assets/contact.js` finds it.
 *
 * What is left is one behaviour: copy the address, say so inline for two
 * seconds, and never open a dialog.
 */
(function () {
  'use strict';

  var btn = document.querySelector('[data-copy]');
  var say = document.querySelector('.ccopied');
  if (!btn || !say) return;

  var addr = btn.getAttribute('data-copy') || '';
  var timer = 0;

  /* The message is written into an element that is ALREADY in the DOM with
     role="status". Creating the live region at the moment of the message is
     the classic way to have it announced by nobody: a screen reader has to
     be watching the region before the text lands in it. */
  function announce(msg) {
    say.textContent = msg;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () { say.textContent = ''; timer = 0; }, 2000);
  }

  function fallback(text) {
    /* execCommand is deprecated and is still the only thing that works
       without the async clipboard permission, which is denied over file://
       and in some locked-down browsers. If even this fails the address is
       the button's own data and is printed in the line below it, so the
       reader is never stuck. */
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
        function () { announce('Copied'); },
        function () { announce(fallback(addr) ? 'Copied' : addr); }
      );
      return;
    }
    announce(fallback(addr) ? 'Copied' : addr);
  });
})();
