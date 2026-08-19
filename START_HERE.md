# START HERE

## WHAT THIS IS
A section-by-section brief pack for the portfolio build, structured so Claude Code can execute without guessing.

## HOW TO USE IT

**1. Drop this whole folder into your repo root.**
`CLAUDE.md` must sit at the root — Claude Code reads it automatically at the start of every session. This alone stops the drift that has been mushing your output.

**2. Add your screenshots to `/references`.**
Name them by what to extract: `ref_work_grid.png`, not `Screenshot 2026-08-18.png`. Read `/references/README.md` first.

**3. Fill the reference slots.**
Every section brief has empty slots with three lines each: *Take only / Ignore / Why*. The "Ignore" line matters most — without it the reference gets absorbed wholesale.

**4. Fill the `[GAP]` markers.**
These are content only you can supply. Claude Code will stub them visibly rather than inventing them.

**5. Open each session like this:**
```
Read CLAUDE.md and briefs/00-system.md, then briefs/03-work.md.
Build the static work grid only — three cards, no hover, no motion.
```

## THE PATTERN THAT FIXES MUSH

Four passes per component, four separate requests:

```
1. Static structure    no styling refinement, no hover, no motion
2. Refine              spacing, type scale, alignment
3. Behaviour           hover, click, expand
4. Motion              reveals, transitions, stagger
```

Compressing these into one request is the primary cause of generic output. Four requests feels slower and finishes faster, because you are not patching a wrong foundation.

## WHEN SOMETHING LOOKS WRONG

Don't say "this isn't right." Identify which of four properties is broken and name it:

| Property | Symptom | What to say |
|---|---|---|
| **Spacing rhythm** | "cluttered" / "empty" | "vertical spacing inconsistent — standardise to 160px between sections" |
| **Type scale** | "flat" / "nothing stands out" | "not enough contrast — push display to 96px, remove intermediate sizes" |
| **Alignment** | "looks like a template" | "too much centred — left-align headers to the hero edge" |
| **Hierarchy** | "busy" | "three elements competing — make title dominant, drop tags to muted" |

Ninety percent of "this looks off" is one of those four.

## OPEN DECISIONS BLOCKING THE BUILD

1. **Vinyl player vs Rubik's cube** — see `briefs/07-vinyl.md`. Resolve before building either.
2. **Skills split** — Fluent vs Working Knowledge. See `briefs/05-about.md`.

## FOLDER MAP
```
CLAUDE.md                  Global constraints. Root of repo.
START_HERE.md              This file.
/briefs
  00-system.md             Tokens, type, spacing, motion. Read first, every time.
  01-hero.md               [BUILT]
  02-ticker.md
  03-work.md
  04-brain-dump.md
  05-about.md
  06-faq.md
  07-vinyl.md              [OPEN — decide first]
  08-contact.md
/references
  README.md                How to annotate. Read before adding images.
```
