---
'@mindlogic-ai/logician-ui': patch
---

Fix `Table` sticky columns detaching after a layout change.

The cumulative `left`/`right` offsets for sticky columns were measured once in a
mount-only effect and stored in a ref, so they were never recomputed when the
column widths changed afterwards — a web-font swap that reflows the text, a
window/sidebar resize, or the columns shrinking as the table went from fitting
its container to overflowing it. The stale offsets left the pinned columns in
the wrong place: an empty gap opened between them and neighbouring columns
collapsed or bled through.

Sticky column widths now live in state and each cell is tracked with a
`ResizeObserver`, so the offsets follow the real column widths through any later
layout change. Writes are rounded to whole pixels and skipped when unchanged to
avoid render loops. The `isSticky` / `stickyDirection` / `stickyIndex` API is
unchanged.
