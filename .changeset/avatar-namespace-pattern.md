---
"@mindlogic-ai/logician-ui": minor
---

feat(Avatar): add Chakra v3 namespace pattern subcomponent exports

Avatar now exposes subcomponents as namespace properties following the Chakra UI v3 pattern:
- `Avatar.Root`
- `Avatar.RootProvider`
- `Avatar.Fallback`
- `Avatar.Image`
- `Avatar.Icon`
- `Avatar.Group`
- `Avatar.Context`

fix(Popover): match arrow tip border color to content border color

`Popover.Content` now renders with an explicit `1px gray.200` border and sets a `--popover-border-color` CSS variable. `Popover.ArrowTip` reads that variable so the arrow border stays in sync with the content border.
