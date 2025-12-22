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
    // In Chakra v3, use asChild pattern for Next.js Link
    if (NextLink && href) {
      return (
        <Breadcrumb.Link asChild color="primary.dark" {...rest} ref={ref}>
          <NextLink href={href}>{children}</NextLink>
        </Breadcrumb.Link>
      );
    }

    return (
      <Breadcrumb.Link color="primary.dark" href={href} {...rest} ref={ref}>
        {children}
      </Breadcrumb.Link>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';
