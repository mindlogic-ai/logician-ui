---
'@mindlogic-ai/logician-ui': minor
---

`Tree.BranchIndentGuide`: fix the `elbow` guide's last-row shape and make the guide color customizable.

**Fix — `└` on the last row of each group**

Chakra's indent-guide slot paints one continuous full-height vertical rail per branch content, so with `elbow` the rail always ran past the last row's foot and every row rendered as `├`. In `elbow` mode the slot rail is now hidden and the guide lines are drawn per row instead: middle rows get a full-height vertical segment (`├`), the last row's segment stops at its centre where the foot meets it (`└`), and a non-last expanded branch draws a pass-through rail over its whole subtree so the parent column stays continuous. An expanded last branch correctly hangs below its elbow with no rail running past it.

**New — `guideColor` prop**

Colors the rail, elbow foot and vertical segments with any Chakra color token. The default moves from `border.subtle` (gray.200 — barely visible against the background) to the darker `border.default` (gray.300). Both are mode-flipping semantic tokens, so the guide automatically lightens in dark mode.

```tsx
<Tree.Node
  indentGuide={<Tree.BranchIndentGuide elbow guideColor="border.strong" />}
  render={...}
/>
```
