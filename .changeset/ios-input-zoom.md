---
'@mindlogic-ai/logician-ui': patch
---

No more iOS zoom on focus: `Combobox.Input` takes `noZoomOnFocus` (16px on
touch), and `PinInput` boxes default to 16px text. `PinInput` also passes
`inputMode="numeric"` (was the invalid `"number"`), so phones show the keypad.
