---
'@mindlogic-ai/logician-ui': major
---

**Breaking**: `<Table>` sticky columns are now Chakra-native — `<Th>` / `<Td>`
no longer auto-calculate cumulative `left`/`right` offsets from a shared
context, and the `stickyIndex` prop is removed.

**Why**: the previous implementation stored measured widths in a `useRef`
map and computed offsets at render time, but `useRef` mutations don't
trigger a re-render, so styles applied on the first paint used stale or
empty widths — visible as sticky cells overlapping their neighbours after
pagination, and worsening with each additional sticky column. Any state /
`ResizeObserver` based fix carried its own re-render cascade cost.

**New shape** — cells opt in and consumers provide the fixed pin offset
directly (Chakra's own `data-sticky` pattern):

```tsx
// Before
<Th isSticky stickyDirection="left" stickyIndex={0}>Checkbox</Th>
<Th isSticky stickyDirection="left" stickyIndex={1}>Name</Th>
<Th isSticky stickyDirection="left" stickyIndex={2}>Status</Th>

// After — use `stickyOffsets` for cumulative-offset math on the same side.
// Widths are in `em` (relative to the table's font-size context), matching
// the design system's em-based spacing scale.
import { stickyOffsets } from '@mindlogic-ai/logician-ui';
const STICKY = stickyOffsets([3, 15, 9]); // em values
<Th isSticky stickyDirection="left" {...STICKY[0]}>Checkbox</Th>
<Th isSticky stickyDirection="left" {...STICKY[1]}>Name</Th>
<Th isSticky stickyDirection="left" {...STICKY[2]}>Status</Th>
// (spread the same STICKY entries onto the matching Tds)
```

Sticky columns are now **fixed-width by contract** — content longer than
the declared width truncates with `text-overflow: ellipsis` (already the
Th/Td default). This matches how Notion, Linear, Airtable, and Sheets
treat sticky columns, and gives up nothing versus the previous
auto-measuring behaviour except the ability to have a sticky column
whose width fluctuates per page — which caused the visible overlap bug
in the first place.

**What changed**:

- `TableCellProps.stickyIndex` removed. `isSticky` / `stickyDirection`
  remain.
- `TableContext`, `TableProvider`, `getStickyOffset`,
  `registerStickyColumn`, `isLastStickyColumn` all removed.
- `TableContainer` no longer wraps children in `TableProvider`.
- Sticky column CSS (position, z-index, bg, shadow indicator) moves into
  the theme recipe under the `root` slot, keyed off `data-sticky="left"`
  or `data-sticky="right"` — set automatically by `<Th|Td isSticky
  stickyDirection="…">`. Uses distinct values from `<Thead sticky>`'s
  `data-sticky=""` on `<thead>` so the selectors never collide.
- New export: `stickyOffsets(widths, stickyDirection?)` — pure helper
  that returns `{ w, left }` (or `{ w, right }`) per column so the header
  and matching body rows share a single width declaration.

**Migration**: any table using `stickyIndex` needs a fixed `w` per sticky
cell and a matching `left` / `right` (or a `stickyOffsets` spread) —
factchat consumer updates ship in a coordinated PR.
