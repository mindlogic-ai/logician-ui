---
'@mindlogic-ai/logician-ui': patch
---

fix(dark-mode): brighten `fg.muted` in dark from `gray.400` to `gray.300`

Secondary text (`fg.muted`) read as too dim on the dark canvas, sitting too far
below `fg.default` (`gray.200`). Lifting its `_dark` step to `gray.300` restores
the one-step hierarchy gap that light mode has (default → muted) while keeping
well clear of AA (~12.8:1 on `bg.canvas`, ~11.7:1 on `bg.surface`). Light value
(`gray.900`) is unchanged, so light mode is unaffected.
