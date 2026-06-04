---
'@mindlogic-ai/logician-ui': patch
---

fix(Textarea): allow callers to override the resting `borderColor`

`Textarea` hardcoded its resting border to `gray.400` (or `danger.main` when
invalid), mirroring `Input`. The `borderColor` prop is now destructured and used
as `borderColor ?? (invalid ? 'danger.main' : 'gray.400')`, so an explicit value
wins while the invalid and default fallbacks are preserved. This matches the
behavior added to `Input`.
