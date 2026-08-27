# 00 — SYSTEM `[LOCKED]`
**Cut-out / ransom-note. v5.** Corrected 19 Aug 2026 to match `src/styles/tokens.css`, which is the source of truth.

Read before every section. Do not re-derive.

> **This file previously specified gold `#C9A96E` + Playfair-italic-only + Inter Light + film grain.** That system is dead — it is one of the three rejected in `POSTMORTEM.md`, and it contradicted `tokens.css` in this same repo for a full day. Preserved with reasoning at `_archive/00-system-gold-REJECTED.md`. **It is not a fallback.**
>
> Also rejected, per `POSTMORTEM.md`: paper `#f4eee2` + race-red + Syne + halftone (`archive/v3-printed-paper`), bone + flare + Bodoni Moda + grain (`archive/v4-cinematic`). Both recoverable by tag. Neither is revivable.

---

## THE ONE IDEA

Each word sits in its own label box. **Every adjacent word uses a different typeface.** That mismatch *is* the effect — not a roughness to be smoothed later. Starburst shapes act as punctuation. Labels sit over photography on a near-black ground, each with a hard offset shadow so it reads as stuck down rather than typeset.

If a section could belong to another portfolio, it is wrong.

---

## TOKENS — `src/styles/tokens.css`

**Every value lives there. Nothing downstream hardcodes a colour, size or curve.** These are the names as they actually exist — use them verbatim.

```css
/* ground */
--void: #0b0b0d;   --paper: #fbf9f4;   --paper-2: #efe9dc;   --ink: #14120f;

/* the loud ones */
--hot: #ff2e88;    --cold: #2f5bff;    --acid: #e8ff3a;

/* semantic aliases — prefer these downstream */
--ground --label-bg --label-ink --text --text-mid
```

**Rules:**
- One loud colour per viewport. Never `--hot` and `--cold` competing in the same screen.
- `--hot` and `--cold` never touch — put `--paper` or `--void` between them or it reads as a sticker bomb.
- `--acid` is the win state. It fails contrast on `--paper`; it only ever sits on `--void` or `--ink`.
- `--paper-2` is the aged label — use it to break up a run of three or more labels, never as a system-wide swap.

---

## THE FIVE CUTS

`src/components/CutWord.astro` is the primitive. **Build every headline from it.**

```astro
<CutWord cut={2} tone="hot" rotate={-2} size="lg" depth={0.4}>BRANDS</CutWord>
```

| Prop | Values | Notes |
|---|---|---|
| `cut` | `1–5` | selects the family — see below |
| `tone` | `paper` (default) · `hot` · `cold` · `acid` · `ink` | label fill |
| `rotate` | degrees | **keep small — ±1 to ±3.** These are stuck by hand, not thrown |
| `size` | `lg` · `sm` | `--t-cut` / `--t-cut-s` |
| `depth` | number, `0` = pinned | parallax strength |

| cut | Family | Role |
|---|---|---|
| 1 | Playfair Display, italic 600 | the romantic — abstractions, the soft word in a hard line |
| 2 | Archivo Black, uppercase | the shout — verbs, the load-bearing noun |
| 3 | Courier Prime, 700 | the evidence — meta, dates, receipts |
| 4 | DM Sans, 500 | the neutral — connective tissue, the word you don't want noticed |
| 5 | Bebas Neue, uppercase | the poster — proper nouns, brand names |

**Never two adjacent words on the same `cut`.** Once a headline is set, it is set — re-rolling cuts on load makes the site read unfinished, not alive.

**"In development" uses `tone="ink"`** — dark label on dark ground reads as recessed without needing a new tone.

---

## LABEL PHYSICS

```
--label-pad-y: 0.14em    --label-pad-x: 0.34em
--label-shadow: 3px 3px 0 rgba(0,0,0,0.42)
--label-radius: 2px
```

