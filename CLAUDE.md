# The Big 'Folio — project context

Personal portfolio for **Shrey Mehra** (Melbourne). Creative strategy, brand,
comms. Targeting Anthropic, OpenAI, FAANG and culture-driven scaleups across
APAC and US/Global.

**The reaction being engineered:** *"This person could build a world out of nothing."*

**Positioning line:** I build brands people want to belong to.

---

## Run it locally

No Node or Python on this machine. A dependency-free PowerShell static server
ships with the repo:

```bash
PORT=5050 pwsh ./serve.ps1
```

Then open `http://localhost:5050`. Plain static HTML/CSS/JS — no build step.

---

## Source documents (outside the repo)

These live in `C:\Users\User\Contacts\` and are **not** version controlled:

| File | Date | Role |
|---|---|---|
| `PortfolioBuild.odt` | 10 Aug 2026 | **Newest. Wins on content.** Sections, case study substance, skills, contact copy |
| `BRIEF_PACK_Portfolio.md` | 5 Aug 2026 | Sharpest reasoning. Wins on UX rationale and house rules |
| `CONTEXT_Shrey_Portfolio.md` | 6 Jul 2026 | Standing brief. Voice, audience, taste |
| `Visual Cues/` | Jul 2026 | Reference screenshots (Antony Raphy, Prasshanna) — contextual, keeps changing |
| `Shrey_Portfolio_Framer/` | Jul 2026 | Origin of this build. `preview/` was copied here to seed the repo |

---

## The single most important piece of history

**The visual system has been re-specified three times and shipped zero times.**

- `CONTEXT` §9 and `BRIEF_PACK` §5 both mark a **near-black + parchment + gold +
  Bodoni + film grain** system as `[LOCKED]`
- The July Framer README specifies **Y2K riso on paper** — cobalt, tangerine,
  halftone — and states the parchment-and-gold system "is gone"
- What was actually **built** is a third thing: **warm paper + race red + Syne**

`BRIEF_PACK` §5 also instructs "match `PortfolioHero.tsx` exactly." **That file
does not exist** — the real hero is `Hero.tsx`, in the third system. The brief's
own anchor is missing, which is how the systems drifted without anyone noticing.

**Resolution: the built v3 system wins.** It is documented in
[`DESIGN-TOKENS.md`](DESIGN-TOKENS.md), which is now the source of truth. Do not
re-derive the palette from the briefs. If a brief and the CSS disagree, the CSS
is right.

The bottleneck on this project has never been taste. It is a live URL.
**Bias every decision toward shipping.**

---

## Conflicts between briefs, and how each was resolved

| Question | `.odt` (newest) | `BRIEF_PACK` | Resolution |
|---|---|---|---|
| Opening sequence (childhood photo prelude) | Wants it | Killed it — spends the 10-second cold-email budget before delivering value | **Killed.** Photo relocates to About |
| Ticker content | Client logos | `[LOCKED]` text — logos imply client relationships that don't exist | **Text.** Now carries the six testimonial lines |
| Signature element | Kept vinyl **and** cube | Pick one — "boldness is spent in one place" | **Vinyl only** (not yet built). Cube cut |
| Case study 01 subject | L'Oréal | L'Oréal | Agreed. (`CONTEXT` said fictional AI company — superseded) |
| Work slate | 5 pieces | Same 5 | Agreed. "Cut The Noise" and "The Teardown" from v3 are **not** on the `.odt` slate |

---

## House rules — non-negotiable

1. **Nothing reads as AI-generated.** First person, specific, occasionally funny,
   never corporate. If a line could belong to someone else's portfolio, it is
   wrong — rewrite it.
2. **No invented metrics. Ever.** Including years. Where a number would go, show
   the reasoning instead.
3. **Spec work discloses itself in the first line** of the case study.
4. **Never a dead link.** Unfinished work is labelled "In development" with a date.
5. **No services menu, no pricing, no booking widget.** This is a creative
   statement, not a freelance funnel.
6. **Accessibility is a floor.** Visible focus states, keyboard reachable,
   `prefers-reduced-motion` honoured, 44px touch targets, WCAG AA contrast.
7. **Preserve Shrey's voice when editing his copy.** Typo-correct; do not rewrite
   for tone. Flag changes rather than erasing him.

---

## Working style

From `CONTEXT` §4: *"Anti-sycophancy is on. Blunt, top-tier advisory. Push back on
weak ideas. Never fabricate progress."* Act as a creative sparring partner, not a
yes-man.

**Build order is sequential** — HERO → TICKER → WORK → BRAIN DUMP → ABOUT → FAQ →
CONTACT. Stop after each section, show the result, review, then continue. Do not
batch. Shrey's note: the portfolio has failed before by being mushed together.

---

## Current state

**Built:** Hero (name + flipping ID card + cursor aura), testimonial ticker,
Work index, Brain Dump (5 steps), About, FAQ, Contact, footer with a JoJo
easter egg (hold the crest). Mobile nav collapses to crest + Contact at ≤560px.

**Written case studies:** `case-loreal.html`, `case-vastr.html`.

**Open — needs Shrey:**

- Resume file or link (`[GAP]`)
- ID photo (`assets/shrey-id.jpg`) and childhood photo for About
- Spotify playlist URL, if the vinyl gets built
- Absolut, Duolingo and VRL case study content; VRL needs real files
- **Skills honesty split.** The `.odt` claims *Anthropic API & MCP* while
  applying to Anthropic — this will be asked. Also Salesforce, Tableau,
  MoEngage, Amplitude, GitHub. Anything Shrey cannot defend for five minutes
  under interview pressure moves to Working Knowledge or comes off. A shorter
  honest list costs nothing; getting caught thin is unrecoverable.

**Standing recommendation not yet accepted:** lead the work slate with Vastr
rather than L'Oréal. Four of five pieces improve brands that already exist;
Vastr is the only one that starts from a blank page, and it is therefore the
only piece carrying the "world from nothing" proof.

---

## Voice reference

Shrey's own writing, kept because it is unfakeable and sets the register:

> My high-school crush called me an 'empath' once and I took it seriously as a
> job title.

> A boy's got to fund his dreams and the city rent.

> Sharpening the axe is the fastest way to cut down the tree.

---

## Stack (v4 rebuild, branch `v4-cinematic`)

**Astro.** Chosen after the v3 static build proved unable to absorb new
instructions: one 700-line stylesheet, one 400-line HTML file, five case pages
sharing an identical nav block by copy-paste, and no content layer. Adding a
section meant hand-editing four places.

```sh
npm run dev      # localhost:4321
npm run build    # -> ./dist
npm run preview
```

Node lives at `C:\Program Files\nodejs` and is **not** on the inherited PATH of
already-running shells. Prepend it per command:

```sh
export PATH="/c/Program Files/nodejs:$PATH"
```

The old site is preserved untouched in `_legacy/`. The L'Oréal and Vastr
**writing** is worth porting; the shell around it is not. The three
"in development" stubs were templated filler and should not be ported.

### Architecture rules for this rebuild

1. **Case studies are content, not pages.** Markdown in a content collection.
   Adding one is a file, never a copied template.
2. **Every token in one place.** Colour, type, spacing, motion curves. The
   aesthetic is still being decided — when it lands it must be a token swap and
   a scene re-skin, not another rebuild. This is the whole point.
3. **Scenes, not sections.** Direction is cinematic (Up Bank / Netflix / Apple).
   Work is staged as full-bleed scenes arriving on scroll, not a row index.
4. Motion is `transform` and `opacity` only. `IntersectionObserver`, never
   scroll listeners. Grain lives on a fixed `pointer-events-none` layer.

## Skills installed for this work

- `.agents/skills/` — 13 taste skills (`npx skills add Leonxlnx/taste-skill`).
  Most relevant: `design-taste-frontend`, `high-end-visual-design`,
  `redesign-existing-projects`, `brandkit`.
- `~/.claude/commands/web-interface-guidelines.md` — Vercel's guidelines.
- `rampstack-skills@rampstack` in user settings — 103 website-lifecycle skills.

**All three need a Claude Code restart to load.** Until then their SKILL.md
files can be read directly off disk.

Note: `high-end-visual-design` bans Inter, which the original `CONTEXT` §9
specified as the body face. Its "Editorial Luxury" archetype — warm creams,
high-contrast serif, film grain at 3% — independently lands very close to
Shrey's original parchment/Bodoni/grain system.
