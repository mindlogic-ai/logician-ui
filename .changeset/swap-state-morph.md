---
'@mindlogic-ai/logician-ui': minor
---

Add `Swap` — a state morph that does not change size.

A button whose label changes is a moving target. `CopyableCode` is the case that
made this concrete: "복사" → "복사 완료" widened the button by 28px, and because
it is positioned against the right edge of the code block, it grew _leftwards_
over the code the instant it was clicked — under the cursor that had just
clicked it.

```tsx
<Button onClick={copy}>
  <Swap value={copied ? 'done' : 'idle'}>
    <Swap.Case value="idle">
      <CopyIcon />
      복사
    </Swap.Case>
    <Swap.Case value="done">
      <CheckIcon />
      복사 완료
    </Swap.Case>
  </Swap>
</Button>
```

Every case renders into the same grid cell, so the box is always as wide as its
widest state, and the inactive ones stay in the layout — they are what holds the
width — while being transparent, unclickable and `aria-hidden`. Sizing this way
rather than with a hand-tuned `minW` matters for a translated product: the
longest string is rarely the one you measured, and `Copy completed` is nearly
three times `복사`.

The swap itself runs on two clocks: opacity clears in 150ms so the outgoing
label is not read through the incoming one, while the 8px of travel takes 300ms
so it reads as one thing replacing another rather than a flicker.

`CopyableCode` now uses it, which also replaced the hand-rolled icon crossing it
had before.
