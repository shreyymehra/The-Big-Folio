# CLAUDE.md

Read this before writing any code, every session. These are constraints, not suggestions.
Do not re-derive, re-propose, or "improve" anything marked LOCKED.

**Also read, before touching design or copy:**
- `DIRECTION.md` — the governing art direction. Hierarchy, grid, colour, veto list.
- `TASTE.md` — what the reference set is for. Take / leave / why.
- `POSTMORTEM.md` and `taste-skill/` are named in older versions of this file. **Neither exists in the repo** (checked 21 Sep 2026: repo root, `_archive/`, `_archive/salvaged/`). Ask Shrey before assuming their content.

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
| `/work/<slug>/` | Five case pages: vastr, cut-the-noise, voicedna, vrl, absolutily. Styled with Tailwind utilities on `base.css` tokens; they do not load site.css. |
| Ideas | **Home page only** (`#ideas`), Shrey, 21 Sep 2026. `/ideas/` and the five idea shells were deleted; the magazine markup lives in `index.html` and `magazine.js` binds it. Nav "Ideas" links to `#ideas`. Pages for it arrive as PNGs from Shrey. |
| `/about/`, `/contact/` | One page each. About carries the long version plus the FAQ. **Labelled "Me" in the nav and eyebrows since 21 Sep 2026**; the URL stays `/about/` so links already sent keep working. |
| `assets/site.css` | **THE stylesheet** for home, /work, /ideas, /about, /contact. Edit here, never per page. |
| `assets/base.css` | Tokens (palette, families, type scale, spacing, motion) and site-wide rules: the island, dither, skip link, view transitions. **Every page links it**, case pages included. |
| `assets/tw.css` | **Tailwind v4, compiled.** Source is `assets/tw/input.css`; never edit tw.css. Linked by the five case pages, which are now written in utilities (their duplicated inline `<style>` blocks are gone). Build: see COMMANDS and `assets/tw/README.md`. |
| `assets/site.js` | Shared behaviour: nav, reveals, rail, year stamp, card landing, FAQ, CTA lines. **Every page with shared behaviour loads it, home included.** |
| `assets/home.js` | Home-only behaviour: hero assembly, tiles, ticker, vinyl, loader, parallax, trail. Loads after `site.js`. Never add a shared behaviour here. |
| `assets/scroll-feel.js` | Lenis, site-wide, on all 11 routes after `vendor/lenis.min.js`. Owns scrolling and nothing else. |
| `assets/scroll.js` | Work-index plate wipe only. IntersectionObserver + CSS, not scroll-linked; see the note in the file. No longer touches scrolling. |
| `assets/vendor/` | Vendored `lenis.min.js`, prebuilt, committed on purpose. `motion.min.js` (81KB) was removed 21 Sep 2026: its only use was one `inView` call. |
| `assets/img/` | Page imagery, content-hashed. Extracted from inline data URIs (index.html was 1.81MB). |
| `_archive/v6-prototype/v6.html` | The v6 ink/paper prototype. **Not adopted** — see the palette note below. |
| `_archive/` | Pruned 21 Sep 2026: the pre-routing and flat-route page copies, the hero demos and the riso tokens were deleted (all in git history before that date). Keeps the v6 prototype, the system notes, `salvaged/` and `portfolio-brief.zip`. |
| `references/` | Visual references, **never deployed**. Sorted by layer: `type/ layout/ motion/ colour/ tone/`. The map of what goes where is in `references/README.md`. |
| `assets/work/<slug>/`, `assets/logos/`, `assets/icons/`, `assets/fonts/` | Upload slots that **do deploy**: project covers and crops, Worked-with marks, tool stickers, licensed fonts. Each has a README naming the files it expects. |
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
started last time. There is still no framework, no bundler and no `npm install`. **One exception, 21 Sep 2026, at Shrey's instruction:** Tailwind v4 via its standalone CLI (a single git-ignored binary in `.tools/`, no Node). Its output `assets/tw.css` is committed, so the deployed site still has no build step. Scope: case pages and new page-level work; base.css and site.css are not being rewritten into classes.

**Links are depth-relative, never root-relative.** A page at `/work/vastr/` links the stylesheet as
`../../assets/site.css`; the home page links it as `assets/site.css`. This is not a style
preference — the site is served from `https://shreyymehra.github.io/The-Big-Folio/`, a subpath, so
a root-relative `/assets/site.css` resolves above the site root and 404s. Root-relative links
shipped once and took the whole stylesheet, every image and all navigation down.

Depth-relative also works at an apex domain and over `file://`, so it needs no per-host config.
**After adding or moving a page, re-run the link check in COMMANDS.**

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
--cream:#F7F4EC;   /* off-white ground. #EFE2BA -> #F5EDD4 -> #F7F4EC, 24 and 29 Sep, at his instruction. */
--deep:#173CA8;    /* cape blue. All body type and line work. 7.72 on the ground. */
--fluoro:#E8251F;  /* cape red. Planes and bold type >=24px only (3.69 on the ground). */
--yellow:#FFED10;  /* Superman Broom yellow, trued from the row 08 source 23 Sep. Accent only; ink on it is 12.6. */
```

**Changed 21 Sep 2026, at Shrey's instruction** ("a bit like Superman's colour palette, a hint of retro"): the
navy/fluoro pair became comic primaries aged to newsprint. Token names are unchanged, so every
rule followed. Small red type uses `--accent-type` #B8141A (5.30). Rationale in `assets/base.css`.

Text is never pure black.

**Correction, 8 Sep 2026.** Earlier versions of this file locked an `ink #17181B` / `paper #F2EFE9`
/ `accent #F1442A` palette. That palette belongs to `_archive/v6-prototype/v6.html`, which was
never adopted. The five case studies and the whole live site are built on cream/deep/fluoro, and
`d5aa99b` locked it. Do not reintroduce ink/paper — it would mean recolouring every page to match
a prototype that lost.

