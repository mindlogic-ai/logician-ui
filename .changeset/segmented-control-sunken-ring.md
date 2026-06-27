---
'@mindlogic-ai/logician-ui': patch
---

Keep low-contrast component fills legible on `bg.sunken` pages.

In light mode the page wash `bg.sunken` resolves to `gray.50` — identical to
`bg.subtle` and only ~1.03:1 against `bg.muted` (`gray.100`). Components that
paint a resting surface with those tokens lost their bounds on a sunken
list/overview page and read as floating content.

The fix follows the element's own contrast story:

- **Structured controls get an outline.** They already carry their own affordance
  (a raised, shadowed thumb and bold selected text), so they only need their
  outer bounds drawn — and darkening their track would break the light-track /
  raised-thumb relationship.
  - `SegmentedControl` — `border.strong` ring in light (mirrors the existing
    dark-mode ring).
  - `InlineCode` — `border.default` ring (a chip is too small for a fill to
    register; kept lighter than `border.strong` so it isn't a heavy box inline).
- **Meter surfaces get a darker fill.** Their unfilled track *is* the information
  and a thin rail can't be read from an edge alone, so the fill must contrast.
  Introduces a new semantic token **`bg.track`** (`gray.300` light /
  `desaturatedGray[1200]` dark) for recessed control tracks that must read on any
  page wash.
  - `Switch` off-state track, `Slider` empty rail, `SegmentedProgressBar`
    remainder — `bg.muted` → `bg.track`.
  - `Spinner` — track color `bg.muted` → `bg.track` (no box to outline).

Adds a `Theme/Surfaces` Storybook story and a `SegmentedControl/OnPageBackgrounds`
story that render these components on all three page backgrounds for ongoing
cross-surface contrast validation.
