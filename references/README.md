# REFERENCES

## THE RULE

**A reference without an annotation is worse than no reference.**

Dropping a screenshot and saying *"like this"* produces imitation of the surface — usually the colours and nothing else. Naming the property produces translation.

Every image in this folder must have a filled slot in its section brief. Three lines:

```
### ref_work_grid.png
- Take only:  the spacing rhythm — 40px between cards, 160px above the section
- Ignore:     its colour, its type, its hover behaviour
- Why:        our current grid has inconsistent gaps and reads cluttered
```

**"Ignore" is the most important line.** Without it, the reference gets absorbed wholesale and drags the whole design toward someone else's system.

---

## WHERE THINGS GO

Two places, and the difference matters: `references/` never ships, `assets/` always does.

| You have | Put it in | Ships? |
|---|---|---|
| A font, lettering or type-scale screenshot | `references/type/` | no |
| A grid, spacing or composition screenshot | `references/layout/` | no |
| A scroll, hover or transition recording | `references/motion/` | no |
| A palette, texture, riso or dither sample | `references/colour/` | no |
| A whole site whose feel you want | `references/tone/` | no |
| A finished project cover or detail crop | `assets/work/<slug>/` | **yes** |
| A company logo for Worked with | `assets/logos/` | **yes** |
| A tool icon for the Ideas desk stickers | `assets/icons/` | **yes** |
| A magazine page or sticker PNG for Ideas | `assets/ideas/` | **yes** |
| A licensed .woff2 font file | `assets/fonts/` | **yes** |

Each folder has its own README with the exact filenames it expects.

---

## NAMING

`ref_[section]_[property].png`

Good:
```
ref_hero_typescale.png
ref_work_grid.png
ref_bento_expand.png
ref_motion_sectionreveal.png
```

Bad:
```
Screenshot 2026-08-18 at 14.32.11.png
inspo1.png
```

The filename should tell Claude Code what to extract before it opens the image.

---

## ONE REFERENCE PER PROPERTY

Three type references produce a compromise between three type systems — which is mush. Pick the single best one for each property.

Group by **layer**, not by site:

| Layer | What to annotate |
|---|---|
| **Type** | The scale *relationship*. "Display is ~6x body, nothing in between." |
| **Spacing** | The vertical rhythm. "160px between sections, 24px within." |
| **Layout** | The grid logic. "Asymmetric two-column, content sits left of centre." |
| **Motion** | The *behaviour*. "Sections hold for a beat before content enters." |
| **Tone** | The overall feeling. One sentence, one reference maximum. |

---

## SAY WHAT YOU'RE REJECTING

*"I like this layout but its motion is too bouncy and its colour is too warm"* is more useful than pure admiration. It draws the boundary Claude Code needs.

---

## WHEN A REFERENCE CONFLICTS WITH `DIRECTION.md`

**The system wins.** References inform execution within the locked system — they do not override tokens, type families, spacing values, or motion doctrine.

If a reference is genuinely incompatible with the system, say so rather than quietly splitting the difference.
