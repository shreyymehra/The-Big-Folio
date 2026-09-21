# BUILD-SPEC.md

Reconciliation of the recruiter-market research against the live v6 build.
Read after `CLAUDE.md` and `DIRECTION.md`. Where this conflicts with those, **they win** —
except where a conflict is resolved explicitly below.

State this was written against: static HTML on Vercel, `cleanUrls`, `trailingSlash`.
Pages live: `/`, `/work/`, `/work/{vastr,cut-the-noise,voicedna,vrl,absolutily}/`, `/about/`, `/contact/`, `/ideas/`.

---

## 1. VERDICT

The research is sound and mostly already satisfied. It splits four ways:

| | Count | Action |
|---|---|---|
| Already built | 7 items | Nothing to do |
| Conflicts with locked direction | 4 items | Locked wins, one exception |
| Genuinely missing | 6 items | Build, in the P1–P6 order below |
| Reject | 4 items | Reasoning recorded so it is not re-proposed |

One thing the research gets right that the build gets wrong, and it is the biggest single
gap on the site: **the homepage carries no real commercial numbers.** iSelect/CTM +46% MoM
engagement and −78% vendor cost, Tickertape +310% CTR / 160k customers / 20k MAU, TEDx 130
volunteers / 1.2M views — none of it appears anywhere a recruiter scanning for thirty
seconds would find it. The research names this twice (§3.3 credibility signal, §1.6 proof
of impact strip). It is right.

---

## 2. CONFLICTS — how each resolves

### 2.1 "Headline: role + specialty + domain" vs the locked hero — **PARTIAL ADOPT**

Research wants `Brand Strategist for B2B SaaS`. The positioning explicitly refuses a single
role label, and the hero copy is locked. Both can be true.

- **Keep** the cut-out hero, the rolling verb line, and `I find the idea, write the words,
  and build the case for why it moves a number.`
- **Fix:** that line says what he *does*. A recruiter also needs to know what he *is* in
  order to route him to a req. The `disciplines` mono line already does this job but sits
  three screens down, below the ticker. **Move one compressed discipline clause into the
  hero**, under the value line, as mono metadata — not a badge, not a pill.
- Do **not** narrow the positioning to satisfy the research. Its examples assume a
  single-discipline candidate.

### 2.2 "Hover: slight lift, shadow" — **REJECT**
Drop shadows and lift are on the veto list. The work-row / tile inversion already carries
the hover state and carries more personality. No change.

### 2.3 "One sans-serif, 2–3 weights" — **REJECT**
The rule exists to stop arbitrary mixing. v6 assigns three families to three jobs
(Bricolage display, Instrument body, Martian Mono metadata) and that assignment is the
hierarchy. Keep.

### 2.4 "Next.js/React, JSON-driven case studies" — **REJECT THE STACK, ADOPT THE DATA MODEL**
The site ships as static HTML on Vercel and works. Re-platforming to Next.js is a rebuild
with no recruiter-visible benefit, and re-opens the versioning problem that took six
attempts to close.

Adopt the *idea*: case content currently lives inline in five near-identical HTML files, so
every structural change is five edits. **Extract case content to `assets/cases.json`** and
render from it with a small build script or at runtime. Schema in §5. This is the one piece
of engineering worth doing before the next content pass.

---

## 3. ALREADY BUILT — research confirms, no action

- Case narrative shape (Context → Challenge → Thinking → Execution → Outcome → Reflection)
  maps cleanly onto the research's 8-part template.
- TL;DR / hero summary at the top of each case.
- Domain filters on `/work/` (research §2.10).
- Colleague quotes as social proof (research §2.8) — though see the GAP below.
- Clean nav, four items, no chrome.
- Mobile reflow, focus states, reduced motion.
- Contact page kept minimal, no booking widget.

---

## 4. MISSING — build in this order

### P1 — Proof band on the homepage
**Research §1.6.** Three to five real numbers, above the fold or immediately under the work
section. Each number needs its mechanism beneath it and employer + period as metadata,
otherwise it reads as a stat bar anyone could fabricate.

Source data (verified, from the master resume — do not invent neighbours):
```
iSelect / Compare The Market   engagement +46% MoM · vendor costs −78%
Tickertape                     CTR +310% · 160k customers · 20k MAU · churn −16%
TEDxVIPS                       130 volunteers · 1.2M views
```
Constraint: `--accent` #F1442A is 3.27 on paper and must never carry small type. On the ink
ground the measured pairings are accent 4.73, paper 15.47, `--n-1` at 82% 8.48.

### P2 — "Key decisions" block per case
**Research §1.1.** This is the highest-signal addition in the whole document and the site
has no equivalent. It is the locked "Thinking" stage made concrete and scannable.

Two to three decisions per case, each with: the choice, the options considered, the evidence,
the trade-off accepted. Vastr already holds the raw material (Debra → Whear → Vastr naming,
and the incentive argument against funded wardrobe apps) — it is written as prose and needs
restructuring, not new content.

Render as a bordered list, hairline `--n-1`, mono labels. No accordion — a recruiter
scanning does not click.

