---
"@mindlogic-ai/logician-ui": patch
---

fix: override Chakra spacing scale with em units

Numeric spacing tokens (p: 4, gap: 2, etc.) now resolve to em values
instead of rem, so spacing cascades from the nearest ancestor font-size
alongside text — enabling consistent contextual scaling.
