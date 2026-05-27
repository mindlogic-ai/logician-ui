---
"@mindlogic-ai/logician-ui": minor
---

Add `CodeDiff` component for rendering before/after code changes (e.g. AI assistant suggestions). Supports `unified` and `split` view modes via the `mode` prop, reuses the existing shiki adapter for syntax highlighting, and renders a header with optional filename, `+N −N` stats, language label, and an after-code copy action.
