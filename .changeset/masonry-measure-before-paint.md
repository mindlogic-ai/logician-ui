---
'@mindlogic-ai/logician-ui': patch
---

`Masonry` no longer defers measuring. It measured in a `setTimeout` on mount
and in a `requestAnimationFrame` on resize, so the unmeasured layout was
painted once before the items moved to their columns. It now measures in the
layout effect and inside the `ResizeObserver` callback, and re-renders in the
same frame. FactChat's model menu renders hidden (`display: none`, every
height 0), and its groups jumped columns each time the popover opened (R30
2nd-round QA).

It also stops measuring items that are hidden (no `offsetParent`) and keeps
their last measured height. Storing 0 for them re-laid out the whole Masonry
every time its container was hidden and again when it was shown, which delayed
the model menu's paint by about 170ms on every open.

An item whose height depends on the column it lands in no longer makes
`Masonry` throw "Maximum update depth exceeded". Storing a height used to
re-run the measuring layout effect, which never settled for such an item.
