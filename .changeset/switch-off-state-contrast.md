---
'@mindlogic-ai/logician-ui': patch
---

`Switch`: the off state is drawn like an unchecked `Checkbox` — a `bg.surface`
track with a `border.control` outline and a `border.control` thumb. The old off
thumb sat on its track at 1.3:1 (light) and 1.4:1 (dark), so you could not see
which side it was on and an off switch was easy to read as on. Now every off
part is at least 3:1 (WCAG 1.4.11) in light, dark and high-contrast. The on
state is unchanged (`primary.main` track, `fg.onPrimary` thumb).
