---
'@mindlogic-ai/logician-ui': minor
---

`Masonry` takes an optional `itemWeights` prop: one number per child (a row
count is enough). When given, each item goes into the column with the smallest
sum and nothing is measured, so a Masonry inside a closed popover lays out the
same as an open one. FactChat's model menu measured 0 for every group while
closed and reshuffled its columns on open (R30 2nd-round QA). Without the
prop, `Masonry` measures the DOM as before.
