---
'@mindlogic-ai/logician-ui': patch
---

TableContainer: `overflowY` defaults to `hidden` (horizontal stays `auto`).
Chakra's `Table.ScrollArea` scrolls on both axes, and rows with fractional
heights (56.5px, 61.375px) round `scrollHeight` 1px above `clientHeight`, so
every table showed a 1px vertical scrollbar with nothing overflowing. Tables
that need to scroll vertically (fixed `maxH`, flex height) pass
`overflowY="auto"`, which still overrides the default.
