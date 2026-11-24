---
'@mindlogic-ai/logician-ui': patch
---

Placeholders are lighter so an empty field no longer reads like a typed value
(R30 2nd-round QA #8). Native `::placeholder`, `[data-placeholder]` and
Select's empty value text now use `fg.placeholder` instead of Chakra's
`fg.muted/80` (~6:1). The token clears 4.5:1 on both field fills (`bg.surface`
and the `subtle` variant's `bg.muted`), 7:1 in high contrast: BAZE light
`#726D68` (5.1:1 on white), dark `#989592`.
