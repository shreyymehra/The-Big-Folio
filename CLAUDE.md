# CLAUDE.md

Read this before writing any code, every session. These are constraints, not suggestions.
Do not re-derive, re-propose, or "improve" anything marked LOCKED.

**Also read, before touching design or copy:**
- `DIRECTION.md` — the governing art direction. Hierarchy, grid, colour, veto list.
- `TASTE.md` — what the reference set is for. Take / leave / why.
- `POSTMORTEM.md` — why two earlier builds were rejected. Read before proposing anything.
- `taste-skill/SKILL.md` — the working method: reconcile sources, audit assets, verify claims, look at output.

---

## PROJECT

Personal portfolio for **Shrey Mehra**. Melbourne, working globally.
`shreyymehraa@gmail.com` · `linkedin.com/in/shreymehraa`

**Positioning.** Culturally fluent, strategically and commercially aware creative professional.
Territory is marketing, product, GTM, business ops, creative execution and AI-enabled ways of working.
Not "a designer". Not "a copywriter". Targets: Anthropic, OpenAI, FAANG, culture-led scaleups.

**Governing line.** If you appeal to everyone, you tie yourself to no one.

**Traffic reality that shapes every decision.** Most visitors arrive from a cold email, clicked
reluctantly, and decide in under ten seconds whether this person is worth their time. Build for the
sceptical first-time visitor, not someone already convinced.

**The site must not read as AI-generated.** If a section could belong to any other portfolio, it is wrong.

---

## SUPERSESSION — older handover docs conflict with this file

A handover dated 8 Sep 2026 circulates that names the **v5 cut-out system** as authoritative
(void `#0b0b0d`, hot pink, cold blue, acid, five typefaces, ransom note on near-black). It is stale.
So is any doc listing the eyebrow as "Creative Strategist — Brand & Culture", a "Melbourne → Global"
badge, or a five-piece slate led by L'Oréal with a fictional app called Debra.

**Where anything conflicts with this file, this file wins.** The v6 editorial system below was
approved after those docs were written, alongside a widened positioning and a veto list that
explicitly kills the badge. Reviving v5 wholesale would be the fourth restart.

What survived from v5: the found cut-out name tiles, the halftone photo merge, the riso star, the
hover inversion. Those are devices inside the v6 system, not a licence to restore its palette.

---

## ACTUAL BUILD STATE — read this before believing any other file

Corrected 8 Sep 2026. The Astro build described in earlier versions of this file no longer exists:
commit `d5aa99b` ("Make index.html the source of truth; strip the dead toolchain") deleted `src/`,
`package.json` and the toolchain deliberately, to collapse three parallel realities into one.
The site is now routed, hand-authored HTML with a shared stylesheet and no build step.

| Thing | State |
|---|---|
| `index.html` | **`/home`.** The narrative journey: hero, selected work, ideas, brain dump, about, contact. |
| `/work/index.html` | **`/work`.** The complete index, tag-filtered, one row per project. |
| `/work/<slug>/` | Five case pages: vastr, cut-the-noise, voicedna, vrl, absolutily. |
| `/ideas/`, `/ideas/idea-N/` | Index plus five routed shells. **No content yet — every line is a `[GAP]`.** |
| `/about/`, `/contact/` | One page each. About carries the long version plus the FAQ. |
| `assets/site.css` | **THE stylesheet.** Every page links it. Edit here, never per page. |
| `assets/site.js` | Shared behaviour: nav, reveals, rail, year stamp. |
| `assets/scroll.js` | Work-index reveal. Uses Motion's `inView`, not scroll-linked — see the note in the file. |
| `assets/vendor/` | Vendored `lenis.min.js` and `motion.min.js`. Prebuilt dists, committed on purpose. |
| `assets/img/` | Page imagery, content-hashed. Extracted from inline data URIs (index.html was 1.81MB). |
| `_archive/v6-prototype/v6.html` | The v6 ink/paper prototype. **Not adopted** — see the palette note below. |
| `_archive/pre-routing-cases/` | The case pages before routing. Superseded by `/work/<slug>/`. |
| `_archive/flat-routes/` | The flat root-level pages before routing. Superseded. |
| Branch | `v5-blocks`, pushed, tracking `origin/v5-blocks`. |

---

## STOP MAKING NEW HTML FILES

