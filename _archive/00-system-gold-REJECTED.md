# ARCHIVED — REJECTED AESTHETIC (gold / Playfair / film grain)

**Status: DEAD. Do not build from this file. Do not treat it as a fallback.**
Archived 19 Aug 2026. Superseded by `briefs/00-system.md`, which now matches `src/styles/tokens.css`.

## Why it was archived

1. **It contradicted `tokens.css` inside this repo.** `briefs/00-system.md` specified gold `#C9A96E`, Playfair-italic-only and film grain. `src/styles/tokens.css` specified the cut-out system — void, paper, hot pink, cold blue, acid, five typefaces. Both were live, in the same repo, on the same day. `CLAUDE.md` instructs every session to read `briefs/00-system.md` **first**, so the dead system was the one a builder met first.

2. **This is the exact failure `POSTMORTEM.md` names.** *"Three visual systems were specified across three documents, and no one noticed."* It had not stopped happening — it had moved into the repo.

3. **Shrey's reference set contradicts it.** The July screenshots in `Contacts\Visual Cues\`: a butter-yellow ground with a halftone portrait and an oversized name overlapping it in two colour states; a black diagonal band with mixed display faces and an orange starburst badge; a flat-orange collage of cut-out type, barcodes, leader lines and boxed ID-card labels. None is dark-and-gold-and-serif.

4. **It is the safe version of the brief.** Near-black, parchment, gold accent, Playfair italic, film grain is the default dark-editorial portfolio. Competent, and it belongs to anyone — which the standing rule forbids.

## What it said (reference only)

Tokens: ground `#0D0C0A` · text `#F0EDE6` · accent gold-wheat `#C9A96E` (max 3 uses site-wide) · muted `#8C8778`.
Type: Playfair Display *italic only* display, Inter *weight 300 only* body. No other families or weights.
Scale: Display `clamp(52px,10vw,128px)`/1.02 · Section `clamp(32px,5vw,56px)`/1.1 · Body 17px/1.55 · Label 13px/0.14em/uppercase.
Spacing: 8px base — 4·8·16·24·40·64·96·160. 160px between sections.
Texture: film grain — SVG feTurbulence, baseFrequency 0.85, numOctaves 2, opacity 0.05, mixBlendMode overlay.
Motion: one thing at a time, 80ms stagger, `cubic-bezier(0.22,1,0.36,1)`, 0.4–0.8s.

## What survived into v5

The motion doctrine (one thing at a time, 80ms stagger, identical easing, identical banned list), the accessibility floor, the editorial/asymmetric layout logic, and the principle of a scarce accent — v5 spends `--acid` the way this spent gold. **Only the surface was rejected. The discipline was kept.**
