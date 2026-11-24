---
'@mindlogic-ai/logician-ui': patch
---

`Switch`: a disabled switch keeps a visible track. Off draws a `disabled.fg`
outline with a `disabled.fgGhost` thumb, and on fills the track with
`disabled.fg`. Before, both states filled the track with `disabled.bg` and
dropped the outline, so on a `disabled.bg` surface (a disabled card or row)
only the thumb showed. The lighter off outline and thumb keep a disabled off
switch from reading as an enabled one.
