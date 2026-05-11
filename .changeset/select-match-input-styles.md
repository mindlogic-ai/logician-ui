---
'@mindlogic-ai/logician-ui': patch
---

style(Select): align default look with Input

The `Select` component now mirrors `Input` for its default visual style so
the two controls feel like one set. Concretely the Select control now
uses:

- `borderColor` `gray.400` (was `gray.300`)
- `_hover` border `primary.lighter` (was `gray.400`)
- `_focus` border `primary.main` + 1px `outline` of the same color
  (matches Chakra v3 `Input` recipe's `focusVisibleRing: "inside"`,
  so the focused control reads as roughly 2px thick — was just 1px
  border with no outline)
- `_invalid` border `danger.main` — unchanged
- font size `1em` (was hardcoded `14px`) so it inherits the same
  responsive size as Chakra v3's `Input` `md` recipe
- font weight `500` (was `600`)
- selected value color `gray.1300` (was `gray.1200`) — matches the body
  text color used by `Input`
- left padding `12px` (was `4px`) — matches Chakra v3 `Input` `md`
- disabled state: `bg gray.50`, `color gray.1000`, `fontWeight 600`,
  `cursor not-allowed` — matches `Input`'s `_disabled`

`Input` itself is unchanged. No public API or `styles`-callback contract
changes; consumer overrides via `styles` keep working as before.
