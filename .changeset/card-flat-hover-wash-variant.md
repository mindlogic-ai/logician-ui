---
'@mindlogic-ai/logician-ui': minor
---

Flatten `Card`'s clickable hover and replace the `gradient` variant with `wash`.

`clickable` used to answer hover with `boxShadow: 'lg'`, a lift that said the
card floats. The hover is now flat: the ground steps to `bg.subtle` and the
border darkens to `border.strong`. Both tokens invert, so the state reads in
dark mode, and nothing casts a shadow. A consumer that passes its own `_hover`
still merges over this baseline.

`variant="gradient"` painted a 180deg `bg.subtle` → `bg.surface` wash with a
`primary.light` border. It is now `variant="wash"`: a flat fill one tier off
the page (`bg.subtle` in light, `bg.muted` in dark, where `bg.subtle` is too
close to the card surface to read) with a `border.default` hairline, for a
block that summarises or concludes.
`gradient` remains as a deprecated alias that renders the same, so existing
call sites keep compiling and simply go flat; migrate them to `wash`.
