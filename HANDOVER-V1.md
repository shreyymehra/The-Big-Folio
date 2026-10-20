# Handover · V1 for release

20 Oct 2026. Everything built, everything you have asked for whether it shipped
or not, and what is left — split into **V1 (ship now)** and **V2 (after)**.

This supersedes nothing. `SCAN-REPORT.md` is the judgement, `ASSETS.md` is the
inventory, `NEEDS.md` and `FILL-IN.md` are the input lists. **This is the plan.**

---

## 1. WHERE V1 STANDS

**Ten routes**, hand-authored, no build step except a Tailwind CLI for the case
pages. Branch `v5-blocks`, pushed.

| | State |
|---|---|
| Contrast | **0 real failures**, light and dark, every route |
| Console | **Clean**, every route |
| Links | **All resolve**, internal and external |
| Mobile | **No horizontal scroll** at a real 390px, every route |
| Scroll | **60fps** on six of nine routes; home 23, `/work` 47 |
| Overall score | **8.0 / 10** (was 7.1 on 13 Oct) |

**V1 is shippable today.** Everything outstanding below is a content decision
or an enhancement, not a defect.

---

## 2. WHAT GOT BUILT

### The spine
- **Hero** — an ID card: the ransom name as the headline, the 2003 Delhi print,
  the claim, two actions, a cape-red registration edge. Six marks float on CSS
  loops around it. Ground stays light in both themes, at your instruction.
- **Numbers** — "What I do, and what it moved" on a shield-yellow pill. Fifteen
  disciplines beside seven verified figures, each with its employer.
- **Work** — a pinned sequence. One project on stage at a time, numbered 01–03,
  handing off to the next.
- **Ideas** — a nine-page zine that turns, on its own warm-white stock.
- **Me** — your monologue in sentence beats, a throwable validation deck, and
  the star with you in it.
- **Contact** — one blue pill carrying the copy, the links and the email, on a
  giant star that settles as you scroll in.

### The system
- **Six grounds, six sections**: textured → plain → colour → plain → textured →
  colour. One transition language: different grounds tear, shared grounds rule.
- **Palette** cream / cape blue / cape red / shield yellow, plus the orange that
  came off your own process deck.
- **Motion** on GSAP with ScrollTrigger, in `motion.js`, entirely additive.
- **The easter egg**: you appear over the wordmark, but only after someone has
  actually been down eight of ten bands of the page. Jumping to the footer does
  not win it.

### The product layer — new, and the reason the score moved
- **`/work/vastr/prd/`** — user stories, P0 scope with the line between in and
  out, seven requirements each with the reason it is that number, success
  metrics **with a kill criterion**, risks with mitigations, a phased release,
  and a section naming what the document does not answer. R-02 carries no
  percentage on purpose and says so.
- **Voice'D gap map** — six dimensions, stated vs actual, behind a keyboard-
  operable tablist, labelled as an illustration.
- **The outcome plane** on every case page: the result is the only plane on the
  page, so it reads as the destination.

---

## 3. YOUR IDEAS AND INSPIRATIONS — WHAT HAPPENED TO EACH

Everything you have sent, built or not. **Nothing here is dropped silently.**

### Built
| Your idea | Where it landed |
|---|---|
| Superman palette, "a hint of retro" | The whole system, aged to newsprint |
| Akriti Purbey — ID card hero, clean break | The hero card; the six grounds |
| Rishabh — star mark, icons as accents | The star everywhere; the six marks |
| Balint Horvath — centre-piece with floating objects | The hero field |
| Pixflow ransom letters | The name, on GSAP, on twos |
| up.com.au — morphing nav | The island's three shapes |
| Riya — vinyl player | The record deck, now playing your file |
| "A merry-go-round around the centrepiece" | Built, then replaced: an ellipse could not clear the centre. The marks float in place instead. |
| Freya Vora — flat ground, oversized type | The zine |
| Harrison Wheeler — origin story | Who I do it for |
| Medium / Aditya Raj — PMM case structure | Role & constraints, Key decisions with trade-offs, on all five cases |
| "Word on the street" for recs | The star-head belief strip on `/about/` |
| Ink-bleed type | The pressed-ink filter |
| Scrapbook alphabet | Zine page 08, "Where the name comes from" |
| Your process deck | The orange band and the five cards |
| ABBA, Take A Chance On Me | The deck, playing the file you sent |

### Tried and deliberately reversed
| Idea | Why it came out |
|---|---|
| Desktop-metaphor hero | You called it a cheap copy of one reference |
| Carousel / motion-path orbit | It fought the centre for room at every width |
| GSAP drift on the marks | Stacked them on each other, cost a frame budget for motion nobody asked to watch |
| The X crossing bands | The seven figures went into motion to not be read |
| Logo wall on home | A row of other people's logos before anything you made |
| Marks as citations on each figure | The figure already names its source in words; four of eight are plate lockups that go to mud at that size |
| Clip-path tile reveal | Spent most of its life showing a card with its label sliced off |

