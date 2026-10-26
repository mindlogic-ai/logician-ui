---
'@mindlogic-ai/logician-ui': minor
---

New token `disabled.fgGhost` (light `#C2C2C2`, dark `#4A4A4A`) for the disabled label/icon of fill-less ghost buttons. `disabledText` now uses it, so a disabled ghost `IconButton` / `Button` (and `SeeMoreButton`, which renders a ghost Button) no longer looks almost the same as the resting one: `disabled.fg` sat ~1.4:1 from the resting `fg.icon`, the new token ~2.7:1. Filled controls (`disabledControl`) keep `disabled.bg` / `disabled.fg`; the ghost `Select` trigger keeps `disabled.fg` for its value text.
