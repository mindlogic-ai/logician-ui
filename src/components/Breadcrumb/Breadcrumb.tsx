import { ForwardedRef, forwardRef } from 'react';
import { Breadcrumb as ChakraBreadcrumb } from '@chakra-ui/react';

import { BreadcrumbProps } from './Breadcrumb.types';
export const Breadcrumb = forwardRef(
  (
    { children, ...rest }: BreadcrumbProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ChakraBreadcrumb.Root {...rest} ref={ref}>
        <ChakraBreadcrumb.List>{children}</ChakraBreadcrumb.List>
      </ChakraBreadcrumb.Root>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
