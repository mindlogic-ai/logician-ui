import React, { forwardRef } from 'react';

import { ScaledContext } from '../ScaledContext';
import type { BottomSheetContentProps } from './BottomSheet.types';
import {
  StyledContent,
  StyledGrabber,
  StyledGrabberIndicator,
  StyledPositioner,
} from './BottomSheetContext';

/**
 * The sheet surface: Ark's positioner, the content panel and, by default, the
 * drag handle. Style props land on the panel.
 *
 * The panel is capped at 85% of the dynamic viewport height; put long content
 * in `BottomSheetBody`, which is the part that scrolls.
 */
export const BottomSheetContent = forwardRef<
  HTMLDivElement,
  BottomSheetContentProps
>(({ showGrabber = true, children, ...rest }, ref) => {
  return (
    <StyledPositioner>
      <StyledContent ref={ref} pt={showGrabber ? undefined : 3} {...rest}>
        {showGrabber && (
          // The handle is a pointer affordance only — the sheet is closed from
          // the keyboard with Escape or BottomSheetCloseButton.
          <StyledGrabber aria-hidden>
            <StyledGrabberIndicator />
          </StyledGrabber>
        )}
        {/* Same base size Modal's content uses, so a list reads identically
            in either surface. */}
        <ScaledContext fontSize="14px" css={{ display: 'contents' }}>
          {children}
        </ScaledContext>
      </StyledContent>
    </StyledPositioner>
  );
});

BottomSheetContent.displayName = 'BottomSheetContent';
