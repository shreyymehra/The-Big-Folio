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
- Photo caption: `2003. First machine I was allowed to break.` **2003 is locked, confirmed by him
  12 Oct 2026.** This line read 1998 for months and the site read 2003; the film date stamp on the
  print is ambiguous and he has settled it. Do not "correct" it back.
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

1. **DECIDED 20 Oct 2026: Vercel is canonical.** GitHub Pages becomes the redirect.
   **Still needed from him: the Vercel domain.** A canonical tag and a Pages
   redirect both need an absolute URL and there is none recorded anywhere in the
   repo. Not guessed, for the reason this file already gives about the Medium
   and X links: a wrong URL in front of a recruiter is worse than a missing one.
   Original note kept below for the deployment detail, which still applies.

   **Where this deploys.** Astro is gone (`d5aa99b`), so the choice is no longer Framer vs Astro.
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

## HERO REMARKS V1 — SECOND PASS (6 Oct 2026)

Corrections to the first pass, after he pointed out I had built the opposite of two of his notes.

**The ring orbits outside the centre-piece.** First pass put it behind (wrong), second put it in
front (also wrong). He asked for neither: the marks must clear the centre, and the centre squeezes
to allow it. An **ellipse cannot do this**: with a 840x343 centre the corner test
`((W/2+mw)/rx)^2 + ((H/2+mh)/ry)^2` comes to 1.65 and has to be under 1, which would need a 570px
vertical radius against 290 available. So the path is now the **perimeter of a rectangle**, via CSS
motion path (`offset-path:border-box`, `offset-distance` animated, `offset-rotate:0deg` so the
marks stay upright). A rectangle only has to clear each side, which this space allows.
The centre-piece came down from 760x436 to 840x343: smaller print, smaller name tiles, tighter
claim, and the two calls to action on one line. Below 1280px the ring becomes a row, because that
is where it stops fitting. Checked through a full circuit at six widths: nothing overlaps the
centre, the marks, the hero edge or the screen edge.

**Two tickers, not three.** The comic quote tape stays. The two crossing bands are now **one** level
band carrying skills and the verified figures together, which is what the merge was for: the X was
costing height and the point was to cut scroll.

**The logo wall is sized by height, not by a shared box.** A square mark in a 560x200 box reads
small next to a wordmark that fills it, which is why Bliss and Birch looked wrong. Each mark is now
trimmed to its own ink and capped by height, with one optical nudge for Bliss and Birch, whose
device is drawn small inside its own lockup.

**Work cards pop out of the wall.** They no longer pile: the three sit in their own columns and
none overlaps another, so no label is ever read through a card. Each starts small, flat and clipped
to a slot, then pushes forward, scrubbed by the same pinned scroll (`--p`).

**Ideas and below, first moves.** The hero's own "Hi", "is" and star are out of the zine: repeating
them made it read as a second hero. A full-bleed turn now separates the zine from Me, with the line
"Enough about the work" sitting on the rule. At the end of the page the "Looking for" line is gone
and there are four plain ways out, equally weighted.

**Not guessed:** the Medium and X links are marked `[GAP]` rather than pointed at a plausible URL.
A 404 in front of a recruiter is worse than a missing link.

## THE GAP REGISTER (7 Oct 2026)

Every missing thing on the site is now **one component with one code**, G01 upward in page order,
matched line for line by `FILL-IN.md` at the repo root. Four treatments were in use before this: a
dashed box on /work and /contact (`.gapbox`), a dashed box in the magazine (`.mag .gap`), a dashed
Tailwind box on the case pages, and two dead icon buttons in the contact row (`.ways-gap`). A
visitor met the same absence looking four different ways and read it as four kinds of broken.

The component is `.slot` (and `.slot-i` inline), in **base.css**, because the case pages load only
base.css and tw.css. The treatment is the red left rule the system already uses for a trade-off and
a pull quote, so a gap reads as an editor's margin note rather than a hole. The code is set in the
display face at full `--t-small`: at `.95em` it fell to 13.3px, which the contrast harness flags as
red type under 14px, and `opacity:.9` on the line took it below AA. **Do not put opacity on `.slot`.**

Seventeen coded slots: G01-G06 home, G07-G09 /about/, G10 /work/, G11-G16 the case pages, G17
/contact/. `FILL-IN.md` also carries five items that need a file but have no slot (the colour Delhi
frame, the six quote attributions, two LinkedIn recommendations, 16:10 cover masters, junk-journal
props) and three decisions only Shrey can make.

**Also fixed this pass, all found by looking rather than by grep:**
- **The Medium and X dead buttons are gone.** Two greyed items in a four-item CTA row made the row
  look half broken; it is now two live links and one slot line.
- **The section numbers disagreed.** Home called Me 04 and Contact 05; /about/ said 03 and
  /contact/ said 06. They now run 02 Work, 03 Ideas, 04 Me, 05 Contact on every route.
- **`.me-head` collapsed below 900px.** It is a `<span>`, and the stacked branch left it inline, so
  `width`, `height` and `aspect-ratio` were all ignored and the square figure slot flattened to a
  62px band across the column. `display:block` in that branch.
- **A typo in a project title:** "Too Close the Sun" was missing a word, on both pages.
- **The resume link is percent-encoded.** The filename has spaces; the raw form 404s on a strict
  server, which is what Pages is.
- **The contact page now has a live resume row.** Its gap was stale: it claimed nothing was behind
  the home link, and the .docx has been in `public/` since the asset drop. The real remaining need
  is a PDF, which is what G17 now says.

**Known non-defects, confirmed again:** the figcaption over the photograph carries its own opaque
plate (8.5:1), each carousel label overlaps only its own mark, the ticker tracks overflow their own
clipped container, and the disabled magazine Back button is correctly unfocusable.

`PORTFOLIO-SUMMARY.md` is the companion document: every tab, the copy verbatim, the device, the
state, and the five things worth fixing next in order.

## THE X AND THE RUNNING WALL (7 Oct 2026, at his instruction)

**The X is back, and both bands are now one object.** The merge of 6 Oct took the two crossing bands
down to a single level band, to cut height. He has reversed that: two bands again, crossing, in
**opposite directions at one speed**, and in the **same style** rather than one leading and one
answering. Both are a cape blue plane with cream type and **cream rules top and bottom**. The rules
are not decoration: two identical blue planes overlapping merge into one shape, and the cream edge
of the upper band cuts the lower one the way one strip of tape cuts another. Without them there is
no X, only a blue blob with type running through it.

Content keeps the semantic split the two bands originally had, because that is what makes the
crossing mean something: **what I do** (15 disciplines) crossing **what it moved** (the seven
verified figures plus the three sectors). Every figure is from the master resume; 20k MAU rejoined
the set, since it was in the verified list and not on the page.

**The logo wall runs.** A static grid of eight asks to be read as a table, and a recruiter reads the
first two names and stops. It is now a right-to-left loop on the same engine as the bands, so it
holds while pointed at or focused and never starts under reduced motion. One track, eight marks,
four copies; only the first copy carries alt text, the rest are `aria-hidden`.

**Three traps in that conversion, all found by looking at it:**
1. **`.wt-band` was overridden by `.xband`,** which is declared further down the file, so the logo
   band inherited the crossing bands' `position:absolute`, `left:-10vw` and `width:120vw` and the
   marks sat off the left edge. It needs `.worked-ticker .wt-band` to win.
2. **`max-width:100%` collapsed every mark to zero width.** In a track of indefinite width the
   percentage resolves against a box the image is itself sizing, which is circular; the marks are
   sized by height here, so the cap has to be `max-width:none`.
3. **Lazy images with no declared size broke the loop.** An image that has not loaded and carries
   no width/height attribute has a zero box, so the track measured short, the loop length was wrong
   for the life of the page, and the row ran with one mark on screen and a long gap behind it. The
   marks now declare their intrinsic size and load eagerly (eight small files, cached after the
   first copy), and the engine re-measures as each image lands. **Any future track of images needs
   both.**
4. **Bliss and Birch needed a bigger nudge than the grid version.** In a fixed cell, by-height
   sizing was close enough; in a free-running row next to a 300px wordmark, a 49px square device
   reads as a hole. Its cap is now `clamp(54px,6vw,80px)`.

Dead with the grid: `.worked-list` and all its rules, the per-cell borders, the hover invert and
`.worked-ctx` (the college-project line it carried came off on 6 Oct).

**Still open, and it grew:** there are now **three** self-starting loops on home (the quote tape, the
logo wall, the X) and **no pause control**, which he removed on 6 Oct. Pointer and focus hold each
one, and reduced motion stops all of them, but neither is the mechanism WCAG 2.2.2 asks for. One
control in the island would close it without putting a button back on the page.

## WORKING THROUGH THE AUDIT (7 Oct 2026)

`AUDIT-2026-10.md` arrived in the repo untracked, written by another session against the running
build. Seven findings. What was actioned, what was flagged, and why the line falls where it does:
**build quality, accessibility and the artefacts I wrote are mine to fix; positioning, his prose and
the shape of his sections are his to decide.**

**Actioned.**

- **No ticket numbers render any more (finding 2).** `G01`-`G17` were appearing in the live text.
  The visible-gap convention is right and stays, but a code is a ticket number, and a ticket number
  on a page reads as an unfinished build rather than a standard being held. Each slot keeps its
  sentence and drops the code to `data-slot`, so it is still findable in the source and in
  `FILL-IN.md`. Two slots went entirely, because both were notes to myself read by the visitor they
  were about: the Medium and X line (an absent link is invisible; an explained absence is a
  paragraph about something he does not have) and the resume one (a visitor does not care which
  format it is in). Sentences were rewritten reader-facing: "The first post is being written",
  "Duolingo and L'Oreal are being written. They stay unlinked until they are."
