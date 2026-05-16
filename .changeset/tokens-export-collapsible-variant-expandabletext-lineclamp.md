---
"@mindlogic-ai/logician-ui": minor
---

feat(tokens): export hex color constants as `@mindlogic-ai/logician-ui/tokens`

Adds `src/tokens.ts` with `colorTokens` and `semanticColorTokens` exports — plain
JavaScript objects containing the same hex values as the Chakra theme, accessible
from any module without a React or Chakra context (Canvas API, runtime CSS
injection, chart palettes, embed snippets, plain `.ts` utility files).

feat(CollapsibleRoot): add `variant` prop (`'card' | 'plain'`)

`variant="card"` (default) preserves the existing bordered card style.
`variant="plain"` renders with no border, no border-radius, and no overflow
hidden — suitable for inline or navigation collapsibles that don't need the card
container.

feat(ExpandableText): add `mode="lineClamp"` with `lineClamp` prop

`mode="charLimit"` (default) preserves the existing character-count truncation
behaviour. `mode="lineClamp"` uses CSS `-webkit-line-clamp` combined with a
`ResizeObserver` to truncate by visible line count, correctly adapting to font
size and container width changes. The toggle renders on a new line below the
text (rather than inline) and includes `preventDefault`/`stopPropagation` for
safe use inside clickable cards.
