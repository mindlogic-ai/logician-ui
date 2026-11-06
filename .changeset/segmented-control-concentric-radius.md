---
'@mindlogic-ai/logician-ui': patch
---

`SegmentedControl`: the selected indicator's corner radius is now the root's
radius minus the root padding (floored at 0), so the inner and outer curves are
concentric and the gap between them stays even. `borderRadius="full"` is
unchanged.
