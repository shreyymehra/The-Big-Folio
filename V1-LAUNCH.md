# V1 LAUNCH

What is left to lock V1 and start sending the link, split three ways and
prioritised. Audited against the running build, 12 Oct 2026.

**P0** is a blocker. Do not send the link to a target company without it.
**P1** makes it competitive. Do it before the applications you care about.
**P2** is after launch.

**YOU** means it needs a file, a number or a decision only you have.
**ME** means it is build work and I can do it without you.

There are **9 P0 items**. Six are files. Three are decisions. None take long.

---

## PART 1 — DESIGN

Artwork, imagery, interface, motion, performance.

| # | Item | P | Who | What it is |
|---|---|---|---|---|
| D1 | **Colour Delhi photograph** | P0 | YOU | One file into `assets/img/`. The pointer paints colour back into the hero photo and today keys off the same black and white frame, so it reveals a saturated version, not colour. Best interaction on the site, running at half strength. |
| D2 | **Contact2, the hill** | P0 | YOU | The ground the contact section stands on, full browser width, 2400px+. Right now it is an empty band and it is the last thing a visitor sees. |
| D3 | **Contact1, the reveal graphic** | P0 | YOU | Dark graphic that comes up on email hover. Reads at 260 x 180. |
| D4 | **Me1, the bobblehead** | P0 | YOU | Square. Sits top-right of `/about/` and is currently a ruled empty box. |
| D5 | **Me2, the globe** | P0 | YOU | Square, up to 520px, for Where I have been. |
| D6 | **Ideas1, the clipboard** | P0 | YOU | Behind the magazine. Clipboard or hands holding it, transparent. |
| D7 | **AbsolutILY execution photography** | P1 | YOU | Five images, one per execution. Quiet, specific, no styling visible. The page currently says so out loud. |
| D8 | **One pause control** | P1 | ME | Three self-starting loops on home (quote tape, logo tape, the ring) and no pause control since you removed them. Hover and focus hold each one, reduced motion stops all three, but WCAG 2.2.2 wants a control. One in the island closes it without putting a button back on the page. |
| D9 | **Drop GSAP** | P1 | ME | 72KB driving exactly two calls, the ransom tiles' jitter and one stepped spin. Same reason `motion.min.js` went in September at 81KB for one call. Replacement is a few lines. It is your hero's signature motion, so I have not touched it. |
| D10 | **16:10 cover masters** | P2 | YOU | Optional redraw. The posters are portrait and the slots were built landscape; both carry portrait now and it works. If you redraw: 1600 x 1000, safe area 1408 x 880. |
| D11 | **Junk journal props** | P2 | YOU | Three slots sit empty around the magazine for tape, ticket stubs, a paper clip. 200 to 400px transparent PNGs. |
| D12 | **Two essence devices** | P2 | YOU | Pick two from: leader-line annotation on case pages, cursor state over work rows, detail crops in cases, star as scroll progress, one real easter egg. |

---

## PART 2 — WRITTEN

Copy, case content, the lines that carry the claims.

| # | Item | P | Who | What it is |
|---|---|---|---|---|
| W1 | **Names on the six quotes** | P0 | YOU | The tape under the hero carries six real colleague quotes with nobody attached. An unattributed compliment reads as copy you wrote about yourself. Name and role each. **The cheapest big win on this list.** |
| W2 | **A mechanism line under each figure** | P0 | YOU | +46%, -78%, +310%, 160k, 20k MAU, 1.2M, 130. Seven results with no cause attached. One sentence each saying what you changed. This is the highest-value hour of writing available to you. |
| W3 | **Settle the track mismatch** | P0 | YOU | The hero, the nav and the skills list all lead with **product marketing**, and the work slate contains no product marketing artefact. A PM hiring manager reads the hero, scans the work, finds brand and campaign, and concludes the headline is aspirational, which reads worse than a brand strategist who says so. Two ways out: reorder the discipline line to lead with brand strategy, or write up the positioning and launch behind the iSelect and Compare the Market stint. The second is better and slower. |
| W4 | **Three years** | P0 | YOU | Vastr, Cut The Noise, AbsolutILY each need the year it was made. The Made row is out of those pages until you have them. |
| W5 | **The first Ideas post** | P1 | YOU | Title, the premise in one line, the piece. Ideas is in the nav and promises a point of view; it is the only section that asks to be believed rather than showing something. One piece retires the whole "coming next" page. |
| W6 | **Vastr benchmark reasoning** | P1 | YOU | How 65% outfit acceptance, 40% day-30 return and 8% affiliate CTR were set. Not a source, the reasoning. |
| W7 | **LinkedIn recommendations** | P1 | YOU | The swipe deck is built and holds three real cards. There is a commented paste-in template beside it in `index.html`: three lines in order, no script to touch. |
| W8 | **Duolingo and L'Oreal** | P1 | YOU | Both have cards on /work and no case pages, so both stay unlinked. Each needs the brief, what you did, the thinking, the artefact, and the outcome. |
| W9 | **The places list** | P1 | YOU | For the globe. City and country, in the order they happened. |
| W10 | **Medium and X handles** | P1 | YOU | Full URLs. Not guessed, because a 404 in front of a recruiter costs more than a short list. |
| W11 | **Where the other work lives** | P1 | YOU | Links for the photographs, the paintings, the writing. |
| W12 | **VoiceDNA captured run** | P2 | YOU | One real run as an image, and the live link the day it deploys. Gated on the tool shipping. |
| W13 | **Four copy lines to reconsider** | P2 | YOU | Yours, so flagged not changed. "I am too young to have dead set opinions" is the only belief about you rather than the work and reads as hedging next to four confident ones. "A legal loophole" sounds like rule-bending to a corporate reader; "a clause nobody had read" lands the same story. "The briefs nobody asked me to write" is a very good line that frames the whole slate as unrequested, which is false of Venus Roadlines, the one real shipped piece. |

