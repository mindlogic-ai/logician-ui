---
'@mindlogic-ai/logician-ui': minor
---

Secondary `Button` and `IconButton` outlines go back to the light
`border.default` (reverts the alpha.36 change to `border.control`). A labelled
button does not need a field's 3:1 edge, and at that weight every secondary
chip outweighed its neighbours.

New `FieldTrigger` for buttons that act as a field: a popover or menu trigger
that shows the chosen value. It takes the `Select` trigger's recipe for its
size (height, field padding, type, chevron) and its `border.control` outline,
shows `placeholder` in `fg.placeholder` while empty, keeps the placeholder in
the accessible name once a value is shown, and leaves `aria-haspopup` /
`aria-expanded` to the `Popover.Trigger` / `Menu.Trigger` that wraps it.

```tsx
<Popover.Trigger asChild>
  <FieldTrigger placeholder="이벤트" w="2xs">
    {selected.length > 0 && <SelectionSummary labels={selected} />}
  </FieldTrigger>
</Popover.Trigger>
```
