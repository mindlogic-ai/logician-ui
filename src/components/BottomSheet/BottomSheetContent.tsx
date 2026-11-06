import React, { forwardRef, useMemo } from 'react';
import { mergeRefs } from '@chakra-ui/react';

import { ScaledContext } from '../ScaledContext';
import type { BottomSheetContentProps } from './BottomSheet.types';
import {
  StyledContent,
  StyledGrabber,
  StyledGrabberIndicator,
  StyledPositioner,
} from './BottomSheetContext';
import { useBlockPullDown } from './useBlockPullDown';
import { useDisabledDrag } from './useDisabledDrag';

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
>(({ showGrabber = true, dragDisabled = false, children, ...rest }, ref) => {
  const { onDisabledDrag, ...props } = rest;
  const disabledDragHandlers = useDisabledDrag({
    onDisabledDrag,
    enabled: dragDisabled,
    props,
  });
  const pullDownRef = useBlockPullDown(dragDisabled);
  const contentRef = useMemo(
    () => mergeRefs(ref, pullDownRef),
    [ref, pullDownRef]
  );

  return (
    <StyledPositioner>
      <StyledContent
        ref={contentRef}
        pt={showGrabber ? undefined : 3}
        {...props}
        {...disabledDragHandlers}
        // Only when set: Ark spreads the prop over its own `draggable: true`,
        // so an explicit `undefined` would turn content drags off.
        {...(dragDisabled && { draggable: false })}
      >
        {showGrabber && (
          // The handle is a pointer affordance only — the sheet is closed from
          // the keyboard with Escape or BottomSheetCloseButton. zag starts a
          // drag from it whatever `draggable` says, so `dragDisabled` takes it
          // off the pointer instead.
          <StyledGrabber
            aria-hidden
            pointerEvents={dragDisabled ? 'none' : undefined}
          >
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
