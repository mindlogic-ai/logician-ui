---
'@mindlogic-ai/logician-ui': patch
---

`Switch`: a disabled switch keeps a visible track. Off keeps the
`border.control` outline, and on fills the track with `disabled.fg`. Before,
both states filled the track with `disabled.bg` and dropped the outline, so on
a `disabled.bg` surface (a disabled card or row) only the thumb showed.
