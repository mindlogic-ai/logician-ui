---
'@mindlogic-ai/logician-ui': minor
---

feat(Code): bundle the Stata grammar

Adds `stata` to `shikiAdapter`'s preloaded `langs`. Several consumers
(notably FactChat / academic users) pass `language="stata"` to `<Code>`
and were hitting `ShikiError: Language not found`. Surfaces in the
Storybook language dropdown automatically via `BUNDLED_LANGUAGES`.
