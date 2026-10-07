import React, { forwardRef } from 'react';

import type { BottomSheetFooterProps } from './BottomSheet.types';
import { StyledFooter } from './BottomSheetContext';

/** Action row pinned below the body. */
export const BottomSheetFooter = forwardRef<
  HTMLDivElement,
  BottomSheetFooterProps
>((props, ref) => <StyledFooter ref={ref} {...props} />);

BottomSheetFooter.displayName = 'BottomSheetFooter';
