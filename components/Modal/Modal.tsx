import React from 'react';
import { Modal as ChakraModal } from '@chakra-ui/react';

import { ModalProps } from './Modal.types';
import { ModalOverlay } from './ModalOverlay';

export const Modal = ({ children, ...rest }: ModalProps) => {
  return (
    <ChakraModal isCentered closeOnOverlayClick {...rest}>
      <ModalOverlay />
      {children}
    </ChakraModal>
  );
};
