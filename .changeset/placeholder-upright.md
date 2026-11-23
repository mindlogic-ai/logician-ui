---
'@mindlogic-ai/logician-ui': patch
---

Placeholders are upright again: reverts the italic `::placeholder` and Select
empty value text from alpha.33. The synthesised slant clipped the last glyph
in truncated fields and did not suit Hangul or search inputs.
