# The Big 'Folio — Design Tokens

**This file is the source of truth for the visual system.** It documents what is
built in `styles.css`, not an aspiration. If a value here and a value in the CSS
disagree, the CSS is right and this file is stale — fix it.

Written because the system has been re-specified three times (parchment/gold in
`CONTEXT`, riso/cobalt in the v2 README, race-red/paper in the shipped v3) and the
brief pack points at a `PortfolioHero.tsx` that does not exist. One file, one truth.

**System name:** Printed interface, warm inks. Y2K software grammar on paper stock.

---

## Colour

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f4eee2` | All page backgrounds |
| `--paper-dim` | `#ebe3d2` | Alt surfaces, row hover |
| `--ink` | `#1a1713` | Primary type, all borders |
| `--ink-soft` | `rgba(26,23,19,.72)` | Body copy |
| `--ink-faint` | `rgba(26,23,19,.45)` | Labels, meta, ghost numerals |
| `--race` | `#e8401b` | The accent. Marquee bed, dots, hover states |
| `--pink` | `#f0a9b7` | Support, case-study art only |
| `--green` | `#0e7b5b` | Reserved for the SM crest stamp |
| `--chrome-a/b/c` | `#dcdce2` `#f4f4f7` `#b7b8c0` | ID card sheen |

**Contrast (measured, not assumed):**

- `--ink-soft` on `--paper` — **~11:1**, passes AA and AAA for body text
- `--ink` on `--paper` — **15.5:1**
- `--paper` on `--race` (marquee) — passes AA at the 14px display weight used

`--race` is never used for small body text on paper. It is a bed colour and a
hover state. This is the one rule that keeps the palette accessible.

## Type

| Role | Family | Notes |
|---|---|---|
| Display | **Syne** 600/700/800 | Names, section ledes, step titles |
| Body | **Space Grotesk** 400/500 | All running copy |
| Label | **Space Mono** 400/700 | Nav, meta, numerals, ticker label |

Body never below **15px**. Nav labels are 12px mono uppercase — UI chrome, not
body content. Display scales with `clamp()`; there are no fixed display sizes.

## Spacing

Page gutter `--pad: clamp(20px, 6vw, 96px)` · max width `1440px`.

Section top padding `clamp(100px, 15vh, 180px)`. Within-section rhythm uses
`clamp()` pairs, never arbitrary pixels. Row and step padding
`clamp(26px, 4vh, 44px)`.

## Motion

- `--ease: cubic-bezier(0.22, 1, 0.36, 1)` — decisive, then settled
- `--snap: cubic-bezier(0.34, 1.4, 0.44, 1)` — crest and card only
- One thing resolves at a time. Staggered, never simultaneous.
- Shadows are **hard offsets**, never blurred. Lines are solid ink.
- Every animation has a `prefers-reduced-motion` twin that freezes, not removes.

## Non-negotiables

1. Touch targets ≥ **44×44px**. The mobile nav collapses to crest + Contact
   rather than shrinking five links below that floor.
2. No horizontal page scroll at 375px. Marquee overflow is contained by
   `overflow: hidden` on its own parent and does not count.
3. Every hover state has a keyboard focus twin.
4. No invented numbers anywhere on the site, including years.
5. Spec work discloses itself in the first line of the piece.