Six versions existed because each change shipped as a new self-contained file. Nothing accumulated
and every change re-opened the whole page. This is the failure mode this repo keeps returning to,
and `d5aa99b` was written specifically to end it.

**The rule:** one page per route, edited in place. Versions live in git history, not in filenames.
If you find yourself about to write `v7.html`, or to copy a page in order to change it, stop.
A second copy of a live page is the bug, not the backup.

**Shared, not self-contained.** CSS and JS are shared files; images are files under `assets/img/`.
Inlining a stylesheet or an image back into a page is a regression — it is how the duplication
started last time. There is still no framework, no bundler and no `npm install`.

**Links are root-relative** (`/work/vastr/`, `/assets/site.css`). Pages sit at different depths,
so relative links break. After adding a page, confirm every internal reference still resolves.

**Adding a project** means: one `/work/<slug>/index.html`, one `.wrow` in `/work/index.html`, and
a home-page card only if it is among the strongest three. Nothing else changes.

```
powershell -ExecutionPolicy Bypass -File serve.ps1
```
Serves the folder at http://localhost:4321 and resolves `/work/` to `work/index.html`.

---

## DESIGN SYSTEM — v6, LOCKED

Full rationale in `DIRECTION.md`. The operative values, declared at `:root` in `assets/site.css`:

```css
--cream:#EFE2BA;   /* ground */
--deep:#1F2A5C;    /* all body type and line work. 10.53 on cream. */
--fluoro:#F13C20;  /* accent. Countable per page — if you cannot count them, there are too many. */
```

Text is never pure black.

**Correction, 8 Sep 2026.** Earlier versions of this file locked an `ink #17181B` / `paper #F2EFE9`
/ `accent #F1442A` palette. That palette belongs to `_archive/v6-prototype/v6.html`, which was
never adopted. The five case studies and the whole live site are built on cream/deep/fluoro, and
`d5aa99b` locked it. Do not reintroduce ink/paper — it would mean recolouring every page to match
a prototype that lost.

**Type.** Bricolage Grotesque (display), Instrument Sans (body), Martian Mono (metadata).
Weight 500 does the work. 700 is a rare emphasis. Wide gaps in the scale, no intermediate steps
added to smooth it: flatness is the failure mode the scale exists to prevent.

**Grid.** 12 columns desktop, 8 tablet (≤1024px), 4 mobile (≤640px). CSS subgrid for section
internals. Asymmetric by default. Centred layouts are a deliberate exception, never a fallback.

**Hierarchy — apply to every block, never equal weight:**
1. **Idea** — what the visitor must understand. Largest.
2. **Evidence** — what proves it.
3. **Context** — what helps them understand it. Neutral tone, not black.
4. **Metadata** — role, date, tools. Smallest, mono, muted.

**Motion.** Communicates arrival, hierarchy or transition. Motion that only demonstrates capability
is cut. `prefers-reduced-motion` collapses everything, but note: collapsing durations does not stop
an infinite animation. Loops must be paused explicitly in their own components.

---

## THE VETO LIST — do not ship these

Rounded cards. Drop shadows and offset shadows. Pills. Badges. Glassmorphism. Gradient meshes.
Centred symmetrical layouts. Decorative scroll cues and section dividers that carry no information.
Floating metadata chips without context (a bare "MELBOURNE · GLOBAL" capsule). Corporate copy.
Clutter. **Em dashes in site copy.** Volume because content exists.

Anything on this list reads as AI-generated, which is the one impression that undoes the rest.

**Where personality actually comes from:** real artefacts, specific copy, one bold move held with
conviction, and inversion. Not effects. When a section feels flat, the instinct to add a shadow is
always wrong. Full detail in `taste-skill/references/anti-generic.md`.

---

## SECTIONS AND THEIR JOBS

| Section | Job | Failure mode |
|---|---|---|
| Hero | Identity, what I do, personality, curiosity, route to work | A tagline with nothing behind it |
| Work | Primary evidence of capability | An image gallery |
| Ideas | The intellectual layer. POV, observations, editorial | A blog with three posts |
| About | The human context that makes the work memorable | A restated CV |
| Contact | Frictionless, confident | Over-designed |

**Case study shape.** Context → Challenge → Thinking → Execution → Outcome → Reflection. Not every
stage appears in every piece, but the narrative must be continuous. Prioritise: my role, the problem,
my contribution, the strategic thinking, the evidence, the result.

