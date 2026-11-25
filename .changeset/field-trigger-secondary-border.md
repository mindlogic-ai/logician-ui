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

`FieldTrigger` takes an optional `indicator` that replaces the chevron in the
same slot, colour and size.

`SingleDatePicker` / `RangeDatePicker` triggers are now a `FieldTrigger`
instead of a secondary `Button`: the same height, field padding, type and
`border.control` outline as the `Select` beside them, with the calendar moved
from the leading edge to the chevron's column. While nothing is picked they
show a new `placeholder` prop in `fg.placeholder` (default 날짜 선택 / 기간
선택, following the provider language) instead of an empty button, and the
placeholder stays in the accessible name once a date is shown. `size` maps
onto the field sizes (`2xs` → `xs`, `xl` → `lg`). `propsConfigs.triggerBtnProps`
keeps its name and now takes `FieldTrigger` props; `w`, `bg`, `justifyContent`
and `aria-label` work as before. A `disabled` picker now disables its trigger.
The library's ignored trigger options (`triggerVariant`, `triggerIcon`, a
`children` render prop) are dropped from the props type.
