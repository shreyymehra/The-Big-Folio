# ASSET_REQUESTS.md

Opened 29 Oct 2026, per P1-5: *"If any asset is missing, write a line to
ASSET_REQUESTS.md and leave a neutral placeholder. Do not invent art."*

**Nothing in P1 has been built.** Every item below needs a file from Shrey
first, and inventing the art is the one thing the rule forbids. No
placeholder has been added to any page either: the P0 pass removed
placeholders rather than adding them, and a neutral box for an asset that
has no slot yet would be a new placeholder on a page that just lost its
last one. Each item says exactly where it will land when the file arrives.

Companion registers: `NEEDS.md` (everything outstanding, with what it
unblocks) and `FILL-IN.md` (the coded G01–G17 slots). This file is only
the P1 art.

---

## P1-1 — Work rows

| # | Asset | Where it lands | Blocked because |
|---|---|---|---|
| A1 | One taped cut-out thumbnail per case, from his own screenshots (5) | `.wrow .plate`, replacing the poster crop | The posters are his designed covers, not screenshots; a taped cut-out is a different artefact |
| A2 | His scanned hand-circled proof mark, one PNG with alpha | Over the proof number in each row | A drawn circle is his hand or it is not the device |
| A3 | Case number in ransom letters, 01–07 | `.wrow .n` | Needs the alphabet sheet in P1-3 |

Max 3 devices per row, his constraint. With A1–A3 that is exactly three, so
nothing else may be added to a row.

## P1-2 — Contact

| # | Asset | Where it lands | Blocked because |
|---|---|---|---|
| B1 | The yellow-wood line as cut-out letters | `.so-cta` on home, `h1` on `/contact/` | The line is live as type since P0-7; the cut-out version replaces it |
| B2 | Stitched postcard with stamp and a "Melbourne" postmark | Behind the contact actions | Nothing on the site is a postcard yet |
| B3 | One hand-drawn arrow pointing at the email button | Beside `.cbtn--mail` | Must be his hand, same reason as A2 |

## P1-3 — Hero ransom letters

| # | Asset | Where it lands | Blocked because |
|---|---|---|---|
| C1 | His own alphabet sheet, **3 variants per letter** | `.idcard` head, replacing the current tiles | The current lockup is one fixed set; swapping needs three cuts of each letter |

Behaviour once C1 lands, from his spec: swap every ~83ms on `steps()`, about
a third of the letters at a time, halftone overlay, 2px cyan/magenta offset,
drop in once over 600ms with a 40ms stagger, pause when off screen.

## P1-4 — Hero cut-outs as physics bodies

| # | Asset | Where it lands | Blocked because |
|---|---|---|---|
| D1 | Nothing new — the six marks already exist | `.floats`, currently hidden by the P0-6 flag | **This is a decision, not an asset** |

P0-6 hides the six hero marks as "desktop-icon stickers that duplicate the
nav". P1-4 rebuilds the same six as Matter.js bodies that are real links.
Those two cannot both be true, so **P1-4 needs his call before any work**:
either the marks come back as physics bodies, or they stay hidden. One line
in the flag block restores them.

Noted for when it is answered: the spec asks for gravity 0, soft pointer
repel, draggable, an exclusion body around the value line, dynamic import on
desktop only and a static arc on mobile. Three pointer-driven systems have
already been built and removed from this hero (an ellipse orbit, a GSAP
drift, a pointer parallax), the last at his own word that *"loops should be
there, pointer is not something we implement well"*. Worth re-reading before
the fourth.

---

## Format notes, so a delivery is usable first time

Three deliveries in this repo have arrived as something other than what the
filename said, and each cost a conversion pass:

- An SVG that was a 2000px PNG in a vector wrapper (6.3MB for six marks).
- A `.png` whose header read `%PDF-1.4`.
- Two exports on an opaque white plate that had to be keyed out.

So: **PNG or WebP with real alpha** for anything cut out; **SVG only if it is
actually vector**; no white plate behind a cut-out; and the longest edge at
roughly four times its rendered size, which for a 28px logo is 112px and for
a hero letter is about 800px.
