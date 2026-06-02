---
'@mindlogic-ai/logician-ui': patch
---

style(Select, Textarea): align default look with Input

The `Select` and `Textarea` components now mirror `Input` so the three
form controls feel like one set. Concretely:

### Select

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

### Textarea

- `_hover` border `primary.lighter` (was `gray.600`)
- `bg white` so the field doesn't pick up surrounding colors
- focus ring color forced to `primary.main` (was `gray.400`). Chakra v3
  `Input` outline recipe sets `focusRingColor: var(--focus-color)`, but
  the matching `Textarea` recipe omits it — so the focus outline
  defaulted to `colorPalette.focusRing` (gray.400). The component now
  declares `focusRingColor` and the `--focus-color`/`--error-color`
  css variables exactly the way `Input.tsx` does.
- `_readOnly`: `bg gray.50`, `color gray.600`, `borderColor gray.200`,
  `cursor not-allowed` — matches `Input`'s `_readOnly`
- `_disabled`: `bg gray.50`, `color gray.1000`, `fontWeight semibold`,
  `cursor not-allowed` — matches `Input`'s `_disabled`

`Input` itself is unchanged. No public API breaks; the `Select`
`styles` callback contract is preserved and consumer overrides keep
working as before. Size variants (`sm` / `lg` / `xl`) are out of scope
for this change — Select still renders at the Chakra `Input` `md`
geometry; a dedicated size-progression pass will follow in a separate
PR.