- **The artwork placeholders are blank ruled slots.** A box awaiting an image reads as a layout; the
  same box carrying a name and a code reads as a bug to everyone except the person holding the
  ticket. `.ph b` and `.ph i` are gone with the labels.
- **The three empty Made rows came out** of Vastr, Cut The Noise and AbsolutILY. With the code
  stripped they read "year", which is a stub, not a fact. They stay on the fill-in list.
- **The ring holds on hero hover and focus (finding 3, the usability half).** It was
  `.floats:is(:hover,:focus-within)`, and `.floats` has `pointer-events:none`, so it only fired once
  the pointer was already on a mark, which is the hard part. These six are primary navigation and a
  moving target is harder to acquire than a still one. Now `.stage-hero:is(:hover,:focus-within)`:
  the marks move while nobody is engaging and hold still the moment someone is.
- **The logo wall label is "Employers, clients and volunteer work" (finding 7).** The BCG and UN
  Youth question was framed as a binary, keep the "College project" line or drop it. This is the
  third answer and it is better than both: accurate for all eight marks, no implication that all
  eight were jobs, and no self-diminishing phrase. His decision is still open and is noted as such
  in `FILL-IN.md`.
- **`PORTFOLIO-SUMMARY.md` took all four of its requested changes:** a career-track map, the measured
  contrast ratios (deep 8.50, fluoro 4.05, accent-type 6.06, ink on yellow 14.73), the fix list
  reordered so the track mismatch and the mechanism lines lead it, and a "what this does not claim"
  section stating in the document's own voice that five of seven are spec and no product marketing
  artefact exists. `FILL-IN.md` gained **A2**, one mechanism line per verified figure.

**Flagged, not actioned, because they are his call and two of them reverse his own instructions.**

- **Finding 1, the track mismatch.** The hero leads with product marketing and the slate has no
  product marketing artefact; the ticker names PRDs, user research, launch planning, sales
  enablement and competitive analysis, none of which has anything behind it. The audit's cheap fix
  is to reorder the discipline line and cut those five skills. **Both contradict him directly:**
  target roles are locked in this file as Product Marketing, GTM, Brand Strategy, and he asked for
  those exact skill words on 6 Oct. The mismatch is real and is now the first item on the summary's
  fix list, but the resolution is his.
- **Finding 3, cutting the claim or the rolling line.** The rolling line is LOCKED copy. The claim is
  not, but cutting either is an editorial decision about his hero. Restoring "rarely in that order"
  is likewise his.
- **Findings 5 and 6**, the repeated work slate and the magazine's ratio, are about the shape of his
  sections and his content.
- **Finding 7's three copy lines** are his words. The audit flagged them rather than changing them,
  which is correct, and so do I.

## TWO TAPES, AND THE NUMBERS STOP MOVING (7 Oct 2026, his decision)

Three moving strips became two, and both are now the same object. **The comic tape is the only
moving device on home:** a strip of paper with torn edges, tilted, running itself. One carries what
people said, one carries who the work was for. The marks sit in the same set as the quotes and take
the same star between them, so the two read as a pair rather than as two devices. The tilt
alternates, -2deg and +1.6deg, so they do not look like one band printed twice.

**The X is gone and the figures stopped moving.** It said something true, that the disciplines and
the results belong to each other, and it said it in motion, which is where the seven verified
figures went to not be read. A scanning reader takes away "there are numbers" rather than any one of
them. The same two ideas are now side by side and still, in `.moved`: **what I do** (15 disciplines,
his list, unchanged) beside **what it moved** (the seven figures, each at display size with its unit
next to it and **its employer under it**, because a number without a source is a claim and a number
with one is evidence). This is audit finding 4, and it is the only one of the seven that his own
instruction and the audit both asked for.

Offered and declined: keeping the figures inside the logo tape. He took the static band.

**Two optical nudges in the logo tape, same reason as before:** Bliss and Birch is drawn small
inside its own lockup and UN Youth is a tall narrow one, so at a shared cap height they read at
55px and 23px wide against a 295px wordmark. Each is capped taller. They are the **ninth and
thirteenth** children now, not the fifth and seventh, because a star follows every mark.

**Dead with the X:** `.cross`, `.xband`, `.xband--do`, `.xband--moved`, `.xset` and its items, the
760px media query, and the whole `.worked-ticker` / `.wt-band` / `.wt-set` block from the morning.

### A WARNING THAT COST SOMETHING

**Another session was editing this same checkout at the same time.** It wrote `AUDIT-2026-10.md`,
a `Claude outputs/` folder of screenshots, a rolling-word width fix in `home.js`, and CSS in
`site.css`. Two things went wrong:

1. A `git add -A` swept its untracked audit file into my commit before I had read it.
2. It overwrote `index.html` and **reverted the width/height fix on the eight logo marks**, which my
   `git add -u` then committed as HEAD. The lazy-load gap bug was live again for two commits. It is
   re-applied here, in the tape markup.

**If a second session is running, check `git status` and `git diff` before every `git add`, and
never use `-A`.** The repo has a documented history of uncommitted work being lost, and this is the
second mechanism for it.

## THE ME SECTION, AND A CLEAN-OUT (8 Oct 2026)

**Me is built.** Three things, all from his ODT brief:

1. **The monologue.** His paragraph is unchanged to the word. What changed is where it breaks: each
   sentence is a `.beat` with air after it, the opening beat set larger because it is the thesis and
   the closing one set apart in italic because it is the turn. The word-by-word ink still runs over
   the top; site.js walks text nodes, so the beats do not interrupt it.
2. **The deck**, in the right-hand column that was empty on every screen over 900px. Three cards:
   the Venus Roadlines audit result, the First Class Honours and scholarship, and the empath line.
   **Every card is real, which is why there are three and not five.** The two LinkedIn
   recommendations are still item C in FILL-IN and the deck grows when they land. Title is **"Some
   external validation"**, the second of his two options; the first, "Personality hire? Maybe",
   reads wrong over a degree and an audit result.
   Mechanics: the markup is an ordered list and stays one, so a screen reader reads all three in
   order and never drives anything. JS adds `.is-deck`; without JS the list stacks down the column,
   the same arrangement the VoiceDNA tablist uses. Drag throws a card to the back, two buttons and
   the arrow keys do the same, and there is no end of the deck so nobody gets stuck.
   **The arrow-key listener is on the nav, not the list:** the list holds nothing focusable, so a
   keydown bound there could never fire.
3. **"The long version" lost its special treatment**, which was his note. It carried a permanent red
   underline while the links at the end of the page carried none until hovered, so the one link to a
   second page shouted and the ones leaving the site whispered. It matches `.ways a` exactly now.

**The record player was the overlap.** At 112px, `position:fixed`, it sat over the bottom-right
corner of every screen for the whole page: over a figure in What it moved, over the zine, over the
last line of Me. It now rests at **64px** and opens to 112px on hover, focus or while playing, and
it **stands down over the hero** again (`html.at-hero` was still being set by home.js and nothing was
reading it). **On phones it is not there until it is asked for**: `#vinyl` is the Listening mark's
target, so the mark summons it and playing keeps it. A floating control may cover the corner it
lives in; it may not cover the copy.

**The console is clean.** `@view-transition{navigation:auto}` makes the browser reject its own
internal promise when it skips a transition, which it does on a fast or interrupted navigation, and
the page owns no promise to catch it: `Uncaught (in promise) AbortError: Transition was skipped` on
every such load. site.js now swallows **that exact rejection and nothing else**; any other unhandled
rejection still surfaces. The remaining warning, `Allow attribute will take precedence over
allowfullscreen`, comes from Spotify's own embed and is not ours to fix.

**Dead code: 47 rules, 58 lines out of site.css.** `.reading` (case pages load tw.css, not this),
the whole `.proof` family including `section.proof.comic`, `.measure`, `.said` and
`.stage-copy .said`, `.roll ul/li`, `.value`, `.hmail`, `.ticker`, `.saygap`, `.second`, `.idea`,
`.rise` with `@keyframes rise`, `.top`, `.back`, `.hero-k b`, the `.dark ` theme leftovers, and the
orphan references left in two grouped rules. **`.copied-note` looked just as dead and is not:
feel.js builds it when an address is copied.** A scanner cannot tell a state selector from a dead
one, so every removal here was checked against the markup and against the scripts first.

### PERFORMANCE: the images were the whole problem

Measured properly, across all nine routes at 1920, 1280 and 390, the site was serving images at
**4 to 18 times** the pixels they display. The star mark was a 1500px file rendered at 44px.

Eight files resized to roughly four times their largest rendered width, which leaves retina headroom
and then some: `assets/img` went from **2.2MB to 1.42MB**, and the eight files alone from 1164KB to
411KB. The hero photograph is the one that barely moved (358 to 293KB at 720px) because a halftone
is high-frequency noise and compresses badly; it is also the one the brush reads as a background, so
it keeps the headroom. Originals are in the session scratchpad, git history is the real recovery path.

