import React, { forwardRef } from 'react';

import { useTranslate } from '@/hooks/useTranslate';

import { CloseIcon } from '../Icon';
import { IconButton } from '../IconButton';
import type { BottomSheetCloseButtonProps } from './BottomSheet.types';
import { StyledCloseTrigger } from './BottomSheetContext';

/**
 * Closes the sheet. Placed in the top-right corner of `BottomSheetContent`;
 * render it as a direct child of the content (next to the header, not inside
 * it), the way `ModalCloseButton` sits in `ModalContent`.
 *
 * Carries a translated `aria-label` ("닫기") by default — an icon-only button
 * has no other name.
 */
export const BottomSheetCloseButton = forwardRef<
  HTMLButtonElement,
  BottomSheetCloseButtonProps
>(({ children, ...rest }, ref) => {
  const translate = useTranslate();

  return (
    <StyledCloseTrigger asChild>
      <IconButton
        ref={ref}
        aria-label={translate('close') as string}
        size="sm"
        variant="ghost"
        colorPalette="neutral"
        {...rest}
      >
        {children ?? <CloseIcon boxSize="xs" aria-hidden />}
      </IconButton>
    </StyledCloseTrigger>
  );
});

BottomSheetCloseButton.displayName = 'BottomSheetCloseButton';
