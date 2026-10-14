---
'@mindlogic-ai/logician-ui': minor
---

`Button` gains an opt-in `lift`.

```tsx
<Button colorPalette="primary" variant="solid" lift>
  시작하기
</Button>
```

Raises the button 1px toward the pointer on hover with a shadow under it;
pressing sets it back down, underneath the existing `scale` press. Off by
default and deliberately not a house style — a lift is emphasis, and a row of
six buttons all lifting is noise. Reach for it where one button is the point of
the screen.

The shadow is a `filter: drop-shadow`, not a `box-shadow`. The keyboard focus
ring is a box-shadow, and Chakra emits `:hover` _after_ `:focus-visible`, so a
box-shadow here would have taken the ring off any button that was focused and
hovered at once — a real accessibility regression that looks like nothing in
review. A different property cannot collide with it, and it follows the border
radius for free. It deepens in dark mode, where a black shadow does nothing.

`translate` and `filter` joined the button's transition list unconditionally: a
property nobody changes costs nothing, and leaving them out would make the
opt-in jump rather than move.
