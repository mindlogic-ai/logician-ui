import React from 'react';
import { Dialog } from '@chakra-ui/react';

import { ModalContentProps } from './ModalContent.types';

export const ModalContent = ({ children, ...rest }: ModalContentProps) => {
  return (
    <Dialog.Positioner>
      <Dialog.Content {...rest}>{children}</Dialog.Content>
    </Dialog.Positioner>
  );
};
