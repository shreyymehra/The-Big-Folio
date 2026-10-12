# Recruiter scan: gap report

13 Oct 2026. A full verification pass across all nine routes, in both themes,
at 1440 / 1280 / 1024 / 390, plus a CPU profile of a scripted scroll on every
page. Written as the person you are building for: someone who clicked a link
from a cold email, is not yet convinced, and will give this about ten seconds
before deciding whether to give it two minutes.

**Scores are out of 10 and they are not generous.** The site is good. It is not
yet finished, and three of the gaps below are the difference between a portfolio
that looks impressive and one that gets you the interview.

---

## THE SCORES

| | Score | One line |
|---|---|---|
| **Craft and design** | **8.5** | Genuinely distinctive and consistent. Falls down the moment you click into a case study. |
| **Performance** | **7.5** | Fixed a 5x scroll problem today. Payload is still heavy and the fonts are the reason. |
| **Accessibility** | **9** | Contrast clean in both themes on all nine routes, reflows at 390, keyboard sound. Genuinely above market. |
| **Clarity of offer** | **7** | The hero is sharp. The evidence behind it is one click away and most people will not take it. |
| **Deliverables** | **5** | Seven pieces, five of them spec, two with no page. No artefact for the discipline you lead with. |
| **Credibility** | **6** | The numbers are real and sourced. Almost nothing else is independently verifiable. |
| **Overall** | **7.1** | A designer's portfolio that argues well. Not yet a product marketer's portfolio that proves. |

---

## THE TEN-SECOND SCAN, HONESTLY

Here is what I actually get, in order, landing on home at 1440:

1. A cut-out name card with a photograph of you as a kid at a sewing machine.
   **Strong.** It is not a template, it does not look AI-generated, and the
   caption earns a second of attention.
2. "I build [brands] people want to belong to, and the case for why they pay
   off." **This is the best sentence on the site.** It says what you do and
   what it is for in one line.
3. "Product marketing & brand strategy. Made in Melbourne." Clear.
4. Six floating marks. Charming, and I understand they are navigation.
5. Scroll: a yellow pill that says **"What I do, and what it moved ·
   15 disciplines · 7 numbers"**, closed.
6. Scroll: the work.

**At step 5 I lose the thing that would have convinced me**, and that is the
single biggest finding in this report. See C1.

---

## A. WHAT I FIXED TODAY, WITHOUT ASKING

### A1. The home scroll was running at 11fps · FIXED
Profiled against a scripted scroll of the whole page. `/contact/` held 51fps on
the same harness; home managed 11. Three causes, all work repeated every frame
whose inputs never change:

- The ghost stars behind the work wall called `getTotalLength`,
  `getComputedTextLength` and **sixteen `getPointAtLength` calls per frame** —
  12.3% of the entire profile. The curve is fixed and the word never changes.
  Now sampled once into a 360-point table; every frame after is array maths.
- The work tiles were walked three times a frame, and the middle pass read
  `--p` back out of the style object to find the active tile: a CSSOM round
  trip for a number the first pass already held.
- The reading-progress star was a bare scroll listener reading
  `document.body.scrollHeight` — a forced synchronous layout — and Lenis fires
  scroll on every animated frame.

**Result:** SVG geometry calls gone from the profile entirely, idle 25.3% →
39.0%, progress writer 6.9% → 3.0%. Site JS during scroll roughly halved.
Verified behaviourally identical: all 8 stars still place, all 3 tiles still
drive, the star fill still tracks.

### A2. Everything else fixed today
The zine cover was being repainted half red by a leftover CSS wash. The orange
band's step numbers sat at 3.98 contrast. The quote tape's rotated corners were
landing on the logo label. 144px of dead space above the metrics pill. The work
tiles revealed through a `clip-path` that spent most of its life showing a card
with its label sliced off.

---

## B. WHAT I FOUND AND DID NOT TOUCH (DESIGN)