**Type. Set 23 Sep 2026 from the Reference Book (row 07):** headings **Geist Black** with a pressed-ink
edge (SVG filter #ink from site.js), body **Inter**, annotation **Geist Light**. All OFL via Google Fonts;
the Milligram trial files are deleted and the licence problem is closed. Weight 900 replaces 800.

Retired, in order: Bricolage Grotesque (the v6 lock), Instrument Serif (20 Sep), Milligram (23 Sep), Familjen
Grotesk, Schibsted Grotesk stand-in, Instrument Sans, Martian Mono (all 21 Sep).

The retired lock read: Bricolage Grotesque (display), Instrument Sans (body), Martian Mono (metadata).
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

## HOME SECTIONS HAVE DIFFERENT PERSONALITIES (Shrey, 21 Sep 2026)

Each home section gets its own device, so no two read the same. Do not unify them.
Hero: cut-outs assemble over a halftone print. Quotes: a hand-drawn tape across the seam below the hero (placeholder; Shrey is deciding the final form).
Tickers (quote tape and the two crossing bands) scroll themselves and speed up with the page scroll; each has a "Pause tickers" button (WCAG 2.2.2), they hold while hovered or focused, and never move under reduced motion. Proof: yellow comic panel on Ben-Day dots.
Work: pinned collage scrubbed by scroll. Ideas: a magazine whose pages turn. Me: the paragraph
inks in word by word as you read (the same fill runs on the five /about/ paragraphs, from site.js). Contact: a highlighter pulls under "always".
Dithered type was removed at his request; do not bring it back.

**Home, 22 Sep 2026 (late).** Shrey reverted home to the Project Superman layout, keeping two things from
the Phase 1 build: the five floating cut-out navigation marks in the hero (a head start; his own icon
files replace the drawn stand-ins, see assets/icons/README.md), and the short first-visit loader.
The "What actually moved" proof panel is gone entirely. Yellow is an accent only (highlighter,
stars, cover starburst), never a plane; the quote tape is paper. Caption and photo stamp read 2003.
The one-screen home, door grid, plain nav and /ideas/ page are kept in git stash "phase1-home".
**Phase 2 (About three-line rhythm, case bodies) waits for his sign-off on this infrastructure.**
Milligram licence: unresolved, trial files served; Geist is the wired fallback.

**Pace (22 Sep 2026, on "too much scroll" feedback).** Home order is hero > quote tape > proof >
worked-with + bands > work > ideas > me > contact: numbers land on the second screen. The work pin is
240vh desktop / 200vh phone (was 400/300, 41% of the page for three projects); home went from
9.8 to 8.0 screens. Do not lengthen a section without cutting another. The loader plays on every
full load (restored at his request) and hands off to the hero assembly; reduced motion skips it.
Dark mode swaps --cream and --deep in base.css, so every rule built on them flips.

## REFERENCE BOOK BUILD (23 Sep 2026)

Source: "The Big Folio — Reference Book.pdf". Shrey: every Take is a keep; rows with links are read and
built on. Missing assets are labelled boxes (.ph, in base.css), named for him to match: Nav1 (logo in the
island; still links home, so a click reloads), Hero1-6 (floating nav marks; Hero6 = what I listen to, plays
the vinyl), Work1-5 (covers), Ideas1 (clipboard behind the magazine), Me1 (bobblehead), Me2 (places globe),
Contact1 (dark graphic revealed on email hover), Contact2 (the hill the contact section stands on).
Built: Geist/Inter/Geist Light type with ink; GSAP (vendored, assets/vendor/gsap.min.js) drives the ransom
tiles on twos with an occasional stepped spin; verified figures ride in the second crossing band; work
cards pick up on hover. Full manifest: the build report of 23 Sep. Conflicts are listed there too.

**Hero, rebuilt 23 Sep 2026 (late), at Shrey's instruction.** The desktop metaphor (wallpaper,
taskbar, system-message window, .exe file names) read as a copy of one reference and demoted the
photograph. It is gone, with its Hero7 wallpaper slot. The hero is now a centre-piece with objects
around it: the halftone photograph, stamped 2003, beside the ransom name and the one value line;
six labelled marks (Hero1-6) float in the side bands, drift on their own, drag with the pointer and
land on a click. Ground is cream, type and line work blue, red is the stamp and the email rule,
yellow only marks a hover. Red planes carry no small type on this palette (ink on fluoro is 4.0),
so the stamp is a paper disc with a red rule and #B8141A type, and the rolling word took the blue
plane. Mark size follows screen height (clamp 96-144px) and under 1180px they become a row under
the centre-piece; checked for collisions at 1920/1600/1440/1280/1181/1024/900/768/390. The record
player stands down while the hero holds the screen (html.at-hero), because the Listening mark is
the way into it. The #ink filter was halved (scale 1.5, dilate 0.22) - it was too loud at 3.2.

**Navigation, row 02, 23 Sep 2026.** The island now has three shapes, not two, which is what the
row asks for: the way down tightens it to the logo alone (is-tight, 178px), the way up brings back
the section you are in (is-compact, 313px), and only a hover or focus opens the full slate (469px).
The top of the page has no section to name, so it shows the slate. Widths are measured once for all
three shapes and the shell is driven between them (feel.js, island); the readout is hidden, not
removed, so the morph stays one object. Left, per his note on the reference: no heavier motion.
The slate lists pages (Work, Ideas, Me, Contact); FAQ and Listening are in-page destinations and
stay with the hero marks. The magazine Back button no longer ghosts to 1.84:1 - a disabled turn is
a dashed edge at 4.5+, not a faded one.

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

