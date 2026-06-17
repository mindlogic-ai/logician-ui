---
'@mindlogic-ai/logician-ui': patch
---

fix(Textarea): allow callers to override the resting `borderColor`

`Textarea` hardcoded its resting border (`danger.main` when invalid, otherwise the
`{ base: 'gray.400', _dark: 'gray.1100' }` mode-aware default), mirroring `Input`.
The `borderColor` prop is now destructured and used as
`borderColor ?? (invalid ? 'danger.main' : <default>)`, so an explicit value wins
while the invalid and light/dark fallbacks are preserved. This matches the
behavior added to `Input`.
