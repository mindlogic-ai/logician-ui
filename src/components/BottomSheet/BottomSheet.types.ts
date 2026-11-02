import type { Drawer, UseDrawerContext } from '@ark-ui/react/drawer';
import type { HTMLChakraProps, PortalProps } from '@chakra-ui/react';

import type { IconButtonProps } from '../IconButton/IconButton.types';

/**
 * Props for `BottomSheet` — Ark's `Drawer.Root` props, unchanged, plus
 * `portalProps`.
 *
 * Everything the machine does is configured here: `open` / `onOpenChange`,
 * `snapPoints` / `defaultSnapPoint` / `snapPoint` / `onSnapPointChange`,
 * `modal`, `closeOnInteractOutside`, `closeOnEscape`, `closeThreshold`,
 * `swipeVelocityThreshold`, `preventDragOnScroll`, `lazyMount`,
 * `unmountOnExit`, …
 *
 * Snap points that are numbers ≤ 1 are fractions of the **viewport** height,
 * capped at the sheet's own height (`snapPoints={[0.4, 1]}` = 40% of the
 * screen, then fully open). Strings take `px` / `rem` values.
 */
export type BottomSheetProps = Drawer.RootProps & {
  /** Passed to the Chakra `Portal` the sheet renders into. */
  portalProps?: PortalProps;
};

/**
 * `HTMLChakraProps<'div'>` with Ark's content props folded in — which only
 * changes `draggable`: on the sheet it is Ark's boolean "can a drag start from
 * the content itself" (default `true`; `false` leaves the grabber as the only
 * handle), not the HTML drag-and-drop attribute.
 */
export type BottomSheetContentProps = HTMLChakraProps<
  'div',
  Drawer.ContentBaseProps
> & {
  /**
   * Renders the drag handle at the top of the sheet. The whole sheet can be
   * dragged either way; the handle is the visible affordance.
   * @default true
   */
  showGrabber?: boolean;
  /**
   * Stops the sheet from being dragged at all, from the content and from the
   * grabber. Set it while closing is guarded, e.g. by unsaved changes: when
   * `onOpenChange` is set, zag leaves a dragged sheet where it was dropped
   * instead of snapping it back, so a guarded drag-to-close strands the sheet
   * mid-screen. The X, Escape and a backdrop tap still call `onOpenChange`,
   * and the grabber stays painted so the layout doesn't move.
   * @default false
   */
  dragDisabled?: boolean;
};

export type BottomSheetHeaderProps = HTMLChakraProps<'div'>;
export type BottomSheetBodyProps = HTMLChakraProps<'div'>;
export type BottomSheetFooterProps = HTMLChakraProps<'div'>;
export type BottomSheetOverlayProps = HTMLChakraProps<'div'>;
export type BottomSheetCloseButtonProps = Partial<IconButtonProps>;

/** What `useBottomSheetContext()` returns — Ark's drawer API. */
export type BottomSheetContextValue = UseDrawerContext;
