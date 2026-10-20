import React, { ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

import { Subtext } from '../Typography';
import { useModalContext } from './ModalContext';

export type ModalHeaderProps = Dialog.HeaderProps & {
  /**
   * Optional line under the title, in `secondary.fgStrong` when
   * `headerTone="brand"` (and `fg.muted` otherwise).
   */
  subtitle?: ReactNode;
};

export const ModalHeader = ({
  subtitle,
  children,
  ...rest
}: ModalHeaderProps) => {
  const { headerTone } = useModalContext();
  const isBrand = headerTone === 'brand';

  return (
    <Dialog.Header
      textStyle="h4"
      px={4}
      pt={4}
      pb={3}
      borderTopRadius="l3"
      {...(isBrand && { bg: 'secondary.surfaceStrong' })}
      {...rest}
    >
      {children}
      {subtitle && (
        <Subtext
          mt={1}
          fontWeight="normal"
          color={isBrand ? 'secondary.fgStrong' : 'fg.muted'}
        >
          {subtitle}
        </Subtext>
      )}
    </Dialog.Header>
  );
};
