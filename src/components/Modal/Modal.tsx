import React from 'react';
import { Dialog } from '@chakra-ui/react';

import { ModalProps } from './Modal.types';
import { ModalOverlay } from './ModalOverlay';

export const Modal = ({
  children,
  open,
  onOpenChange,
  // v2 backward compatibility props
  isOpen,
  onClose,
  ...rest
}: ModalProps) => {
  // v2 backward compatibility: isOpen -> open
  const isOpenState = open ?? isOpen;

  // v2 backward compatibility: onClose -> onOpenChange
  const handleOpenChange = (details: { open: boolean }) => {
    onOpenChange?.(details);
    if (!details.open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog.Root
      open={isOpenState}
      onOpenChange={handleOpenChange}
      placement="center"
      closeOnInteractOutside
      {...rest}
    >
      <ModalOverlay />
      {children}
    </Dialog.Root>
  );
};
