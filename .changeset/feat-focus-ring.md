---
'@mindlogic-ai/logician-ui': minor
---

feat: add consistent keyboard focus ring across interactive components

Introduces a shared `focusRing` utility (`src/utils/focusRing.ts`) and applies the standard double-ring focus style (white inner + primary blue outer) to all keyboard-navigable components: Button, IconButton, Checkbox, Radio, Switch, SliderThumb, AccordionButton, MenuItem, BreadcrumbLink, and Chip.

Focus ring now only shows on keyboard navigation (`_focusVisible`) rather than on mouse click (`_focus`), following the CSS `:focus-visible` standard used by GitHub, Radix, and Material Design.
