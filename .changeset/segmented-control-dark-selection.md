---
'@mindlogic-ai/logician-ui': patch
---

fix(dark-mode): make the selected SegmentedControl segment distinct

In dark mode the selected indicator used `bg.surface` (`gray.1400`), which is
*darker* than the `gray.1300` track, so the active segment read as recessed and
was barely distinguishable from its neighbours — and the `md` drop shadow that
carries the raised affordance in light mode is effectively invisible on a dark
canvas. Mirror the convention used by iOS/macOS, Linear and Vercel for dark
segmented controls:

- **Track** deepens to a recessed trough (`gray.1400`), and carries a
  translucent-white hairline ring (`rgba(255,255,255,0.12)`) so its bounds stay
  visible on *any* dark background — without it the track vanishes on a
  same-or-lighter dark surface (e.g. a `bg.surface` card) and the control looks
  like floating text. The ring is a `box-shadow`, not a real border, so the
  matched item-height math is preserved.
- **Selected indicator** lifts to a clearly lighter `gray.1100` with a hairline
  border + soft ambient shadow, so the selection reads as a raised thumb.

Light mode is unchanged (the new treatment is scoped to `.dark`).
