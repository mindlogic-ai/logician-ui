---
'@mindlogic-ai/logician-ui': patch
---

SegmentedControl `xs` / `2xs`: root padding 2px instead of 4px. The outer height
still equals the control scale's height; the item gains 4px (an `xs` item is
24px instead of 20px inside a 16px `ScaledContext`), so the label no longer
outgrows its item and stops reading squeezed against the indicator.
