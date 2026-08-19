# CLAUDE.md

Read this file before writing any code, every session. These are constraints, not suggestions. Do not re-derive, re-propose, or "improve" anything marked LOCKED.

---

## PROJECT

Personal portfolio for **Shrey Mehra** — Creative Strategist, Brand & Culture. Targets: Anthropic, OpenAI, FAANG, culture-led brands.

Most visitors arrive from a cold email, are sceptical, and decide within ten seconds. Build for that visitor.

**The site must not read as AI-generated or templated.** If a section could belong to any other portfolio, it is wrong.

---

## HOW THIS REPO IS ORGANISED

```
CLAUDE.md              ← you are here. Global constraints.
/briefs                ← one file per section. Read the relevant one before building.
  00-system.md            Design tokens, motion, accessibility. Read first.
  01-hero.md
  02-ticker.md
  03-work.md
  04-brain-dump.md
  05-about.md
  06-faq.md
  07-vinyl.md
  08-contact.md
/references            ← annotated screenshots. See /references/README.md
```

**Before building any section: read `/briefs/00-system.md`, then that section's brief.** Do not work from memory of a previous session.

---

## THE THREE MARKERS

- **`[LOCKED]`** — decided. Build as stated. Do not propose alternatives.
- **`[OPEN]`** — a genuine decision, with its tradeoff stated. Ask before assuming.
- **`[GAP]`** — content only Shrey can supply. **Stub it visibly** — `[GAP: teaser sentence]` — and say so in your response. Never invent it.

---

## BUILD ORDER — STRICTLY SEQUENTIAL

`HERO → TICKER → WORK → BRAIN DUMP → ABOUT → FAQ → VINYL → CONTACT`

`PortfolioHero.tsx` already exists. Match its system exactly rather than reinventing it.

---

## HOW TO WORK

**One component at a time. Never batch.** After each, stop, show the result, wait.

**Within a component, work in four passes:**
1. Static structure — no styling refinement, no hover, no motion
2. Refine spacing, type scale, alignment
3. Behaviour — hover, click, expand
4. Motion — reveals, transitions

Never compress these into one request. Doing so is the primary cause of generic output.

**When a request is ambiguous, ask.** A wrong assumption costs more than a question.

**Never invent content or metrics.** Where a number would go, show reasoning.

**Preserve Shrey's voice.** Copy he wrote is source material. Fix typos only. Do not rewrite for tone.

---

## CURRENT BUILD STATE — appended 18 Aug 2026, post-handover

The pack above predates the current build. Three corrections, all verified:

**1. `PortfolioHero.tsx` does not exist.** The build-order section says to match it. There is no such file and there never was in this repo — the reference was inherited from an older brief. Chasing it is what let three different visual systems drift apart unnoticed. **The hero is `src/components/Hero.astro` and it is built.**

**2. Stack is Astro, not React/TSX.** Astro 7.2.2, Node 24.19.0, native CSS, no framework. Run the dev server **from the repo root** — passing `--root` doubles the path and breaks every import:

    node node_modules/astro/bin/astro.mjs dev --port 4321

**3. The aesthetic is the cut-out / ransom-note system** — from Shrey's reference image, 18 Aug. Each word in its own label box, **a different typeface per adjacent word** (that mismatch is the effect; never unify). Starburst punctuation over photography on near-black.

`src/components/CutWord.astro` is the primitive — `cut={1..5}` selects the family. Build every headline from it. All values live in `src/styles/tokens.css`; nothing downstream hardcodes a colour, size or curve.

Three earlier aesthetics were rejected and must not be revived: dark+gold+Bodoni+grain, paper+race-red+Syne+halftone, bone+flare+Bodoni. Recoverable at tags `archive/v3-printed-paper` and `archive/v4-cinematic`.

**Built:** loader (slot machine), hero, value section. **Unbuilt:** ticker, work, brain dump, about, FAQ, vinyl, contact.

**Layout rule, learned by failing it:** compose with CSS **grid areas**, never `translate3d` percentage offsets. Percentages resolve against an element's own width and never respond to viewport — that produced a hero using 35% of a 1440px screen. It now re-lays-out at 1080px and 760px.

**Before art-directing anything, fix screenshot capture.** The previous session could never see its own output — the preview tab reported `visibilityState: hidden`, which also suspends `requestAnimationFrame` and scroll events. An entire direction was built blind and rejected on sight. Measurements verify structure; they cannot tell you whether it looks good.

See `COWORK-BRIEF.md` for the full gap inventory and `POSTMORTEM.md` for why two builds were rejected.
