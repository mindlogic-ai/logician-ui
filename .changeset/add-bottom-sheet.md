---
'@mindlogic-ai/logician-ui': minor
---

Add `BottomSheet` — a sheet that rises from the bottom edge, rests on snap points and can be swiped away.

Built on Ark UI's `Drawer` (zag-js), not Chakra's `Drawer`: Chakra's wraps Ark's *Dialog*, so it has no swipe, snap points or grabber. Flat exports in the shape of `Modal`: `BottomSheet` (root + portal, overlay included unless `modal={false}`), `BottomSheetContent` (positioner + panel + grabber, `showGrabber` defaults to `true`), `BottomSheetHeader` (children become the title the panel's `aria-labelledby` points at), `BottomSheetBody` (the scroll container), `BottomSheetFooter`, `BottomSheetCloseButton`, `BottomSheetOverlay` and `useBottomSheetContext` (Ark's drawer API). `BottomSheetProps` is Ark's `Drawer.RootProps` plus `portalProps`, so `snapPoints`, `defaultSnapPoint`, `swipeDirection`, `closeThreshold`, `swipeVelocityThreshold`, `preventDragOnScroll`, `modal` and `closeOnInteractOutside` pass straight through.

Styled through a slot recipe (`bottomSheetSlotRecipe`, also exported) on semantic tokens: `bg.surface` panel, top radius only, `85dvh` cap, `env(safe-area-inset-bottom)` padding, open/close on the shared `presence` clock and a plain fade under reduced motion.

**`@ark-ui/react` is now a peer dependency (`^5.39.0`).** It used to arrive only transitively through Chakra; `Drawer` first ships in Ark 5.39, which is the version Chakra 3.37 pins. Apps on Chakra ≥ 3.37 already have it. On an older Chakra, add `@ark-ui/react@^5.39.0` and let the package manager dedupe it so Chakra and the sheet share one copy.
