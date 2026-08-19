# 06 — FAQ (BENTO)

## PURPOSE
In Shrey's framing: *"this should be like a screening call in itself and provide an in-depth answer."*

This is the smartest structural idea in the brief. It does disproportionate work for a cold-email strategy because it pre-answers the objections that stop a reply.

## SPEC
- Asymmetric bento grid — tiles of varying size, not a uniform row
- Expandable. Collapsed shows the question; expanded shows a substantive answer
- **Answers are substantive, not one-liners.** A one-line answer defeats the entire purpose
- Expansion pushes layout rather than overlaying — no modals
- Keyboard operable, `aria-expanded` set correctly

## CONTENT `[GAP]` — 6–8 pairs

Suggested question set:
```
[GAP] What are you actually looking for?
[GAP] Why brand and comms specifically?
[GAP] What's the thing you're best at?
[GAP] What are you still building?
[GAP] Why should a tech company hire someone culture-led?
[GAP] What's your process when you get a brief?
[GAP] What did you actually do at iSelect and Compare the Market?
[GAP] What do you do when an idea isn't working?
```

## REFERENCE SLOTS

### `ref_bento_grid.png`
- **Take only:** 
- **Ignore:** 
- **Why:** 

### `ref_expand_behaviour.png`
- **Take only:** 
- **Ignore:** 
- **Why:** 

## BUILD PASSES
1. Static bento grid, all collapsed
2. Spacing, tile proportions, type
3. Expand/collapse behaviour
4. Transition motion

## DONE WHEN
- [ ] Grid genuinely asymmetric, not a disguised uniform grid
- [ ] Keyboard operable with correct ARIA
- [ ] Stacks to single column at 390px
