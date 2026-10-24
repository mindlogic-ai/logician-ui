---
'@mindlogic-ai/logician-ui': patch
---

`Avatar.Group` `max`: the "+N" counter renders as `<span>` elements instead of
`<div>`s, so a group passed `as="span"` inside a button (a popover trigger)
holds phrasing content only. Looks the same; the recipe sets the display.
