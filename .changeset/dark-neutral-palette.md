---
'@mindlogic-ai/logician-ui': patch
---

Dark mode is a neutral charcoal instead of sepia. `inkDark` surfaces, dividers
and borders (steps 1–7) carry next to no chroma, the dark canvas is `#171717`
(was `#1F1E1D`), body text is a dedicated off-white `inkDark.fg` `#E0DCD6`
(13:1, was cream `#F5EDE0`), the dark primary/tooltip fill is a warm grey
`#D6D3CD` (was beige `#E3D7C4`), and `sandDark` keeps well under half its old
chroma so `secondary.*` reads as a faint warm tint, not brown. Light mode and
light high contrast are unchanged.
