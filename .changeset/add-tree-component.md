---
'@mindlogic-ai/logician-ui': minor
---

Add `Tree` compound component wrapping Chakra UI v3's `TreeView` (Ark UI tree-view).

Exposes the full part set so consumers can compose nested hierarchical UIs with built-in keyboard navigation (arrow keys, Home/End, type-ahead), `role="tree"`/`treeitem` semantics, and `aria-expanded`/`aria-selected` for free.

**Parts**

`Tree.Root`, `Tree.Tree`, `Tree.Branch`, `Tree.BranchControl`, `Tree.BranchTrigger`, `Tree.BranchIndicator`, `Tree.BranchText`, `Tree.BranchContent`, `Tree.BranchIndentGuide`, `Tree.Item`, `Tree.ItemText`, `Tree.ItemIndicator`, `Tree.NodeCheckbox`, `Tree.Label`.

Also re-exports `createTreeCollection` and the relevant change-detail types (`TreeExpandedChangeDetails`, `TreeSelectionChangeDetails`, etc.) so consumers don't need to import from `@chakra-ui/react`.

**Defaults**

- `BranchControl` / `Item` rows: padded clickable rows with `bg.subtle` hover, `primary.lightest` selected state, semantic-token text so light/dark both work.
- `BranchIndicator`: default chevron icon (`IoChevronForward`) that rotates 90° on open.
- `BranchIndentGuide`: subtle vertical line for depth visualization (matches the VSCode/GitHub tree feel).
- All interactive parts use the shared `focusRing` util.

Single- and multiple-selection both supported via the upstream `selectionMode` prop. Controlled or uncontrolled via `(default)expandedValue` and `(default)selectedValue`.
