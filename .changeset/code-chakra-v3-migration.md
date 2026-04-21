---
"@mindlogic-ai/logician-ui": minor
---

feat(Code): migrate Code component to Chakra UI v3's `CodeBlock` with its built-in Shiki formatter, replacing the `react-syntax-highlighter` implementation. The `Code` component keeps the same public API (`children`, `language`, `onCopy`, `hideHeader`, `containerProps`). Removes the `react-syntax-highlighter` and `@types/react-syntax-highlighter` dependencies and adds `shiki` (loaded on demand). The copy button is now rendered by `CodeBlock.CopyTrigger`; the user-supplied `onCopy` callback still fires with the copied text after the trigger copies to the clipboard.
