import { ForwardedRef, forwardRef } from 'react';
import { BreadcrumbLink as ChakraBreadcrumbLink } from '@chakra-ui/react';
import Link from 'next/link';

import { BreadcrumbLinkProps } from './BreadcrumbLink.types';

export const BreadcrumbLink = forwardRef(
  ({ ...rest }: BreadcrumbLinkProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <ChakraBreadcrumbLink
        color="primary.dark"
        as={Link}
        {...rest}
        ref={ref}
      />
    );
  },
);

BreadcrumbLink.displayName = 'BreadcrumbLink';
