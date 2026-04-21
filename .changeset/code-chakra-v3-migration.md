---
"@mindlogic-ai/logician-ui": major
---

feat(Code)!: migrate Code component to Chakra UI v3's `CodeBlock` with its built-in Shiki formatter, replacing the `react-syntax-highlighter` implementation. The `Code` component keeps the `children`, `language`, `onCopy`, `hideHeader`, and `containerProps` props. Removes the `react-syntax-highlighter` and `@types/react-syntax-highlighter` dependencies and adds `shiki` (loaded on demand). The copy button is now rendered by `CodeBlock.CopyTrigger`; the user-supplied `onCopy` callback still fires with the copied text after the trigger copies to the clipboard.

BREAKING: the raw/preview Markdown toggle that `Code` showed when `language === 'markdown'` has been removed. `Code` now always renders a syntax-highlighted block. Along with it, the `code_markdown_raw` and `code_markdown_preview` translation keys are removed.
