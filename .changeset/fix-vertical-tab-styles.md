---
"@mindlogic-ai/logician-ui": patch
---

Fix vertical Tab indicator: use Chakra-native left-side indicator; suppress horizontal _after

Vertical selected tab now shows a left-side 2px indicator using Chakra's built-in `--indicator-offset-x`, `--indicator-offset-y`, and `--indicator-thickness` CSS variables. Adds `_after: { content: 'none' }` to `verticalSelectedStyles` so the horizontal bottom-bar pseudo-element (from `_selected`) does not bleed through on vertical tabs.
