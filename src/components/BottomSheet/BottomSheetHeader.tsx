import React, { forwardRef } from 'react';

import type { BottomSheetHeaderProps } from './BottomSheet.types';
import { StyledHeader, StyledTitle } from './BottomSheetContext';

/**
 * The sheet's header row. Its children are rendered as the sheet's **title**
 * (Ark's `Drawer.Title`), which is what the content's `aria-labelledby` points
 * at — so a header is how a sheet gets its accessible name.
 */
export const BottomSheetHeader = forwardRef<
  HTMLDivElement,
  BottomSheetHeaderProps
>(({ children, ...rest }, ref) => {
  return (
    <StyledHeader ref={ref} {...rest}>
      <StyledTitle>{children}</StyledTitle>
    </StyledHeader>
  );
});

BottomSheetHeader.displayName = 'BottomSheetHeader';
