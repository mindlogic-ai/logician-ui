---
'@mindlogic-ai/logician-ui': patch
---

`ModalHeader` only renders its title as an `h2` when the children are plain
text (strings/numbers, or arrays and fragments of them). As soon as any child is
an element — e.g. a `Tag` next to an `H4` — the children are wrapped in a `div`
carrying the title id instead, so caller headings are no longer nested inside an
`h2`. The header now uses `alignItems="stretch"`, so custom header markup fills
the modal's width (plain-text titles look the same). In development, a
`ModalCloseButton` passed as a child of `ModalHeader` logs a one-time warning:
place it as a sibling of `ModalHeader` inside `ModalContent`.
