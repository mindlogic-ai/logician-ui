import { Dialog } from '@chakra-ui/react';

import styles from './ModalFooter.module.css';

export const ModalFooter = ({ className, ...rest }: Dialog.FooterProps) => {
  return (
    <Dialog.Footer
      className={[styles['ml-modal-footer'], className].join(' ')}
      gap={3}
      pt={4}
      borderTop="1px solid"
      borderColor="gray.50"
      {...rest}
    />
  );
};
