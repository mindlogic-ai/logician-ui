---
'@mindlogic-ai/logician-ui': patch
---

fix(Input): allow callers to override the resting `borderColor`

`Input` hardcoded its resting border (`danger.main` when invalid, otherwise the
`{ base: 'gray.400', _dark: 'gray.1100' }` mode-aware default), so a `borderColor`
prop passed by a caller could not reliably set the default border. The prop is now
destructured and used as `borderColor ?? (invalid ? 'danger.main' : <default>)`,
so an explicit value wins while the invalid and light/dark fallbacks are
preserved.
