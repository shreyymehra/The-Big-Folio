# PRD V1 — addendum

Written 28 Oct 2026 against the live site, as additions to the PRD rather
than a rewrite of it. Everything numbered here was measured, not estimated;
the commands that produce each number are named so you can re-run them.

The PRD is sound. What it is missing is (a) six places where it describes a
homepage you changed in the last four days, (b) four acceptance criteria that
are currently failing and will quietly block "definition of done", and (c)
the parts of the honesty machinery that need specifying before Code can
build them without inventing.

---

## A. The home order conflicts with six decisions you made this week

The PRD's order is:

> Hero → Receipts → Experience summary → Worked with (grouped) → Selected
> work (three cards) → Ideas (short) → Me teaser → Contact

The live order is **Hero → What it moved → Work → Me → FAQ → Contact**. The
differences are not drift; each one is an instruction you gave:

| PRD says | Live, and when you decided it |
|---|---|
| "Receipts" as a section | **You removed the receipt on 27 Oct** and reverted to the shield-yellow pill. |
| "Worked with (grouped)" as a section | It is a **running strip in the hero** — your note of 21 Oct: *"it should not be sitting in the ME page, as it hides the capability"*. |
| "Selected work (three cards)" | **All five, as Work-index rows**, 24 Oct: *"show all five projects in the same card style as the Work index"*. |
| "Ideas (short)" | **Removed from home and from the nav**, 24 Oct. |
| "Me teaser" | Me is a **full section at 27% of the page**, the largest block on it. |
| (not mentioned) | The **screening-call FAQ is on home**, 27 Oct, three questions open. |

**This needs one decision, not six.** Either the PRD order supersedes those
instructions, or the PRD order should be rewritten to match the site. My
recommendation is the second: every one of those six changes was made for a
stated reason and four of them reduced the page. If the PRD order is what you
want, say so and I will rebuild to it — but it is roughly a day of work and it
re-opens decisions that are currently closed.

**One thing in the PRD order is a genuine improvement and should survive
either way:** the **experience summary** (Title | Employer | Dates | one
line). The site currently has no dates anywhere. A recruiter scanning for
sixty seconds cannot tell whether iSelect was a year or a month, and that is
the single biggest unanswered question on the page.

---

## B. Four acceptance criteria that fail today

Measured at 375px across all ten routes (`scratchpad/prdbar.mjs`).

### B1. "One h1 with text on every page" — home fails

| Route | h1 | Text |
|---|---|---|
| Home | 1 | **No real text.** The cut-letter name is images; the words exist only in `alt`. |
| Other 9 | 1 each | Real text. |

The cut-out name is the most ownable thing on the site, so the answer is not
to replace it. The fix is a visually hidden `<h1>` carrying the words and the
cut-letter lockup marked `aria-hidden`, so the heading is text to a crawler, a
screen reader and Lighthouse, and unchanged to the eye.

**Add to the spec:** *the h1 is text; a decorative lockup may render it, but
the text is in the DOM and not only in alt attributes.*

### B2. "Tap targets of at least 44px" — every page fails

| Measure | Result |
|---|---|
| Under 44px | **4 to 21 per route** |
| Under 24px (WCAG 2.5.8) | **0** |

So the site already meets the accessibility standard and misses yours. The
repeat offenders are on every page because they are in the nav: the island
logo at 35×39, the nav links at 31×46 (height passes, width fails), the theme
toggle at 40×40.

**This is a real decision, not a defect.** 44px is the Apple HIG figure and it
is a good bar for a phone, but hitting it means the floating island grows on
every route, and the island is a signature device you have tuned three times.
Options: hold 44 and let the island get bigger; hold 44 for everything except
the island and say so; or keep 24 and drop this line.
**My recommendation: 44px everywhere except the island, which stays at 24+.**

### B3. Alt text of 125 characters or fewer — `/about/` fails

Five images over the limit, all the process cards: **238 to 289 characters**
each. They read the entire card aloud because the card is an image of text.

The fix is not to truncate the alt — the information would be lost. It is to
put the step text in the DOM beside the image and give the image a short alt,
which also makes the process searchable and selectable for the first time.

### B4. Lighthouse mobile performance 85+ — at risk, and the cause is known

Not run yet (staging is not up), but the obstacle is measured and documented:
**GSAP plus ScrollTrigger is 45.8KB gzipped**, loaded on three routes, driving
`motion.js` which is 3.3KB and does four things. The homepage scroll was
profiled at 11fps in October and is about 23fps now.

**Add to the spec:** a JavaScript budget, and the note that nothing in the
current motion set requires GSAP — every tactic added in the last week is CSS.
Returning that 45.8KB is the single largest performance lever available and it
costs no visible behaviour. It needs your word because it touches motion.

---

## C. The claims rule needs more specification before it can be built

This is the strongest part of the PRD and the part that will fail silently if
it is underspecified. Three gaps.

### C1. The migration, and the size of the hole

There are **14 stats rendered on the homepage today**, hard-coded in
`index.html`. **None of them carries a period, a baseline or a method** —
those fields do not exist in the markup at all.

So the first claims report will list **14 of 14 stats as incomplete**. That is
the correct output and it should not be softened, but you should expect it
rather than meet it as a surprise. The orgs involved are Tickertape, iSelect
and Compare the Market, Bliss and Birch, TEDxUniMelb and TEDxVIPS.

