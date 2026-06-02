---
'@mindlogic-ai/logician-ui': patch
---

fix(RadialProgress): hide segments with zero value

Previously, zero-value segments were still rendered at the minimum arc size (and still consumed gap budget), producing visible slivers for categories that should not appear at all. Zero-value segments are now filtered out before layout, so only segments with `value > 0` contribute to the visible count, the gap calculation, and the arc layout.
