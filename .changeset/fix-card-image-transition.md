---
"@mindlogic-ai/logician-ui": patch
---

fix(Card): hoist `.card-image` transition and merge consumer `css`

- Move the `.card-image` transition onto the element itself so it animates on both enter and exit, not only while hovered
- Replace the hardcoded `transition: '0.3s all'` string (which the Chakra v3 style walker can't traverse as a value inside `_hover`) with token-backed `transitionProperty`/`transitionDuration`/`transitionTimingFunction` on the root and style-object form on `.card-image`
- Use `mergeCss` so consumer `css` composes with the library base styles instead of being overwritten by the trailing rest spread
