---
"@mindlogic-ai/logician-ui": major
---

**Breaking: Checkbox, Switch, and Radio are now compound components**

`Checkbox`, `Switch`, and `Radio` no longer render their internal controls automatically. You must now compose them explicitly using sub-components.

**Checkbox**
- `Checkbox` is now the root element (replaces `Checkbox.Root`)
- `Checkbox.Control` renders the styled checkbox box
- `Checkbox.Label` renders the label text

**Switch**
- `Switch` is now the root element
- `Switch.Control` renders the styled toggle (includes thumb)
- `Switch.Label` renders the label text

**Radio**
- `Radio` is now the root element (replaces the internal `RadioGroup.Item` wrapper)
- `Radio.Indicator` renders the styled radio circle
- `Radio.Text` renders the label text
- `rootRef` and `inputProps` props removed
