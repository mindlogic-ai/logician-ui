import { ForwardedRef, forwardRef } from 'react';
import { Breadcrumb } from '@chakra-ui/react';

import { BreadcrumbLinkProps } from './BreadcrumbLink.types';
// Optional Next.js Link import
let NextLink: any;
try {
  NextLink = require('next/link').default;
} catch {
  NextLink = null;
}

export const BreadcrumbLink = forwardRef(
  (
    { href, children, ...rest }: BreadcrumbLinkProps,
    ref?: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <Breadcrumb.Link
        color="primary.dark"
        asChild={!!NextLink}
        href={href}
        {...rest}
        ref={ref}
      >
        {NextLink ? <NextLink href={href}>{children}</NextLink> : children}
      </Breadcrumb.Link>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';
