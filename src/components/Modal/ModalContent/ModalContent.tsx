import React from 'react';
import { Dialog } from '@chakra-ui/react';

import { ScaledContext } from '../../ScaledContext';
import { useModalContext } from '../ModalContext';
import { ModalContentProps } from './ModalContent.types';

const fullScreenMobileStyles = {
  w: '100vw',
  h: '100dvh',
  maxW: '100vw',
  maxH: '100dvh',
  borderRadius: 0,
  m: 0,
};

const inlineMobileStyles = {
  mx: 4,
};

export const ModalContent = ({ children, ...rest }: ModalContentProps) => {
  const { fullScreenOnMobile } = useModalContext();

  const mobileStyles = fullScreenOnMobile
    ? fullScreenMobileStyles
    : inlineMobileStyles;

  return (
    <Dialog.Positioner>
      <Dialog.Content mdDown={mobileStyles} {...rest}>
        <ScaledContext fontSize="14px" css={{ display: 'contents' }}>
          {children}
        </ScaledContext>
      </Dialog.Content>
    </Dialog.Positioner>
  );
};
