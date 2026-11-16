---
'@mindlogic-ai/logician-ui': minor
---

FieldTrigger: a button that looks exactly like a closed `Select` (same size scale, `border.control` border, hover, focus/open ring, invalid, disabled, `outline`/`ghost`), for opening your own picker from `Popover.Trigger asChild` — a tree, a searchable multi-select. Consumers had been building these from `Button variant="secondary"`, which draws `border.default`, so filter bars mixed two border weights.

`fieldBorder` (also on `@mindlogic-ai/logician-ui/styles`): the one source for the field border colours. `Input`, `Textarea`, `PinInput`, `Select` and `Combobox` now read from it instead of repeating the literals. No visual change for those components.
