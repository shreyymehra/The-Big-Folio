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
