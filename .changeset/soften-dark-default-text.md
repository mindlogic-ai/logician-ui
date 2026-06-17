---
'@mindlogic-ai/logician-ui': patch
---

fix(dark-mode): soften default text color (gray.50 → gray.200)

Primary text on the dark canvas resolved to `gray.50` (~18.3:1) — brighter than
the light-mode baseline (~15.3:1) and close to pure white, which reads as harsh
and causes glare/halation on longer text. `fg.default`'s `_dark` value now
resolves to `gray.200` (~15.4:1 on the canvas), matching the light-mode contrast
while staying AAA. The `.dark` body-text fallback in `globalCss` is aligned to
match. Light mode is unchanged, and `fg.muted`/`fg.subtle` are untouched so the
text hierarchy is preserved.
