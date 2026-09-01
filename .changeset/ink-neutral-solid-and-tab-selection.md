---
'@mindlogic-ai/logician-ui': minor
---

Neutral `solid` buttons and selected tabs move to ink, fixing a contrast bug.

**`colorPalette="neutral" variant="solid"` failed AA in both modes.** A white
label on `gray.700` measures **4.12:1** in light, and because the semantic gray
scale inverts, the same token resolves to `grayDark.fg700` in dark and the label
lands at **3.15:1**. It was the only palette × variant combination in the system
below the 4.5:1 text gate, and the worse arm was the one nobody screenshots.

Darkening one step does not fix it — `gray.800` is 5.32:1 in light but **3.08:1**
in dark, because darkening the light arm lightens the dark one. A neutral fill
has to _invert_, not shift, so it now uses the existing `bg.inverse` /
`fg.inverse` pair: ink under a near-white label on a light page, brand paper
under an ink label on a dark one (**15.11:1** / **15.88:1**, with the fill itself
15.49:1 / 16.36:1 clear of its canvas). Hover and active move to `gray.1200` /
`gray.1100`, which step away from the resting fill in whichever mode is live.

Side effect worth knowing: this makes neutral `solid` the system's **ink
action** — the one high-emphasis fill with no hue — without opening a new
variant.

**Selected tabs now use `fg.emphasized` instead of `primary.main`.** A selected
tab is a place, not a value: it answers "where am I", so it is carried by ink and
weight rather than the brand hue, leaving colour to mean what a control _does_.
This also retires the defect the old ramp was written around — `primary.main` was
4.59:1 on the dark page but **4.19:1** on a raised surface, so a tab list passed
every full-page scan and failed the first time it rendered inside a modal. The
indicator moves with the label, and the vertical rail's selected fill moves from
`primary.extralight` to `bg.muted`.

Form controls are untouched: `Checkbox`, `Switch`, `Banner` and the rest keep the
brand hue, because a checkbox is a value rather than a place. `primary.main`
itself is not re-pegged.

Consumers using neutral `solid` buttons or `Tabs` will see these changes
automatically.
