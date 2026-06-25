---
'@mindlogic-ai/logician-ui': minor
---

Export the `colors` palette and `semanticTokens` map as runtime values from the package root.

Previously only the `SemanticColorToken` type was re-exported, so consumers had no way to read the actual color values (raw scale or semantic roles) at runtime — they had to hardcode hex values or reach into theme internals.

Now `import { colors, semanticTokens } from '@mindlogic-ai/logician-ui'` resolves to the same objects the theme is built from, letting downstream apps reference brand colors and semantic roles (e.g. `border.default`, `primary.main`) without duplicating them. The `SemanticColorToken` type export is unchanged.
