---
'@mindlogic-ai/logician-ui': patch
---

`Avatar.Group` `max`: the "+N" counter renders as `<span>` elements instead of
`<div>`s, so a group passed `as="span"` inside a button (a popover trigger) no
longer gains block content once it overflows. Children you pass in are yours to
render as spans. Looks the same; the recipe sets the display.
