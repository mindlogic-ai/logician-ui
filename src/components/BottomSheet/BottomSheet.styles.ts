import { drawerAnatomy } from '@ark-ui/react/drawer';
import { defineSlotRecipe } from '@chakra-ui/react';

/**
 * Parts the sheet styles. Ark's drawer anatomy plus the three layout slots
 * (`header` / `body` / `footer`) that have no machine behaviour of their own —
 * the same extension Chakra makes for its dialog-backed `Drawer`.
 */
export const bottomSheetAnatomy = drawerAnatomy.extendWith(
  'header',
  'body',
  'footer'
);

/**
 * The BottomSheet's slot recipe.
 *
 * Passed to `createSlotRecipeContext({ recipe })` rather than registered in the
 * theme under a key, so the sheet renders the same whether or not the consuming
 * app built its system from `logicianConfig` — and an app that wants to restyle
 * it can still pass style props per part.
 *
 * Two clocks move the content, and they are deliberately separate:
 *
 * - **Presence** (open / close) is a keyframe animation on `translate`, timed by
 *   the shared `presence` preset — enter on `motion.base`, exit on `fast`.
 * - **Snap / release** is a transition on `transform`. Zag drives `transform`
 *   inline from `--drawer-translate-y` while the sheet is dragged (and zeroes the
 *   transition duration during the drag), so the transition only runs when a
 *   finger lets go or the snap point changes.
 *
 * `translate` and `transform` compose, so the entrance never fights the drag.
 *
 * Reduced motion: `presence` swaps the slide for a plain fade (restated below so
 * the recipe's own `animationName` cannot outrank it), and the snap transition
 * drops to `motion.instant` so the sheet lands on its snap point without
 * travelling there.
 */
export const bottomSheetSlotRecipe = defineSlotRecipe({
  className: 'logician-bottom-sheet',
  slots: bottomSheetAnatomy.keys(),
  base: {
    backdrop: {
      position: 'fixed',
      insetInlineStart: 0,
      top: 0,
      w: '100vw',
      h: '100dvh',
      bg: 'blackAlpha.500',
      zIndex: 'calc(var(--chakra-z-index-modal) + var(--layer-index, 0) - 1)',
      // Fades with the finger: zag reports how far toward closed the sheet has
      // been dragged as a 0–1 progress.
      opacity: 'calc(1 - var(--drawer-swipe-progress, 0))',
      animationStyle: 'presence',
      _open: { animationName: 'fade-in' },
      _closed: { animationName: 'fade-out' },
    },
    positioner: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      position: 'fixed',
      insetInlineStart: 0,
      top: 0,
      w: '100vw',
      h: '100dvh',
      zIndex: 'calc(var(--chakra-z-index-modal) + var(--layer-index, 0))',
      overscrollBehaviorY: 'none',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      w: '100%',
      maxH: '85dvh',
      outline: 0,
      bg: 'bg.surface',
      color: 'fg.default',
      borderTopRadius: 'l3',
      borderTopWidth: '1px',
      borderColor: 'border.subtle',
      boxShadow: 'lg',
      // Keeps the last row and the footer clear of the iOS home indicator.
      pb: 'env(safe-area-inset-bottom, 0px)',
      animationStyle: 'presence',
      _open: { animationName: 'slide-from-bottom-full' },
      _closed: { animationName: 'slide-to-bottom-full' },
      transitionProperty: 'transform',
      transitionDuration: 'motion.base',
      transitionTimingFunction: 'emphasized',
      _motionReduce: {
        transitionDuration: 'motion.instant',
        _open: { animationName: 'fade-in' },
        _closed: { animationName: 'fade-out' },
      },
    },
    grabber: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      // A finger-sized strip, though the bar inside it is small.
      h: '6',
      cursor: 'grab',
      _active: { cursor: 'grabbing' },
    },
    grabberIndicator: {
      w: '10',
      h: '1',
      borderRadius: 'full',
      bg: 'border.default',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      flexShrink: 0,
      px: '4',
      pt: '1',
      pb: '3',
      // Leave room for the absolutely placed close button so a long title
      // wraps before it instead of running underneath it.
      '[data-part=content]:has(> [data-part=close-trigger]) > &': {
        pe: '12',
      },
    },
    title: {
      flex: '1',
      minW: 0,
      textStyle: 'h5',
      color: 'fg.default',
    },
    description: {
      color: 'fg.muted',
    },
    body: {
      flex: '1',
      minH: 0,
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      px: '4',
      pb: '4',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '3',
      flexShrink: 0,
      px: '4',
      pt: '3',
      pb: '4',
      borderTopWidth: '1px',
      borderColor: 'border.subtle',
    },
    closeTrigger: {
      position: 'absolute',
      top: '3',
      insetEnd: '3',
    },
  },
});
