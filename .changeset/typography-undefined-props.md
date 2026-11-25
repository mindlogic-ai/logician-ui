---
'@mindlogic-ai/logician-ui': patch
---

Typography (`H1`–`H5`, `Text`, `Subtitle`, `Subtext`, `Caption`, `Overline`,
`Link`), `InlineCode`, `ModalHeader` and `Th`: a prop passed as an explicit
`undefined` (e.g. `textStyle={cond ? x : undefined}`) no longer wipes the
component's default. It now behaves the same as leaving the prop out, so a
heading keeps its `textStyle` instead of falling back to Chakra's base
`Heading` size. Passing `fontSize` still drops the default `textStyle`.
