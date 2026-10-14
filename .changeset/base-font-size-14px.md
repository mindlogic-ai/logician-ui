---
'@mindlogic-ai/logician-ui': minor
---

Set the global base font size to 14px.

The type and spacing scales are em-relative, so the `html` font size in
`theme/global.ts` drives the whole app-wide baseline. Flip it from 16px back to
14px; surfaces that need a different base (e.g. a chat view at 16px) opt in
locally via `<ScaledContext>`. Consumers relying on the previous 16px default
will see text and em-based spacing render ~12.5% smaller.