**Add to the spec:** the migration is mechanical and Code does it — read the
14 from the markup into `stats.json` with `value`, `label` and `org` filled
and `period`, `baseline`, `method`, `proof` empty, `published: false`. No
value is altered in the move, and the report proves it by diffing the rendered
output before and after.

### C2. `published` needs a defined meaning

The record has `published` but the PRD does not say what it gates. Proposal,
matching the honesty rules already in the repo:

- `published: false` → **the stat does not render anywhere.** Not greyed, not
  "coming soon", not a placeholder. Absent.
- `published: true` **requires** `period`, `baseline` and `method` to be
  non-empty. The build fails, not warns, if one is missing.
- `role: team` renders a "What I owned" line beside the stat. A team stat
  without that line does not publish.

Without the first rule, "nothing is deleted" and "every claim defensible"
pull against each other and the site ends up showing unverified numbers with
an apology next to them, which is worse than either.

### C3. The rule should cover prose, not just stats

"Code never edits or removes a stat" is the right instinct and the scope is
too narrow. The same failure mode applies to your writing: in the last fortnight
a dead-code sweep removed a class a script applied and left the hero copy
invisible for four days, and a selector sweep rewrote 142 lines of commentary
before a diff caught it.

**Add to the spec:** Code never edits or removes copy you wrote. It may add,
and it may move a block whole. Any change to your words is proposed in the
report, never applied. Both of those incidents are in `CLAUDE.md` with the
mechanism.

---

## D. Missing from the quality bar, and each one is a 60-second-on-a-phone risk

### D1. The page must render with JavaScript off or failing

Not in the PRD, and it was the worst defect found this month. Measured with
script execution disabled:

- **Every route rendered as a blank cream screen.** The loader is
  `position:fixed; inset:0; z-index:120` and only a script ever removed it.
- **Every revealed block was invisible** — the work rows, every section
  heading, the dividers: 11 blocks on home, 9 on About, 2 on Contact.

Both are fixed now and both should be acceptance criteria, because your reader
is on a phone on a train and a script that has not arrived yet is the same as
one that never does.

**Add to the bar:** *with JavaScript disabled, every page renders its content;
nothing is hidden by a rule that only a script can undo.*

### D2. Contrast in both themes

The site has a working theme toggle. A hard-coded card with token-coloured
text inside it reads perfectly in one theme and fails in the other — **that
exact bug has occurred nine times** and is recorded each time in `CLAUDE.md`.

**Add to the bar:** *zero contrast failures in light and dark, on every
route.* It currently passes; without the line it will not stay passing.

### D3. The résumé is a .docx, and V1 names a PDF

`public/Shrey-Mehra-Resume.docx` is what exists. The link says "Word document"
rather than claiming PDF. The PRD lists a PDF in V1 with no acceptance
criterion.

**Add to the spec:** the PDF lands at `public/Shrey-Mehra-Resume.pdf`, the
`.docx` stays, the link points at the PDF, and `vercel.json` carries a 301
from the old URL (one is already there for the earlier rename).

### D4. The canonical URL is still unrecorded

Vercel was chosen as canonical on 20 Oct and **no domain exists anywhere in
the repo**. This blocks three V1-adjacent things: the canonical tag, the Pages
redirect, and `og:image`, which must be absolute and currently points at the
GitHub Pages URL because it is the only one that resolves.

**Add to "from Shrey":** the domain.

---

## E. Definition of done — two additions

The PRD's list is good. Two things it will need and does not name:

1. **The rollback tag needs a name and a moment.** Proposal: tag
   `v1-pre-prd` at the commit before the first PRD change, pushed, so the
   rollback is one command and not an archaeology exercise. This repo has
   lost uncommitted work twice; the tag costs nothing.
2. **The before/after screenshots need a fixed harness**, or "before" and
   "after" will differ by font loading and scroll position rather than by the
   change. `scratchpad/shoot.mjs` already does this: real device metrics,
   waits for `fonts.ready`, removes the loader. Name it so both sets are
   comparable.

---

## F. What I would cut from V1

One thing, and it is the one most likely to eat the time the rest needs.

**"Worked with, grouped by relationship"** is in V1. Today it is a running
strip of eight marks in the hero, and the grouping question — employer versus
client versus volunteer — is one you have already answered three different
ways (the "College project" line, then removing it, then the current label
"Employers, clients and volunteer work"). Grouping re-opens it a fourth time.

The experience summary in Section A solves the same problem better, because
dates and titles answer "what was this person to that company" without
needing a taxonomy. **Recommendation: ship the experience summary, leave the
strip as it is, and treat grouping as V2.**

---

## G. Open questions, shortest first

1. Does the PRD home order supersede the six decisions in Section A, or should
   the order be rewritten to match the site? *(Section A)*
2. 44px tap targets everywhere, or everywhere except the island? *(B2)*
3. Return the 45.8KB of GSAP by porting `motion.js` to CSS? *(B4)*
4. Confirm `published: false` means absent, not placeholder. *(C2)*
5. The canonical domain. *(D4)*
6. The 14 periods, baselines and methods. *(C1 — this is the long pole, and
   nothing else in the claims rule can finish without it.)*
