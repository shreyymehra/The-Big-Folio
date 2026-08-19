# THE BIG 'FOLIO — HANDOVER BRIEF

**For:** Cowork · **From:** Claude Code session, 18 Aug 2026
**Owner:** Shrey Mehra — shreyymehraa@gmail.com — linkedin.com/in/shreymehraa
**Repo:** github.com/shreyymehra/The-Big-Folio · working branch `v5-blocks`

> **Your two jobs, in priority order:**
> **1. Close the content gaps in §6.** The build is ahead of the content and has been for weeks. Missing data is the binding constraint, not code.
> **2. Structure the remaining sections in §5.** The hero is done; everything after it is unbuilt.
>
> Read §3 before proposing any aesthetic change. Read §7 before writing a single line of copy.

---

## 1 — WHAT THIS IS

A job-seeking portfolio for a creative strategist targeting brand, culture and communications roles at culture-led tech companies (Anthropic, OpenAI, FAANG, scaleups). Primary market Australia, secondary US/global.

**Positioning:** *I build brands people want to belong to.*
**Reaction being engineered:** *"This person could build a world out of nothing."*
**Governing line:** *If you appeal to everyone, you tie yourself to no one.*

**Traffic reality that shapes every decision:** most visitors arrive from a cold email, clicked reluctantly, and decide in under ten seconds. Design for the sceptical first-time visitor, not someone already convinced.

---

## 2 — CURRENT BUILD STATE

| | |
|---|---|
| Stack | Astro 7.2.2, Node 24.19.0, no framework, native CSS |
| Dev | `node node_modules/astro/bin/astro.mjs dev --port 4321` **run from the repo root** — a `--root` flag doubles the path and breaks imports |
| Branch | `v5-blocks` |
| Archives | `archive/v3-printed-paper`, `archive/v4-cinematic` — two earlier rejected builds, recoverable |

**Built and working:** slot-machine loader, hero (cut-out type + photo + parallax), a short "Value" section.
**Not built:** ticker, work index, case pages, brain dump, about, FAQ, contact.

Components: `CutWord.astro`, `Burst.astro`, `Loader.astro`, `Hero.astro`, `Value.astro`.
All design values live in `src/styles/tokens.css`. **Never hardcode a colour, size or curve anywhere else.**

Read `POSTMORTEM.md` in the repo. Two full builds were rejected; it records exactly why.

---

## 3 — THE AESTHETIC — LOCKED, DO NOT RE-DERIVE

**Cut-out / ransom-note.** Each word sits in its own label box. **Every adjacent word uses a different typeface** — that mismatch *is* the effect. Never unify them. Starburst shapes act as punctuation. Labels sit over photography on a near-black ground.

`CutWord.astro` is the primitive: `cut={1..5}` selects Playfair italic / Archivo Black / Courier Prime / DM Sans / Bebas. Build every headline from it.

Palette: void `#0b0b0d`, paper `#fbf9f4`, ink `#14120f`, hot pink `#ff2e88`, cold blue `#2f5bff`, acid `#e8ff3a`.

**Three previous aesthetics were rejected. Do not revive them:** dark+gold+Bodoni+film grain, paper+race-red+Syne+halftone, bone+flare+Bodoni. If you find them referenced in older files, they are dead.

**Layout rule learned the hard way:** compose with **CSS Grid areas**, never `translate3d` percentage offsets. Percentages are relative to an element's own width and never respond to viewport, which produced a mobile-shaped layout stranded in the middle of a desktop screen. The hero now re-lays-out at 1080px and 760px. Match that pattern.

---

## 4 — CONTENT THAT ALREADY EXISTS — USE VERBATIM, DO NOT REWRITE

### Hero (built)
> Hi! my name is Shrey and I wanted to do this since I was 8

### Ticker — real quotes from colleagues
> "What an absolute gem to work with" · "Love your attention to detail" · "A work friend we do not deserve, but need" · "You sure AI didn't help you?" · "My go-to person for AI, pop culture or ranting" · "Love your third eye"

