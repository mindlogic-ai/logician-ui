---
'@mindlogic-ai/logician-ui': patch
---

Keep `SegmentedControl` legible on `bg.sunken` pages.

The track fill (`bg.subtle` → `gray.50` in light) is identical to `bg.sunken`
(`gray.50`), so on a sunken list/overview page the control lost all contrast
and read as floating text. Dark mode already handled the mirror case (the track
vanishing on a lighter `bg.surface`) with a translucent-white hairline ring.

Add the symmetric neutral `border.subtle` ring in light mode so the control's
bounds are defined on any page background (`bg.surface`, `bg.sunken`,
`bg.canvas`) in both modes. Both rings are box-shadows, not borders, so the
matched item-height math is preserved. Adds an `OnPageBackgrounds` story for
cross-surface validation.
