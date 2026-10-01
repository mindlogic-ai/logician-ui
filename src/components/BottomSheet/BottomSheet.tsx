import React from 'react';
import { Portal } from '@chakra-ui/react';

import type { BottomSheetProps } from './BottomSheet.types';
import { StyledRoot } from './BottomSheetContext';
import { BottomSheetOverlay } from './BottomSheetOverlay';

/**
 * A sheet that rises from the bottom edge and can be dragged between snap
 * points or swiped away — built on Ark's `Drawer` (zag-js), not on Chakra's
 * `Drawer`, which wraps Ark's *Dialog* and so has no swipe, snap points or
 * grabber.
 *
 * Same shape as `Modal`: this is the root and the portal, and the overlay comes
 * with it whenever the sheet is modal. Pass `modal={false}` for a sheet that
 * leaves the page behind it interactive (no overlay, no focus trap, no scroll
 * lock) — typically with `snapPoints` so it can rest half-open.
 *
 * @example
 * ```tsx
 * <BottomSheet open={open} onOpenChange={(e) => setOpen(e.open)}>
 *   <BottomSheetContent>
 *     <BottomSheetHeader>노드 추가</BottomSheetHeader>
 *     <BottomSheetCloseButton />
 *     <BottomSheetBody>…</BottomSheetBody>
 *   </BottomSheetContent>
 * </BottomSheet>
 * ```
 */
export const BottomSheet = ({
  children,
  portalProps,
  ...rest
}: BottomSheetProps) => {
  const isModal = rest.modal !== false;

  return (
    <StyledRoot {...rest}>
      <Portal {...portalProps}>
        {isModal && <BottomSheetOverlay />}
        {children}
      </Portal>
    </StyledRoot>
  );
};

BottomSheet.displayName = 'BottomSheet';