### B1. The case studies are a different website · the biggest design gap
**This is where a recruiter actually decides.** Home and `/about/` are rich:
torn edges, a red registration plate, cut-out type, the star, four grounds,
real artefacts. Then I click a case study and land on **seven screens of blue
type on cream with one poster at the top and no colour plane, no yellow, no
sticker, no texture anywhere.**

It reads as if two people built this site, and the one who built the case
studies was in a hurry. It is also the worst possible place for that drop,
because the case study is the only page where I am reading to be convinced.

**Recommendation:** pick three devices from home and run them through all five
cases — a yellow plane behind the outcome, the red left-rule you already use for
trade-offs promoted to a section marker, and one detail crop per case. This is
a day of work and it is the highest-value design job left.

### B2. The work wall has a hole in the middle of it
Scrubbing the pinned collage, there is a stretch where two tiles have landed,
the third has not arrived, and the bottom half of the blue block is empty. At
1440 that is roughly 400px of nothing under the two cards.

**Recommendation:** start the third tile's reveal earlier (`data-reveal`), or
shorten the pin. Either is a one-line change; I did not pick one because it
changes the pace of the section and pace has been your call throughout.

### B3. The ransom tiles can be caught mid-flip
The GSAP stepped spin occasionally renders a letter mirrored or edge-on. In
motion it reads as the device working. In a screenshot, or if someone's machine
drops a frame at the wrong moment, "Name" renders as garbled characters. A
recruiter screenshotting your hero to send to a colleague is a real scenario.

**Recommendation:** cap the spin so it never passes 90°, or run it only on the
first load rather than on a loop.

### B4. Dark mode is unverified territory
It is contrast-clean, which is the hard part, and I have checked it on every
route. But the hero deliberately stays light, the work block tears against a
different ground, and nobody has looked at the whole page in dark with a
designer's eye. It is almost certainly fine. It is not *decided*.

---

## C. WHAT I FOUND AND DID NOT TOUCH (CLARITY)

### C1. Your seven real numbers are behind a click · HIGHEST IMPACT
`<details class="mv">` ships **closed**. The seven verified figures — +46%
engagement, −78% vendor costs, +310% CTR, 160k customers, 20k MAU, 1.2M views,
130 volunteers, each with its employer under it — are the only independently
real evidence on the entire site, and a scanning reader never opens a drawer.

**This reverses your own earlier instruction.** `CLAUDE.md` records, from 9 Oct:
*"Both carry `open`: the figures are the most persuasive content on the page and
a closed drawer buries them, so collapsing is for the second read."* On 13 Oct
the pill was built "closed on arrival, at his instruction."

Both are your calls, which is why I have not changed it. But as the recruiter:
**I would not have clicked it.** The label "15 disciplines · 7 numbers" reads as
a list of skills, which is the least interesting thing a portfolio can offer me.

**Recommendation, strongest in this document:** ship it open, or at minimum put
**two figures and their employers on the pill itself** so the drawer is an
invitation to see five more rather than a closed box.

### C2. You lead with product marketing and show none of it
The hero says "Product marketing & brand strategy". The slate is three brand
and campaign pieces. The discipline list names PRDs, user research, launch
planning, sales enablement and competitive analysis — **none of which has a
single artefact behind it anywhere on the site.**

A product marketing hiring manager will notice this in under a minute. This has
been open since the audit and remains the one thing that changes whether the
portfolio argues for the job you are applying for.

**Recommendation:** one artefact closes it permanently. A positioning doc, a
launch plan or a competitive teardown **for Voice'D**, which is yours, is in
build, and needs those documents to exist anyway.

### C3. Five of seven pieces are spec, and two have no page
`/work` lists seven. Two of them ("The Bird That Flew Too Close to the Sun",
"Making A Brand World From Scratch") are labelled not built / in development and
go nowhere. **A list where 2 of 7 rows are dead ends makes the other five feel
thinner than they are.**

The honesty is right and the disclosure policy is genuinely good. But seven rows
where five say "Spec" and two say "not built" reads as *"I have two finished
things"* — which undersells you, because Venus Roadlines is real, Voice'D is
real, and the thinking in the spec work is the actual product.