### Shared and **not yet built** — these are the V2 list
| Idea | Status |
|---|---|
| **Junk-journal props** | **No sheet has been supplied.** I looked in `references/` (READMEs only), `assets/`, every upload, and git history. The scrapbook language is built from what exists: torn tape, the paper clips in your own artefacts, your stickers. A real props sheet would extend it. |
| Lakshmanan — picked-card hover, three detail crops per case | Not built. Needs crops. |
| Leader-line annotation on case pages | Offered as an "essence device", never chosen |
| Cursor state over work rows | Offered, never chosen |
| Star as scroll progress | Partially: the star fills on scroll |
| One real easter egg | **Built** — see above |
| Blue trued to #0060AA | Not done: it costs contrast (4.9 vs 8.5). Your call. |

---

## 4. V1 SPRINT — ship this week

Everything here is **content you own**. No build work is blocking release.

### Sprint V1.1 — the ten-minute wins (do these first)
| # | Task | Why | Owner |
|---|---|---|---|
| 1 | **Open the metrics drawer** (or surface two figures on the pill) | Your seven verified numbers are the only independently real evidence on the site and they sit behind a click labelled "15 disciplines · 7 numbers". A scanning reader will not open it. **Highest-impact change available.** | You (decision), me (10 min) |
| 2 | **Six quote attributions** | First name + role is enough. Six decorations become six references. | You |
| 3 | **Résumé as PDF** | The link serves a `.docx`, which downloads rather than opens on a phone. | You |
| 4 | ~~Pick the canonical URL~~ **DECIDED: Vercel.** Send me the domain. | A canonical tag and the Pages redirect both need an absolute URL; none is recorded in the repo and I will not guess one. | You (domain) |

### Sprint V1.2 — the half-day
| # | Task | Why |
|---|---|---|
| 5 | **Cut or finish the two dead rows** (Duolingo, L'Oréal) | Five rows where every one opens is stronger than seven where two go nowhere. |
| 6 | **Colour Delhi frame, uncropped** | The hero brush reveals a saturated halftone rather than true colour. One file fixes the hero's best device. |
| 7 | **One mechanism line per figure** | "+46% engagement" is a thing that happened near you. "+46%, by rebuilding the internal comms cadence" is something you did. |
| 8 | **Approve or replace one caption** | "Mum, Dad, me." is my writing on a photograph of your parents. |

**V1 is releasable after 1–4.** 5–8 make it materially stronger.

---

## 5. V2 SPRINT — after release

### Sprint V2.1 — evidence
| Task | Why |
|---|---|
| **A second product artefact** | The PRD closed the gap. A launch plan or competitive teardown for Voice'D would make it a pattern rather than an exception. |
| **One real Ideas piece** | The zine promises an intellectual layer and delivers a contents page. Three of your FAQ answers are already 80% of an essay. |
| **Two LinkedIn recommendations** | The deck ships with three real cards and a paste-in template beside it. |
| **Voice'D captured run + live link** | The only page where a visitor could see something working. |

### Sprint V2.2 — craft
| Task | Why |
|---|---|
| **Junk-journal props sheet** | Tape, scraps, stubs, pins, marginalia. The one asset class your references have that this does not. Send 8–12 shot on white and the scrapbook language extends everywhere. |
| **Three detail crops per case** | The Lakshmanan reference, still unbuilt. Turns a poster into evidence of craft. |
| **Fonts to WOFF2** | 264KB of `.otf` on every route, roughly 90KB converted. Apache 2.0 so it is permitted; needs a machine with `fonttools`. |
| **Home scroll** | 23fps against 60 elsewhere. The pin and the zine are why. |
| Clipboard behind the zine | The zine floats on bare paper; it was composed to sit on something. |

### Sprint V2.3 — decisions only you can make
- **The track mismatch.** The hero leads with product marketing; the slate now
  has one PMM artefact. Two or three would settle it.
- **UN Youth and BCG.** Labelled "Employers, clients and volunteer work",
  which is accurate for all eight. Still technically your call.
- **Venus Roadlines tag.** The case claims taglines and brand language shipped
  with the manual; only the manual is on disk. Asked five times.
- **Blue trued to the Superman source.** Costs contrast. Your call.

---

## 6. HOW TO RUN IT

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Rebuild Tailwind after touching `assets/tw/input.css` or any utility class:

```bash
.tools/tailwindcss.exe -i assets/tw/input.css -o assets/tw.css --minify
```

**The harnesses are in the session scratchpad and they are the reason the
defects above were found rather than shipped.** `a11y.mjs` (contrast and
overlap), `a11y2.mjs` (structure, keyboard, reflow), `errs.mjs` (console),
`scan.mjs` (payload and frame health), `prof.mjs` (CPU profile), `mob.mjs`
(real 390px emulation — **not** a 390px window, which lies).

---

## 7. THE ONE THING I WOULD DO FIRST

Open the numbers drawer. It is ten minutes, it needs no new content, and it
puts the only hard evidence on the site inside the ten-second scan the whole
thing is built for.
