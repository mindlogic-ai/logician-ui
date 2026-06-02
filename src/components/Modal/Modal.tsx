import React, { useMemo } from 'react';
import { Dialog, Portal } from '@chakra-ui/react';

import { ModalProps } from './Modal.types';
import { ModalContext } from './ModalContext';

export const Modal = ({
  children,
  open,
  onOpenChange,
  portalProps,
  fullScreenOnMobile = true,
  ...rest
}: ModalProps) => {
  const ctx = useMemo(() => ({ fullScreenOnMobile }), [fullScreenOnMobile]);

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
        <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>
      </Portal>
    </Dialog.Root>
  );
};
