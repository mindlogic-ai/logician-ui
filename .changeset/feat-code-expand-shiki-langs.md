---
'@mindlogic-ai/logician-ui': minor
---

feat(Code): bundle 11 additional Shiki language grammars

Expand `shikiAdapter`'s preloaded `langs` from 17 to 28 by adding `c`, `csharp`, `dart`, `dockerfile`, `kotlin`, `lua`, `matlab`, `mermaid`, `r`, `ruby`, `toml`. Selected based on consumer Sentry signals (FactChat hit `ShikiError: Language not found` for `r`, `c`, `cpp`, `stata` between 2026-04-30 and 2026-05-07) and prevalence in academic / programming-student use cases.

Bundle delta: ~376 KB raw / ~75 KB gzipped (+30% on the grammar bundle alone). Heavyweights deliberately excluded — `cpp` (464 KB), `swift` (104 KB), `php` (116 KB), `objective-c` (112 KB) — consumers can map these to syntactically-similar bundled grammars (e.g. `cpp → java`) for best-effort highlighting.
