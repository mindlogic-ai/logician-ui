import React from 'react';
import { Dialog, Portal } from '@chakra-ui/react';

import { ModalProps } from './Modal.types';

export const Modal = ({
  children,
  open,
  onOpenChange,
  portalProps,
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
      <Portal {...portalProps}>
        <Dialog.Backdrop />
        {children}
      </Portal>
    </Dialog.Root>
  );
};
