---
'@mindlogic-ai/logician-ui': minor
---

Built-in strings (Button's 처리 중, SeeMoreButton, Pagination, copy buttons, …) now follow `LogicianProvider`'s `language` instead of always rendering Korean. Outside a provider they stay Korean. An app that wraps in `LogicianProvider` without `language` gets English, the provider's documented default.
