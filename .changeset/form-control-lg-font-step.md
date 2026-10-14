---
'@mindlogic-ai/logician-ui': patch
---

Input, Textarea and Select `size="lg"` (and Input/Textarea `xl`) now render at 16px on desktop (14px on phones) instead of the same 14px as `md`. Select `lg` drops to the same height as Input `lg`. `xs`/`sm`/`md` are unchanged, so call sites that do not pass `size` render exactly as before.
