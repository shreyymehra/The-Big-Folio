/* EMPTY ON PURPOSE (29 Oct 2026).
 *
 * His spec: "No smooth-scroll library." This file initialised Lenis and
 * owned scrolling on all eleven routes. The page tags are gone, every
 * window.lenis call site now uses the native scroll event, and
 * assets/vendor/lenis.min.js is still on disk and in git.
 *
 * The file is kept rather than deleted so that no page 404s if one is
 * served from a cache that still has the old markup, and so the history
 * stays on one path. git show pre-fix:assets/scroll-feel.js is the
 * original.
 */
