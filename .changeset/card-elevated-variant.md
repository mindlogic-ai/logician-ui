---
'@mindlogic-ai/logician-ui': minor
---

Add an `elevated` variant to `Card`.

The base `Card` is intentionally flat (`boxShadow: 'none'`, `border.default`).
`elevated` promotes the soft "raised object" resting treatment — `boxShadow:
'sm'` plus the lighter `border.subtle` — into the design system, so standalone
content cards can share one baseline instead of re-deriving it inline. The
gentle shadow does the separating, which is why the border can soften; pair it
with `clickable` (or a consumer hover) to add a lift on interaction.
