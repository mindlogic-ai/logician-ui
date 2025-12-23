import React, { ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

type DialogHeaderBaseProps = React.ComponentProps<typeof Dialog.Header>;

// Extended type for Dialog.Header
type DialogHeaderProps = DialogHeaderBaseProps & {
  children?: ReactNode;
  css?: Record<string, any>;
};

const DialogHeader = Dialog.Header as React.FC<DialogHeaderProps>;

export interface ModalHeaderProps extends DialogHeaderBaseProps {
  children?: ReactNode;
}

export const ModalHeader = ({ children, ...rest }: ModalHeaderProps) => {
  return (
    <DialogHeader css={{ fontSize: 'var(--chakra-font-sizes-xl)' }} {...rest}>
      {children}
    </DialogHeader>
  );
};
