---
'@mindlogic-ai/logician-ui': patch
---

Dark-mode row state tints (`bg.selected`, `bg.invalid.subtle`, `bg.highlighted`) are now lighter than the row surface instead of darker.

They mirrored `primary.lightest` / `danger.lightest` / `warning.lightest`, whose dark arm is the `900` step of each ramp. `blue.900` is darker than `bg.surface`, so a selected table row rendered as a navy block sunk below its neighbours. Each tint now mixes the family's `200` step 20% into `grayDark.1400`: one step lighter than the surface, `fg.default` stays above 8:1 on it, and a tenant that restages `blue` still gets its own hue. Light mode is unchanged.