**Still open, and worth knowing:** `gsap.min.js` is 70KB and drives exactly two calls, the ransom
tiles' jitter and one stepped spin. `motion.min.js` was deleted on 21 Sep for the same reason at
81KB for one `inView`. The same argument applies here and the replacement is a few lines of
`requestAnimationFrame`. Not done without his word, because it is the hero's signature motion.

## COLLAPSIBLE, ONE LEFT EDGE, THE THROW (9 Oct 2026, at his instruction)

**What I do / What it moved collapses.** Both columns are native `<details>`, because that is
keyboard operable, announced correctly and works with the script off, none of which a div and a
click handler gives you. **Both carry `open`:** the figures are the most persuasive content on the
page and a closed drawer buries them, so collapsing is for the second read. The marker is drawn
from the site's own line work, a plus that loses its upright, not a platform triangle.
**`.mv-grid` needed `align-items:start`**, or the collapse reclaimed nothing: grid items stretch to
the row, so the column kept its full height with the list hidden inside it.

**One left edge, site wide.** `.shead` was a two-column grid whose first column was sized `auto`,
which meant **the heading started wherever the label beside it happened to end**. Measured at 1280
before the fix, the same device landed on five different edges: 132, 142, 160, 207 and 251px. The
label, heading, sub and body now all start at the content edge, which is what `/work`, `/contact`
and the five case pages already did, so this brings home and `/about/` into line rather than
inventing anything. The star keeps its place beside the label via `:has(.smark)`; where there is no
star the label simply starts the row.

**What the audit script cannot tell you, and I checked by hand:** a second column in a two-column
grid is not a misalignment, and neither is pull-quote text sitting inside its own left rule, which
is what the 78px readings on the case pages were. The harness is in `scratchpad/align.mjs`; read its
output as candidates, never as a list of defects.

**The deck throws.** A card now leaves the way it was pushed and rejoins the back once it is out of
sight, rather than snapping. Short drags spring back, so a mis-grab costs nothing, and the card
fades slightly as it travels. Under reduced motion it rotates without the flight, because a card
crossing the screen is the thing that rule exists to stop. The count is `aria-live="polite"`.
There is still no end of the deck.

**It holds three real cards and needs his words.** There is nothing else true on the site that is
not already somewhere else: the six quotes are on the tape, the figures are in the static band, the
200K line is in the Me paragraph. So the deck ships with what is real and a **commented paste-in
template sits beside it in index.html**: three lines in order, no script to touch. `FILL-IN.md`
item C now describes that rather than asking for two recommendations in the abstract.

**One cap height for all eight marks.** Bliss and Birch and UN Youth each had a nudge taller,
because they are small devices rather than wordmarks and read light at a shared height. He looked
at it and wants them the same size as the rest. The nudges are gone and one line sizes every mark.
The cost is the thing the nudge was correcting, and it is his call: a device mark carries less
optical weight than a wordmark beside it.

## THE HERO, TAKEN OVER (12 Oct 2026)

**The overlap was arithmetic the stylesheet could not do.** `--rx` and `--ry` were hand-picked
constants, so the ring had no idea how big the centre-piece was. Measured through a full orbit at
five widths, **every one of the six marks crossed the hero panel at every width above 1280**, by
12,000 to 20,000 square pixels. Under 1280 it looked fine only because the media query had already
turned the ring into a row.

The sum: a mark riding the top edge needs `centreHeight/2 + markHeight/2 + gap` of vertical radius
to clear the centre, and has only `stageCentre - markHeight/2 - edge` before it leaves the hero. At
1440x900 that wanted 391px against 335px available. **No constant could have been right**, because
one side of it is content.

**`home.js` now fits the ring to the measured boxes**, re-running on resize, on `fonts.ready` and on
`load`, because the tiles and the face both land late and both change the panel's height.

**Two findings that only came from looking at it:**

1. **The squeeze has to land on the panel, not the centre-piece.** The first version drove
   `--centre-max`, which did nothing: the panel was sized `clamp(238px,25vw,330px)`, so narrowing
   the centre only squeezed the copy column beside it, and the height, which is what the ring
   actually runs out of, never moved. Worse, when it did bite it starved the claim into five short
   lines and pushed the two calls to action onto separate rows. The grid is `auto minmax(0,1fr)`, so
   **width taken off the panel is handed to the copy**: driving `--panel-w` instead fixes the
   geometry and widens the claim at the same time. At 1440x900 the panel goes 330 to 246, the claim
   holds three lines and the two CTAs stay on one.
2. **The cut-out letters had to stop being sized in vw.** They are percentages of the panel now, so
   the lockup scales as one object. The percentages are the sizes they already had at 330px.

`.is-row` makes the row fallback reachable by class as well as by media query, so the fitter can
drop to it if the panel ever hits its 210px floor. It has not needed to at any size tested.

Verified collision-free through a full orbit at **1920, 1680, 1600, 1440, 1366, 1280, 1279, 1024,
768 and 390**: no mark touches the centre-piece, the copy, another mark, the hero edge or the screen
edge. `scratchpad/hero.mjs` is the harness; keep it, this will need re-checking after any hero change.

**UI/UX is on the site**, at his instruction, in three places where there is something behind it:
the home `What I do` list gains UI/UX and Prototyping beside User research; `/about/` gains a
**Product & interface** group under Fluent (UI/UX, wireframing and prototyping, information
architecture, user research, design systems, accessibility); and **VoiceDNA carries a UI/UX tag**,
because it is the piece where he designed and built an interface rather than described one.

**Worth his read:** his own line for the Me section was *"I am not a product designer"*. A
Product & interface group does not contradict that, since UI/UX and product design are not the same
claim, but he should decide whether the group name is the one he wants standing next to it.

## THE PILL, THE COVERS, AND A REGRESSION I CAUSED (12 Oct 2026)

**The hero copy was invisible for four days and it was my fault.** He reported the hero showing only
"Product marketing & brand strategy" with no claim, no calls to action and no revolve. Reproduced on
a clean load: `.anim` holds every `[data-t]` at opacity 0, and `home.js` brings them back by adding
`rise`, `snap` or `fade` at each element's own delay. **The dead-code sweep of 8 Oct deleted `.rise`**
after checking the markup, where it never appears, because it is applied by script at runtime.
`@keyframes rise` survived, which is why nothing looked obviously broken in the stylesheet.

**The rule for any future sweep: grep `assets/*.js` as well as the HTML.** A class a script adds is
invisible to a markup search and to a DOM scanner, and `.copied-note` was caught that way while this
one was not.

**The ring was falling back to the row on common laptops.** At 1280x720 the orbit missed by **seven
pixels** with the panel already at its 210px floor, so `.is-row` fired and nothing revolved. The
fitter now squeezes in two stages: the panel first, because the identity can be smaller, then the
marks down to a 104px floor, because a slightly smaller mark that orbits beats a bigger one that
does not. The row is the third answer, not the second. Gap and edge came down from 14/18 to 10/12.

**The ending sits on a cape blue pill**, at his instruction. The veto list bans pills and means the
small metadata capsule, not a plane big enough to be a room. Blue and not red because the block
carries small type and red carries none under 24px; cream on deep is 8.50. The hover rule inside
turns **yellow**, because red on blue is unusable and this is the one place yellow gets to be the
interactive colour. Rounded ends square off under 1100px, where they would eat the corner content.

**The 16:10 covers are in.** Seven masters arrived in four formats: two PNG, three SVG and one ZIP
holding two PNGs. **Three of the SVGs were the October trap again**, a base64 raster inside a vector
wrapper, 30MB for L'Oreal and 26MB for VRL. All seven are now 1200x750 WebP, 33 to 133KB, 415KB for
the set.

**The slots went back to landscape:** `.wk-frame` from `1/1.414` to `16/10` and `.plate` from `4/3`
to `16/10`, and both lost `object-position:top center`, which only existed to keep a portrait
poster's headline in frame. With the art and the slot at the same ratio, cover crops nothing.

**`.gitignore` now excludes the delivered masters** (`assets/img/work/*.png|svg|zip`,
`assets/img/*.jpg|jpeg`). The site serves only the WebP derived from them, and a 30MB SVG in git
history is permanent. They stay on disk where they cannot be swept in by accident.

**One stale file left on purpose:** `assets/img/work/vrl2.webp`, unreferenced since the new master
landed. It may be the alternate he wants, so it is his to delete, not mine.

**Me1 is in (12 Oct).** The delivery was a zip of four PDFs: the same four cut-out floating heads on
a dark ground, on a light ground, a third large copy, and one blank page. Each head is black and
white with a hand-drawn star over one eye, which is the Reference Book spec exactly.

**The light-ground version is the one to key**, because keying light grey leaves dark hair intact
where keying the dark version eats it. Rendered at 1800px, blobs labelled, background keyed to alpha
with a ten-level feather, each head trimmed to its own ink. `scratchpad/keyout.mjs` is the script and
it is worth keeping: it takes a background sample point, because **a rendered PDF page sits inside
Chrome's own dark viewer surround and the top-left pixel is the wrong colour to sample.** The first
pass keyed the surround and returned one blob.

The red-star head is the one wired, because red is the site's accent; the yellow one is the other
on-palette choice and the pink and light-blue stars are not. The other three are cut and waiting.

**A pane quirk, not a site bug, now seen three times:** lazy-loaded images report `naturalWidth 0`
in the preview pane until forced with a cache-buster. The covers and this head both did it and both
render in a normal browser. Do not chase it.

## THE HEADS, THE STAR, AND WHAT KEEPS ME GOING (12 Oct 2026, at his instruction)

