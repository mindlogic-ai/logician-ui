---
'@mindlogic-ai/logician-ui': patch
---

docs(theme): reposition `slate.*` as a supported foundational neutral family (un-deprecate)

`slate.*` shipped in 3.1.0-alpha.11 marked `@deprecated` — framed as a temporary
migration shim to be codemodded onto the `fg`/`bg`/`border` role tokens. That was
premature: `slate` and the role tokens are **distinct ramps**, not redundant
copies. They agree on light values but diverge in dark — `slate` is a mechanical
halved-saturation mirror, while the role tokens carry hand-tuned dark values (AA
bumps, the `fg` re-peg, hierarchy spacing). So a blanket `slate→role` migration
is not value-neutral and isn't desirable.

`slate.*` is now a **first-class, supported foundational neutral family**: a
mode-aware tonal scale alongside the raw `gray.*` primitives. Guidance: prefer a
role token (`fg`/`bg`/`border`) when one matches the intent; reach for `slate.N`
when you need a specific neutral step no role names (the mode-aware equivalent of
dropping to a raw `gray.N`).

No value or rendering changes — only the `@deprecated` annotations on the token,
the `SemanticColorToken` type, and the docs are removed/repositioned.
