---
'@mindlogic-ai/logician-ui': patch
---

Align form-control resting borders with the shared neutral border role.

`Input`, `Textarea`, and the `Select`/`Combobox` trigger drew their resting
border from the raw `{ base: 'gray.400', _dark: 'gray.1100' }` pair, while
`Card`, the `Select` dropdown panel, and the neutral `Button` use the
semantic `border.default` role (`gray.300` light). The mismatch meant an
input sitting next to a card rendered a visibly different shade of gray out
of the box.

Route all three controls onto `border.default` so neutral borders share one
source of truth across the form controls and the surfaces around them.
Hover/focus/invalid/disabled states are unchanged. `Checkbox` keeps its
`gray.500`/`gray.800` control border, which is intentionally darker to clear
the 3:1 contrast requirement on the canvas.