**Work slate (7).** Vastr · VoiceDNA · Venus Roadlines are the three on the home page. Decided by
Shrey, 17 Sep 2026: "the two that shipped, and the one that goes deepest." Cut The Noise · AbsolutILY ·
Duolingo · L'Oréal live on `/work` only.

**Real vs spec.** Venus Roadlines is real and shipped. VoiceDNA is real and in build, not live.
Everything else is spec, and
**spec is disclosed in the first line of the case study, every time.**

**Verified facts** live in the master resume. iSelect/CTM engagement +46% MoM, vendor costs −78%.
Tickertape CTR +310%, 160k customers, 20k MAU. TEDxVIPS 130 volunteers, 1.2M views. Use these;
do not invent neighbours for them.

**Worked with** (confirmed by Shrey, 17 Sep 2026): iSelect, Compare the Market, Tickertape, TEDxVIPS,
Bliss & Birch, Amazon. UN Youth and BCG were side projects during college, and are always
labelled "College project" wherever they appear. Never present them as employment.

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

## DECIDED BY SHREY, 18 SEP 2026 — these override anything older

**Target roles.** Product Marketing, GTM, Brand Strategy. Sectors: AI, fashion, fintech, and
other high-leverage companies. Every ordering and framing decision serves these.

**Known for.** Shaping narratives, consumer journeys, and experiences that stay in memory.
"Engineer the market, and market the taste" for industries that do not think linear.

**Beliefs (his words, verbatim, typos fixed only):**
- You can never market the same thing to two people.
- A picky eater should not be trusted for taste advice.
- A culture can never be built without understanding the weakest links.
- Being perfect is overhyped. Imagination beats perfection every time.
- I am too young to have dead set opinions.

**System and rules**
- Type scale: H1 64 · H2 40 · H3 28 · body 18 · small 14. Tokens in `assets/base.css`.
- Spacing scale 4/8/12/16/24/32/48/64/96/128. No em dashes anywhere.
- Build flow: structure, components, responsive UI, interactions, polish, deploy.
- Flows: scroll (parallax, scrub, pin + transform), reveal (fade + lift, stagger, clip),
  click (every CTA answers with a state change or spring). `assets/feel.js`.
- Palette: cream / deep / fluoro everywhere, including case pages and /work. The grey
  "quiet skin" is reverted. The v7 ink tone stays only where fluoro needs readable type.
- Theme: always opens light. The toggle works and remembers the visitor's choice.
- **Brief vs locked rules:** where a brief clashes with a rule here, mark the clash in one
  line and pick. If unsure, pick by reachability first, then accessibility, then relevance to
  the viewer. The end goal is easy to understand.

**Content**
- Hero tiles stay: "Hi my name is Shrey".
- Quotes: names come later. Redesign as chat bubbles or similar; not decided.
- Ideas: becomes a magazine, flip-page layout hosting projects, posts and other work.
  Content added later.
- Work covers: static designed covers. **No screen recordings.**
- Duolingo: in development. L'Oréal: finished (material to be supplied).
- Credits: every project is solo except Venus Roadlines and one AI app, where he was
  Co-Designer and Lead.
- **VoiceDNA is not live.** It is in build. Never call it shipped or live until it is.
- Venus Roadlines: taglines, positioning and brand language shipped with the manual.
- Deploy: Vercel with a custom domain later. Push to GitHub for now.
- `RECRUITER-CHECK.md` is kept. Other stray docs were salvaged into this file and archived
  to `_archive/salvaged/`. What survived from them, not yet built:
  - Case pages: a **Role & constraints** card under the summary, and a **Key decisions**
    block (choice, options, evidence, trade-off). Vastr's naming story is the first example.
  - Cut the `/work` filters from six to three. Six filters over seven pieces advertises how
    few pieces there are.
  - One discipline list everywhere. The hero and loader now match; the X band still differs.
  - Fluoro never carries type under 24px on cream (3.0:1). Ink on fluoro (4.8:1) or
    `#C0301A` on light / `#FF6A4D` on dark for small accent type.

---

## OPEN — needs Shrey, do not decide for him

1. **Where this deploys.** Astro is gone (`d5aa99b`), so the choice is no longer Framer vs Astro.
   Links are depth-relative, so the site runs unchanged at a subpath or at a root domain.

   - **GitHub Pages** — live at `https://shreyymehra.github.io/The-Big-Folio/`, built from
     `v5-blocks`, `/(root)`. Served from a subpath; `.nojekyll` stops Jekyll processing.
   - **Vercel** — `vercel.json` at the repo root sets it up. Deploy from **`main`** (PR #1 merged
     `v5-blocks` into it). Preset **Other**, root directory `./`, no build or install command.
     **`outputDirectory` must be `"."` and cannot be omitted.** Left unset, Vercel's zero-config
     static default serves the `public/` directory as the site root — which here holds only
     favicons, so every route 404s while `/favicon.svg` returns 200. That is the signature of
     this bug if it recurs. Because the output directory is the repo root, everything not listed
     in `.vercelignore` is publicly downloadable; the working documents are excluded there.

   Running both is fine but means two live URLs. **Pick one as canonical** and point a custom
   domain at it, otherwise a recruiter can land on whichever is staler. Still to do either way:
   a `404.html` — Vercel and Pages both serve one automatically if it exists, and there isn't one.
