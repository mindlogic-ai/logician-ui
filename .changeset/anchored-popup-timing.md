---
'@mindlogic-ai/logician-ui': patch
---

Anchored popups (Menu, Select, Combobox, Popover, Tooltip) open faster: a new
`presence-anchored` preset retimes them to 200ms in / 100ms out (was 300 / 150).
Modal, BottomSheet and Collapsible keep `presence` at 300 / 150.
