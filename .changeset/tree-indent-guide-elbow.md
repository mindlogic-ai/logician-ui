---
'@mindlogic-ai/logician-ui': minor
---

Add an `elbow` option to `Tree.BranchIndentGuide` for `├` / `└` guide-line trees.

The default indent guide draws plain vertical rails (one per depth). `elbow` adds a horizontal foot to the innermost rail so every row connects to its parent column like a classic file-tree / sidebar:

```tsx
<Tree.Node indentGuide={<Tree.BranchIndentGuide elbow />} render={renderNode} />
```

- `elbow?: boolean` (default `false`) — opt-in, so existing trees are unchanged.
- `footLength?: string | number` (default `'0.625rem'`) — tunes the length of the horizontal cross-stroke.

Implemented purely with a `:last-of-type::after` pseudo-element on the guide slot — no extra DOM, no change to depth math, and the foot is pinned to the row's vertical centre so it stays aligned across all `size` variants. The foot uses `border.subtle` to match the rail colour. This replaces the need for the `∟`-glyph workaround shown in the `LeafIndicatorComparison` story.
