---
'@mindlogic-ai/logician-ui': patch
---

Stop a `Table` from re-rendering every cell on each render of its owner.

`TableContext.Provider` took an object literal as its value, so every render of
`TableProvider` produced a new context value. `Th`, `Td` and `Tr` all call
`useTableContext()`, so that re-rendered every cell in the table even when
neither the scroll state nor a sticky column width had changed. `React.memo` on
a row does not prevent it — React propagates a context change into subtrees it
has already bailed out of.

In a virtualised table this dominates scrolling. Measured on a consumer's
12,000-row admin table (production build), one scroll step that mounted a single
new row re-rendered `Td` **794 times**; it now re-renders 11.

Also in this release: a sticky column's width is measured once by its header
cell rather than once per body cell (68 → 6.7 `getBoundingClientRect` calls per
scroll step, 28 → 0 new `ResizeObserver`s).

No API change.
