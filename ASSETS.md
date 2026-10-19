# Asset register

20 Oct 2026. Every file you have supplied, where it is in service, and why
anything not in service is not.

**The rule this document exists to enforce:** an asset sitting in the repo
unreferenced is unshipped inventory. Either it is doing a job on a page, or it
is an archived master, or it is a decision waiting on you. There is no fourth
category, and "it might be useful later" is how 40 files and 96MB accumulated
before this audit.

---

## IN SERVICE

| Asset | Where | Doing what |
|---|---|---|
| Delhi 2003 photograph | Hero card | The identity. Halftone print, stamped, with the colour original behind a pointer-driven mask. |
| 5 cut-out name tiles | Hero card head | "Hi my name is Shrey" as found type. |
| **Scrapbook alphabet sheet** | **Zine, page 08** | **New.** The source of those tiles: 26 letters, three cuts each. The one artefact showing a system behind a device. |
| 6 hero marks | Hero field **and** the process band | Navigation in the hero; the infographic icons on home and `/about/`. Each matched to meaning, not assigned to a slot. |
| **8 client marks** | **`/about/`, Worked with** | **New.** Static row beside the Who I am monologue, each in its own colour, sized by height. |
| 4 cut-out star heads | `/about/` belief strip | The five things you believe, running between four frames of you. |
| Star-with-you-in-it | `/about/` header | The best photograph on the site. |
| 3 motivation artefacts | `/about/`, Who I do it for | Two polaroid stacks and the camera, centred. |
| 1 laughing head | Home, bottom | The easter egg. Only appears after a real scroll. |
| 7 work covers | `/work`, home sequence, case headers | 1600×1000 WebP from your masters. |
| Zine cover | Ideas | Your artwork, unscreened. |
| ABBA sleeve + mp3 | Record player | Plays the file, not a 30-second preview. |
| SM monogram | Island, all 10 routes | Background rect stripped. |
| Asimov Print | Display face everywhere | Apache 2.0. |

## ARCHIVED — consumed masters, kept on disk, never served

Moved to `_archive/source-assets/` and gitignored this pass. Each one has
already been converted into what the site serves, so shipping it again would
be shipping the same thing twice at ten times the weight.

- `How the work happens.pdf` — your orange process deck. **This is where the
  orange came from.** Its five steps are the cards and the band on `/about/`.
- `What motivates Me.pdf` — the three artefacts in Who I do it for.
- `Scrapbook Typo.jpg` — now served as `alphabet.webp`, 117KB → 85KB. It was
  renamed because **the space in the filename made it 404 on a strict server**,
  which is the same trap the résumé link hit in October.
- Work poster masters (PDF, SVG, ZIP, PNG) — the 1600×1000 WebP come from
  these. Two of the SVGs are 30MB and 26MB base64 rasters in vector wrappers.
- Bobblehead zip — the four star heads and the star-with-you-in-it came from
  its `3.pdf`.

## RETIRED — superseded, archived rather than deleted

- `me-head.webp`, `me-star-head.webp` — replaced by the star with you in it.
- `hero-photo-duo.webp` — the red/blue duotone of the Delhi frame, replaced by
  the halftone and the colour brush.
- `3af153e148.webp` — orphaned derivative.

## TRIED AND REVERTED

**The client marks as citations on the figures.** Built it, looked at it, took
it out. Each verified figure would have carried its employer's mark as a
source. Two reasons it was wrong: the figure already names its source in
words, so the mark said Tickertape a second time; and four of the eight are
plate lockups rather than wordmarks (iSelect is white knocked out of red),
which tint to grey boxes and are mud at citation size either way. The
reasoning is recorded in `site.css` so it is not tried again.

## WAITING ON YOU

| What | Why it is stuck |
|---|---|
| Colour Delhi frame, uncropped | The brush reveals a saturated version of the halftone rather than true colour. |
| Ideas1, the clipboard | The zine floats on bare paper; it was composed to sit on something. |
| Duolingo and L'Oréal covers | Two of seven `/work` rows are dead ends. If they are not being written, cut them. |
| Résumé as PDF | The link serves a `.docx`. |
| Six quote attributions | Six unattributed quotes are decoration; six named ones are references. |
| Two LinkedIn recommendations | The deck holds three real cards and grows to five. |
| Junk-journal props | Tape, scraps, stubs, marginalia. The one asset class the references have that this does not. |

## STILL UNREFERENCED, AND CORRECTLY SO

22 files. All of them are either the archived masters above or the 7 icon SVGs
in `assets/icons/`, which are real but **inlined as paths in the HTML** rather
than fetched as files. Inlining is the right call (no extra request per icon);
the files are the source. They are 1.7KB in total and not worth moving.

One judgement call left to you: `assets/img/work/vastr2.webp` and
`vrl2.webp` are alternate covers. They may be the versions you prefer. They are
yours to pick or delete, not mine.