**Ticker carries text, never client logos.** A logo wall mixing real employers (iSelect, Compare the Market) with spec brands (L'Oréal, Absolut, Duolingo) implies client relationships that do not exist, and body-copy disclosure never undoes a one-glance impression.

### Brain Dump — five steps, complete, in his voice
1. **Listen** — listen to what they want. Knowing what to do and how to do it is 80% of the result, so note everything in detail. As if taking notes. Really.
2. **Blank canvas** — make no associations. Approach it like a stranger who has heard none of the details, because that is what lets a perspective come from scratch.
3. **Read, research & relay** — sharpening the axe is the fastest way to fell the tree. Research keeps it fresh, mistake-proof-ish and backed. Doubles as a knowledge bank.
4. **Time for tango** — final checks, grammar to spelling. Always present a variation or two — not to confuse, but so there is plenty to choose from.
5. **Rinse & repeat** — apply it across copies, ads, designs, decks. Make it the standard of the work, and the work stands out from the standard.

### About — his own writing, typo-corrected only. Preserve the voice exactly.
> I am Shrey Mehra, a specialist in generalisation who has always had one fear: being linear. I learnt Adobe After Effects in six hours for a high-stakes university presentation, and ran GA4 analytics as an intern and presented key findings without being asked to. Also the same person who saved their company more than 200K AUD by finding a legal loophole, because an idea arrived while taking a shower — that is who I am, and that is why this exists.

> With a Master of Management (Marketing) from UniMelb, I came out with First Class Honours, holding a Faculty of Business & Economics Scholarship and a 50% sponsored ride (phew, fewer education loans). This was on top of working with Compare the Market and iSelect, and serving liquor through BWS — a boy's got to fund his dreams and the city rent.

> I like to connect with people. My high-school crush called me an 'empath' once and I took it seriously as a job title. I am a creative marketer who builds, a communicator who listens, and most importantly a human who knows how to blend words with numbers.

> My domain has always been brand, communications, creative, public relations — anything that makes a brand perform, not performative. Transparency, authenticity, trust and loyalty drive this new generation of brand building.

> Here's what my resume may or may not tell you: I bring cultural fluency from a multicultural upbringing, blended with a knack for pop culture (debate me, anytime), fashion, tech and marketing. I also paint, make lifestyle and travel edits, play badminton with friendly bets on the side, and love hosting events. My themes are well in demand, and so is my party punch.

### Contact
> Let's build something you will always be proud of

### Background facts (for FAQ/About — all verified, none invented)
Master of Management (Marketing), University of Melbourne, First Class Honours · iSelect and Compare the Market, two brands, C-suite to call centre · Tickertape (fintech) — ad scripts · Venus RoadLines — real shipped brand identity · BWS retail.

---

## 5 — STRUCTURE TO BUILD

```
LOADER      slot machine, 3 reels                  BUILT
HERO        cut-out type + baby photo + parallax   BUILT (photo missing)
TICKER      testimonial quotes, text not logos     content ready, unbuilt
WORK        index -> case pages                    see §6
BRAIN DUMP  5 steps                                content ready, unbuilt
ABOUT       copy + childhood photo + skills        copy ready, skills unresolved
FAQ         bento grid, expandable                 questions only, no answers
CONTACT     CTA · email · LinkedIn · resume        resume missing
```

Build **one section at a time, stop, show the result, wait.** Do not batch. This has been stated in every brief and violating it is how two builds got rejected.

---

## 6 — MISSING DATA — YOUR PRIMARY JOB

### 6.1 Assets only Shrey can supply — chase these first

| # | Asset | Blocks | Notes |
|---|---|---|---|
| 1 | **`shrey-8.jpg`** childhood photo → `public/img/` | Hero centrepiece | A dashed placeholder occupies a third of the hero right now |
| 2 | **Resume** file or link | Contact | Referenced in every brief, never supplied |
| 3 | **Venus RoadLines files** — logo, identity | Case 06 | **Searched the whole machine, found nothing.** Either he supplies them or the piece comes off the slate |
| 4 | **Work card imagery** ×6 | Work index | Without these Work is a text list |
| 5 | **Spotify playlist URL** | Vinyl player | Only if vinyl is approved (§8) |
| 6 | **Rubik's cube images** ×6 | Cube | Only if cube is approved (§8) |
| 7 | **Childhood photo one-liner** | Hero/About | Caption to sit with the photo |

### 6.2 Content gaps to write WITH him — never for him

**FAQ answers.** Eight questions exist, zero answers. This section does disproportionate work for cold-email traffic because it pre-answers the objections that stop a reply. Answers must be substantive, not one-liners.

Questions: What are you actually looking for? · Why brand and comms specifically? · What are you best at? · What are you still building? · Why should a tech company hire someone culture-led? · What's your process when you get a brief? · What did you actually do at iSelect and Compare the Market? · What do you do when an idea isn't working?

**Shortcut:** `archive/v3-printed-paper` has six answers already written and genuinely good. Recover with `git show archive/v3-printed-paper:index.html` and have him edit rather than start blank.

**Skills — honest split required.** He currently claims *Anthropic API & MCP* while applying to Anthropic. That invites exactly one interview question and being thin on it is unrecoverable. Same risk: Salesforce, Tableau, MoEngage, Amplitude, GitHub.

Split into **Fluent** / **Working knowledge**. The rule: anything he cannot discuss for five minutes under pressure moves down or comes off.

**The strongest available fix:** this portfolio was built with Claude Code, in a public repo. "I built this site with Claude Code, here is the repo" is a demonstrable claim. A logo in a skills grid is not.

**Domains targeted** — currently rendering as Brand · Creative Strategy · Communications · PR · GTM. Inferred from his context files, **never confirmed.** Verify before locking.

### 6.3 Case studies — the largest gap

Template for every piece: **Problem → Hypothesis → Approach → Result → Learning.** Under five minutes to read. Show the messy middle, not just the polished outcome.

| # | Piece | Content available | Gap |
|---|---|---|---|
| 01 | **Cut The Noise** — Hungry Jack's | **Full brief exists** at `C:\Users\User\Contacts\hungry-jacks-cut-the-noise-brief.md` — background, objective, audience, strategy | Just needs writing up. **Most finished piece he owns and it is currently in nothing.** Start here |
| 02 | **Brand World** — L'Oréal | Cultural tension, positioning statement, 4 copy lines | Competitive set is factually wrong — see below |
| 03 | **Go!Go!GTM** — Vastr | Name rationale, cultural tension, correct competitor set | Needs messaging hierarchy, launch narrative, one-page GTM brief |
| 04 | **Absolutely Yours** — Absolut | Title only | Everything |
| 05 | **Personality, This Order** — Duolingo | Title only | Everything |
| 06 | **Venus RoadLines** | Title only, no files | Everything, and see 6.1 #3 |

**L'Oréal fixes required before publishing:**
- Head & Shoulders is a **scalp-first** brand and has been for decades. Naming it as a hair-only foil inverts reality and an FMCG interviewer will catch it instantly. Rebuild the competitive set on fact.
- Acknowledge L'Oréal's existing scalp assets — Kérastase Genesis, CeraVe (L'Oréal-owned), Elvive scalp — then argue why the gap remains. Ignoring them looks like insufficient research.
- Lead with *"Hair or not, here we come."* Cut *"This is an ad for all of you"* — it's weak.
- The insight is genuinely strong and must survive: scalp health persists without hair, so excluding bald consumers is a positioning choice, not a product one.

**Vastr:** named from Sanskrit *vastr* (clothing), punning on "vast" — the wardrobe. Rejected names: *Debra* (reads as conversational AI, not clothing), *Whear* (poor recall, too narrow). Correct competitors: Whering, Indyx, Acloset, Save Your Wardrobe, Stylebook. **Not** H&M — that's a retailer, not a wardrobe app.

**Structural warning:** four of six pieces are real brands, which reads as *"person with good taste who improves existing things."* Hireable, but it is not *"could build a world out of nothing."* Vastr is the only piece starting from a blank page, so it carries the world-building proof alone. If it underdelivers, nothing on the site delivers it.

---

## 7 — HARD RULES — NON-NEGOTIABLE

1. **Nothing may read as AI-generated.** First person, specific, occasionally funny, never corporate.
2. **If a line could belong to anyone else's portfolio, it is wrong.** Rewrite it.
3. **No invented metrics, ever.** Where a number would go, show the reasoning instead.
4. **Spec work is disclosed as spec in the first line** of the case study.
5. **Never generate more than one placeholder at a time.** Three templated stubs sharing a sentence is exactly what got a previous build rejected as slop.
6. **No dead links.** Unfinished work is labelled "In development".
7. **No services menu, no pricing, no booking widget.** A creative statement, not a freelance funnel.
8. **Accessibility is a floor:** visible focus, keyboard reachable, `prefers-reduced-motion` honoured, 44px minimum tap targets, contrast AA.
9. **A recommendation that goes unanswered is not consent.** Silence is not approval. Ask.
10. **Preserve his voice when editing.** Flag changes; never quietly erase him.

---

## 8 — OPEN DECISIONS — ASK, DO NOT ASSUME

1. **The signature element.** He asked for a Rubik's cube of personal photos, a vinyl player, and an opening sequence. The slot-machine loader now delivers the opening sequence. A previous session cut all three on discipline grounds and he rightly rejected that — the result was forgettable. **He picks which survives.** Recommendation: vinyl in, cube out — but it is his call, not yours.
2. **Hungry Jack's — in or out?** It is his most complete piece and currently unused.
3. **Venus RoadLines — in or out**, given no files exist? It is the only *real* work on a slate of spec pieces, so losing it costs the credibility anchor.
4. **Work slate size** — three finished pieces or six thin ones. Recommendation: three real, rest marked in development.
5. **Vinyl constraints if approved:** never autoplay (recruiters browse on shared screens), embed Spotify rather than hosting audio (licensing on a public site in his own name), design for the muted case first, lazy-load.

---

## 9 — HOW TO WORK WITH HIM

- Blunt, top-tier advisory. He has anti-sycophancy switched on explicitly. Push back on weak ideas; never fabricate progress.
- **He gets overwhelmed by parallel decisions.** Ask one thing at a time, with a recommendation attached. Never present a four-question dump.
- **Show something real before building wide.** One section, judged, then scale.
- **Verify visually, not just structurally.** The previous session could never capture screenshots — the preview tab reported `visibilityState: hidden`, which also suspends `requestAnimationFrame` and scroll events — so an entire aesthetic direction was built blind and rejected on sight. **Fix screenshot capture before attempting art direction.** Numbers cannot tell you whether something looks good.
