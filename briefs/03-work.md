# 03 — WORK

## PURPOSE
The heart of the site. Three cards on load, staggered scroll-reveal. "All Projects" control reveals the rest.

## CARD SPEC `[LOCKED]`
**Front:** image · title · tags · one-sentence teaser
**Hover:** gold hairline + `1.02` scale. Tactile, not flashy.
**Mobile:** single column reflow

## SLATE
| # | Title | Subject | Type | Status |
|---|---|---|---|---|
| 01 | Making A Brand World From Scratch | L'Oréal — scalp/bald line | Spec, real brand | Draft, fixes needed |
| 02 | Go!Go!GTM | Debra — **fictional** | Spec, fictional | `[GAP]` largest |
| 03 | Absolutely Yours | Absolut Vodka | Spec, real brand | `[GAP]` title only |
| 04 | Personality, This Order | Duolingo | Spec, real brand | `[GAP]` title only |
| 05 | Revamping My Father's Dream | Venus RoadLines | **Real work** | `[GAP]` files needed |

**Spec work is disclosed as spec in the first line of each case study.** Non-negotiable.

## CASE STUDY TEMPLATE `[LOCKED]`
Every piece: **Problem → Hypothesis → Approach → Result → Learning.**
Under five minutes to read. Process visible, not just polished outcome — the messy middle is the most persuasive part.

Build this template **once**. Every case study fills the same shell.

## STRUCTURAL NOTE
Four of five pieces are real brands, which reads as *"person with good taste who improves existing things."* Hireable, but not *"could build a world out of nothing."* **Debra is the only piece starting from a blank page** — it carries both the GTM proof and the world-building proof. If Debra doesn't deliver it, nothing on the site does.

## REFERENCE SLOTS

### `ref_work_grid.png`
- **Take only:** 
- **Ignore:** 
- **Why:** 

### `ref_work_hover.png`
- **Take only:** 
- **Ignore:** 
- **Why:** 

### `ref_casestudy_layout.png`
- **Take only:** 
- **Ignore:** 
- **Why:** 

## BUILD PASSES
1. Static grid + three cards. No hover, no motion.
2. Spacing, type scale, alignment.
3. Hover states + "All Projects" reveal.
4. Staggered scroll-reveal, 80ms apart.

## DONE WHEN
- [ ] Three visible on load, rest behind "All Projects"
- [ ] Single column at 390px
- [ ] No dead links — unfinished pieces labelled "In development"
