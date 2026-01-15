import React from 'react';
import { Dialog } from '@chakra-ui/react';

import { ModalProps } from './Modal.types';

export const Modal = ({
  children,
  open,
  onOpenChange,
  ...rest
}: ModalProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      placement="center"
      closeOnInteractOutside
      {...rest}
    >
      {children}
    </Dialog.Root>
  );
};
