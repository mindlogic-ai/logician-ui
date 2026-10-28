import React from 'react';
import { Dialog } from '@chakra-ui/react';

/**
 * `overscrollBehavior="contain"`: when the body scrolls, reaching its end does
 * not hand the scroll on to whatever is behind the dialog.
 */
export const ModalBody = ({ ...rest }: Dialog.BodyProps) => {
  return <Dialog.Body px={6} py={4} overscrollBehavior="contain" {...rest} />;
};
