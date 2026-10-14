---
'@mindlogic-ai/logician-ui': minor
---

Give the `soft` button variant a visible hairline border.

Previously `soft` set `borderColor: 'transparent'`, so a soft button read as an
untethered tinted fill with no edge against a white surface — the `1px` border
box was already reserved on every variant, only its color was hidden. Each
color palette now colors that border: the tinted palettes
(`primary`/`secondary`/`danger`/`success`/`warning`) use their own `.light`
token for a same-hue hairline that stays a clear step below `outline`'s `.main`
border, and `neutral` uses `border.default` so the edge survives dark mode
(where `border.subtle` would collapse into the fill). No layout shift — the
border width was already there. `solid`, `outline`, and `ghost` are unchanged.
