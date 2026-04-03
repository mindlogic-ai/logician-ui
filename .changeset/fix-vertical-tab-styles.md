---
"@mindlogic-ai/logician-ui": patch
---

Fix vertical Tab indicator: replace custom _after with Chakra-native left-side indicator

Vertical selected tab now shows a left-side 2px indicator using Chakra's built-in `--indicator-offset-x`, `--indicator-offset-y`, and `--indicator-thickness` CSS variables (via `indicator.start` approach). Removes the custom `_after` pseudo-element that caused a duplicate indicator when the host app uses the `line` variant recipe.