2. **Two "essence" devices to add next.** Candidates offered: leader-line annotation on case pages,
   cursor state over work rows, detail crops in case studies, star as scroll progress, one real
   easter egg. He picks two.
3. **Ideas has no content, but is now in the nav.** His architecture brief of 8 Sep names `/ideas`
   as one of five primary areas and specifies `idea-1`…`idea-5`, so the routes and the nav entry
   were built. That overrides the earlier "stays out of the nav until a piece exists" rule on
   *structure* — but it leaves five identical `[GAP]` rows on `/ideas` and three on the home page,
   which breaks HARD RULE 3. Either one real piece lands, or the index shows a single honest
   "not written yet" state instead of five stubs. **Needs his call.**
4. **Venus Roadlines identity work.** The case claims taglines, positioning and brand language shipped
   alongside the 106-page manual. Only the manual exists on disk. Asked four times, unanswered.
   Tags currently read `Operations · Communications`, not Brand Identity.
5. **GAPs live on the page now:** two LinkedIn recommendations, Spotify URI, resume link, Vastr's
   three GTM benchmark numbers.

---

## BUILD ORDER

Items 1, 3 and 4 are done — routing, the shared stylesheet, the five case pages, and About/Contact
all exist. What remains, in order:

1. **Work needs visuals.** Every case study contains exactly one image, and it is the star mark.
   There is no work imagery anywhere in the portfolio. The plates at `/work` are typographic
   compositions standing in for artefacts, built as a slot so a real image drops in unchanged.
   This is the single highest-leverage gap in the site.
2. **Ideas needs one real piece.** Five routed shells exist and every line in them is a `[GAP]`.
   See the note under HARD RULES about repeated placeholders — the current state breaks rule 3.
3. Create `ESSENCE.md` — a register of every distinctive device, where it lives, what job it does.
   Adding personality then becomes additive rather than re-argued.
4. Section-level art direction, one section per request, four passes each. Loader and Work are done.
   Ticker, Brain Dump, About, FAQ, Contact remain.
