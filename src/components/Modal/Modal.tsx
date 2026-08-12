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
        {/* `ModalOverlay` is exported but `Modal` does not use it, so the
            timing has to be set here as well or the default path keeps
            Chakra's 200ms exit and the scrim outlasts the dialog. */}
        <Dialog.Backdrop
          _open={{ animationDuration: 'motion.base' }}
          _closed={{ animationDuration: 'fast' }}
        />
        <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>
      </Portal>
    </Dialog.Root>
  );
};
