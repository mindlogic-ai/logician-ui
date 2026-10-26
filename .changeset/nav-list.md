---
'@mindlogic-ai/logician-ui': minor
---

NavList: a new `NavList` / `NavList.Item` / `NavList.Group` for side navigation and in-page filter rails. Rows are native links (`aria-current="page"`, `asChild` for `next/link`) or buttons (`aria-current="true"`), with `leadingVisual`, `trailingVisual`, `trailingAction` and `isDisabled`; the current row is ink and bold on `bg.emphasized`. `orientation` takes a per-breakpoint object so a rail can lie down into a sideways-scrolling strip below `md`. Also exports `focusRingInset` / `FOCUS_RING_INSET_SHADOW`, the inset counterpart of `focusRing` for rows in a dense or scrolling list.
