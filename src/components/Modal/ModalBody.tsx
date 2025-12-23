import React, { ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

type DialogBodyBaseProps = React.ComponentProps<typeof Dialog.Body>;

// Extended type for Dialog.Body
type DialogBodyProps = DialogBodyBaseProps & {
  children?: ReactNode;
  css?: Record<string, any>;
};

const DialogBody = Dialog.Body as React.FC<DialogBodyProps>;

export interface ModalBodyProps extends DialogBodyBaseProps {
  children?: ReactNode;
}

export const ModalBody = ({ children, ...rest }: ModalBodyProps) => {
  return (
    <DialogBody css={{ px: 6, py: 4 }} {...rest}>
      {children}
    </DialogBody>
  );
};
