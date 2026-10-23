---
'@mindlogic-ai/logician-ui': patch
---

Typography: `keep-all` now applies to Korean only. The Typography components
(`Text`, `Subtext`, `Caption`, `Subtitle`, `Overline`, `Link`, `H1`–`H5`) no
longer hard-code `wordBreak="keep-all"`; the global styles set
`html:lang(ko) { word-break: keep-all }` and every element inherits it.
Japanese and Chinese text, which has no spaces, wraps instead of
overflowing; Japanese uses `auto-phrase` (phrase boundaries) where the browser
supports it. A `wordBreak` passed at a call site still wins.
