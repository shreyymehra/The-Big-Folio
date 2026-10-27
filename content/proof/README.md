# The proof layer: content model

One JSON file per artefact, in this folder. Nothing here renders until
`"published": true`, and the validator refuses to pass a file that still
contains a `{{PLACEHOLDER}}`.

This folder is **data, not copy**. Nothing in it was written by Claude: every
field marked `{{...}}` is waiting on Shrey, and the validator is what stops a
half-filled item reaching a page.

```bash
node tools/validate-proof.js          # check every item
node tools/validate-proof.js --strict # exit 1 on any warning (for CI later)
```

## Fields

| Field | Required | Rule |
|---|---|---|
| `id` | yes | unique, kebab-case, used as the deep link `#<id>` |
| `project` | yes | matches a case-page slug so the artefact strip can find it |
| `title` | yes | shown on the card |
| `type` | yes | `ad` `email` `landing` `deck` `doc` `chart` `storyboard` `video` `quote` `canvas` `messaging-house` `timeline` `before-after` |
| `status` | yes | `shipped` `recreated` `spec` `in-build` |
| `skills` | yes | one or more of `positioning-messaging` `launch-gtm` `lifecycle` `creative-ads` `research` `comms-enablement` `analytics` |
| `org`, `period`, `role` | if `shipped` or `recreated` | a real result needs its source |
| `alt` | yes for image types | 125 characters or fewer; `""` only when decorative |
| `caption` | no | 140 characters or fewer |
| `result.baseline`, `result.measuredBy` | if `result` present | a number without these is a claim, not evidence |
| `permission` | yes for `quote` | must be `true` or the item never renders |
| `brand` | for `spec` | triggers the "Independent spec work" line automatically |
| `published` | yes | `false` until Shrey has checked every field |

## Images

- Path: `assets/img/proof/<project>/<nn>-<slug>.webp`
- Full: 1600px on the long edge. Thumb: `-640.webp`, 640px.
- `width` and `height` are **required** and must be the real pixel size, or
  the card shifts the layout as it loads.
- Redact names, emails, internal URLs and non-public figures **before** the
  file is converted, not with a CSS overlay.

## Status vocabulary

- **shipped** — real project, real result, work is his.
- **recreated** — real project, original artefact is confidential, rebuilt
  faithfully and labelled as a rebuild.
- **spec** — self-set brief, no client. Carries the disclaimer.
- **in-build** — real product, not live.

## What is NOT here

No sample, demo or illustrative item. The only fixture lives in
`_fixtures/`, which the validator ignores and nothing reads at runtime: it
exists so the components can be developed before real assets land.
