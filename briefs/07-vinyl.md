# 07 — VINYL PLAYER + PLAYLIST `[OPEN]`

## THE DECISION TO RESOLVE FIRST

The site currently proposes: cursor glow, film grain, ticker, Rubik's cube, bento FAQ, brain dump, vinyl player, playlist. That is too many competing signature moments. The principle behind every reference Shrey admires — A24, Anthropic, Apple — is that **boldness is spent in one place** while everything around it stays disciplined.

| Element | Type | Verdict |
|---|---|---|
| Film grain | Ambient texture | Keep — never competes |
| Cursor glow | Ambient atmosphere | Keep — never competes |
| Ticker | Structural device | Keep — carries content |
| Bento FAQ | Content structure | Keep — does real work |
| Brain dump | Content structure | Keep — does real work |
| **Vinyl + playlist** | **Signature candidate** | **`[OPEN]`** |
| **Rubik's cube** | **Signature candidate** | **`[OPEN]`** |

**Recommendation: vinyl wins.** It makes cultural fluency *concrete* rather than claimed — which is precisely the positioning. A playlist proves taste in three seconds; a cube of personal photos does not.

**If vinyl takes the slot, the Rubik's cube is cut** or demoted to a small static element inside About.

---

## IF APPROVED — HARD CONSTRAINTS

**Never autoplay.** Recruiters browse at work, on shared screens, in open offices. Unprompted audio is the fastest possible tab-close. Muted, obviously clickable, user-initiated only.

**Embed Spotify. Do not host audio files.** Hosting an MP3 is a licensing problem attached to a public site in his own name. The vinyl is a *custom shell* around a licensed embed.

**Design for the muted case first.** The playlist display is worth more than the player — it's scannable in silence. Someone on mute still reads the taste. Audio is the bonus, not the point.

**Lazy-load.** Must never block first paint.

## FORM
Persistent bottom-right. Rotating record art, tonearm, gold accent. Collapsed by default; expands to reveal playlist.

Rotation pauses under reduced-motion.

## CONTENT `[GAP]`
- `[GAP: Spotify playlist URL]`

## REFERENCE SLOTS

### `ref_player_form.png`
- **Take only:** 
- **Ignore:** 
- **Why:** 

## DONE WHEN
- [ ] Silent on load, always
- [ ] Playlist readable without audio
- [ ] Does not block first paint
- [ ] Does not obscure content at 390px
