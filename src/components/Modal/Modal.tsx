import React, { ReactNode } from 'react';
import { Dialog, Portal } from '@chakra-ui/react';

import { ModalProps } from './Modal.types';
import { ModalOverlay } from './ModalOverlay';

// Extended types for Dialog components
type DialogRootProps = React.ComponentProps<typeof Dialog.Root> & {
  children?: ReactNode;
};

type DialogPositionerProps = React.ComponentProps<typeof Dialog.Positioner> & {
  children?: ReactNode;
};

const DialogRoot = Dialog.Root as React.FC<DialogRootProps>;
const DialogPositioner = Dialog.Positioner as React.FC<DialogPositionerProps>;

export const Modal = ({ children, isOpen, open, ...rest }: ModalProps) => {
  // Support both isOpen (v2) and open (v3)
  const isDialogOpen = open ?? isOpen;

  return (
    <DialogRoot open={isDialogOpen} placement="center" closeOnInteractOutside {...rest}>
      <Portal>
        <ModalOverlay />
        <DialogPositioner>
          {children}
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};