The hard offset shadow is not decoration — it is what makes a label read as a physical cut-out rather than a coloured span. **Never soften it to a blur.** Never remove it on hover; move the label instead.

---

## TYPE SCALE & SPACE

```
--t-cut: clamp(1.35rem, 5.2vw, 4.4rem)    --t-cut-s: clamp(0.9rem, 2.4vw, 1.6rem)
--t-body: clamp(1rem, 1.05vw, 1.1rem)     --t-micro: 0.7rem

--s-1: .5rem   --s-2: 1rem   --s-3: 1.75rem   --s-4: 3rem   --s-5: 5rem   --s-6: 8rem
--gutter: clamp(1.1rem, 4.5vw, 4.5rem)    --max: 92rem
```

Use these and nothing between them. Contrast between sizes is deliberate — **adding intermediate steps to smooth the scale is the flatness failure mode this system exists to prevent.** Body type never below 16px.

---

## LAYOUT

**Compose with CSS Grid template areas. Never `translate3d` percentage offsets.** Percentages resolve against an element's own width, not the viewport — that is what produced a hero occupying 35% of a 1440px screen. `Hero.astro` re-lays-out at **1080px** and **760px**. Match that pattern.

Editorial and asymmetric — magazine logic, not SaaS card-grid. Left-aligned by default; centring is a deliberate exception.

---

## FURNITURE

`src/components/Burst.astro` is the starburst. Beyond it:

- **Starburst** — terminal punctuation, ticker separator, "real ✓" stamp. Ends a thought; never sits alone as decoration.
- **Barcode** — case index numbers, footer serial. Never scannable; it is a mark, not a claim.
- **Rotated side label** — annotates a photo or card edge, `writing-mode: vertical-rl`. Max one per element.
- **Corner brackets** — focus marker for nav and interactive targets.
- **Leader line + tag** — the case-study annotation device. This is how the messy middle gets shown.
- **Halftone duotone** — all photography. `--cold` → `--hot` ramp. Never a clean photo.

---

## MOTION

```
--ease-out:  cubic-bezier(.22, 1, .36, 1)     --d-fast: 240ms
--ease-snap: cubic-bezier(.16, 1.06, .3, 1)   --d-mid:  560ms
                                               --d-slow: 900ms
```

**One thing resolves at a time.** Staggered, never simultaneous. Children stagger 80ms.

**Banned:** bounce, spring overshoot, confetti, parallax on text, anything drawing attention to itself rather than the content.

⚠️ **`--ease-snap` overshoots** (1.06). It contradicts the overshoot ban and exists for the loader's mechanical reel-settle, where a slot machine physically overshoots and that is the point. **Scope it to `Loader.astro` only.** If it appears anywhere else, that is drift — reach for `--ease-out`.

`prefers-reduced-motion: reduce` collapses `--d-fast/mid/slow` to 1ms in `tokens.css`. That kills duration but **not** infinite animations — the ticker and the reel loop must be paused explicitly in their own components. Non-negotiable.

---

## ACCESSIBILITY — FLOOR, NOT FEATURE

- Visible focus on every interactive element. Never `outline: none` without a replacement.
- Full keyboard reachability — work rows, FAQ tiles, ticker pause, vinyl.
- Contrast AA. `--text-mid` is `rgba(251,249,244,.62)` — **below the 0.7 opacity floor.** Use it for decorative meta only, never for content a visitor needs to read.
- 44px minimum tap targets.
- Content reflows, never shrinks. Test at 390px.
- All images have alt text. 404 page exists.

---

## RUNNING IT

```
node node_modules/astro/bin/astro.mjs dev --port 4321
```

**From the repo root.** Passing `--root` doubles the path and breaks every import.

**Screenshot before calling anything done.** Playwright + Chromium at `/opt/pw-browsers/chromium`, captured at 1440px and 390px. A previous session built an entire aesthetic direction blind and had it rejected on sight. Measurements verify structure; they cannot tell you whether it looks good.