**Recommendation:** cut the two unbuilt rows until they exist. Five rows where
every one opens is stronger than seven where two do not.

### C4. The quote tape has no names on it
Six real colleague quotes, zero attributions. An unattributed quote is
decoration; a named one is a reference. This is the cheapest credibility gain
available on the whole site and it has been open since September.

### C5. Ideas is a cover and a contents page
The zine looks superb and it is the most original thing on the site. It opens to
a contents page listing five sections, of which the Posts page says the posts
are being written and the Letters page is contact details. **It promises an
intellectual layer and delivers a table of contents.**

**Recommendation:** one real piece. Even 600 words. You have at least three
written already inside the FAQ answers.

---

## D. PERFORMANCE, AFTER TODAY'S FIX

| Route | Payload | FCP | Scroll |
|---|---|---|---|
| `/` | 1644KB / 42 req | 1376ms | fixed today, see A1 |
| `/work/` | 1001KB / 27 req | 1156ms | fine |
| case pages | 420–520KB / 18 req | 530–1160ms | fine |
| `/about/` | 858KB / 25 req | 500ms | fine |
| `/contact/` | 502KB / 17 req | 716ms | best on the site |

### D1. The fonts are 264KB and they are `.otf`
`AsimovPrintB.otf` (128KB) and `AsimovPrintBItal.otf` (134KB) load on **every
page**. `.otf` is not a web format: converted to WOFF2 these would be roughly
40–50KB each, saving **~170KB on every single page load**, which is more than
any image on the site.

I could not do this here — it needs `fonttools` and there is no Python on this
machine. It is a ten-minute job with one command on a machine that has it, or
any online converter. **The licence is Apache 2.0 so conversion is permitted**
(I checked; it is a Roboto derivative, and the Milligram problem does not
recur here).

### D2. The italic font loads 134KB to render one sentence
`.beat--close` is the only italic in the display face: the closing line of the
Me section on home. 134KB for one sentence.

**Recommendation:** drop the italic file and set that line in the roman, or
accept it after the WOFF2 conversion makes it 45KB.

### D3. Two images are served far larger than they display
`star.webp` is 520px rendering at 24–38px (up to 10.8x over retina) and appears
on every route. `4d7964f598.webp` is 200px at 24px. Small files, but the star is
on nine routes.

### D4. `site.css` is 136KB and render-blocking
Large for a hand-authored stylesheet, and it is the second-heaviest asset on
home. Not urgent; worth knowing before it grows again.

---

## E. WHAT IS GENUINELY GOOD, SO YOU DO NOT CHANGE IT

Short, because flattery is not the job, but these are load-bearing:

- **The hero card.** It is distinctive, it survives a screenshot, and no other
  portfolio looks like it. Do not redesign it again.
- **The claim line.** "I build brands people want to belong to, and the case
  for why they pay off." Keep it exactly.
- **The disclosure policy.** Spec declared in the first line, no invented
  numbers, nothing called live before it is. A hiring manager who notices this
  will trust everything else on the site more.
- **Accessibility.** Contrast clean in both themes on nine routes, reflows at
  390 with no horizontal scroll, keyboard-operable disclosures, reduced motion
  honoured. This is better than most agency sites and it is invisible until it
  is missing.
- **The star with you in it**, now on `/about/`. Best photograph on the site.
- **The torn edge on the work block.** Small, cheap, and it is the detail that
  tells me a person made this.

---

## F. IF YOU ONLY DO FOUR THINGS

In order of what moves a hiring decision:

1. **Open the numbers drawer, or surface two figures on the pill.** (C1) Ten
   minutes. Puts your only hard evidence in the ten-second scan.
2. **Build one product marketing artefact for Voice'D.** (C2) A day. It is the
   only item that makes the portfolio argue for the role you want.
3. **Run three home devices through the five case pages.** (B1) A day. Closes
   the gap between a designed site and a plain document at the exact moment a
   recruiter is reading to be convinced.
4. **Send me the six quote attributions.** (C4) One message. Six decorations
   become six references.

Everything else on this list is polish. These four are the portfolio.