**Two of the four heads are placed, not one.** The red-star head in the fur hat holds the Me1 slot on
`/about/`; **the yellow-star head rides the giant star in the sign-off**, which is the key image he
asked for. Yellow was the only choice of the four: red on cape red disappears, and pink and light
blue are off-palette. The remaining two are cut and in the session scratchpad.

The layering is the point and it is the first real overlap on the site: **star behind, head on it,
wordmark across its chin.** The direction has been asking for things to sit on top of other things
and this is the first place it happens where nothing is clickable.

**The year is settled: 2003, his call, 12 Oct.** The locked line in CONTENT read `Delhi, 1998` for
months while the site read 2003, and the film date stamp on the print is ambiguous. CONTENT now
reads 2003 and says it is confirmed. **Do not "correct" it back.**

**The globe is gone.** `Where I have been` and its list of places are replaced by **What keeps me
going**: a polaroid of his parents and himself. A polaroid rather than a framed image, which means a
white card on a page of off-white, a deep lip under the picture where the chemistry sits, and a
degree or two off square so it reads as placed rather than laid out. It is the only white object on
the page, which is what makes it read as a print on a desk.

**Two lines in that section are mine and need his read:** the heading "The two people who made the
rest possible" and the caption "Mum, Dad, me." Both are flagged in `FILL-IN.md` under G09, and the
photograph itself is G08 now rather than the globe.

## HERO v3, THE STRIP, THE PILL, THE LOADER (13 Oct 2026)

**The hero is side by side and nothing in it loops.** Three attempts got here and the first two were
mine to own: the marks orbited a motion path, which fought the centre for room at every width; then
they drifted on a GSAP ticker, which **stacked them on top of each other and cost a frame budget
every tick for motion nobody asked to watch.** He called it laggy and uncool and he was right.

They are **hand-placed in the margins in CSS** now, three a side, and the only motion is a parallax
that answers the pointer: one rAF while it moves, nothing at rest. Verified zero mark-on-mark
overlaps and zero marks over the centre column.

**The trap that cost the most time here:** the old carousel rules sat *later* in the file than the
new ones and kept winning by source order, putting `translate(-50%,-50%)` back on `.floats` and
throwing every mark 560px off its position while the computed `left`/`top` read correctly. Deleted
rather than overridden. **Two systems for one object is how this kept happening.**

Layout: the cut-out name and the polaroid hold the left column, the claim and the calls to action
the right. The red panel is gone; the photograph is a print, which is what the polaroid in What
keeps me going established.

**One ticker, at his instruction.** The comic tape is the only comic device left. The marks of
employers now run on a **plain ruled strip**, no torn edge, no tilt, no stars: they are other
people's marks and they are evidence, so they travel on a line and nothing else.

**The metrics collapse onto a shield-yellow pill**, closed on arrival. Clicking the pill or
**anywhere on the strip of logos** opens it; the strip is a pointer shortcut layered over a real
`<summary>`, so the keyboard path and the announcement stay correct. Ink on yellow is 14.73. This is
the first time yellow carries a surface rather than a highlight.

**The work wall reads now.** The captions were small uppercase on blue; each is a paper sticker with
the name at display size and the state under it, and they no longer hide until hover, which is what
made the wall read as decoration. The posters are larger and spread down the stage.

**The crosshair is gone for good.** He asked twice. It was `display:none` at the top of the file and
switched back on inside a media query further down, which is why it kept coming back.

**The grid fades in with the scroll.** `--paper-in` goes 0 to 1 across the first screen and a half,
written on a rAF tick only when the rounded value changes. Every surface that paints the grid reads
it: the fixed page layer, the hero ground and the contact section.

**The star loader is back and plays on every load.** The first-visit flag meant almost nobody saw
it. Every other route now gets one too, injected by site.js and **scoped to its own id with its own
rules in base.css**, because the case pages load only base.css and tw.css and home's richer loader
lives in site.css. Self-contained beats moved.

**Dead code removed, checked against the markup AND the scripts first:** the `.hero-panel` family,
the inner `.mv-col` disclosures, `.places`, the carousel block, the no-motion-path fallback and the
orbit pause rule.

## THE MOTIVATION ARTEFACTS, THE ORANGE STRIP, THE CONTACT PILL (13 Oct 2026)

**What keeps me going holds his own artefacts.** He sent a sheet of three: two paper-clipped polaroid
stacks and a camera with the Taj frame still on its screen. Cut out with `scratchpad/keyout.mjs`,
clips and all, and each floats on its own slow CSS loop with a different duration and delay, so the
group never lines up into a grid. **Keyframes on transform only**, which the compositor handles and
which cannot stack or lag the way the hero drift did.

**The five steps run instead of listing**, right to left on an **orange band** (`#F0792A`), which is
that section's own ground. Orange is new to the palette and earns its place by being the only one;
ink on it is 9.1. The first attempt missed because the list is `.steps5`, not `.pg-steps`.

**Paragraph gaps are tighter** on both the home monologue and the long version, at his request. They
read as one piece of writing rather than five separated blocks.

**Contact is one pill and a third shorter.** It used to run the call to action, then the address,
then a row of links, then the sign-off pill repeating all of them: **the email, LinkedIn and the
resume each appeared twice.** The copy lives inside the pill now, there is one of each link, and the
Contact1 image slot is gone at his word.

**The star settles as the section arrives.** `--star-in` runs 0 to 1 while contact rises up the
screen, written on a rAF tick only when the rounded value changes, exactly like `--paper-in`. At 0 it
sits lower, turned further and quieter; at 1 it is home. Transform and opacity only.

**The record is ABBA, Take A Chance On Me**, with his own sleeve as the label, and the label is no
longer screened because it is artwork rather than a photograph standing in for one. **The Spotify id
was verified by opening the track, not guessed**: a wrong id is a dead player.

**Not done, and his call:** he supplied the mp3. It is 5.7MB, four times the whole image payload,
and it is a commercial recording, so hosting it on a public portfolio is a copyright exposure. The
embed plays the real track and costs nothing to host.

### THE PLANE TRAP, THIRD TIME

`--deep` became the light cream in dark mode and put the yellow "always" on cream at **1.06**. The
pill is cape blue in both themes now, hard-coded, the same way the polaroid card is white in both.

**The rule, now that it has bitten three times:** anything that is conceptually **a plane** (a card,
a pill, a printed object) rather than **a surface that follows the UI** must not use theme tokens.
Hard-code it, and hard-code the type on it. `--card`, `.pola` and `.sign-off` have all been this bug.

## THE ID CARD (13 Oct 2026, at his instruction, after the Akriti reference)

**The hero is one object now.** His note was that the "Hi I am", the photograph and the copy
should be grouped and sit to one side, "like their ID card but super clean". They were three
things arranged near each other; they are now an `<article class="idcard">` with the order every
licence in the world uses: head strip (the cut-out name and `No. 2003`), a rule, then portrait
beside detail, then the two actions. It sits left, tilted 1.2 degrees, and the six marks have the
whole right field. `.stage-centre` is a block container, not a two-column grid.

**The marks float on CSS, and nothing else.** Three systems have driven these six: an ellipse
orbit, a GSAP drift, and a pointer parallax. All three are gone, the last at his word, *"loops
should be there, pointer is not something we implement well."* Each mark now runs one of two
keyframe loops (`fl-a`, `fl-b`) at its own duration and delay, so they never beat together. Each
travels a few pixels around a **fixed** position, which is why they cannot collide, cannot stack
and cannot lag: there is no per-frame work and no inline transform written over the CSS.
Positions are hand-placed, checked in frame at 1440, 1280, 1024 and 390.

**Three traps in this pass, all found by looking:**

1. **Source order, again.** The v4 block was written near the top of `site.css`, and the old
   carousel rules sat 1400 lines below it, so the new hero was dead on arrival. It is now the last
   word on the object, and the old rules are deleted rather than overridden: `.stage-centre`'s
   840px grid, the whole `.is-row` branch, the 1279 and 780 queries, `.stage-hint`, `.hero-panel`
   and `.hero-cred` (neither has had markup since 6 Oct), and six comment blocks describing three
   systems that no longer exist. 6.5KB out. **Two placement systems for one object is how the
   560px offset bug happened, and it is how it would happen again.**
2. **The plane trap, a fourth time.** The card is hard-coded `#FFFDF7`, but its children still read
   `--deep` and `--card`, which swap in dark mode: the caption landed at 1.34, the stamp at 1.29
   and the email button at 1.25. Anything inside the card is a printed surface and now carries
   literal values. The mark labels took the same treatment, because the hero ground stays light in
   both themes at his instruction. **Any new child of a hard-coded plane needs this check.**
3. The marks were respaced after the first screenshot: Vinyl was falling off the bottom edge at
   900px tall and the field read sparse. Vertical range is 10 to 74 percent now.

