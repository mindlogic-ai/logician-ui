---
'@mindlogic-ai/logician-ui': minor
---

`CopyableCode` confirms a copy without moving under the cursor.

A button whose label changes is a moving target. "복사" → "복사 완료" widened the
button by 28px, and because it sits against the right edge of the code block it
grew _leftwards_ over the code the instant it was clicked — under the cursor that
had just clicked it.

Both labels now render into the same grid cell, so the box is always as wide as
its widest state and the inactive one stays in the layout holding that width,
transparent and `aria-hidden`. Sizing this way rather than with a hand-tuned
`minW` matters for a translated product: the longest string is rarely the one you
measured, and `Copy completed` is nearly three times `복사`.

The swap runs on two clocks: opacity clears over `fast` so the outgoing label is
not read through the incoming one, while the 8px of travel takes `motion.base` so
it reads as one thing replacing another rather than a flicker. The idle label
leaves upward and the confirmation rises from below, which is what makes it one
movement rather than two.

This was briefly a `Swap` component. It is not exported: one call site is not a
component, and the general form of the same idea now ships as
`SwapTransition`, which swaps _content_ rather than holding a width.
