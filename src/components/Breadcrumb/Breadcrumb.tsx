import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Breadcrumb as ChakraBreadcrumb } from '@chakra-ui/react';

import { IoChevronForward } from '../Icon';
import { BreadcrumbProps } from './Breadcrumb.types';

export interface ExtendedBreadcrumbProps extends BreadcrumbProps {
  children?: ReactNode;
  /** @deprecated Custom separator support via compound pattern in v3 */
  separator?: ReactNode;
}

export const Breadcrumb = forwardRef(
  ({ separator, children, ...rest }: ExtendedBreadcrumbProps, ref?: ForwardedRef<HTMLElement>) => {
    // In Chakra v3, separator is handled via Breadcrumb.Separator component
    return (
      <ChakraBreadcrumb.Root {...rest} ref={ref}>
        {children}
      </ChakraBreadcrumb.Root>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// Export the separator component for use in BreadcrumbItem
export const BreadcrumbSeparator = () => (
  <ChakraBreadcrumb.Separator>
    <IoChevronForward color="gray.800" boxSize="xs" />
  </ChakraBreadcrumb.Separator>
);
