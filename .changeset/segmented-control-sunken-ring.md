---
'@mindlogic-ai/logician-ui': patch
---

Keep low-contrast component fills legible on `bg.sunken` pages.

In light mode the page wash `bg.sunken` resolves to `gray.50` — identical to
`bg.subtle` and only ~1.03:1 against `bg.muted` (`gray.100`). Components that
paint a resting surface with those tokens lost their bounds on a sunken
list/overview page and read as floating content.

Each affected control now carries a mode-aware hairline `border.subtle` ring
(an outset box-shadow, so internal sizing math is preserved), restoring its
bounds on any page background (`bg.surface` / `bg.sunken` / `bg.canvas`) in both
modes:

- `SegmentedControl` — light-mode ring mirroring the existing dark-mode ring.
- `InlineCode` — ring around the `bg.subtle` chip.
- `Switch` — ring on the `bg.muted` off-state track (drops when checked, since
  the `primary.main` fill is self-defining).
- `Slider` — ring on the `bg.muted` empty rail.
- `SegmentedProgressBar` — ring on the `bg.muted` empty track.
- `Spinner` — track color moved from `bg.muted` to `border.subtle` (no box to
  ring on an SVG-style track).

Adds a `Theme/Surfaces` Storybook story and a `SegmentedControl/OnPageBackgrounds`
story that render these components on all three page backgrounds for ongoing
cross-surface contrast validation.
