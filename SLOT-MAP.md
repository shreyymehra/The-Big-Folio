# Content slot map

Every empty slot on the site, where it lives, what fits in it, and the rule
its alt text has to follow. Written 27 Oct, after pass 1.

Nothing in this list was filled in by guessing. Where a brief says "from
Shrey", the slot is empty and the validator refuses to publish it.

```bash
node tools/validate-proof.js          # what is still open
node tools/validate-proof.js --strict # exit 1 on warnings too
```

---

## 1. The receipt (homepage hero)

Four lines, each opening to how it was measured. The numbers are real and
already on the page. **What is missing is the evidence behind them.**

| Slot | File | What goes in | Rule |
|---|---|---|---|
| R01 | `index.html`, `data-slot="R01"` | Baseline, period, role, how measured, for **vendor costs −78%** | One or two sentences. No rounding, no reframing. |
| R02 | `index.html`, `data-slot="R02"` | Same, for **engagement +46%** | As above |
| R03 | `index.html`, `data-slot="R03"` | Same, for **churn −16%** | As above |
| R04 | `index.html`, `data-slot="R04"` | Same, for **click-through +310%** | As above |

Each needs four things, and the honesty rules mean a line ships without them
rather than with a plausible version: **what it was before, over what period,
what your role was, and how it was measured.**

---

## 2. Proof artefacts

One JSON file each, in `content/proof/`. Images go to
`assets/img/proof/<project>/<nn>-<slug>.webp`.

**Every image needs:** full size 1600px on the long edge, a `-640.webp`
thumbnail, and real `width`/`height` in the JSON or the card shifts the
layout as it loads.

**Alt text rule, everywhere:** 125 characters or fewer, describing what is
*in the frame*, not what the project is. `""` only if the image is
decorative and the information is in the text beside it. Captions: 140
characters or fewer.

### Vastr ad suite — spec, no permissions needed

| File | Image | Open fields |
|---|---|---|
| `vastr-ad-1x1.json` | `vastr/01-ad-1x1.webp`, 1600×1600 | alt, caption |
| `vastr-ad-4x5.json` | `vastr/02-ad-4x5.webp`, 1600×2000 | alt, caption |
| `vastr-ad-9x16.json` | `vastr/03-ad-9x16.webp`, 1080×1920 | alt, caption |
| `vastr-appstore-frames.json` | `vastr/04-appstore-frames.webp`, 1600×900 | alt, caption |

### Voice'D product-marketing pack — in build

| File | Open fields |
|---|---|
| `voiced-positioning.json` | 3 alternatives, 3 unique attributes, the value sentence, 2 best-fit segments, the category |
| `voiced-messaging-house.json` | the roof line, 3 pillars with 2 proof points each, 2 reasons to believe |

These render as **real text, not images**, so they are selectable and
indexable. No image needed.

### Tickertape launch proof — blocked on permission

| File | Open fields |
|---|---|
| `tickertape-launch-01.json` | title, **status** (shipped or recreated, your call), period, role, alt, caption, `result.baseline`, `result.measuredBy` |

**This one cannot be filled in until you decide what you are cleared to
show.** Redact names, emails, internal URLs and non-public figures before the
file is converted, not with a CSS overlay.

### Venus Roadlines manual — family sign-off already given

| File | Image | Open fields |
|---|---|---|
| `vrl-manual-01.json` … `-04.json` | `vrl/0n-manual-spread.webp`, 1600×1131 | title, period, role, alt, caption |

---

## 3. Still open from earlier passes

| Code | Where | What |
|---|---|---|
| A9 | `NEEDS.md` | The Vastr poster reads "vastra" and `vastra.com.au`; the Voice'D poster reads "Voiced." Neither matches the site. Re-export, or I sweep the site to the poster spellings. |
| B6 | `NEEDS.md` | Two FAQ answers only you can write: your work rights, and the three role titles. |
| G01–G17 | `FILL-IN.md` | The original gap register. Seven still have a live `data-slot`. |

---

## 4. Not built, and why

- **Section A of `site-change-brief.md`, "breaks 1 to 10".** Named as a third
  of pass 1. It is not in the repo and was not pasted, so it is not built.
- **`/proof/` page, the components and the SkillProofGrid.** These are
  sections 5 and 6 of the proof brief, not pass 1, and they have nothing to
  render: the grid is specified to hide below four qualifying cells and
  there are zero published items. The data model they read from is built.
- **Case template v2** (artefact strips, At a glance, sticker-head asides,
  "Built to:"). That is pass 2.
- **Name-tag maker, cut-letter numerals, 404 in cut letters.** Pass 3, and
  the numerals need about 60 new glyphs. Only one `alphabet.webp` sheet
  exists, not individual glyph files; it can be sliced the same way the eight
  client marks were cut.
- **Four items the brief asked for that reverse your own recent
  instructions**, which you confirmed should stand: Ideas stays out of the
  nav, the zine stays off the homepage, the logo wall stays in the hero, and
  the work block stays as Work-index rows rather than taped cards.

---

## 5. One question the brief raised and I could not answer

The zine cover reads *"CTRL SHREY… He is gambling on his future but… does he
stand a chance?"* The brief asks where that came from, because if it was made
for one employer's application the gambling line narrows who it speaks to.

**The zine is currently off the homepage**, so nothing is shipping with it
either way. If it comes back, that question needs answering first.
