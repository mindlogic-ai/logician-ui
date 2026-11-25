---
'@mindlogic-ai/logician-ui': patch
---

Typography (`H1`–`H5`, `Text`, `Subtitle`, `Subtext`, `Caption`, `Overline`,
`Link`), `InlineCode`, `Code`, `MaxLengthIndicator`, `ModalHeader` and `Th`: a
prop passed as an explicit `undefined` (e.g. `textStyle={cond ? x : undefined}`,
or a wrapper forwarding an optional `color={color}`) no longer wipes the
component's default. It now behaves the same as leaving the prop out, so a
heading keeps its `textStyle` instead of falling back to Chakra's base
`Heading` size. Passing `fontSize` still drops the default `textStyle`.

Visible change for callers that relied on the old behaviour: an explicit
`undefined` used to leave the property unset (so e.g. the colour was inherited
from the parent); it now gets the component default (`fg.default` for `Text`,
`fg.emphasized` for headings). Pass the value you want explicitly — e.g.
`color="inherit"` — to keep inheriting.
