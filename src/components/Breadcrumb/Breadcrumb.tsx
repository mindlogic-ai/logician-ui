import { ForwardedRef, forwardRef } from 'react';
import { Breadcrumb as ChakraBreadcrumb } from '@chakra-ui/react';

import { Icon } from '../Icon';
import { BreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb = forwardRef(
  ({ ...rest }: BreadcrumbProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <ChakraBreadcrumb
        separator={<Icon icon="IoChevronForward" color="gray.800" />}
        {...rest}
        ref={ref}
      />
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
