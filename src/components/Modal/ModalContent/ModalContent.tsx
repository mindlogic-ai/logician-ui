import React from 'react';
import { Dialog, Portal } from '@chakra-ui/react';

import { ModalContentProps } from './ModalContent.types';

export const ModalContent = ({ children, ...rest }: ModalContentProps) => {
  return (
    <Portal>
      <Dialog.Positioner {...({ asChild: true } as any)}>
        <div>
          <Dialog.Content {...rest}>
            {children}
          </Dialog.Content>
        </div>
      </Dialog.Positioner>
    </Portal>
  );
};
