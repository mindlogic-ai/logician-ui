---
"@mindlogic-ai/logician-ui": patch
---

fix: replace compounding em lineHeight on 6xl textStyle with unitless ratio

`lineHeight: '5.75em'` resolved against the element's own font-size (60px),
producing 345px instead of the intended 92px. Replaced with unitless `1.533`
(92 ÷ 60) to preserve the original rendered output.
