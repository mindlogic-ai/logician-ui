---
'@mindlogic-ai/logician-ui': patch
---

fix(dark-mode): flip remaining light-only cosmetic spots

A few non-flipping bits stayed light on the dark canvas; map them to semantic
tokens so they follow the mode:

- `InlineCode` chip background `gray.50` → `bg.subtle`.
- `CopyableCode`'s sticky copy-button fade gradient ended in `#fff` → now the
  `bg.surface` CSS var, so it fades into the card instead of flashing white.
- `MDXEditor` block-type select: the toolbar trigger and its portaled dropdown
  popup/items now resolve onto `bg.surface`/`fg.default` (with a `bg.muted`
  highlight) instead of mdxeditor's default white.

Light mode is unchanged (all values resolve to their previous light colors).
