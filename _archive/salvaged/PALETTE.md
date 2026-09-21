# PALETTE.md — v7 ground system

Supersedes the `--cream / --deep / --fluoro` set for all new work. The six
unmigrated sections still reference the old literals; both layers coexist in
`assets/site.css` until migration finishes.

## The fault this fixes

The old set had three tones but **two** usable pairings.

```
cream on deep     10.53   usable
deep  on cream     9.45   usable
cream on fluoro    3.01   fails
fluoro on cream    3.01   fails
deep  on fluoro    3.50   fails
fluoro on deep     3.50   fails
```

Fluoro could not carry type in any direction, so it became flat planes of
low-contrast colour. That is the mush. With only two grounds, every scroll
transition was also the same transition.

## The unlock

Near-black **ink `#0E1223`**. Ink on fluoro measures **4.79** — it passes.
Fluoro stops being decoration and becomes a ground that holds copy.

## Palette

| Token | Value | Role |
|---|---|---|
| `--p-paper` | `#F7F1E3` | default ground |
| `--p-cream` | `#E8D6A4` | card and inset ground |
| `--p-fluoro` | `#F13C20` | the one shock plane, ink type only |
| `--p-deep` | `#1F2A5C` | the long dark stretch |
| `--p-ink` | `#0E1223` | deepest ground, and fluoro's only type colour |
| `--p-fluoro-deep` | `#C0301A` | small accent type on paper (5.07) |
| `--p-fluoro-lift` | `#FF6A4D` | small accent type on dark (6.57 ink, 4.81 deep) |
| `--p-paper-dim` | `#E6E0D2` | dark-mode type (14.13 on ink; pure paper at 16.51 is harsh at night) |

Palette values are never referenced directly in a rule. Rules use the
semantic layer.

## Semantic layer

`--g` ground · `--g-inset` card ground · `--t-inset` type on that card ·
`--t` primary type · `--t-mute` metadata · `--t-accent` small accent type ·
`--mark` rules and display marks · `--rule` hairlines.

Put one ground class on a section and the type follows:
`.on-paper` `.on-cream` `.on-deep` `.on-ink` `.on-fluoro`.

**An inset that changes ground must change its type with it.** Use
`--t-inset`. Skipping it renders ink on ink — caught exactly that way on the
fluoro section during the first pass.

## Light ladder

```
paper -> deep -> fluoro -> paper -> ink -> paper -> cream
12.08    3.50     3.45      16.51   16.51   1.28
```

The last step is a settle, not a step. **Paper and cream are never adjacent
sections** — at 1.28 the boundary reads as a rendering error, not a decision.

## Dark mode — a re-anchor, not an inversion

Dark grounds compress. Ink to deep is only **1.37**, so a five-step dark
ladder is not physically available. Dark mode therefore runs **two grounds**
and lets fluoro carry the rhythm:

- `.on-paper`, `.on-ink` → ink ground, `#E6E0D2` type, `#9AA2C0` mute
- `.on-cream`, `.on-deep` → deep ground, `#E6E0D2` type, `#A9B0CC` mute
- `.on-fluoro` → **unchanged.** The one violent moment survives the switch.

Driven by `prefers-color-scheme`. A `[data-theme]` override is wired on
`:root` so a manual toggle can be added later without a rewrite; no toggle
ships today, because a theme switch is UI chrome on a page that has none.

## Rules

1. Fluoro never carries type below 24px on any ground. `#C0301A` on light,
   `#FF6A4D` on dark are its small-type stand-ins.
2. Metadata is `--t-mute`, never primary type at reduced opacity. Opacity on
   a parent cannot be undone by a child.
3. Re-measure before changing any value:
   `python3 taste-skill/scripts/contrast.py --named paper=#F7F1E3 ink=#0E1223 fluoro=#F13C20`

## Migration state

| Section | Ground | Migrated |
|---|---|---|
| Proof | `.on-fluoro` | yes — built native |
| Hero, Ticker | paper | no |
| Work | deep | no |
| Ideas | paper | no |
| Brain dump | ink | no |
| About | paper | no |
| Contact | cream | no |

One section per pass, each verified in both schemes by eye.
