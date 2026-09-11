---
'@mindlogic-ai/logician-ui': patch
---

Apply `noZoomOnFocus` to `MonthPicker`'s own input.

`MonthPicker` renders Chakra's `Input` rather than this library's, so it did not
pick up the touch-device size rule that `Input` and `Textarea` got in the
previous release. `readOnly` does not take it out of scope — the field is still
focusable — and a consumer cannot fix it from outside: `MonthPickerProps`
exposes no `inputProps`, and the element receives no `...rest`.

Found while a consuming app removed its own global CSS rule in favour of this
export, and swept for the surfaces the export does not reach. `MonthPicker` was
one of two; the other, `RangeDatePicker`, renders no text input at all.
