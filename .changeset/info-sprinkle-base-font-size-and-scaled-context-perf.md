---
"@mindlogic-ai/logician-ui": minor
---

Add `baseFontSize` prop to `InfoSprinkle` (default `14px`), matching `Popover`'s scaling behavior via `ScaledContext`. Optimize `ScaledContext` so token-to-em conversion is computed once per Chakra system via a module-level `WeakMap` cache (shared across all instances) and memoize the merged inline style. Move `Popover`'s runtime context (`PopoverContext`, `usePopoverContext`) out of `Popover.types.ts` into a dedicated `Popover.context.ts`. Fix `Code` to merge `meta` from `containerProps` and root props instead of overwriting it, and restore `ModalHeader`'s `borderTopRadius="l3"` default.
