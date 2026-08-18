---
'@mindlogic-ai/logician-ui': patch
---

Two lint rules for the two ways `animationStyle` fails silently.

Neither can be caught by types. Chakra declares the prop as
`ConditionalValue<UtilityValues["animationStyle"] | CssVars | AnyString>`, so
`AnyString` accepts every typo and `ConditionalValue` accepts every array —
both compile, and both then do something other than what was written. A typo
does nothing at all; an array is read as *responsive breakpoints*, one motion
below `sm` and another above, which is the mistake that looks correct on the
machine that wrote it.

So `animationStyle` now rejects a name outside the vocabulary, and rejects the
array and breakpoint-object forms, with a message that says what to do instead.
A test lints the six cases through ESLint and asserts which ones report, so the
rules cannot be deleted in an unrelated cleanup without something failing.

The Storybook governance page gains the answer the rules point at: one slot
means one *name*, not one motion. `transition-*` and `animation-*` are disjoint
properties, so a preset and a hand-written transition run side by side — which
is exactly how Chakra's own recipes pair `animationStyle` with a separate
`animationDuration`.
