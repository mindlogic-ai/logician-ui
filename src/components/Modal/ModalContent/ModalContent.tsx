import React, { ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

import { ModalContentProps } from './ModalContent.types';

// Extended type for Dialog.Content
type DialogContentProps = React.ComponentProps<typeof Dialog.Content> & {
  children?: ReactNode;
};

const DialogContent = Dialog.Content as React.FC<DialogContentProps>;

export const ModalContent = ({ children, ...rest }: ModalContentProps) => {
  return <DialogContent {...rest}>{children}</DialogContent>;
};