### P3 — "Role & constraints" card per case
**Research §1.3.** Existed in an earlier pass, did not survive the restructure. Restore
immediately under the TL;DR: role, team, timeline, constraints. Four fields, 2×2 on desktop,
stacked on mobile.

For spec pieces the honest version is `Role: everything. Team: none.` — which is itself a
constraint worth stating rather than hiding.

### P4 — "What I'd do differently" per case
**Research §1.4.** Vastr's `No numbers, because there are none` is adjacent but is a
disclosure, not a reflection. Three to five sentences at the foot of each case.

Prompt to write against: *if you had four more weeks or 20% more budget, what changes and why.*

### P5 — Before / After with one metric
**Research §1.2.** Only works where a real before and a real after exist — so only on the
iSelect/CTM and Tickertape material. **Blocked** until those are written up (see §7).
Do not fabricate a before/after for a spec piece.

### P6 — Problem → Approach → Outcome one-liner on work cards
**Research §2.9.** Cards currently carry a teaser. Replace with three labelled fragments so
the narrative is legible without opening the case. Mono labels, one line each, muted.

---

## 5. CASE DATA SCHEMA

```json
{
  "slug": "vastr",
  "title": "Vastr: Out With The Old",
  "kind": "spec",
  "disclosure": "Self-directed. No client, no brief, no budget.",
  "tldr": "",
  "roleAndConstraints": {
    "role": "", "team": "", "timeline": "", "constraints": ""
  },
  "problem": "", "approach": "", "outcome": "",
  "sections": [{ "id": "s0", "heading": "", "body": "" }],
  "decisions": [{
    "title": "", "options": "", "evidence": "", "tradeoff": ""
  }],
  "reflection": "",
  "credits": [{ "name": "", "role": "" }],
  "tags": [],
  "gaps": []
}
```

Rules that must survive the extraction:
- `kind: "spec"` forces the disclosure to render in the first line. Not optional.
- `gaps[]` renders visibly on the page as `[GAP: …]`. It is meant to be uncomfortable.
- No `metrics` field on a spec case. Reasoning goes in `outcome` instead.
- Em dashes are banned in every string.

---

## 6. REJECTED, WITH REASONING

**Expand domain filters.** `/work/` already has six filter buttons over seven items. Six
filters on seven pieces is over-engineering that advertises how few pieces there are.
**Cut to three.**

**Artifacts library.** With six of seven pieces self-set spec, an artefacts gallery is a
gallery of things he invented. It weakens rather than strengthens. Revisit once real
commercial cases exist.

**Playbook / "How I work" page.** Good idea, wrong moment. Ideas is already a named,
empty section with three `[GAP]` slots on the page. Adding a second thinking-layer page
while the first is unwritten is a planning container, which is the specific failure mode
flagged in `CLAUDE.md`. Write one Ideas piece first; if the playbook still feels missing
after that, it becomes an Ideas piece rather than a page.

**Calendly / "book a 15-min chat".** Hard rule 8. No booking widget.

---

## 7. OPEN — needs Shrey

1. **The iSelect / CTM write-up.** Asked once, unanswered. Everything in P1 and P5 depends
   on it, and it is the only route to leading with real commercial work. If it is blocked
   by NDA, say so, because a portfolio that can never lead with real results is a different
   and harder problem than one waiting on a document.
2. **The discipline clause for the hero** (§2.1). One line. Recommendation:
   `Brand · Product · GTM · Creative` set in mono under the value line.
3. **Ideas.** Three empty slots on a live page. One piece unblocks the section and the
   L'Oréal scalp-health argument is already written and is an argument, not a project.
4. **Two case pages linked with no page behind them** (06, 07 on `/work/`). Per hard rule 4
   these must be labelled "In development" and unlinked until they exist.

---

## 8. VETO VIOLATION CURRENTLY SHIPPING

`index.html` renders `<span class="badge">Melbourne → Global</span>` in the hero. The
veto list kills badges and names this capsule specifically. Either delete it, or fold the
location into the discipline clause from §2.1 as mono metadata with context around it.

---

## 9. PROMPT FOR THE NEXT CODE SESSION

> Read `CLAUDE.md`, `DIRECTION.md` and `BUILD-SPEC.md` before touching anything.
>
> The site is static HTML deployed on Vercel. Do not re-platform, do not create new
> top-level HTML files, and do not rewrite locked copy.
>
> Task, one at a time, screenshotting after each:
> 1. Extract the five case pages' content into `assets/cases.json` against the schema in
>    BUILD-SPEC §5, and render the pages from it. No visual change should be detectable in
>    a before/after screenshot. Verify that first.
> 2. Add the Proof band to `index.html` per §4 P1, on the ink ground, using only the
>    numbers listed there. Run `contrast.py` on every pairing before committing.
> 3. Add `decisions[]` rendering to the case template per §4 P2, and populate Vastr from
>    material already in its prose. Leave the other four cases' arrays empty so the gap
>    is visible.
> 4. Restore the Role & constraints card per §4 P3.
> 5. Delete the `Melbourne → Global` badge per §8.
>
> After each step: `node taste-skill/scripts/shoot.js <url> --sel "<section>" --out /tmp`
> and open the PNGs. Structure verified through code is not verified.
