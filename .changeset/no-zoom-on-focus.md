---
'@mindlogic-ai/logician-ui': minor
---

Add `noZoomOnFocus` and apply it to `Input` and `Textarea`.

iOS Safari zooms the viewport when a focused editable host computes to a
font-size under 16px. The only ways to suppress that are `maximum-scale=1` and
`user-scalable=no`, which also remove pinch-zoom and fail KWCAG 2.2 8.2.1, so
the control has to meet the threshold instead.

Being under it was the default rather than the exception: `html` is 14px and
Chakra's input recipe maps `size="sm"`/`"md"` onto the `sm`/`md` textStyles,
which this theme defines as `{ base: '0.875em', md: '1em' }` — the `base` arm is
the phone, so a control rendered _smaller_ there than on desktop (12.25px
against the 14px root).

`Input` and `Textarea` now merge `noZoomOnFocus` first, so it is a default a
call site can still override; `PasswordInput` composes `Input` and inherits it.
Scoped with `@media (pointer: coarse)` rather than a width breakpoint — a width
rule misses touch devices above the breakpoint (iPad portrait is exactly 768px)
and catches devices that never zoom (a desktop user at 200% browser zoom has a
~640px viewport, where enlarging form controls pushes wide tables off-screen).

`Select` and `PinInput` deliberately do not take it: `Select` is a listbox whose
visible trigger is a `<button>`, and `PinInput` wraps `react-pin-input`, which
takes an inline `style` object that cannot carry a media query.

Exported so consumers can apply the same rule to editable surfaces the design
system does not own — a Lexical `contenteditable`, a bare Chakra `Input`, or OTP
boxes built on `ChakraPinInput`.

**Consumer-visible change**: on coarse-pointer devices, `Input` and `Textarea`
text renders at 16px instead of the 12.25px the `base` textStyle arm produced.
Desktop rendering is unchanged.