**Show how he thinks, not what he made.** A beautiful artefact without reasoning is weaker than an
ordinary artefact with strong reasoning.

---

## CONTENT — what is real

**Locked copy, use verbatim, fix typos only:**
- Hero: `and I have always wanted to build [brands/products/launches/systems/teams/worlds]`
- Hero idea line: `I find the idea, write the words, and build the case for why it moves a number.`
- Photo caption: `Delhi, 1998. First machine I was allowed to break.`
- Contact CTA: `Let's build something you will always be proud of.`
- Brain Dump: five steps, complete, in his voice
- About: five paragraphs, his writing
- FAQ: nine answers, three recovered from the v3 build, six written with him
- Ticker: six real colleague quotes

**Work slate (7).** Vastr · Cut The Noise · VoiceDNA are the three visible on load.
Then Venus Roadlines · AbsolutILY · Duolingo · L'Oréal behind "show the other four".

**Real vs spec.** VoiceDNA and Venus Roadlines are real and shipped. Everything else is spec, and
**spec is disclosed in the first line of the case study, every time.**

**Verified facts** live in the master resume. iSelect/CTM engagement +46% MoM, vendor costs −78%.
Tickertape CTR +310%, 160k customers, 20k MAU. TEDxVIPS 130 volunteers, 1.2M views. Use these;
do not invent neighbours for them.

**Case detail worth keeping:**

- **L'Oréal.** The insight is commercially real: scalp health persists without hair, so excluding bald
  consumers is a positioning choice rather than a product one. Thesis line: *"you might not need hair
  for haircare after all."* The **bald-by-choice vs bald-by-circumstance** distinction is the strategic
  edge; keep it. Lead with *"Hair or not, here we come."* Cut *"This is an ad for all of you."*
  Before publishing: rebuild the competitive set (Head & Shoulders has been scalp-first for decades,
  so naming it as a hair-only foil inverts reality) and acknowledge L'Oréal's own scalp assets —
  Kérastase Genesis, CeraVe, Elvive — then argue why the gap remains.
- **Vastr** was called Debra. Two names lost: *Debra* read as a voice assistant, warm in the wrong
  direction for a utility tool; *Whear* was clever in a room and impossible to spell from hearing.
  Correct competitive set: Whering, Indyx, Acloset, Save Your Wardrobe, Stylebook. **Not H&M** —
  that is a retailer, not a wardrobe app.
- Vastr is the only piece starting from a blank page, so it carries the world-building proof alone.

**Two factual corrections that must not regress:**
- Hungry Jack's has **never** traded as Burger King in Australia. The 1985 store execution is Hungry
  Jack's own heritage. Burger King-branded stores here (1997–2003) were BKC's hostile competitor,
  subject of a A$46.9m judgment against them. Do not reintroduce Burger King nostalgia.
- AbsolutILY's five executions are all **unwitnessed wins**. The ABAC code prohibits positioning
  alcohol as a response to adversity, so no execution may sit on a bad moment.

---

## HARD RULES

1. **Never invent.** Where content is missing, put a visible `[GAP: what is needed]` in the artefact
   itself, not only in chat. It should be uncomfortable to ship.
2. **No invented metrics.** Where a number would go and there isn't one, show the reasoning instead.
3. **Never more than one placeholder of the same kind.** Three stubs sharing a sentence is the
   clearest possible signal that nothing behind them is real.
4. **No dead links.** Unfinished work is labelled "In development" and is not linked.
5. **Spec disclosed in the first line.**
6. **Preserve his voice.** Copy he wrote is source material. Flag changes, never quietly rewrite.
7. **Accessibility is a floor.** Visible focus, keyboard reachable, reduced motion honoured, contrast
   AA, alt text on every image, content reflows at 390px rather than shrinking, 404 exists.
8. **No services menu, no pricing, no booking widget.** A creative statement, not a freelance funnel.

---

## HOW TO WORK

**One section at a time. Build, screenshot, show, stop.** Batching is how whole builds get rejected
at once with no way to tell which decision was wrong.

**Look at every output.** Structure verified through code is not verified.
```
node taste-skill/scripts/shoot.js references/v6.html --sel "#work" --out /tmp
```
Then open the PNGs. Bugs found only by looking this session: a grid column blown out by `1fr`
deriving its minimum from content; collapsed accordion content visible because the container was a
`<span>`; a `<ul>` inside a `<p>` auto-closed by the parser; an image stretched by `min-width`
fighting a fixed height; a caption placed over the busiest part of a photograph.

