---
'@mindlogic-ai/logician-ui': minor
---

feat(Code): add `hideLanguageLabel` prop to suppress only the language title

When set, the `Code` header still renders (so the copy button remains
visible) but the language label is hidden. Useful for consumers that
render a fallback grammar whose canonical ID would mislead the user
(e.g. C++ source rendered with the Java grammar for best-effort
highlighting).
