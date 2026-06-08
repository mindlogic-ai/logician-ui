---
'@mindlogic-ai/logician-ui': patch
---

fix(dark-mode): make Card edge visible + soften danger solid saturation

- **Card border** `border.subtle` → `border.default`. `border.subtle`'s `_dark`
  step (`gray.1300` `#1E2433`) is nearly invisible on `bg.surface` in dark, so
  cards blended into the canvas (the card has no shadow — the border is its only
  boundary). `border.default` gives the card a discernible edge in both modes
  (light `gray.200` → `gray.300`; dark `gray.1300` → `gray.1100`). The `gradient`
  Card variant keeps its `primary.light` border.
- **Danger solid saturation** lowered one notch: `rose.500` `#D01721` → `#C1232C`
  and `rose.600` `#A6121A` → `#9C1C23` (the solid destructive button's rest/hover
  fills, and `danger.main`). Luminance-preserving desaturation, so contrast with
  white labels is essentially unchanged (~5.5:1, AA). The deprecated `red.*`
  alias is kept in sync. Text/active steps (`rose.700+`) and light tints are
  untouched.
