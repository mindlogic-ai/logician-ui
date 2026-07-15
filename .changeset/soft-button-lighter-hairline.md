---
'@mindlogic-ai/logician-ui': patch
---

Soften the `soft` button hairline from `.light` to `.lighter`.

The `soft` variant's same-hue hairline was one step too assertive. The five
tinted palettes (`primary`/`secondary`/`danger`/`success`/`warning`) now draw
both the resting and hover border with their `.lighter` token instead of
`.light`, dropping the edge to the palest visible step above the `.extralight`
fill. Soft reads as a quiet tinted fill with a whisper of a frame — still a
clear step below `outline`'s `.main` border, so it remains the calmer of the two
bordered variants. Because `.lighter` is also the hover/active fill, the border
now melts into the fill on interaction instead of persisting as a darker ring.

In light mode this is the intended softening (blue's hairline goes `#7DA0E8` →
`#B9CBF3` on the `#E8EEFB` fill). In dark mode `.lighter` sits one step off the
fill, so the hairline becomes very faint — an accepted trade for a consistent,
quieter resting treatment across both modes.

`neutral` is unchanged: it has no `.lighter` step, and keeps `border.default`
because its only paler neighbor (`border.subtle`) resolves to the *same* value
as the fill in dark mode and would erase the edge entirely. `solid`, `outline`,
and `ghost` are unchanged.
