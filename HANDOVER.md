# HANDOVER — the finished state, the review, and what only you can make

29 Sep 2026. This is the last build note. `CLAUDE.md` stays the standing brief; this file says
what the site is now, what I would change next as a designer, and the list of things that need
you rather than me.

---

## 1. What the site is now

Eleven routes, hand-authored, no framework, no build step in the deployed output.

| Route | What a stranger gets |
|---|---|
| `/` | Hero centre-piece, quote tape, worked-with, three selected projects, the zine, Me, contact |
| `/work/` | Seven pieces, one row each, audience-first labels, three discipline filters |
| `/work/<slug>/` | Five cases: role and constraints, the narrative, three decisions with their cost |
| `/about/` | The long version and nine FAQ answers |
| `/contact/` | One page, one action |
| `/404.html` | An honest dead end with three ways out |

**The system.** Off-white `#F7F4EC` ground on a staggered halftone screen, cape blue `#173CA8`
for all type and line work, cape red `#E8251F` for planes and the one accent, Superman yellow
`#FFED10` for marks only. Geist Black headings with a pressed-ink edge, Inter body, Geist Light
annotation. Light opens by default; dark is a real second state, not a filter.

**Accessibility.** Zero contrast failures across nine routes in both themes. No horizontal scroll
at 390px. Zero running animations under reduced motion. Every interactive target meets 24px. A
404 exists. This is the floor, and it is met.

**Weight.** No framework. Two vendored libraries, 91KB combined, both earning their place.

---

## 2. The review, as a designer looking at this for a PMM, brand and creative hire

Ordered by what would change a hiring decision, not by effort.

### The ten-second problem is still the biggest one
A recruiter arriving cold sees the name, the claim, the role line and the photograph. What they
do **not** see, until the third screen, is that you have worked with anyone. Compare the Market,
iSelect, Tickertape, Amazon and TEDxVIPS are the fastest credibility you own and they are below
the fold.

**Change:** one line under the hero CTA, set small in Geist Light, naming five. Not logos, not a
band, just the names. It costs one line of vertical space and answers the only question a
sceptical stranger is actually asking.

### The claim is a category claim
"I build brands people want to belong to" is true, well written, and could sit on any brand
strategist's site. Your actual differentiator, the one the target rubric asks for by name, is
that you build AI-native marketing tooling and can talk about it as a marketer. That is VoiceDNA,
and it now leads the slate, but the hero still sells the generic version of you.

**Change to test:** keep the claim, add one line beneath it that only you could write. Something
closer to "I build the brand and the tool that measures whether it worked."

### Five of seven pieces are spec
That is normal early and it is disclosed honestly every time, which is to your credit. But the
two real ones, Venus Roadlines and VoiceDNA, carry the weight and should be unmissable. Home now
leads with VoiceDNA; `/work` still opens with Vastr.

**Change:** reorder `/work` so the real work leads, or add a "shipped" marker in the left column
that a scanner catches. I left the order alone because renumbering touches the previous/next
links on every case page, and that is your call rather than mine.

### The placeholders are the reason not to send this link yet
There are 17 labelled asset slots on the site (Nav1 appears on every page, so 19 boxes in all). To you they read as a plan. To a stranger they
read as unfinished, and unfinished undoes the rest. Six of them carry almost all the damage:
**Nav1** and **Work1 to Work5**. Fill those and the site can be sent even with the rest pending.

### Ideas is a beautiful empty room
The zine mechanic works and there is nothing in it. That breaks your own rule about repeated
placeholders and it is the section a culture-led employer would most want to read.

**Change:** one real piece, or drop the section to a single honest line until there is one. Not
three stubs.

### The case studies are now skimmable, but still long
The role card and the decisions block give a reader the whole argument in thirty seconds, which
was the gap. The bodies remain five to seven minutes. That is fine for someone already interested
and long for someone deciding.

**Change, optional:** a three-line "the short version" at the top of each case. Problem, move,
result. It costs nothing and it is the thing that gets quoted in an interview.

### Small things I would fix in the next pass
- The `/work` teaser for VoiceDNA says "I am building"; the case page says "I built". Pick one.
- The photo caption is the only 13px type on the site. It survives the audit; it is still the
  first thing I would size up.
- The ripple fires on `pointermove`, so on a touch screen it only appears mid-drag. Consider
  firing it once on tap.
- Venus Roadlines is tagged Enablement and Operations now. The case still claims taglines and
  brand language shipped with the manual, and only the manual exists on disk. Either the evidence
  turns up or the claim comes down.

---

## 3. What only you can make

Nothing below can be written by me without inventing, which is the one thing that would undo the
work. Ordered by what unblocks the most.

