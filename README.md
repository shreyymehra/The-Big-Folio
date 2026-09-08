# The Big Folio

Personal portfolio for **Shrey Mehra** — brand, marketing, product and GTM.

## Structure

`index.html` is the site. One self-contained file — inline CSS, inline JS, images as
data URIs. No build step, no dependencies, no framework. The five case studies sit
beside it and link back to `index.html#work`.

```
index.html            the site — source of truth
absolutily.html       case studies
cut-the-noise.html
vastr.html
voicedna.html
vrl.html
```

Network requests are Google Fonts and one Spotify embed. Everything else is in the file.

## Running it

```
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Serves the folder at http://localhost:4321 (set `$env:PORT` to change).
Nothing to install — no Node, no npm, no Python.

Opening `index.html` directly also works, though the Spotify embed prefers http://.

## Governing docs

| File | What it decides |
|---|---|
| `CLAUDE.md` | Global constraints. Read first, every session. |
| `DIRECTION.md` | Positioning, hierarchy, grid, type, colour, motion, the veto list. |
| `TASTE.md` | What to take and what to leave from each reference. |
| `references/` | Annotated screenshots only. See its README. |
| `_archive/` | Superseded prototypes. Never build from these. |
