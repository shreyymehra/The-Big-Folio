# The Big Folio

Personal portfolio for **Shrey Mehra** — product marketing, GTM and brand strategy.

## What this is

Hand-authored HTML with a shared stylesheet. **No framework, no bundler, no `npm install`, and
nothing to run before it works.** Open `index.html` and it is the site.

The only build step is Tailwind's standalone CLI, used for the five case pages. Its output
(`assets/tw.css`) is committed, so the deployed site still has no build step.

> An earlier version of this file described a single self-contained page with inline CSS, inline
> JS and images as data URIs. That architecture was deliberately dismantled in `d5aa99b` and this
> file was left behind. Corrected 29 Sep 2026.

## Routes

| Path | What it is |
|---|---|
| `/` | Home: hero, quote tape, worked with, selected work, ideas, me, contact |
| `/work/` | The complete index, one row per project, filtered by discipline |
| `/work/<slug>/` | Five case studies: vastr, voicedna, vrl, cut-the-noise, absolutily |
| `/about/` | The long version, plus the FAQ. Labelled "Me" in the navigation |
| `/contact/` | One page |
| `/404.html` | Served for anything else |

## Files that matter

| File | Owns |
|---|---|
| `assets/base.css` | Tokens: palette, type, scale, motion. Every page loads it |
| `assets/site.css` | The stylesheet for every page except the five case studies |
| `assets/tw.css` | Compiled Tailwind, for the case pages only. Never edit by hand |
| `assets/site.js` | Shared behaviour |
| `assets/home.js` | Home only |
| `assets/case.js` | The five case pages only |
| `assets/feel.js` | The island, press states, copy-to-clipboard |
| `assets/theme.js` | Light and dark, blocking, in `<head>` |

## Running it

```
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Serves the folder at http://localhost:4321 and resolves `/work/` to `work/index.html`.
Rebuild Tailwind after touching `assets/tw/input.css` or any utility class in a case page:

```
.tools/tailwindcss.exe -i assets/tw/input.css -o assets/tw.css --minify
```

## Two rules that have broken this site before

1. **Links are depth-relative, never root-relative.** The site is served from a subpath on GitHub
   Pages, so `/assets/site.css` resolves above the site root and 404s. `404.html` is the one
   deliberate exception and explains itself in a comment.
2. **One page per route, edited in place.** Six versions of this site existed because each change
   shipped as a new file. Versions live in git history, not in filenames.

The full brief, the locked decisions and the reasoning behind them are in `CLAUDE.md`.
Where anything disagrees with that file, that file wins.
