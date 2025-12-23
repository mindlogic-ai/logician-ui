import React from 'react';
import { Dialog } from '@chakra-ui/react';

type DialogCloseTriggerBaseProps = React.ComponentProps<
  typeof Dialog.CloseTrigger
>;

export interface ModalCloseButtonProps extends DialogCloseTriggerBaseProps {}

export const ModalCloseButton = ({ ...rest }: ModalCloseButtonProps) => {
  return (
    <Dialog.CloseTrigger
      css={{
        color: 'var(--chakra-colors-gray-600)',
        '&:hover': {
          color: 'var(--chakra-colors-primary-main)',
          backgroundColor: 'transparent',
        },
      }}
      {...rest}
    />
  );
};
