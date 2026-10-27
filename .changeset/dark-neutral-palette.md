---
'@mindlogic-ai/logician-ui': patch
---

Dark mode is a neutral charcoal instead of sepia. `inkDark` surfaces, dividers
and borders (steps 1–7) carry next to no chroma, the dark canvas is `#171717`
(was `#1F1E1D`), body text is a dedicated off-white `inkDark.fg` `#E8E6E3`
(14:1, was cream `#F5EDE0`; high-contrast dark `#F2F0ED`), the dark primary/tooltip fill is a warm grey
`#D6D3CD` (was beige `#E3D7C4`), and `sandDark` keeps well under half its old
chroma so `secondary.*` reads as a faint warm tint, not brown. Dark
`action.fg` uses the same off-white (was pure white), so CodeTabs' muted label
is now `action.fg/80`. In high-contrast dark, `fg.muted` sits midway between
`fg.subtle` and body text instead of matching `fg.subtle`. Light mode and light
high contrast are unchanged.
