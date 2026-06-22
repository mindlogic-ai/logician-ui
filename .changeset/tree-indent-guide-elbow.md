---
'@mindlogic-ai/logician-ui': minor
---

Add an `elbow` option to `Tree.BranchIndentGuide` for `├` / `└` guide-line trees.

The default indent guide draws plain vertical rails (one per depth). `elbow` adds a horizontal foot to the innermost rail so every row connects to its parent column like a classic file-tree / sidebar:

```tsx
<Tree.Node indentGuide={<Tree.BranchIndentGuide elbow />} render={renderNode} />
```

- `elbow?: boolean` (default `false`) — opt-in, so existing trees are unchanged.
- `footLength?: string | number` (default `'var(--tree-indentation)'`) — tunes the length of the horizontal cross-stroke; the default reaches exactly from the rail to the row content.

Chakra renders one indent guide per branch (its first child, a single `height: 100%` rail), followed by that branch's rows as siblings — so the foot is drawn as a `::before` cross-stroke on the guide's sibling rows (`[data-part="item"]` and `[data-part="branch"] > [data-part="branch-control"]`), scoped to the elbow guide's own class. No extra DOM, no change to depth math; the foot is pinned to each row's vertical centre (`inset-block-start: 50%`) and starts at the parent rail column (`calc(var(--tree-offset) - var(--tree-indentation))`), so it stays aligned across all `size` variants. The foot uses `border.subtle` to match the rail colour. This replaces the need for the `∟`-glyph workaround shown in the `LeafIndicatorComparison` story.