**One decision at a time, with a recommendation attached.** He gets overwhelmed by parallel
decisions. Four open questions gets none answered.

**A recommendation that goes unanswered is not consent.** Ask again.

**Lead with what you need.** Open with the specific input required, then what changed, then why.

**No fluff.** He has asked for this explicitly. Short, work-driven, signal over volume.

**Blunt advisory.** Anti-sycophancy is on. Push back on weak ideas. Never fabricate progress.

**Absence of evidence is not evidence.** If you cannot find something, name where you looked. A
previous session concluded the build did not exist from two folders that happened not to contain it,
wrote that into this file, and was wrong. The repo was in a third folder.

**Never describe a tool or a site as live before it is.**

**Execution over planning containers.** Do not drift into frameworks and scaffolding instead of
shipped work. He has flagged this specifically.

### Four passes per component, four separate requests

Compressing these into one request is the main cause of generic output.

1. Static structure. No styling refinement, no hover, no motion.
2. Spacing, type scale, alignment.
3. Behaviour: hover, click, expand.
4. Motion: reveals, transitions, stagger.

Four requests feels slower and finishes faster, because you are not patching a wrong foundation.

### Diagnosing "this looks off"

It is almost always one of four properties. Name the property, not the feeling.

| Symptom | Property | What to say |
|---|---|---|
| Cluttered or empty | Spacing rhythm | Vertical spacing is inconsistent, standardise the section gap |
| Flat, nothing stands out | Type scale | Not enough contrast, push display up and remove intermediate sizes |
| Looks like a template | Alignment | Too much centred, left-align to the grid edge |
| Busy | Hierarchy | Three elements competing, make one dominant and drop the rest to muted |

### Feeding references

Every reference needs **Take only** and **Ignore**. Without the Ignore line it gets absorbed
wholesale and drags the design toward someone else's system. `TASTE.md` is written in this form.

### Banned in headline copy

*passionate · driven · storytelling · data-driven · growth.* If one appears, the line is doing
nothing and needs rewriting.

---

## OPEN — needs Shrey, do not decide for him

1. **Framer or Astro.** Framer's free tier has no CMS and no custom domain, which kills the two
   things it was for. Paid plan or stay on Astro. Everything downstream depends on this.
2. **Two "essence" devices to add next.** Candidates offered: leader-line annotation on case pages,
   cursor state over work rows, detail crops in case studies, star as scroll progress, one real
   easter egg. He picks two.
3. **Ideas has no content.** It is a named section in his brief with one unwritten outline
   (*The Time Tax*). Stays out of the nav until at least one piece exists.
4. **Venus Roadlines identity work.** The case claims taglines, positioning and brand language shipped
   alongside the 106-page manual. Only the manual exists on disk. Asked four times, unanswered.
   Tags currently read `Operations · Communications`, not Brand Identity.
5. **GAPs live on the page now:** two LinkedIn recommendations, Spotify URI, resume link, Vastr's
   three GTM benchmark numbers.

---

## BUILD ORDER

1. **Port `references/v6.html` into `src/`** as tokens.css, base.css, work.css and Hero/WorkIndex
   components. Delete the stale cut-out components. This kills the versioning problem.
2. Create `ESSENCE.md` — a register of every distinctive device, where it lives, what job it does.
   Adding personality then becomes additive rather than re-argued.
3. Ideas, About, Contact in the v6 system.
4. Case study template on the Context/Challenge/Thinking/Execution/Outcome/Reflection shape, then
   the five pages.
5. Responsive pass at 390 / 768 / 1024.
6. Accessibility pass. 404 page. Portfolio schema.
7. Deploy.

---

## COMMANDS

```bash
# dev server, from repo root
node node_modules/astro/bin/astro.mjs dev --port 4321

# look at the output
node taste-skill/scripts/shoot.js <file-or-url> --sel "#work,#about" --out /tmp

# check a palette before changing a colour
python3 taste-skill/scripts/contrast.py --named paper=#F2EFE9 ink=#17181B accent=#F1442A

# stage, commit, push (prompts before pushing)
powershell -ExecutionPolicy Bypass -File commit.ps1
```

Branch is `v5-blocks` and the name is now wrong. Rename before the first push:
`git branch -m v5-blocks v6-editorial`
