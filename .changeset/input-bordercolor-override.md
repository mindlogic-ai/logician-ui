---
'@mindlogic-ai/logician-ui': patch
---

fix(Input): allow callers to override the resting `borderColor`

`Input` hardcoded its resting border to `gray.400` (or `danger.main` when
invalid), so a `borderColor` prop passed by a caller could not reliably set the
default border. The prop is now destructured and used as `borderColor ?? (invalid
? 'danger.main' : 'gray.400')`, so an explicit value wins while the invalid and
default fallbacks are preserved.
