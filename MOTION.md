# MOTION — the register

Written 23 Sep 2026. Every motion on the site, what job it does, what runs it, and what happens
under `prefers-reduced-motion`. Reference Book row 10 asks for motion that is fluid, mobile-aware
and respects the reduced-motion signal. `DIRECTION.md` sets the test this list is held to:

> Motion communicates arrival, hierarchy or transition. Motion that only demonstrates capability
> is cut.

If a proposal below cannot name which of those three it does, it does not get built.

---

## The library question, settled

**Do not install Motion (motion.dev).** It was vendored once and removed on 21 Sep 2026 because
its only use was a single `inView` call, for 81KB. Nothing on this list needs it.

What is already here does the whole job:

| Tool | Weight | What it is for |
|---|---|---|
| **CSS transitions and keyframes** | 0KB | Everything state-driven: reveals, hovers, the island, the rules, the highlighter |
| **IntersectionObserver** | 0KB | Everything that fires on arrival |
| **GSAP 3.12.5**, vendored | 72KB | Only the physical, many-object, timeline work: the ransom tiles |
| **Lenis**, vendored | 19KB | Scrolling, and nothing else |

GSAP is now free for everyone (checked on gsap.com, 23 Sep 2026), so the licence question that
used to sit on it is closed. But a second animation library on top of it would be 80KB spent to
do what the first one already does, on a site whose whole argument is that it loads instantly
for a sceptical stranger. If a proposal below genuinely needs a timeline, it uses GSAP.

**Rule for anything added later:** CSS first, IntersectionObserver for arrival, GSAP only when
several objects have to stay in step over time. Reduced motion is handled in the component, not
globally, because collapsing a duration does not stop an infinite animation.

---

## Built, and working

| # | Motion | Where | Job | Runs on | Reduced motion |
|---|---|---|---|---|---|
| 01 | Loader, under a second | every full load | arrival | `home.js` | skipped |
| 02 | Hero assembly, the copy landing in sequence | home hero | hierarchy | `home.js` | instant |
| 03 | Ransom tiles jittering on twos, occasional stepped spin | hero name | personality | **GSAP** | still |
| 04 | The six marks drifting, and dragging under the pointer | hero | invitation | `home.js` | still, drag stays |
| 05 | Rolling verticals after "wanted to build" | hero | personality | `home.js` | holds one word |
| 06 | Quote tape and two crossing bands, speeding with scroll | home | texture | `site.js` | still, pausable |
| 07 | Work collage pinned and scrubbed | home work | transition | `home.js` | pin released |
| 08 | Magazine pages turning | home ideas | transition | `magazine.js` | instant page swap |
| 09 | Word-by-word ink fill as you read | home Me, /about | hierarchy | `site.js` | all inked |
| 10 | Highlighter pulling under "always" | contact | emphasis | `site.css` | already drawn |
| 11 | The island: three shapes, driven between measured widths | every page | orientation | `feel.js` | no transition |
| 12 | Star filling as the page is read | every page | orientation | `site.js` | fills, no ease |
| 13 | Reveals, fade and lift, staggered | every page | arrival | `site.js` | shown |
| 14 | Press spring on every CTA | every page | answer | `feel.js` | no spring |
| 15 | Smooth scrolling | every page | feel | Lenis | native scroll |
| 16 | Record player, and the hero mark that starts it | home | play | `home.js` | plays, no spin |
| 17 | Work cards picking up on hover | home work | invitation | `site.css` | flat |
| 18 | Dark graphic revealed under the email | contact | reward | `site.css` | appears |
| 19 | Plate wipe as a row is reached | /work | arrival | `scroll.js` | shown |
| 20 | **Decisions dealing in, trade-off rule drawing down** | five case pages | hierarchy | `case.js` | shown, drawn |
| 21 | Theme crossfade | every page | transition | `theme.js` | instant |
| 22 | **The hero ripple: rings step out in yellow, red and blue from the pointer** | home hero | invitation | `home.js` + CSS `steps(7)` | no rings at all |

Number 22 is the newest: touching the photograph or the copy throws three rings from the pointer,
yellow first and blue last, each on a seven-frame step so the wave reads as stop motion rather than
water. Rings are capped, throttled to one set every 140ms, removed when they finish, and never made
under reduced motion or while Pause motion is on.

Number 20 is worth a look too: the red rule beside each trade-off draws from
the top as the decision lands. It is the only motion on a case page that carries an argument,
which is that every choice cost something.

---

## Proposed, in the order I would build them

Each one names its job. Anything that cannot is not here.

### 1. The work card fan (row 03, Lakshmanan)
Three detail crops sit fanned behind the cover like picked cards; on hover they spread and lift.
**Job:** invitation, and it proves there is more inside without opening the case.
**Runs on:** CSS transforms, one transition. **Blocked on:** real crops. Fifteen empty boxes is
not a placeholder, it is an admission.

### 2. Cover to header, one continuous move (row 03)
The work card's cover becomes the case page's header plate, using the view transitions already
declared in `base.css`. **Job:** transition. It makes the case feel like the card opened rather
than a new page loading. **Runs on:** CSS view transitions, no JS. **Blocked on:** covers.

### 3. The numbers land like a board (row 04)
The verified figures in the second crossing band resolve digit by digit, in the split-flap idiom,
once per visit. **Job:** arrival for the only hard evidence on the page. **Runs on:** GSAP, a
stepped ease on a character strip. **Watch:** his own note says do not merge too many designs into
this. One device, one band, not the whole section.

### 4. The bobblehead (row 06, Me1)
Slow bob at rest; a stepped spin on hover, borrowing the ransom tiles' step ease so the site has
one signature rather than two. **Job:** personality. **Runs on:** GSAP, shares the existing
timeline. **Blocked on:** Me1.

### 5. The globe at the end of Me (row 06, Me2)
Rotates slowly, stops when hovered or focused, each place inking in as it comes round.
**Job:** hierarchy, it closes the section with the globetrotter idea Harrison Wheeler ends on.
**Runs on:** CSS rotation plus IntersectionObserver. **Blocked on:** Me2.

### 6. The hill under contact (row 09, Contact2)
Rises into place as the contact section is reached, the section standing on it.
**Job:** arrival. **Runs on:** one transform tied to scroll position. **Blocked on:** Contact2.

### 7. Leader lines on case pages
A thin rule draws from a phrase in the body to a margin note, on the paragraph being read.
**Job:** hierarchy, the annotation layer a strategist actually thinks in. **Runs on:** inline SVG
with `stroke-dashoffset`. **Not blocked.** This is one of the two "essence" devices still open.

### 8. The starburst on the magazine cover
A slow rotation that only runs while the cover is the page on show.
**Job:** texture. **Runs on:** CSS. **Cost:** near zero. **Value:** also near zero. Build it last
or not at all.

### Explicitly not proposed
- **A custom cursor.** Gowtham's portfolio is on the reference list with "I do not like the cursor
  effect in place" written against it. It stays off.
- **Scroll-jacked section snapping.** Lenis already owns scrolling; snapping fights the reader.
- **Anything infinite that cannot be paused.** WCAG 2.2.2, and the tickers already show the
  pattern to follow.
- **Motion on the case bodies themselves.** They are long-form reading. The reveals are enough.

---

## The test before anything here ships

1. Name the job: arrival, hierarchy or transition.
2. Turn every effect off and look at the composition. If the screen is boring without motion, the
   motion is covering for a layout that was not finished.
3. Run it at 390px, where most cold-email traffic lands.
4. Run it under reduced motion, and check that loops stop rather than merely speed up.
5. Look at the screenshot. Structure verified through code is not verified.
