# assets/tw

Tailwind CSS v4 source for the site. Not deployed; only the compiled `assets/tw.css` ships.

## Build

    .tools/tailwindcss.exe -i assets/tw/input.css -o assets/tw.css --minify

Add `--watch` while editing. Rebuild and commit `assets/tw.css` after any change to
`input.css` or to classes in the HTML, or the new classes will not exist on the live site.

## The tool

`.tools/` is git-ignored. If it is missing, download the Tailwind standalone CLI
(no Node, no npm) from the official releases:

    https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-windows-x64.exe

and save it as `.tools/tailwindcss.exe`.

## Rules

- The theme in `input.css` is the design system. Tailwind's default colours, fonts and
  type sizes are switched off: use `text-h1 text-h2 text-h3 text-body text-small`,
  `font-display font-body font-mono`, and the palette names (`cream deep fluoro`,
  plus `ground type plane on-plane accent-plane` on case pages).
- Spacing uses Tailwind's 4px step, which is the site scale. Prefer
  1 2 3 4 6 8 12 16 24 32.
- `label` is the one metadata style: mono, 14px, uppercase, .06em.
- No preflight. Pages that link tw.css keep their own base.
