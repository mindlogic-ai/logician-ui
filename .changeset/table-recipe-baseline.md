---
'@mindlogic-ai/logician-ui': minor
---

feat(table): move the table baseline into the theme's `table` slot recipe

A no-prop `<Table>` now renders the correct header/border/text/hover in both
light and dark mode — consumers should only override for genuine per-row
state or layout, instead of hand-rolling header bg, row borders, hover and
row tints at every call site.

- **Recipe base owns the defaults** (`theme.slotRecipes.table`, merged over
  Chakra's default recipe): `columnHeader` → `fg.muted` + medium weight +
  `bg.subtle` header surface + `border.subtle` bottom hairline; `row` →
  `border.subtle` bottom border; body text inherits `fg.default`. Chakra's
  `line` variant row bg (raw `bg` token — pure black in dark mode) is
  overridden to transparent so the surface behind the table shows through.
- **Hover follows interactivity automatically**: `<Tr>` sets
  `data-interactive` when it receives `onClick` / `role="button"` /
  `tabIndex`, and the recipe keys cursor, `bg.muted` hover and a
  focus-visible outline off `&[data-interactive]`. Static tables never
  highlight.
- **Row-state prop**: `<Tr state="selected" | "invalid" | "highlighted">`
  maps to new mode-aware semantic tokens `bg.selected` (← primary.lightest),
  `bg.invalid.subtle` (← danger.lightest) and `bg.highlighted`
  (← warning.lightest) — replaces hand-picked `primary.*`/`danger.*` tints.
- **Sticky header**: `<Thead sticky>` pins the header
  (`position: sticky; top: 0`, opaque surface bg, hairline shadow so the
  collapsed border doesn't vanish on scroll).
- **`Tr` forwards its ref**, so dnd-kit rows no longer need to drop to the
  raw Chakra `Table.Row`.
- Sticky-column header cells now use the `bg.subtle` header surface instead
  of `bg.surface`, matching the rest of the header row.

Audit note: the brand tint ramps (`*.lightest`/`*.extralight`/…) already
carry `_dark` values (e.g. `primary.lightest` → `blue.900`), so the new
state tokens inherit correct dark-mode tints.
