---
"@mindlogic-ai/logician-ui": patch
---

fix(Card, Chip, Button, Checkbox): style consistency and runtime error fixes

- Card: move `transition` into `css` prop to prevent Chakra v3 runtime error when `clickable` is combined with `_hover`; deep-merge `_hover` so user-passed hover styles don't clobber clickable hover styles
- Chip: align neutral `solid`/`soft`/`outline` border colors with Tag (add missing `borderColor` on solid/soft, fix outline from `gray.700` → `gray.500`)
- Button: add `transform: scale(0.97)` to all `_active` states; fix primary/secondary soft active color (`*.light` → `*.lighter` to match hover)
- Checkbox: add `bgColor: gray.300` to `_disabled` state on root