Verified: contrast 0 failures light and dark on all nine routes, console clean, the three
remaining harness lines are the documented non-defects (the figcaption's own opaque plate, the
12px date, the label tucked into the mark's transparent margin).

## VOICE'D, THE MP3, THE STRIP, THE MOTION LAYER (13 Oct 2026, at his instruction)

**Voice'D replaces VoiceDNA** in every visible string, nine of them across six pages. **The
`/work/voicedna/` URL stays**, the same policy that kept `/about/` when the label became Me, so
links already sent keep working. The `.vd-` CSS prefix and the file names are unchanged.

**The record plays the file.** The Spotify embed gave anyone not signed in a thirty second
preview, which is the state most recruiters arrive in, and it put a third party in the critical
path of a device that exists to be charm. `assets/audio/take-a-chance-on-me.mp3` (5.7MB) is served
with `preload="none"`, so nothing is fetched until the deck is reached for. The disc and the ring
run off the audio element's own events, never off the click, so they cannot disagree with what is
audible. A stale `aria-label` naming a Savage Garden track went with it. `.vinyl-host` and its
iframe rule are deleted, checked against the markup **and** the scripts first.

**His face is off the contact sign-off and is a strip on `/about/`.** Four cut-out heads run
between the five things he believes, which were sitting there as a plain `<ol>`, the weakest
presentation of the strongest personal copy on the site. The strip **travels sideways on the
scroll** rather than looping: home already carries one self-starting loop, and a scroll-linked
band is controlled by the reader, cannot be missed, and stops when they stop. **The blue and pink
stars are off palette** and are used anyway, because four different frames read as a photo-booth
strip rather than one asset repeated; flagged in NEEDS for his call.

### THE MOTION LAYER

`assets/motion.js`, on GSAP 3.12.5 with **ScrollTrigger now vendored**. It is **additive**: every
block bails out silently if its markup is absent, nothing it does is needed for the page to read,
and the existing `.anim` / `[data-t]` / `.rise` reveal system is untouched. Lenis owns scrolling,
so ScrollTrigger is fed `lenis.on('scroll', ScrollTrigger.update)` or every trigger fires against
a stale position.

- **The work tile straightens off the wall.** The old hover was `translateY(-8px)` on a spring,
  which he called underwhelming and which says only "this is a button". Now the tile rotates to
  true, lifts, the poster pushes in behind its own frame and the red band wipes up: three things
  on one timeline, which is the reason this is GSAP and not three transitions that drift apart.
- **On `/work`, the row under the pointer is the only one lit.** Opacity only, down to .45, so
  nothing reflows and every dimmed row stays above the contrast floor.
- `[data-stage]` / `[data-stage-item]` is an opt-in section arrival. Nothing uses it yet; it
  exists so the next section does not get its own observer.

**A bug only driving it could find:** `fromTo()` on the red band leaves it visible at rest and then
snaps it off screen to animate it back, so the very first hover on the page flashes. It now hides
at rest **only where a hover exists**, or a touch screen would lose "Read the case" entirely.

### THE CHOPPINESS WAS THREE REAL THINGS

All found by screenshotting the scroll, none visible in the file.

1. **The quote tape's rotated corners landed on the logo label.** A -2deg band 2vw wider than its
   box drops its corners about 26px below the padding box. The clearance has to go on
   `.workedwith`, which is **nested inside** the tape section, so padding on the parent moves
   nothing between them. The first fix changed nothing and the DOM said why.
2. **144px of nothing** between the logo strip and the metrics pill: the strip's bottom margin and
   the section's top padding were each set as if it were the only gap.
3. **The work tiles revealed through a `clip-path`.** `--p` spends most of its life between 0 and
   1, so the card spent most of its life with its top 20% and bottom 5% sliced off. A half-cut
   label does not read as an animation, it reads as a rendering bug, and that is the choppiness he
   reported. Opacity, scale and lift have **no intermediate value that looks broken**, which is the
   property that matters for anything a reader scrubs.

### THE HERO CARD CARRIES THE NAME

It had been shrunk to a 150px thumbnail in a head strip, which inverts the hierarchy the system is
built on and throws away the one device that is unmistakably his: at that size you cannot see the
letters are cut from different sources. The name is the headline now, the card is sized around it,
and the head rule is **cape red**, because the hero had no red in it at all except a 52px stamp.

**The registration edge took three attempts and the lesson is worth keeping.** Two put the red on a
pseudo-element behind the card and it painted over the whole card. The cause was never the z-index:
**`.idcard` carried `transform:rotate()`, and a transform creates a stacking context on its own**,
so a `z-index:-1` child can never get behind its parent's background whatever the index says.
Changing `z-index:3` to `auto` did nothing for exactly that reason. The third attempt moved the
paper onto a pseudo-element too; it worked visually and then **lied**, because with no background
on `.idcard` the contrast harness walked up to the body and read the claim at 1.01 in dark mode on
a plainly white card. **A check that cannot see the real ground is worse than no check**, because
the next session trusts the zero. So the rotation moved up to `.stage-centre`, which holds nothing
but the card, and `.idcard` keeps a real background where anything reading the file expects it.

### THE COPY AUDIT

Deduplication only. **His prose is not rewritten anywhere**: every edit deletes a second copy or
swaps a repeated headline for words already true of that page. Everything merely long is in
`NEEDS.md` for him, because shortening his writing is his call.

- **"The briefs nobody asked me to write" was printed four times on home alone** (work heading,
  magazine contents, magazine projects page, a hover hint on a 150px icon). A line that names the
  whole body of work carries nothing by the fourth printing.
- The process intro and its own step 01 both carried "knowing what to do and how to do it is 80%",
  forty words apart.
- The spec-and-numbers policy was on `/work` and again almost word for word in FAQ Q.01. The same
  invitation was in Q.02 and on `/contact/` verbatim.
- The magazine said the posts were being written in two adjacent sentences.

**Still duplicated, and flagged rather than cut because they are his:** the home Me paragraph is
the `/about/` opening paragraph verbatim one click apart, and the five beliefs are now both the
strip and the magazine's manifesto spread.

**`NEEDS.md` is the new companion document**: every asset, every line of writing and every decision
still outstanding, each one saying what it unblocks. It is the answer to "generate a thorough list
of things you need". `FILL-IN.md` remains the line-by-line register of coded slots.

## THE STAR, THE SCAN, AND THE 11fps HOME (13 Oct 2026)

**The star with him in it was in the bobblehead zip all along**, in `3.pdf`, which an earlier note
in this file recorded as "a third large copy" of the floating heads. It is not: it is him inside a
hand-drawn red star, holding the phone that took it. It replaces the small floating head in the
`/about/` header, because that was a decoration and this is a feature. Keyed out with
`scratchpad/keyout.mjs` at background sample 60,60. **Check the other PDFs in a delivery before
recording what they contain.**

### THE HOME SCROLL WAS 11fps, AND IT WAS THREE AVOIDABLE THINGS

Measured with `scratchpad/scan.mjs` (payload, FCP, frame health over a scripted full-page scroll)
and `scratchpad/prof.mjs` (CPU profile over the same). `/contact/` held 51fps on the same harness
while home managed 11, which is the comparison that matters: the machine is not the problem.

1. **The ghost stars measured the SVG path every frame.** `getTotalLength`,
   `getComputedTextLength` and **sixteen `getPointAtLength` calls per frame**, together 12.3% of
   the whole profile. None of their inputs change while scrolling. The curve is sampled **once**
   into a 360-point `Float32Array` and every frame after is interpolation on that array;
   re-sampled on resize and on `fonts.ready`, which are the only two moments the text length moves.
2. **The tiles were walked three times a frame**, and the middle pass read `--p` back **out of the
   style object** to find the active tile: a CSSOM round trip for a number the first pass held.
3. **The reading progress was a bare scroll listener** reading `document.body.scrollHeight`, which
   is a forced synchronous layout, and **Lenis fires scroll on every frame it animates**. Cached,
   rAF-throttled, and it only writes when the rounded value moved, which is the guard `--paper-in`
   and `--star-in` already use.

**After: SVG geometry calls gone from the profile entirely, idle 25.3% to 39.0%, the progress
writer 6.9% to 3.0%.** Verified behaviourally, not just syntactically: all 8 ghost stars still
place along the curve, all 3 tiles still drive `--p` to 1, the star fill still tracks.

**The lesson worth keeping: anything inside a scroll handler that measures geometry is a bug until
proven otherwise.** Path length, text length, `scrollHeight` and `getBoundingClientRect` on a
fixed-size element are all constants being recomputed sixty times a second.

**Keep both harnesses.** `scan.mjs` and `prof.mjs` are the only way this was found; it is invisible
in the file and invisible in a screenshot.

### `SCAN-REPORT.md`

A full verification pass written as the sceptical recruiter the site is built for: scores out of 10
per dimension, what was fixed without asking, what is flagged and why, and the four things that
would actually move a hiring decision. Read it with `NEEDS.md`, which is the input list; this one
is the judgement.

**The single highest-impact finding, and it is his call because it reverses his own instruction:**
`<details class="mv">` ships **closed**, so the seven verified figures, the only independently real
evidence on the site, are behind a click that a scanning reader will not take. This file records
from 9 Oct: *"Both carry `open`: the figures are the most persuasive content on the page and a
closed drawer buries them."* On 13 Oct the pill was built closed, at his instruction. Flagged, not
changed.

**Two facts established in passing and worth not re-deriving:** the Asimov Print display face is
**Apache 2.0** (a Roboto derivative), so the licence question is closed and conversion is
permitted; and it ships as **two `.otf` files totalling 264KB on every route**, where WOFF2 would
be roughly 90KB. There is no Python or fonttools on this machine, so it is a recommendation rather
than a fix.

## THE REGISTER CAUGHT UP WITH THE DELIVERIES (19 Oct 2026)

Nothing was half-built. The only thing in the working tree was
`assets/img/What mtoivates Me.pdf`, a master Shrey dropped at 00:23 on 13 Oct
and **already consumed**: the three `mot-*.webp` were cut from it nine minutes
later. Its five embedded images were extracted and checked one by one against
what is on the page, which is the only way to know a master is spent rather
than pending: the mum photograph, the dad photograph, the camera body, the Taj
frame for its screen, and the camera's alpha mask. All five are placed.

**`assets/img/*.pdf` is now gitignored**, with the other delivered masters. It
was the one extension the 12 Oct rule missed, so a 2.8MB PDF sat untracked in
`git status` waiting for the `git add -A` this file already warns about twice.
The earlier masters in `_archive/source-assets/` (including a 6.5MB
`zine-cover.pdf`) predate that rule and stay where they are.

**The real residue was in the two documents Shrey works from.** The 13 Oct
session wired the assets and renamed the section but only half-updated the
registers, so `FILL-IN.md` was still asking him for things that had landed and
for approval of copy that is not on the site:

- **G07** asked for a floating head with a star on one eye. He sent it. The
  star with him inside it holds the `/about/` header and the four cut-out heads
  run as the photo-booth strip.
- **G08** asked for "one photograph of the three of you" to fill a polaroid
  card. The card does not exist; three of his own artefacts are in its place.
- **G09** asked him to approve a heading and a caption. **Neither is on the
  site.** The heading is his own "Who I do it for" and the artefacts carry no
  caption, so there was nothing of mine left to approve. `NEEDS.md` B5 said the
  caption was still open; it never shipped.
- **G05** and **G06**, the Contact1 graphic and the hill, were voided by the
  13 Oct contact rebuild: one pill carries the copy, and the giant star is the
  ground the section stands on now.

Closed in the house style `NEEDS.md` already used (`~~struck~~ CLOSED/VOID,
date`) rather than deleted, so the codes still line up with the seven
`data-slot` attributes left in the markup. **Do not renumber G01-G17.** Ten of
the seventeen have no live slot and most of those are still genuinely open: the
7 Oct audit stripped visible codes from several on purpose, which means a
missing `data-slot` is not evidence an item is done. Each of the five above was
closed on what is actually on the page, checked one at a time.

A stale comment in `about/index.html` describing the empty polaroid card went
with them. **The lesson, and it is the same one as "check the other PDFs in a
delivery": when an asset lands, the register entry that asked for it is part of
the change.** A register that asks for what it already has is worse than no
register, because the next person to read it believes it.

## V1 PASS: THE PRD, THE SEQUENCE, THE EGG (19-20 Oct 2026, at his instruction)

**The process band is an infographic**, with his own hero marks matched to meaning rather than
assigned to fill a slot: the record player listens, the pencil starts blank, the bulb is research
turning into something, the phone is the step that is a conversation, the star is the standard it
becomes. Each step carries a mark, a number, a name and the line that says what happens, so the
band summarises and the cards below explain. It runs on home and `/about/`, which is why the
**ticker engine moved from `home.js` to `site.js`**: a behaviour on two pages is shared behaviour.

**`/work/vastr/prd/` is the artefact the site did not have.** The portfolio leads with product
marketing and everything on it argued rather than specified. The PRD carries user stories, P0
scope with the line between in and out, seven requirements each with the reason it is that number,
success metrics with a kill criterion, risks with mitigations, and a phased release. Sourced
entirely from his own case copy and the GTM brief already on the site. **R-02 deliberately carries
no percentage**, and says so on the page: the threshold is an output of the first build, and
inventing it would be printing the one number the build should produce.

**The work wall reads as a sequence.** It was three posters at three hand-placed positions,
accumulating, with a few hundred pixels of empty blue under them and nothing telling the eye which
to read first. Each project now holds the stage alone, larger, numbered, and hands it to the next.

**Two bugs there, both only visible in a screenshot:**
1. Giving every tile an exit **emptied the stage for most of the pin**: `--wp` reaches 1 well
   before the pin releases and then holds, so the last tile must never leave. The handoff is read
   off the **next tile's reveal** rather than a constant, so it survives re-spacing.
2. The first handoff dissolved one poster through the other, labels and all, which reads as a
   rendering fault rather than a transition. The outgoing tile clears before the incoming starts.

**One transition language.** Some seams were a hard 2px rule, which cuts the page without saying
anything; others were nothing, so two different grounds met with no event. The rule now: **where
two different grounds meet the upper block tears away in its own colour; where two blocks share a
ground a rule is the honest signal and stays.** The work block had been tearing into Ideas in
cream when Ideas is warm white, and those six points showed as a pale line along the seam.

**The easter egg is earned.** One of his cut-out heads peeks over the wordmark at the bottom of
home, for anyone who actually went the whole way down. No new copy and no new asset: a reward that
needs a caption is not one. **The first version tracked the deepest point reached and fired at
98.5%, which a single jump to the footer satisfies** — End, or a link to `#contact`, won it without
the visitor seeing anything, and the comment above the code claimed a journey the code did not
enforce. My own test caught it. It tracks **coverage** now: ten bands, eight visited, plus the end.
Jumping marks exactly two bands. Verified both ways.

### WHAT THE FINAL SCAN FOUND

- **The band's sub-line measured 4.16 where I had estimated 5.6.** Second failure of a translucent
  ink on the orange plane; the step numbers were the first at 3.98. **The rule for this plane: no
  opacity on type over the orange, ever.** Full ink is 9.1 and family and size carry the hierarchy.
- **The new magazine link shipped at 104x19** against the 24px minimum (WCAG 2.5.8).
- **`.contact` had `overflow:hidden` and was clipping nothing**, because it was statically
  positioned and therefore not a containing block for its own absolutely positioned children.
  `position:relative` makes the clip mean what it says.

**A correction worth recording.** Mid-pass I reported an 8px horizontal scroll on home at 390 and
called it a regression. **It was not.** `hover.mjs` sets a 390px *window*, which is not a 390px
*viewport*: the page laid out at 485px and the reading was an artefact. `scratchpad/mob.mjs` uses
`Emulation.setDeviceMetricsOverride` and is the one to trust for reflow. Re-measured: no horizontal
scroll on any route.

**Scroll health after the 13 Oct performance work, measured again:** case pages and `/about/` and
`/contact/` now hold **60fps with zero long frames** (were 16 to 41), `/work/` 47 (was 27), home 23
(was 11). Home is still the heaviest and the pin plus the magazine are why.

`SCAN-REPORT.md` carries the V1 section: scores moved 7.1 to 8.0, what was fixed, and the five
things still open, every one of them a content decision rather than a build defect.

## MAIN IS CURRENT, AND THE SWEEP FOUND TWO BUGS (20 Oct 2026, at his instruction)

**`main` and `v5-blocks` are now identical.** `main` had sat at `a1da02b` for 46 commits and
carried none of the current site. The merge was a clean fast-forward; there is no divergence and
nothing was resolved by hand. **`v5-blocks` remains where work happens**, and the two are in sync.

### THE SWEEP

60 rules, 76 lines, every one checked against the markup **and `assets/*.js`** before removal.
`site.css` 154KB to 147KB, 351 classes to 318, and the detector (`scratchpad/dead.js`) now reports
**zero** dead candidates.

Residue of sections removed at his instruction: the quote tape (`.handtape`, `.ht-*`), the home
logo strip (`.workedwith`, `.worked`, `.ls-*`), the plain beliefs list, the magazine manifesto
list, the polaroid card, the composed zine-cover pieces, the pause-toggle furniture.

**Three traps in the sweep itself, all of which would have broken something live:**

1. **`otf` and `woff2` are not classes.** The detector flags them because `.otf` appears in a
   `url()` inside `@font-face`. Deleting on that signal would have unhooked the display face.
2. **`pola` and `mani` are dead as standalone classes while `.hero-pola`, `.mani-one` and
   `.mani-more` are live.** The removal matches an **exact class token**, never a substring.
3. **Four selectors also targeted something live** and needed hand edits rather than deletion:
   `.p-is,.p-mark,.sticker` kept `.sticker`; `.slot b,.slot-i b` kept `.slot b`;
   `.worked-k,.contact .no,.shead .no` kept the two live ones. Two `.reach-wrap` descendant rules
   went entirely, because **no markup on any route carries `.reach-wrap`**, so they could never
   match whatever their descendants were.

**The sweeper walks past `@media` one-liners**, because the line opens with `@`. Five dead rules
survived inside them and were found by re-running the detector after the write. Always re-run it.

### TWO REAL BUGS BEHIND THE DEAD CODE

1. **A latent freeze.** `site.js` read `localStorage['sm-tickers']` on every load. Anyone who
   pressed "Pause motion" before the control was removed on 6 Oct still had `paused` stored, so
   **their tickers started frozen with no control left anywhere to unfreeze them.** The key is now
   cleared on sight, so those visitors recover on their next load.
2. **A 300ms interval running for the life of the page.** `home.js` polled `window.__smPaused`
   every 300ms to pause or resume the ransom tiles. Nothing has set that flag since the toggles
   went, so it resumed timelines that were never paused, forever, on every visit.

**The lesson to keep: dead code is not only weight.** Both of these were invisible as behaviour
and only surfaced because something was being removed around them.

### VERIFIED AFTER

Console clean on nine routes, contrast unchanged, links all resolve on `main`, and the devices
driven by the touched files confirmed still running rather than assumed: the ticker moves when it
is in view (it is correctly stopped by its IntersectionObserver when it is not, which reads as
broken if you test it off-screen), the ransom tiles are present, the vinyl is still on the mp3,
and the easter egg is intact.

## THE iPOD, THE SKY, THE REAL PRINT (23 Oct 2026, at his instruction)

**The playlist plays inside the iPod.** His brief was exact: fit the Spotify
preview to the iPod png, make it look scrollable on it, change nothing else
about the playlist, and say if it breaks on mobile. The embed is untouched -
same src, same controls - and is framed by `.ipod` > `.ipod-shell` +
`.ipod-screen`. The screen rectangle is **measured off the artwork**
(`scratchpad/screen.mjs` scans for the dark frame): 6.33% / 4.36% / 87.05% /
44.21%. Those four numbers are the whole placement, so a re-export needs only
them re-measured.

The png arrived on an **opaque white plate** and was keyed out - the second
delivery in a row to do that, after the monogram's full-canvas white rect.
Check every export from that tool.

**On a phone the shell drops and the embed stands alone**, which is the answer
to his question: it does not break, it degrades. A 340px device drawn at 390px
wide leaves a screen nothing can be read in. It takes **352px** there, not 252:
at 252 Spotify picks its compact layout, draws about 150px of card and leaves
the rest of the iframe empty, which reads as a hole in the column. Verified at
a real 390.

**The sign-off stands in his cloud texture.** First pass was full bleed at .34
and read as a photograph with the drawn grid laid over it: the section stopped
being paper and the blue pill had to fight a blue ground. It is a **band at the
seam** now, entering where the section does and gone before the pill.

Two things worth not re-deriving:
- **The tile is mirrored.** CSS has no mirror-repeat, so the tile has to be
  symmetrical: `scratchpad/mirror.mjs` draws the photograph beside its own flip
  (`assets/img/clouds-tile.webp`, 1440x704, 64KB). The straight file tiled with
  a hard vertical join every 720px, which reads as a rendering bug, not a sky.
- **It does not drift.** The tile is sized `auto 100%`, so its rendered width
  follows the band height and no fixed keyframe distance lands back on itself:
  every loop would jump. And he asked for one moving device on this page.

**"Worked with" was opacity on small type.** `--deep` at `opacity:.72` is 4.33
against the 4.5 small type needs. It is `color-mix` now. This is the same
mistake the gap register already carries a warning about; the rule is general.

**The a11y harness now skips screen-reader-only text.** `h2.vh "Five things I
believe"` was reported at 1.06 on every run. A 1x1 clipped box is announced and
never seen, so its contrast is meaningless, and a standing false positive makes
the real findings easy to ignore. Contrast is **0 failures** on all nine routes
in both themes.

### TAB 2, THE REMAINING ITEMS

**#10, the FAQ is reordered.** It opened on "Is any of this work real?", which
leads a recruiter FAQ with the portfolio's weakest fact. The order is now what
the first fifteen minutes actually runs in: what you want, what you actually
did, what you are best at, then the honesty about the slate (Q.06), then
process and side projects. **No answer text was touched**; only the Q numbers
moved. The *broaden* half needs two answers only he can write - work rights,
and the three role titles - and is **NEEDS B6**, not invented in the meantime.

**#5, the print is one card, not two boxes.** What read as drawn was
structural: a mount with a 2px ink stroke holding the photograph, and a caption
below with its own stroke and `border-top:0` faking a shared edge. No physical
print is two objects, and an even 10px lip on three sides is the giveaway - a
polaroid's bottom lip is roughly five times its sides.

The numbers come off **his own scan**, probed pixel by pixel
(`scratchpad/polaprobe.mjs` on `mot-dad.webp`): card **rgb(242,241,234)**, not
white; side lip 2.8% of card width, top 3.5%, bottom 21%. The photograph sits
in a **well**, so its edge is an inner line on the image rather than a stroke
around the object.

**Attempted first and abandoned:** cutting the empty frame out of that scan and
laying it over the photograph. The artefact is rotated with a second card
behind it, so there is no rectangle to crop, and the same polaroid would then
appear twice on the site with two different photographs in it. A true fix still
wants one blank polaroid, or a scan of the Delhi print in one.

**A trap in that probe worth keeping:** the keyed-out artefacts carry
**alpha 179 on the card**, not 255. Every scan that tested `alpha > 200` to
find the card returned three pixels. Test the colour, not the opacity.

**#8 was already done** - the "How I think" asset swap is the five process
cards from his deck, static and hovering, built 21 Oct.

### THE SECTION RATIOS WERE MEASURED, NOT NUDGED (TAB 2.9)

At 1440x900 home is **7.9 screens**, and the split is:

| Section | px | share | screens |
|---|---|---|---|
| hero | 900 | 12.7% | 1.0 |
| moved (the figures) | 254 | 3.6% | 0.3 |
| work | 2160 | 30.4% | 2.4 |
| ideas | 1208 | 17.0% | 1.3 |
| about | 1687 | 23.8% | 1.9 |
| contact | 886 | 12.5% | 1.0 |

**Work is the largest at 30.4%, which is what the brief asks for**, and the
figures land on the second screen, which is what the 22 Sep pace note asks for.
Ideas was the suspect, since its own contents page says the posts are being
written, but 735 of its 1208px is the bound magazine, which is his artwork,
not padding: the section is a real object at a fair size.

**The one number out of proportion is `moved` at 3.6%** - the seven verified
figures, the only independently real evidence on the site, at a seventh of what
the personal section gets. That is entirely the cost of the pill shipping
closed, which is **his instruction of 13 Oct**, so it is flagged and not
reversed. It is mitigated: the closed pill already previews two real figures
and "12 more", so it carries more than its height suggests.

**Nothing was moved on this item.** A rework with no measurement behind it
would have been churn.

### THE PRD TABLE WAS UNREADABLE ON A PHONE

Found by the sweep, confirmed by looking. Under 640px the table stacks and the
headers are visually hidden, and the CSS comment said *"the headers move into
the cells"* - **but that half was never written**. Every row was three
unlabelled paragraphs, so a reader could not tell the requirement from the
reasoning. Both tables' cells now carry `data-label` and a `td::before` prints
it. The ID column keeps no label, because `R-01` is its own.

**A comment describing behaviour is not evidence the behaviour exists.** This
one read as done for as long as the file has existed.

## THE THIRTEEN (24 Oct 2026, at his instruction)

A numbered list from him. Three of the thirteen turned out not to be broken,
and saying so is part of the work: a fix applied to a non-defect is churn that
the next session has to reverse.

**Disclaimers (1).** Each spec case carries "Independent spec work. Not
affiliated with, endorsed by or commissioned by Hungry Jack's / Absolut."
**Vastr gets a different sentence on purpose**: there is no real brand to be
unaffiliated from, so what that line has to say is that nobody commissioned
it. The Cut The Noise poster carries the real Hungry Jack's logo, which is
exactly why the line has to be on the page rather than in a footer.

**Naming (2).** `voicedna.webp` is `voiced.webp` and the poster alt no longer
says "voicedna". **The `/work/voicedna/` URL stays**, the same policy that kept
`/about/` when the label became Me. He wrote "if the slug changes" and it is
not worth the live-links risk for a string nobody sees. **Two naming
inconsistencies are in his own artwork and are his to settle:** the Vastr
poster reads "vastra" and "vastra.com.au", and the Voice'D poster reads
"Voiced." Both are in NEEDS.

**Alt text (3).** "The vastr poster." told a screen-reader user nothing. Each
case header now describes what is in the frame, **written from looking at each
poster**, capped at 125 characters. The home and `/work` copies keep `alt=""`
and that is correct: the name and the state are in the text beside them, so a
description there is read twice.

**Status (4, 5).** One vocabulary everywhere: **Shipped / In build / Spec / In
writing.** "Real", "In development", "Writing" and "Case page not built" were
four more words for two states. The last of those is a note about the build
rather than about the work, and a visitor does not care which pages exist.
Counts: five briefs with two in writing, three of five, all projects.

**The claim concatenated (7).** The shipped HTML read *"I build
worldsstoriesbrandscampaignsbrands people want to belong to"* - what a
crawler, a link preview and a JS-off reader all got. The screen-reader output
was already correct via `aria-hidden` plus a `.vh` copy, but **that was one of
three**. The rolling words are no longer in the markup: the page ships the
sentence with its resting word, `home.js` builds the cycle and hides the
static word. **The guard there is deliberately not an early `return`:**
home.js is one IIFE, so a return would take the tickers, the vinyl, the loader
and the parallax with it if the hero markup ever changed.

**Sharing (10).** Nothing on the site had an `og:image`, so every link pasted
into a cold email arrived as a bare URL, which is the one place this portfolio
is seen first. `assets/img/og-card.jpg` is composed from his own cut-out name
on the cream ground with the cape red rule (`scratchpad/ogcard.mjs`).

Three things worth not re-deriving:
- **It is JPEG, not WebP.** LinkedIn's scraper is the one that matters here and
  does not reliably render WebP.
- **The absolute base is the Pages URL.** `og:image` and `og:url` must be
  absolute; Vercel is canonical but no domain is recorded anywhere in the repo,
  so the base is the one URL that exists and resolves today. One sweep of one
  constant when the domain lands.
- **`.gitignore` excludes `assets/img/*.jpg`**, so the card needs its negation
  line or it silently never ships.

A copy button beside the address **copies and does nothing else**: the link
already did both from one gesture, and a native mail client firing at someone
who lives in webmail is a surprise, not a convenience. `rel="noopener
noreferrer"` on every external link.

**Résumé (11).** `public/Shrey-Mehra-Resume.docx`, with a **301 from the old
URL in `vercel.json`**. That is possible only because Vercel is canonical;
GitHub Pages serves no redirects.

**Golden ratio (13).** Measured rather than asserted. `.id-body` was already
1/φ and `.abody`, `.cblock` and the case pages were already φ. **One grid was
off:** `.mv-grid` at `.95fr / 1.25fr`, a ratio of 1.316 that nothing else on
the site uses. It is `1fr / 1.618fr` now, with the **figures** in the larger
column, because they are the evidence and the disciplines are the context:
the hierarchy and the geometry now say the same thing.

### THE PLAYLIST SCROLLS IN THE iPOD

It was a 352px embed clipped to a 239px window, so the screen showed the cover,
the controls and one and a half track rows with the second cut in half. That
reads as a crop, not a device.

**Spotify's embed has its own scrolling track list** once it is tall enough to
draw one. So the frame is taller than the window on purpose and is **pulled up
by `--ipod-lift`**, so the window shows the LIST rather than the cover art. The
rows are then scrolled by Spotify inside its own player, which is exactly what
he asked for, and **nothing about the embed changed**: same src, same player,
same controls, which was his constraint.

**The trap, and it is the general one:** the mobile branch dropped the shell
and set `.ipod-screen{position:static}`, but the desktop rule sets `position`,
`top` AND `height` on the frame. Resetting only the one that looks relevant
left an absolutely positioned player hanging 146px above its own column on a
phone. **Undo every property an overridden rule set, not the interesting one.**

**His answer on location, asked rather than guessed: it stays in Me.** The
list said "the iPod in HERO" and the iPod has never been there; he had already
answered "frame it in Me, where it is" once. This device has been moved twice
on wrong guesses, so the third was a question.

### THREE ITEMS THAT WERE NOT BROKEN

Checked by rendering, which is the only way any of them could be settled.

- **Page numbers (8).** The magazine contents reads 03-08 and the folios read
  02-08. They already agree: **02 is the contents page's own folio**, and a
  contents page does not list itself. Nothing changed.
- **The marquee (6).** Every clone already carries `aria-hidden="true"`, and
  `site.js` wraps the whole ticker engine in `if(!reduce)`, so it never starts
  under reduced motion rather than stopping once started.
- **Nav and head (9).** No nav has nested wrappers, every `<meta>` and
  `<title>` is inside `<head>` on all eleven pages, and `aria-current="page"`
  was already on nine of ten routes. Two real gaps: the nav landmark had no
  accessible name, and **home had no `aria-current` anywhere** because the
  slate does not list Home - the logo is the home link, so that is where it
  belongs.

### A FALSE FAILURE, AND THE HARNESS THAT CAUSED IT

The focus sweep reported the **six hero marks as having no focus ring**, which
would be a WCAG 2.4.7 failure on the site's primary navigation. They ring
correctly: `.fl a:focus-visible` sets `outline:none` and moves the ring onto
`.fl-icon`, which is the thing you can actually see.

Two lessons, both already paid for once in this file:
1. **`el.focus()` from script does not set `:focus-visible` in Chrome.** A
   script-driven probe reports `outline-style:none` on elements that ring
   perfectly for a keyboard user. `scratchpad/focus.mjs` sends **real Tab
   presses** through CDP for that reason.
2. **The ring may live on a child.** Reading only the focused element misses
   every component that moves it, and that is how a real rule gets deleted. The
   harness checks descendants now.

After both fixes: **136 tab stops across seven routes, one without a ring, and
it is Spotify's own iframe.**

## THE MOTION SPEC, A9 SOURCES, A10 (24-25 Oct 2026, at his instruction)

### A9. SOURCES, AND THREE CLAIMS THE PAGES COULD NOT BACK

Each case that names a competitor, quotes a code or claims brand history now
carries a **Sources list, last in the contents rail**. Every link was opened
before it was printed.

**The clause numbers were read out of the code, not a summary.** His note gave
ABAC Part 3(c)(i) and 3(c)(iv). The first search *contradicted* it: ABAC's 2023
guidance numbers the same rule 3(b)(ii), and the current PDF's own outline
shows 3(c) as a clause about age-restriction controls. Extracting the PDF text
settled it and **his numbers are right**: Part 3 "Content standards to be
applied", clause (c) "Responsible depiction of the effects of Alcohol",
sub-clauses (i) and (iv). `scratchpad/pdftext.js` is the extractor, written
because there is no Python on this machine; keep it.

**Vastr's competitor claim was wrong in shape.** "Every funded competitor in
the category earns from the behaviour this product has to discourage" asserts a
revenue model for companies nobody had checked, and **Indyx contradicts it in
its own words**. The Learning section carried the same claim in its headline.
Acloset, Save Your Wardrobe and Stylebook keep their names and lose every
statement about how they earn.

**The 1985 store was being published as history.** No source exists for a
Hungry Jack's store format of that year. The device survives; the historical
claim does not. The naming history, which *is* sourced, stays.

### A10. MORE WORK, LESS CHROME

Home went from **7.9 screens to 5.7**, and work is now the largest block on it.

**This reverses OPEN item 3 in this file**, which records /ideas as one of five
primary areas from his architecture brief of 8 Sep. He has taken it off the
homepage and out of the nav; his instruction is the later one and it wins.

The work block is **the Work index's own rows, lifted rather than
re-implemented**: same markup, same CSS, re-pathed. Two components that look
alike and drift apart is the failure this repo keeps returning to. The pinned
collage went with them: built for three posters, and still reserving 2160px for
1161px of rows. Sections renumbered **02 Work, 03 Me, 04 Contact** on every
route.

**Two failed attempts at a dead-code sweep, recorded because the lesson is
subtle.** To find a rule's selector you scan back from its brace to the
previous brace or semicolon, and **comment text sits in exactly that gap**. A
comment ending in prose was read as a selector list, split on its commas and
rejoined without the spaces: 142 lines of commentary lost clauses before a diff
caught it. Masking comments to same-length filler fixed that and then left the
braces unbalanced, because the scan could still land inside the masked region.
Restored both times from a copy taken first. **Only the wall rules that still
affected layout were then removed, by hand.** A dead rule costs bytes; a broken
stylesheet costs the site.

### BLOCK E, THE MOTION SPEC

**One curve, everywhere:** `--e-out` is `cubic-bezier(.2,.7,.2,1)`, his. It was
a hard decelerate that overshot the eye on short moves. The spring stays for a
press release, which is the one place an overshoot is the point.

**The one orchestrated moment.** Five cut-out words, 60ms apart, 210ms each, so
the last lands at **450ms**. They settle out of a small rotation rather than a
scale, because these are paper letters and paper lands crooked. Each word takes
its own tilt so the row does not land as one object.

**A failsafe on the reveal gate, and it is the point of his "content already
visible beneath".** `.anim [data-t]{opacity:0}` stranded the hero copy
invisible for four days in October when a sweep removed the class a script
applies. Everything in that gate now also carries a 2s animation to opacity 1,
so if the script never runs the content appears anyway.

**The chip runs twice and then rests.** One pass stopping on the last word
reads as a thing that broke rather than a thing that finished. It holds while
pointed at or focused, like every other moving thing here.

**The figures count up, once, 900ms, and never replay** - the observer
unobserves itself. `font-variant-numeric:tabular-nums`, or the row jitters
sideways for the whole count, which is what makes a count-up look cheap. The
text at rest is always the true value: verified by sampling, +0% through +310%,
landing on +310%.

**The card answers:** straighten to 0deg, lift 4px, offset shadow 6px to 10px,
180ms, press depresses in 80ms. **This is a deliberate exception to the veto
list**, which bans offset shadows. What that list is banning is soft depth, the
glassy lift that makes a web card look like every other web card. A hard offset
in flat ink is a print device and is already on the site for that reason.
Nothing here is blurred. On the blue plane it prints in cream.

**Card to case page** is the View Transitions API on a shared element named
`work-hero`, 350ms. A `view-transition-name` has to be **unique in a
document**, so it cannot be written into the CSS for every plate - five plates
sharing one name disables the transition entirely. It is set by site.js on the
one the reader clicked and cleared after 1.2s in case the navigation never
happens.

**The case reading bar** is 2px, scroll-linked, transform only, and
**`transition:none` explicitly**: it was picking up `transition:all` from a
global rule and easing *behind* the scroll, which is the one thing an
instrument must not do. `scrollHeight` is read once and on resize, never in the
handler, which is the 13 Oct performance lesson.

### THE PLANE TRAP, SEVENTH TIME, AND IT RAN THE OTHER WAY

I hard-coded the B2C chip's ink to `#173CA8` against a `var(--cream)`
background, and in dark mode `--cream` becomes the ink: **1.88**.

The rule in this file is "a plane must not use theme tokens". **This was not a
plane.** The work section is a *surface that follows the UI*: its ground is
`var(--deep)` and its type `var(--cream)`, and both flip together, so anything
sitting on it has to flip with it. Both values are tokens now and neither is
literal.

**Hard-code a printed object; tokenise a surface. Getting that backwards fails
either way, and this is the first time it failed in the tokenising direction.**

### A SHELL TRAP THAT COST THREE ATTEMPTS

`node -e '...'` here loses a level of backslashes, so a regex built from a
string arrived as `/d+/` instead of `/\d+/` and silently matched nothing - it
reports MISS rather than failing. **Anything with an escape in it goes in a
file written with the editor tool, never an `-e` flag.**
