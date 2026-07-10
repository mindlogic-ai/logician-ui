---
'@mindlogic-ai/logician-ui': minor
---

Heavier display headings and darker, bolder Tag text.

Heading weights now taper with size: `H1`/`H2` step up to `extrabold` and
`H3` to `bold` (via the `h1`/`h2`/`h3` `textStyle` tokens), while `H4`/`H5`
stay lighter — extrabold reads well only at large sizes with tight tracking,
so the smaller headings are intentionally left as-is.

Tag text is darker and a touch bolder across the board:

- `soft` text moves one step darker (`*.dark` → `*.darker`; neutral
  `fg.muted` → `fg.default`).
- `outline` text moves one step darker (`*.main` → `*.dark`; neutral
  `fg.subtle` → `fg.muted`). This also lifts the `warning` outline off the
  palette's AA-risk step (gold.500 3.0:1 → gold.700 5.8:1).
- All variants gain `fontWeight="semibold"`.

Consumers using `H1`–`H3` or `Tag` will see the heavier weights and darker
tag labels automatically.
