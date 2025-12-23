import React from 'react';
import { Dialog } from '@chakra-ui/react';

type DialogCloseTriggerBaseProps = React.ComponentProps<typeof Dialog.CloseTrigger>;

// Extended type for Dialog.CloseTrigger
type DialogCloseTriggerProps = DialogCloseTriggerBaseProps & {
  color?: string;
  _hover?: Record<string, any>;
};

const DialogCloseTrigger = Dialog.CloseTrigger as React.FC<DialogCloseTriggerProps>;

export interface ModalCloseButtonProps extends DialogCloseTriggerBaseProps {}

export const ModalCloseButton = ({ ...rest }: ModalCloseButtonProps) => {
  return (
    <DialogCloseTrigger
      color="gray.600"
      _hover={{
        color: 'primary.main',
        backgroundColor: 'transparent',
      }}
      {...rest}
    />
  );
};
