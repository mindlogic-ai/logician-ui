import { ForwardedRef, forwardRef } from 'react';
import { BreadcrumbItem as ChakraBreadcrumbItem } from '@chakra-ui/react';

import { BreadcrumbItemProps } from './BreadcrumbItem.types';

export const BreadcrumbItem = forwardRef(
  ({ ...rest }: BreadcrumbItemProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraBreadcrumbItem {...rest} ref={ref} />;
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
