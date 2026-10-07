import React, { forwardRef } from 'react';

import type { BottomSheetOverlayProps } from './BottomSheet.types';
import { StyledBackdrop } from './BottomSheetContext';

/**
 * The scrim behind a modal sheet. `BottomSheet` already renders one unless
 * `modal={false}`, so reach for this only to render a scrim yourself — for
 * example a decorative one behind a non-modal sheet.
 */
export const BottomSheetOverlay = forwardRef<
  HTMLDivElement,
  BottomSheetOverlayProps
>((props, ref) => <StyledBackdrop ref={ref} {...props} />);

BottomSheetOverlay.displayName = 'BottomSheetOverlay';