---

## PART 3 — DOCUMENTS

Files, deploy, and the decisions that make claims true.

| # | Item | P | Who | What it is |
|---|---|---|---|---|
| X1 | **Resume as a PDF** | P0 | YOU | The file behind the link is a .docx. It opens in an editor, reflows on someone else's machine, and is the wrong format to hand a recruiter. Export the same document and drop it in `public/`. |
| X2 | **Pick the canonical URL** | P0 | YOU | GitHub Pages and Vercel are both live from different branches, so a recruiter can land on whichever is staler. Pick one, point a domain at it, and the other becomes a redirect. |
| X3 | **Venus Roadlines, what it is tagged** | P0 | YOU | The case page claims **Brand Identity**; the /work row says **Enablement**. Only the 106 page manual exists on disk. It is the one internal contradiction left and it sits on the only genuinely shipped piece, which is the worst place for it. Asked six times. |
| X4 | **BCG and UN Youth, confirm the label** | P1 | YOU | The wall now reads "Employers, clients and volunteer work" instead of "Worked with", which is accurate for all eight marks and drops the implication without the self-diminishing "College project" line. Confirm it or send me back to the per-mark line. |
| X5 | **Product and interface group** | P1 | YOU | `/about/` now carries a Product & interface group under Fluent. Your own note for the Me section was "I am not a product designer". The two do not contradict, but decide whether that group name is the one you want standing next to it. |
| X6 | **Portfolio schema** | P1 | ME | JSON-LD so the site describes itself to a search engine and to anything that previews the link. Twenty minutes, no visible change. |
| X7 | **Pre-send check** | P1 | ME | Full accessibility, contrast, console and performance run across all nine routes, plus a read of every page at 390 and 1440, immediately before you start sending. |
| X8 | **`ESSENCE.md`** | P2 | ME | A register of every distinctive device, where it lives and what job it does, so personality becomes additive instead of re-argued every session. |

---

## SPRINTS

Three sprints. The first is the only one between you and sending the link.

### Sprint 1 — Lock V1
**Goal: the link is safe to send to a company you want.**
Everything here is P0. Nine items, six of them files.

| You | Me |
|---|---|
| D1 colour photo | Wire every file as it lands |
| D2, D3 contact artwork | |
| D4, D5, D6 Me and Ideas artwork | |
| W1 six quote names | |
| W2 seven mechanism lines | |
| W3 track mismatch decision | |
| W4 three years | |
| X1 resume PDF | |
| X2 canonical URL | |
| X3 Venus Roadlines tag | |

**Done when:** no empty artwork slot on any route, no unattributed quote, every
figure has a cause, one URL is canonical, the resume opens as a PDF, and nothing
on the site contradicts anything else on the site.

**If you only do three things:** W1, W2, D1. Names on the quotes, a line under
each number, and the colour photo. Roughly two hours of your time and they lift
the three weakest moments on the page.

### Sprint 2 — Make it competitive
**Goal: it beats the other portfolios in the pile.**

| You | Me |
|---|---|
| W5 first Ideas post | D8 one pause control |
| W6 Vastr benchmarks | D9 drop GSAP |
| W7 LinkedIn recommendations | X6 portfolio schema |
| W8 Duolingo and L'Oreal | X7 pre-send check |
| W9, W10, W11 places, handles, links | |
| D7 AbsolutILY photography | |
| X4, X5 label confirmations | |

**Done when:** the Ideas section shows something instead of promising it, no
case page is unlinked, and the deck holds real recommendations.

### Sprint 3 — After the first applications
**Goal: depth, once you know what people ask about.**

W12 VoiceDNA run · W13 the four copy lines · D10 cover masters · D11 props ·
D12 two essence devices · X8 ESSENCE.md

Do this one informed. After ten applications you will know which section people
mention and which they skip, and that is better than guessing now.

---

## WHAT IS ALREADY DONE

So you can see the shape of what is left against what is built.

Nine routes, five full case studies with role, constraints, three key decisions
and a visible trade-off each. A work index with audience chips and three
filters. The hero with a fitted orbit, the brush, the comic tapes, a static
evidence band, a collapsible what-I-do, the Me monologue and the swipe deck, the
magazine, the contact section. Accessibility passing AA on every route in both
themes, reduced motion honoured, a 404, and a console clean on all nine. Images
cut from 2.2MB to 1.42MB. The gap register, so nothing missing is hidden.

**The honest summary:** the build is V1-ready. What is missing is yours, and
most of it is an afternoon.
