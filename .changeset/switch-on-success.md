---
'@mindlogic-ai/logician-ui': minor
---

`Switch`: the on state is `success.solid` with a `success.onSolid` thumb
instead of `primary.main` / `fg.onPrimary`. Both states were black-and-white,
and dark-mode "on" (a pale pill) read like light-mode "off".

Theme: light `success.solid` is a clearer green, `#5E7A37` → `#30862D`
(4.59:1 with white text, was an olive that read as khaki). High-contrast light
follows through the generator, `#47611D` → `#036805`. Success buttons and
solid success toasts in light mode change with it.
