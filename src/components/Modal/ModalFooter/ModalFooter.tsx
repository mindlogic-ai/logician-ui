import React, { ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

import styles from './ModalFooter.module.css';

type DialogFooterBaseProps = React.ComponentProps<typeof Dialog.Footer>;

// Extended type for Dialog.Footer
type DialogFooterProps = DialogFooterBaseProps & {
  children?: ReactNode;
  className?: string;
  css?: Record<string, any>;
};

const DialogFooter = Dialog.Footer as React.FC<DialogFooterProps>;

export interface ModalFooterProps extends DialogFooterBaseProps {
  children?: ReactNode;
  className?: string;
}

export const ModalFooter = ({ className, children, ...rest }: ModalFooterProps) => {
  return (
    <DialogFooter
      className={[styles['ml-modal-footer'], className].join(' ')}
      css={{
        gap: 3,
        paddingTop: 'var(--chakra-spacing-4)',
        borderTop: '1px solid var(--chakra-colors-gray-50)',
      }}
      {...rest}
    >
      {children}
    </DialogFooter>
  );
};
