import React, { forwardRef } from 'react';

import type { BottomSheetBodyProps } from './BottomSheet.types';
import { StyledBody } from './BottomSheetContext';

/**
 * The scrolling region. Takes whatever height the header and footer leave and
 * scrolls inside it; zag only starts a drag from here once the list is scrolled
 * to the top (`preventDragOnScroll`), so scrolling a list never drags the sheet.
 */
export const BottomSheetBody = forwardRef<HTMLDivElement, BottomSheetBodyProps>(
  (props, ref) => <StyledBody ref={ref} {...props} />
);

BottomSheetBody.displayName = 'BottomSheetBody';
