import React from 'react';
import { Dialog } from '@chakra-ui/react';

export const ModalCloseButton = ({ ...rest }: Dialog.CloseTriggerProps) => {
  return (
    <Dialog.CloseTrigger
      css={
        {
          color: 'gray.600',
          _hover: {
            color: 'primary.main',
            backgroundColor: 'transparent',
          },
        } as any
      }
      {...rest}
      {...({} as any)}
    />
  );
};
