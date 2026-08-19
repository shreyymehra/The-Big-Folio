# 00 — SYSTEM `[LOCKED]`

Read before every section. Do not re-derive.

---

## TOKENS

```css
--ground:  #0D0C0A;   /* all backgrounds */
--text:    #F0EDE6;   /* primary type */
--accent:  #C9A96E;   /* gold-wheat — MAX 3 uses site-wide */
--muted:   #8C8778;   /* secondary type, labels */
```

The accent budget is real. Three moments across the entire site. Scarcity is the point — spend it on the hero eyebrow, one work-card hover, and one contact element. Nothing else.

---

## TYPE

- **Display:** `'Playfair Display', serif` — *italic only*
- **Body:** `Inter` — weight 300 only

No other families. No other weights.

**Scale — use these, nothing between:**

| Role | Size | Line-height |
|---|---|---|
| Display | `clamp(52px, 10vw, 128px)` | 1.02 |
| Section | `clamp(32px, 5vw, 56px)` | 1.1 |
| Body | `17px` | 1.55 |
| Label | `13px` · `letter-spacing 0.14em` · uppercase | 1.2 |

Contrast between sizes is deliberate. **Do not add intermediate sizes to smooth the scale** — flatness is the failure mode this system exists to prevent.

---

## SPACING

8px base. Use only these values:

```
4 · 8 · 16 · 24 · 40 · 64 · 96 · 160
```

- Between major sections: `160px` desktop / `96px` mobile
- Within a section: `24px` or `40px`
- Never invent a value. Inconsistent vertical rhythm is the most common tell of amateur output.

---

## LAYOUT

- **Editorial and asymmetric.** Magazine logic, not SaaS card-grid.
- **Left-aligned by default.** Centring is a deliberate exception, never a default.
- Max content width `1400px`. Outer padding `clamp(24px, 6vw, 80px)`.
- Whitespace is structural. When in doubt, add space rather than content.

---

## TEXTURE

Film grain overlay on every section:

```
SVG feTurbulence · baseFrequency 0.85 · numOctaves 2
opacity 0.05 · mixBlendMode overlay · pointer-events none
```

Present, never distracting.

---

## MOTION

- **One thing resolves at a time.** Staggered, never simultaneous. Children stagger `80ms`.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Duration: `0.4s`–`0.8s`
- **Banned:** bounce, spring overshoot, confetti, parallax on text, anything drawing attention to itself rather than the content.
- `prefers-reduced-motion: reduce` disables all motion. Non-negotiable.

---

## ACCESSIBILITY — FLOOR, NOT FEATURE

- Visible focus states on every interactive element. Never `outline: none` without a replacement.
- Full keyboard reachability.
- Body type never below 16px.
- Text opacity never below `0.7`.
- Mobile: content **reflows**, never shrinks. Test at 390px.
