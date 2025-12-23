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

export const Modal = ({ children, isOpen, open, onClose, initialFocusRef, initialFocusEl, onOpenChange, ...rest }: ModalProps) => {
  // Support both isOpen (v2) and open (v3)
  const isDialogOpen = open ?? isOpen;

  // Support both initialFocusRef (v2) and initialFocusEl (v3)
  const resolvedInitialFocusEl = initialFocusEl ?? (initialFocusRef ? () => initialFocusRef.current : undefined);

  // Support both onClose (v2) and onOpenChange (v3)
  const handleOpenChange = (details: { open: boolean }) => {
    if (onOpenChange) onOpenChange(details);
    if (!details.open && onClose) onClose();
  };

  return (
    <DialogRoot
      open={isDialogOpen}
      placement="center"
      closeOnInteractOutside
      initialFocusEl={resolvedInitialFocusEl}
      onOpenChange={handleOpenChange}
      {...rest}
    >
      <Portal>
        <ModalOverlay />
        <DialogPositioner>
          {children}
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};