5. **Done 21 Sep 2026 with Tailwind.** Case-study CSS no longer lives inline. (Was: `.face`, `.tag`, `.stand`, `.sec`
   and `.pull` mean different things there than in `site.css`. Merge under a scoped `.case` block.
6. Responsive pass at 390 / 768 / 1024.
7. Accessibility pass. 404 page. Portfolio schema.
8. Deploy.

---

## COMMANDS

```bash
# preview server, from repo root. No Node, no npm, no install.
powershell -ExecutionPolicy Bypass -File serve.ps1

# rebuild Tailwind after changing assets/tw/input.css or any utility class in HTML
.tools/tailwindcss.exe -i assets/tw/input.css -o assets/tw.css --minify

# check every internal link still resolves after adding or moving a page
node -e "const f=require('fs'),p=require('path');(function w(d,a=[]){for(const e of f.readdirSync(d,{withFileTypes:true})){if(['.git','_archive','node_modules'].includes(e.name))continue;const q=p.join(d,e.name);e.isDirectory()?w(q,a):e.name.endsWith('.html')&&a.push(q)}return a})('.').forEach(x=>{for(const m of f.readFileSync(x,'utf8').matchAll(/(?:href|src)=\"(\/[^\"]+)\"/g)){const t=m[1].split('#')[0];if(!f.existsSync('.'+t)&&!f.existsSync('.'+t+'/index.html'))console.log('BROKEN',x,'->',t)}})"
```

Branch is `v5-blocks`, already pushed and tracking `origin/v5-blocks`. The name is historical and
no longer describes the work; rename only in coordination with the remote, not unilaterally.

## REFERENCE BOOK — LINKS READ (23 Sep 2026)

All 20 links opened. The wallofportfolios.in profile pages are login-gated and redirect to the
onboarding wall, so those five were resolved to the person's own site — use these, not the wall:

| Row | Link | Resolved to | His take | State |
|---|---|---|---|---|
| 00 | rishabh-pandey | rizzabh.me | icons as accents, star mark, short and crisp | built (star, marks) |
| 00 | riyadesign5301.framer.website | — | vinyl player feel, connect double-hover, grid on white | vinyl built; grid is a dot field |
| 00 | gowtham-ganesan | gowthamganesan.com | floating icons and images, loader, rooted and simple. Leave: the cursor effect | built; cursor effect never added |
| 00 | mclaneteitel.com | — | the value-first opening line frame | built (claim line) |
| 01 | balint-horvath | hbalint.com | centre-piece with floating icons, physics | built 23 Sep (hero stage) |
| 01 | pixflow ransom letters | — | cut-out letters that move, comic/spider-verse | built (GSAP on twos, stepped spin) |
| 01 | pin 592786369743560300 | "Lila Party" invite | ransom type over a halftone photo, readable | built (hero centre-piece) |
| 02 | up.com.au | — | floating MENU pill, logo reloads home, contracts and expands | built 23 Sep (three island shapes) |
| 02 | ankitdixitmp4.com | — | **rejected by Shrey 23 Sep**: the desktop read as a cheap copy | removed |
| 03 | Medium, Aditya Raj PMM portfolio | — | see below | **not built** |
| 03 | lakshmanan-palani | lakshmananpalani.com | picked-card hover, short explainer, picture showcase | **not built** |
| 03 | behance 199083179 | — | take line left blank | nothing named, not a keep |
| 04/06 | pin 1063412530733428979 | "Pop Art Hands" | hands pointing at the picture | slot Me1 |
| 05 | freyavorawork.xyz/11 | — | flat ground, oversized type, star marks | magazine built |
| 06 | harrison-wheeler | harrisonwheeler.com/about | three named threads, origin story, globe at the end. Leave: the long timeline | globe is slot Me2; threads are Phase 2 |
| 07 | pin 1056868237573498402 | ink bleed text effect | pressed-ink headings | built, halved 23 Sep |
| 08 | schemecolor.com/superman | — | #0060AA blue, #FFED10 yellow, #E20025 red, #010101 black | see the clash below |
| 09 | pin 1477812374873790 | "Fractal Sky" | the hill/sky the contact section stands on | slot Contact2 |
| 09 | ryan-walter | ryanwalter.work | PNG objects and stickers, used sparingly; grid ground | partly (stickers slot) |
| 10 | gsap.com | — | the motion library, reduced-motion respected | vendored 3.12.5 |

**Row 03, the one substantive unbuilt reference.** The Medium piece is a structure, not a look:
a case must be readable in under three minutes and carry the business problem, the strategic
approach, one hero artifact, and the measurable outcome. It names the failures this site can still
make: assets with no context, activities listed instead of outcomes, no narrative arc, too much work
and not enough curation, and unredacted numbers reading as poor judgement. It also asks for the
trade-offs and for influenced vs controlled to be separated, which matches Shrey's own note on
that row. Lakshmanan's cards are the visual half: three small detail crops fanned like picked cards,
one plain sentence saying what the thing does, then a role and impact line.

**Clash to settle, row 08.** The palette he linked is #0060AA / #FFED10 / #E20025 / #010101. The
locked tokens are aged versions of it (#173CA8 / #E8251F; the yellow was trued to #FFED10 on 23 Sep at his instruction). The source blue is 4.9 on
cream against 7.23 for ours, so trueing the blue would cost contrast; the yellow is accent-only and
could be trued to #FFED10 at no accessibility cost. Not changed without his call.

## ROW 03 — CASE PATTERN, FIRST PASS ON VASTR (23 Sep 2026)

Built on `/work/vastr/` only, as the pattern for the other four. Two blocks, structure pass:

1. **Role and constraints** — a bordered list under the summary: Role, Brief, Constraint, Made.
   It answers the first question a hiring manager asks, which is what was actually his. Carries
   the one `[GAP: year this was made]` on the page.
2. **Key decisions** (`#s2b`, after the naming section) — three decisions, each with Options, Why
   and a Trade-off on a red rule. The Medium reference and his own row 03 note both ask for the
   trade-offs; without them a case reads as praise. Decisions 02 and 03 restate his own prose from
   the Learning and Product sections as decisions; the wording is his, re-cut, and needs his nod.

**Rolled to all five on 23 Sep 2026.** Every case page now carries Role and constraints plus three
Key decisions with their trade-offs. Decision content is drawn from his own copy; the trade-off
lines are new writing and need his read. The inline observer script that each case page carried a
copy of is now shared at assets/case.js, which also deals the decisions in and draws each trade-off
rule. New docs: MOTION.md (every motion, built and proposed, and why Motion the library is not
being reinstalled) and MARKET.md (what the portfolio competes against and what to add). The Medium
checklist the pages are now answering: business problem, strategic approach, one hero artifact,
measurable outcome, trade-offs visible, and no invented numbers. Yellow was trued to #FFED10 the
same day at his instruction.

## VOICEDNA, CONTACT AND THE ACCESSIBILITY PASS (24 Sep 2026)

**VoiceDNA leads.** At his instruction the page was rebuilt around the product rather than a
description of it, and the home slate now opens with it (the tile took Vastr's front position, size
and first reveal; Vastr took second). The home label reads "In build · Built on the Claude API",
because that line is the one the target rubric asks for by name (see MARKET.md).

The page now carries the **gap map at the size it is read**: two sample analyses behind a tablist,
six dimensions, the stated and actual markers with the gap band between them, and a "where the edit
starts" note. Both samples are **fictional brands, labelled as an illustration in the artefact**, so
nothing claims to describe a real brand and nothing claims to be a live run. The tool is still in
build and is never called live. One `[GAP]` remains and it is the real one: a captured run, and the
link the day it deploys.

Mechanics: the panels are in the markup and both open with JS off; the tablist takes over when the
script loads. Arrow keys, Home and End move between tabs. Built in `assets/case.js`, styled in
`assets/tw/input.css` under the `.vd-` block.

**Contact, the references replicated in full.** Row 00 (Riya) asked for the connect section's
double hover and the scribble; row 02 (up.com.au) for the dark graphic reveal; row 09 for the
section standing on a hill. One hover now gives three answers at once: the address inverts into a
blue plane, a red scribble draws under it, and the Contact1 graphic comes up beside it. The hill is
full bleed behind the section with the footer line sitting on it, not a band underneath. The same
gesture, one step quieter, is on the `/contact/` email row, and that page's footer now shows
Melbourne time like home rather than "Melbourne to Global".

**Accessibility pass.** A second harness (structure, names, keyboard, roles, target size, reflow)
ran over all nine routes in both themes. It found 36 issues; 30 were real and are fixed:

- `/about/` jumped h1 to h4. The "Who I am" eyebrow is now the section's h2 and the skill groups
  are h3, so the outline is continuous. Styling is unchanged.
- Targets under the 24px minimum (WCAG 2.5.8): the island's short labels, the work note, the record
  credit and the case pages' back link.
- The remaining six are not defects: the disabled magazine Back button is correctly unfocusable,
  and the ticker tracks overflow their own clipped container without ever scrolling the page.

Verified at 390: no horizontal scroll on any route. Under reduced motion: **zero running animations
on home**, which is the check that matters, since collapsing a duration does not stop a loop.
Contrast: 0 failures, light and dark, every route.

**`404.html` now exists** and closes the last item on the accessibility list. It is the one page in
the repo that cannot use depth-relative links, because the server serves it for a URL at any depth:
its styles are inline, its font comes from an absolute URL, and a four-line script rewrites the
three links from the site root it detects. That exception is deliberate; do not "fix" it into
relative links.

## THE HERO RIPPLE AND THE VOICEDNA SKIN (24 Sep 2026)

**The hero ground is lighter.** `--hero-ground` is `--cream` mixed 62/38 with white, declared on
`.stage-hero` only, so the rest of the site keeps the locked cream and dark mode still flips. In
dark the mix goes the other way (93/7 toward white), because washing ink toward white gives grey.

**The ripple.** Hovering the photograph or the copy throws three rings from the pointer: shield
yellow first and thickest, then cape red, then cape blue travelling furthest. Each runs on
`steps(7)`, so the wave steps like stop motion rather than gliding like water, which is the same
idiom the ransom tiles animate on. The layer sits above the content with `pointer-events:none`, so
the rings cross the photograph and the type while the marks stay draggable underneath. One set
every 140ms, 18 rings maximum, each removed when it finishes. No rings at all under reduced motion
or while Pause motion is on; both verified. The listeners are delegated from the
hero, not bound to the photograph and the copy directly: bound directly they stopped receiving
pointer events once the hero had assembled, which the headless harness could not show because it
cannot synthesize pointer input. Caught by hovering it in a real browser. Do not re-bind them to
the children.

**VoiceDNA runs on the inverse.** It is the only page that is a product rather than a piece of
writing, so it is the only one that is a screen rather than paper: ink ground, warm light type,
lifted coral for the accent. The values are the ones the dark theme already uses, so nothing new
was invented and both directions were already contrast-checked. It flips the other way in dark
mode, so the page is always the opposite of wherever the visitor is. One thing the inversion buys:
on ink, shield yellow finally clears AA as type, so the eyebrows take it. On cream it never could.
The skin is `.case.vd-skin` in `assets/tw/input.css`; the class is on that page's `<body>`.

## THE PAPER (24 Sep 2026)

**The ground is lighter.** `--cream` moved from `#EFE2BA` to `#F7F4EC`, at his instruction: the
same cream taken towards white, which is the shade the hero was trialling. It is applied
everywhere, so there is no second ground and the hero's `--hero-ground` override is gone. All 26
literal swatches were swapped with it, including the tape paper (`#F6ECCB` to `#FCFAF4`), the
island, the `theme-color` meta and `404.html`. Every contrast pairing improved: deep on ground
7.23 to 7.72, fluoro 3.45 to 3.69, accent-type 5.16 to 5.52. No rule changed as a result; fluoro
still carries no type under 24px.

**The texture is site wide and printed, not ruled.** `--paper` is two staggered radial gradients,
one dot at 25/25 and one at 75/75 of an 18px tile, so the eye reads a halftone screen rather than
graph paper. It is built from `--deep` at 15%, so it inverts with the theme from one declaration.
It is on `body`, on `.contact` and on `.case` (all three repaint the ground), and the hero's
`.stage-ground` uses the same token rather than its own gradient. **Keep it under 18%:** past that
it stops being paper and starts being pattern.

**One trap, found by the audit and fixed.** `--card`, the photograph's mount, is a mix of `--cream`
with white. On the light ground that lands near paper, but in dark mode `--cream` is the ink, so
the same mix landed on mid grey and took the caption below AA. The dark theme now mixes 90/10
instead of 58/42. Any token built with `color-mix` against `--cream` needs the same check.

## FINAL PASS (29 Sep 2026)

**The ground is off-white.** `--cream` is now `#F7F4EC`. The name stays `--cream` so every rule
built on it still holds; the value is off-white with a faint warm cast. Thirty swatches swapped,
including the tape paper (`#FCFAF4`), the island, `theme-color` and `404.html`. Contrast rose
again: deep on ground is now above 8, red above 3.8, small red above 5.7. No usage rule changed.

**Dead code removed.** 113 dead rules from `site.css` and 1 from `base.css`, plus 6 partial
selectors trimmed: 136 lines. All of it was the residue of removed sections, named here so nobody
resurrects them looking for a bug: the "What actually moved" proof panel (`.proof*`, `.stints`,
`.figs`), the pre-rebuild hero (`.hero-art`, `.hero-copy`, `.art-print`, `.signoff`, `.creds`),
the typographic stand-in posters (`.wk-poster--vastr|voicedna|vrl`), the old case pager (`.pnav`),
`.lband`, `.desk-fallback` and `.mag-wrap`. Before and after: zero console errors, zero contrast
failures, every page screenshotted. The pre-clean copies are in the session scratchpad only, so
git history is the recovery path.

**Material cleared.** One unused image (251KB). `GAPS.md`, the 8 Sep research doc, is superseded
by `MARKET.md` and moved to `_archive/salvaged/GAPS-8sep2026.md`. `README.md` was rewritten: it
still described the site as one self-contained file with inline CSS and data URIs, which
`d5aa99b` killed months ago, so it was actively misleading anyone who opened the repo.

**`/work` changes.** Six filters became three (All, Brand, Campaign, GTM): Communications and
Operations held one piece each and advertised how few pieces there are, which was his own note.
Every row now leads with an audience chip (B2B or B2C) in the blue plane, which is how the market
labels case studies and how a hiring manager sorts them. Venus Roadlines is tagged Enablement
rather than Brand Identity, because that is what the manual was and the identity claim is still
unevidenced.

**Home.** A credential line sits under the role line and above the CTA: iSelect, Compare the
Market, Tickertape, Amazon, TEDxVIPS. It is the fastest credibility on the site and it used to be
three screens down. UN Youth and BCG stay off it: they were college projects and are labelled as
such wherever they appear.

**`HANDOVER.md`** is the closing document: the finished state, a designer's review of what would
change a hiring decision, and the list of assets, content and two decisions that need him. Read it
before starting anything new here.

## ASSETS DELIVERED (1 Oct 2026), WIRED 2 Oct

Shrey dropped the first real assets into the repo. What arrived, what was wrong with it, and where
it now lives.

**Three traps in the delivery, all caught before use:**
1. **The six hero mark SVGs were rasters in disguise** - each one a 2000px PNG wrapped in an SVG,
   577KB to 1.55MB, 6.3MB for six marks that render at 96 to 144px. They are now 360px WebP at
   4 to 15KB each in `assets/img/marks/`. The originals are in `_archive/source-assets/`.
2. **`Zine Cover.png` is not a PNG.** Its header reads `%PDF-1.4`. A filename is a claim, not a
   fact. It is archived as `zine-cover.pdf` and rendered to WebP.
3. **The work covers are PDFs and one ZIP**, not images, and they are **portrait A-series**, while
   every cover slot on the site was built 16:10 landscape.

**The conversion pipeline** is headless Chrome, no dependencies: render the PDF through Chrome's
own viewer with `#toolbar=0&navpanes=0&view=Fit`, auto-crop the viewer's surround by scanning for
the uniform border, then draw to a canvas and export WebP. Scripts are in the session scratchpad;
the recipe is here because it will be needed again for every new poster.

**Wired:** the logo into the island on all 9 pages (`assets/logos/sm-logo.svg`, inverted to the
island's cream); the six marks into the hero; the five posters into the home collage, the `/work`
plates and the case page headers; the L'Oreal poster behind its In development label.

**Layout consequences, decided and worth knowing:**
- The home collage tiles are **portrait (1/1.414)** now, because the posters are. A poster pinned
  to a wall, not a cover cropped to a widescreen box.
- The `/work` plates keep their row rhythm and show the **top** of each poster, which is where
  every one of these posters puts its headline.
- The case header frames the poster **whole**, capped at 78vh so it cannot push the body off the
  first screen. It is the hero artefact the Medium reference asks each case to carry.
- **The halftone screen no longer sits over a plate that has an image.** It dressed the
  typographic stand-ins; screening real artwork dulls the only evidence on the page.
- One mark (FAQ) arrived on an opaque white plate and was knocked out to transparent.

**Still open from this delivery:** the worked-with board, the zine, and the resume. See HANDOVER.

## THE DRAWN GRID, THE MONOGRAM, THE COLLAGE (2 Oct 2026)

**The background is a hand-drawn grid**, from a reference image Shrey sent: 90px cells, lines that
wobble between crossings and are pinned at the tile edges so the 270px tile repeats seamlessly.
Built by `scratchpad/grid.js` with a seeded wobble, inlined into `--paper` in `base.css` as a
data URI. The alpha is baked into the stroke, because `background-image` cannot take an opacity:
`.30` on the light theme, `.18` on dark, where the lines become paper-coloured. The dot screen it
replaces is gone. Keep the strongest line at or under `.30`; the test is that body copy over it
reads exactly as it does on blank paper, which was checked at 0 contrast failures.

**The island carries the monogram.** The supplied artboard held three directions; `sm-mark.svg`
and `sm-mark-light.svg` are the rounded monogram with the star, cropped from it by viewBox so the
file stays vector. The light variant turns the letterforms to paper and keeps the star red, for the
dark island. The condensed cut and the `shrey` wordmark are still on the artboard if he changes his
mind: the band coordinates are in `scratchpad/bands.mjs` output.

**The rule lives in `base.css`, not `site.css`.** It was in site.css first, and the case pages load
only base.css and tw.css, so the logo rendered at its natural 881px and ran off a phone screen.
Anything that styles the island belongs in base.css for that reason.

**The floating marks are bigger** (clamp 112 to 184px, from 96 to 144) and are now spread by
calculation rather than percentage: `--fl-h` is the mark plus its label, so three always clear each
other whatever the window height. Percentages stopped working at 800px tall once the marks grew.

**The home collage was retuned for portrait.** The posters are 41% taller than the 16:10 slot the
collage was composed for, so the third tile fell off the bottom of the pinned stage: that is the
"chopped" Shrey saw. Tiles are now min(19-21vw, 285-310px) and re-spaced so every poster and every
label sits inside the stage.

**Recovered from my own mistake:** a `git checkout assets/base.css` meant to drop one experiment
reverted the whole file to the last commit and took the session's uncommitted work with it. It was
rebuilt from the scratchpad copy taken before the dead-code pass, then the dead-rule removal and
the grid were re-applied, and the result diffed against the backup to confirm only the two intended
rules were gone. The lesson: this repo has a lot of uncommitted work in it, so never use checkout
as an undo here. Commit first.

## MONOGRAM, LOGOS, MARK SIZE (2 Oct 2026)

**The monogram is background-free.** The supplied artboard carried a full-canvas white rect
(`<rect x="-150" width="1800" ... fill="#ffffff">`, twice) which rendered as a plate behind the
mark in the island. Stripped from `sm-logo.svg`, `sm-mark.svg` and `sm-mark-light.svg`. Check any
future export from the same tool for the same rect.

**The eight client marks are real.** Cut from the supplied board by `scratchpad/slice.mjs`: it
finds rows of content, then columns inside each row, merging column gaps under 45px so a wordmark
is not split into its glyphs. 70px merged separate logos together and 0px split `comparethemarket`
into letters; 45 is the value that works for this board. They live in `assets/img/logos/`, capped
by height so the mixed lockups (two sit on their own plate) align optically. **UN Youth and BCG are
in, and keep their College project line**, at his instruction and per CONTENT.

**The marks are bigger again** (clamp 132 to 212px, 19vh). To buy the height, the label now tucks
18px into the mark's own transparent margin instead of sitting in a row beneath it, so
`--fl-h` is `--fl-w + 16px`. The centre column gave back 30px (830px cap) and the photograph is a
little narrower (clamp 210 to 290px). Collision-free at all nine widths; the CTA and the email stay
on one line, which 790px broke.

## THE CAROUSEL, ONE-INK LOGOS, THE ZINE COVER (2 Oct 2026, later)

**The marks ride a carousel.** At his instruction ("a merry go round around the centrepiece") the
six marks now orbit an ellipse instead of sitting in two side bands. Built on an animated custom
property (`@property --spin`) with CSS `cos()`/`sin()`, so one declaration drives six marks and
nothing is computed per frame in JavaScript. They do not rotate with the ring: a carousel turns,
the horses stay upright, so only the position animates. It pauses on hover and focus, stops on
Pause motion (the toggle now sets `html.sm-paused` as well as `window.__smPaused`, because CSS
cannot read a variable), and never starts under reduced motion.

**The geometry is measured, not guessed.** Clearing the 760x498 centre-piece needs a 337px vertical
radius and the stage only has 290, so a full orbit around the copy does not fit on one screen. The
ring therefore passes **behind** the centre-piece, which is what a carousel does anyway, and the
copy carries a soft radial paper halo (a gradient, not a card, so the grid still shows and there is
no panel edge). The radii follow the room actually available:
`--rx:min(600px,calc(50vw - var(--fl-w)/2 - 40px))`, `--ry:min(272px,calc(44svh - var(--fl-w)/2 - 16px))`.
Checked through a full 360-degree turn at 1920/1600/1440/1280/1181/1024: no mark leaves the hero,
touches a screen edge or overlaps another. Under 1180px the ring becomes a row again, with the
animation and the translate switched off. The drag behaviour is gone with the side bands; a click
still lands.

**The marks are bigger again:** `clamp(128px,20vh,224px)`.

**The client logos are one ink.** He asked for them to stop reading as eight different brands.
`scratchpad/mono2.mjs` keys each mark out of its own plate (by the plate's modal colour, so
iSelect's orange and tickertape's black both knock out cleanly), tints everything `--deep`, and
redraws each into the same 560x200 box **scaled by ink area rather than bounding box**, so a wide
wordmark and a square badge carry the same optical weight. One CSS height is then correct for all
eight. Bliss and Birch still reads slightly light; it is the one mark with very little ink.

**The zine cover is his artwork.** The composed cover page (photo, masthead, contents, starburst)
is replaced by the delivered cover, and the 29 CSS rules that drew it are deleted.

**Cleanup:** 37 lines of dead CSS and a 53-line dead block in `home.js` that drove `[data-fi]`,
which no page has had since the Phase 1 hero was reverted. Verified before deleting: the carousel
marks use `data-file`, which is why a careless grep matches six of them.

## HERO REMARKS V1 — FIRST PASS (6 Oct 2026)

From `ShreyMehra HERO Remarks V1.odt`. Done in this pass:

- **Nav.** The slate is `[WORK] [IDEAS] [ME] [CONTACT]`; on hover the brackets fade outward as the
  rule draws under the word, and come back on leave. The mark is sized at `1.05em` of the nav's own
  type, so the logo and the words scale together instead of the logo being bigger.
- **Hero.** The floating hint is gone (it was landing on the email line, which is the copy overlap
  he flagged) and so is the credential line (the logo wall says it once). The ring rides **in front
  of** the centre-piece again so every mark stays clickable, and the marks are bigger
  (`clamp(148px,23vh,256px)`). To keep the copy readable, each mark dims to .28 and its label cuts
  out entirely while it crosses the reading area, phase-locked to the same 54s orbit. The label cuts
  rather than fades: five seconds at a quarter opacity is a contrast failure, zero is simply absent.
- **The brush.** The ripple is gone. The pointer now paints colour back into the black and white
  photograph through a CSS mask that follows it (`.print-colour`, `--bx/--by/--brush`), after the Up
  bank reveal. **It needs the colour original of the Delhi frame**: today it keys off the same
  halftone, so what it reveals is a saturated version rather than true colour.
- **Tickers.** Both Pause motion controls are gone. The three flowing tickers are two crossing
  lines: skills (now including storytelling, copywriting, PRDs, user research, positioning,
  messaging, enablement) and goals plus the verified figures. The testimonial tape is untouched.
- **Logo wall.** The college-project lines are removed at his instruction, which overrides the
  CONTENT rule above; the risk is noted in the handover. The marks are on cape red, bigger, and
  span the full breadth.
- **Island.** The slate and the readout now share one grid cell with `min-width:0`, so the shut
  shape no longer carries the slate's width as empty space on the right, and the readout fades in
  after the width settles instead of appearing to slide out of the edge.
- **Work.** The crosshair under the copy is gone: it followed no grid line and carried nothing.

**A mistake worth recording:** the regex that removed the two Pause motion buttons was lazy across
`</button>\s*</div>` and swallowed the whole worked-with block between them. Caught by grepping for
`worked-mark` after the edit; restored from `git show HEAD:index.html`. Match structure, not
delimiters, when deleting markup.
