---
'@mindlogic-ai/logician-ui': minor
---

Family-agnostic, Tabler-first icon registry.

Icons now have canonical, shape-based names with an `Icon` suffix (e.g. `BugIcon`, `CloseIcon`, `SettingsIcon`) that are decoupled from the underlying react-icons family. This lets us swap the icon family behind a name in the future without touching a single usage site.

**What changed**

- Added a canonical `*Icon` registry backed by Tabler (`react-icons/tb`) wherever a suitable Tabler glyph exists, falling back to the previous family only where Tabler has no equivalent.
- Every previous export name (`FaBug`, `IoClose`, `MdSettings`, …) is preserved as a backward-compatible alias, so existing consumers keep working with no code changes.
- Added an ESLint `no-restricted-imports` guardrail banning direct `react-icons/*` imports outside the icon registry, so all icon usage flows through the canonical names.

**Migration (optional)**

New code should prefer the canonical `*Icon` names. Legacy family-prefixed names continue to resolve to the same glyphs via the alias shim.
