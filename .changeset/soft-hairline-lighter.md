---
'@mindlogic-ai/logician-ui': patch
---

Soften the `soft` variant hairline from `.light` to `.lighter` on `Button` and `Tag`.

Both components drew their `soft` same-hue hairline one step too assertive. The
five tinted palettes (`primary`/`secondary`/`danger`/`success`/`warning`) now
use their `.lighter` token instead of `.light` for that border — on `Button`
(resting and hover) and on `Tag` — dropping the edge to the palest visible step
above the `.extralight` fill. This matches the treatment `Toast` and `Banner`
already use for the same fill-plus-hairline pairing, so all four now read
consistently: a quiet tinted fill with a whisper of a frame, still a clear step
below `outline`'s `.main` border. On `Button`, `.lighter` is also the
hover/active fill, so the border melts into the fill on interaction.

In light mode this is the intended softening (blue's hairline goes `#7DA0E8` →
`#B9CBF3` on the `#E8EEFB` fill). In dark mode `.lighter` sits one step off the
fill, so the hairline becomes very faint — an accepted trade for a consistent,
quieter resting treatment across both modes.

`neutral` is unchanged on both: it has no `.lighter` step and keeps
`border.default`, whose only paler neighbor (`border.subtle`) equals the fill in
dark mode and would erase the edge entirely. Other variants are unchanged.