### Assets, 17 slots
| Slot | What it is |
|---|---|
| **Nav1** | The logo that replaces your name in the island |
| **Work1 to Work5** | Five designed covers, 16:10, for Vastr, Cut The Noise, VoiceDNA, Venus Roadlines, AbsolutILY |
| Hero1 to Hero6 | The six floating marks: work, ideas, me, FAQ, contact, listening |
| Ideas1 | The clipboard the zine sits on |
| Me1, Me2 | The bobblehead, and the globe of places |
| Contact1, Contact2 | The dark graphic under the email, and the hill the section stands on |
| Eight client marks | One-colour SVGs for the worked-with band |
| Magazine pages | The zine spreads, as PNGs |

### Content, in priority order
1. **One captured VoiceDNA run.** The input, the six readings, the gap notes. This is the single
   highest-value thing on the list: it turns the strongest page from a description into evidence.
2. **A résumé PDF** in `/public`. Two links currently point at nothing.
3. **Three years:** Vastr, Cut The Noise, AbsolutILY.
4. **Two quote attributions.** Six real colleague quotes with no names read as invented. A first
   name, role and company on even two of them carries the section.
5. **One Ideas piece.** A title, the premise in one line, and the piece.
6. **Influenced versus controlled** on the three verified numbers: iSelect and CTM engagement
   +46% MoM and vendor costs −78%, Tickertape CTR +310%. What did you own, what did you influence?
   Every senior interviewer asks this; the site should answer before they do.
7. **The Venus Roadlines identity evidence,** or the claim comes down. Asked five times now.
8. **Vastr's three GTM benchmarks.** Where 65% acceptance, 40% day-30 return and 8% affiliate CTR
   came from. Reasoning is enough; invented neighbours are not.
9. **The globe's list of places.**

### Two decisions that are yours
- **Where this deploys.** GitHub Pages and Vercel both work. Pick one as canonical and point a
  domain at it, or a recruiter lands on whichever is staler.
- **Whether the case trade-off lines read as you.** They are the only new writing in your voice on
  those pages. Three per case, on the red rule.

---

## 4. The order I would do it in

1. Nav1 and Work1 to Work5. The site becomes sendable.
2. The VoiceDNA capture and the résumé PDF. The site becomes evidence.
3. The credential line under the hero. The first ten seconds start working.
4. One Ideas piece, or collapse the section.
5. Everything else.

---

## 5. Poster variations, if you are making them (2 Oct 2026)

The posters you sent are portrait A-series. Three places use them, and only one of the three wants
that shape. Native sizes work everywhere today; these variants would be better.

| Where | Shape now | What would be better | Export |
|---|---|---|---|
| Case page header | portrait, whole | nothing, this is right | 900 x 1274, the poster as drawn |
| Home collage tile | portrait, cropped 1-2% | a version with nothing critical in the **bottom 15%** and the **outer 8% on each side**, because the three tiles overlap each other and the lower corners sit under the next poster | 900 x 1274 |
| `/work` row plate | 4:3, showing the top | a **4:3 landscape cut** per project: the headline and the mark, composed for a wide window rather than cropped from a tall one | 1200 x 900 |

Two more things that would earn their place:

- **A detail crop per project**, 1:1, 800 x 800: a close-up of one part of the artefact. This is the
  fanned-cards idea in `MOTION.md` that is blocked only on imagery. `VRL poster 2` and the second
  Vastr poster already work for two of the five.
- **Format:** PNG or JPG at those pixel sizes is ideal. PDFs are fine, I render them, but a PDF
  made for print carries bleed and crop furniture that has to be cropped away by guesswork.
  Anything flat and square-edged converts cleanly.

Everything is converted to WebP at the size it is shown, so send the largest you have.

---

## 6. The 16:10 covers — exact spec (2 Oct 2026)

Send **one master per project**:

| | |
|---|---|
| **Size** | **1600 × 1000 px** (16:10) |
| Format | PNG or JPG, flat, no bleed or crop marks |
| Safe area | Keep the headline, the mark and anything that must survive **inside the central 1408 × 880** — a 96px margin all round |
| Why the margin | The home tiles are rotated two to four degrees and overlap each other, so the outer edge and the lower corners sit under the next poster |
| Naming | `vastr.png`, `voicedna.png`, `vrl.png`, `cut-the-noise.png`, `absolutily.png`, `loreal.png` |
| Where | `assets/work/<slug>/` |

They get converted to WebP at the size each surface shows, so send the largest you have and
nothing smaller than 1600 wide.

**Two things to know before you design them:**

1. **The slots are portrait today**, because the posters you sent are portrait and cropping them
   was the thing that looked chopped. The moment the 16:10 masters land, the home tiles and the
   `/work` plates flip to 16:10 — it is one line in each place. Nothing else moves.
2. **The case page headers keep the portrait posters.** A poster is the artefact and belongs whole
   at the top of its case. The 16:10 cover is the index-surface version: the home collage and the
   `/work` row. Two jobs, two crops, and the second one is what this spec is for.

Still useful on top of these: a **1:1 detail crop at 800 × 800** per project, for the fanned-cards
hover in `MOTION.md`.
