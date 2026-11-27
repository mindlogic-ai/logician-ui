---
'@mindlogic-ai/logician-ui': minor
---

Button and IconButton have a built-in open state. A menu or popover trigger with
`aria-expanded="true"` shows its variant's pressed (`_active`) colours — fill,
plus border where the variant sets one, and IconButton ghost/secondary's darker
glyph — without the press `scale` and without an added border; hovering it
while open changes nothing. Derived from each variant's states by
`withOpenState`, so every variant (and any new one) gets it. Disabled still
wins, `isDestructive` keeps its label colour, and a Tooltip's `data-expanded`
does not count (which is why this is not Chakra's `_expanded`). A call site's
own `&[aria-expanded=true]` css still overrides the resting open colours. A
`lift` button lifts only while closed, and keeps a call site's own `translate`
/ `filter` when it opens. IconButton now merges a call-site `css` (object or
array) with its own instead of replacing it; Button accepts an array `css` too.
FieldTrigger is unchanged. Products can drop
their own open styling for these triggers.
