# CLAUDE.md

Read this file before writing any code, every session. These are constraints, not suggestions. Do not re-derive, re-propose, or "improve" anything marked LOCKED.

---

## PROJECT

Personal portfolio for **Shrey Mehra**. Territory is brand, marketing, product, GTM, business ops and creative execution — see `DIRECTION.md` for the positioning, which is deliberately not "a designer".

Most visitors arrive from a cold email, are sceptical, and decide within ten seconds. Build for that visitor.

**The site must not read as AI-generated or templated.** If a section could belong to any other portfolio, it is wrong.

---

## HOW THIS REPO IS ORGANISED

```
index.html             ← THE SOURCE OF TRUTH. The live site, one self-contained file.
                         Every change ships here. Nothing supersedes it.
absolutily.html        ← case studies. Linked from index.html#work, chained to each other.
cut-the-noise.html
vastr.html
voicedna.html
vrl.html

CLAUDE.md              ← you are here. Global constraints.
DIRECTION.md           ← governing design rules. Positioning, hierarchy, grid, type,
                         colour, motion, and the veto list. Read before building.
TASTE.md               ← what to take and what to leave from each reference.
serve.ps1              ← static preview server. No Node, no npm, no install.
/public                ← favicons, plus the source .webp artwork the hero was cut from.
/references            ← annotated screenshots only. See /references/README.md
/_archive              ← superseded prototypes and specs. Never build from these.
```

**Before building: read `DIRECTION.md`, then `TASTE.md`.** Do not work from memory of a previous session.

**No build step.** `index.html` is hand-authored and self-contained — inline CSS, inline JS,
images as data URIs. There is no framework, no bundler, no `npm install`. Edit the file directly.
Preview with `powershell -ExecutionPolicy Bypass -File serve.ps1` at http://localhost:4321.
Do not reintroduce a toolchain without asking.

---

## THE THREE MARKERS

- **`[LOCKED]`** — decided. Build as stated. Do not propose alternatives.
- **`[OPEN]`** — a genuine decision, with its tradeoff stated. Ask before assuming.
- **`[GAP]`** — content only Shrey can supply. **Stub it visibly** — `[GAP: teaser sentence]` — and say so in your response. Never invent it.

---

## CURRENT STATE

`index.html` is built and complete: loader, nav, hero, work, brain dump, about, FAQ, vinyl, contact.
Five case studies are built and cross-linked. Work from what is in the file, not from a spec of it.

**Palette `[LOCKED]`** — three working colours, declared at `:root` in `index.html`:

| Token | Value | Use |
|---|---|---|
| `--cream` | `#EFE2BA` | ground |
| `--deep` | `#1F2A5C` | all body type and line work |
| `--fluoro` | `#F13C20` | accent, countable per page |

Deep on Cream measures 10.53. Text is never pure black.

**Type `[LOCKED]`** — Bricolage Grotesque (display), Instrument Sans (body), Martian Mono (metadata).

**Rejected aesthetics — do not revive.** Dark+gold+Bodoni+grain; paper+race-red+Syne+halftone;
bone+flare+Bodoni; the six-ink riso set; the near-black cut-out / ransom-note system.
Recoverable at tags `archive/v3-printed-paper` and `archive/v4-cinematic`, and in `_archive/`.

**Layout rule, learned by failing it:** compose with CSS **grid areas**, never `translate3d`
percentage offsets. Percentages resolve against an element's own width and never respond to
viewport — that produced a hero using 35% of a 1440px screen.

---

## HOW TO WORK

**One section at a time. Never batch.** After each, stop, show the result, wait.

**Within a section, work in four passes:**
1. Static structure — no styling refinement, no hover, no motion
2. Refine spacing, type scale, alignment
3. Behaviour — hover, click, expand
4. Motion — reveals, transitions

Never compress these into one request. Doing so is the primary cause of generic output.

**When a request is ambiguous, ask.** A wrong assumption costs more than a question.

**Never invent content or metrics.** Where a number would go, show reasoning.

**Preserve Shrey's voice.** Copy he wrote is source material. Fix typos only. Do not rewrite for tone.

**`index.html` is 1.9MB because the images are inline.** Edit with targeted string
replacement, not whole-file rewrites.
