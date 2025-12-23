import { ForwardedRef, forwardRef } from 'react';
import { Breadcrumb } from '@chakra-ui/react';

import { IoChevronForward } from '../../Icon';
import { BreadcrumbItemProps } from './BreadcrumbItem.types';

export const BreadcrumbItem = forwardRef(
  ({ children, ...rest }: BreadcrumbItemProps, ref?: ForwardedRef<HTMLLIElement>) => {
    return (
      <Breadcrumb.Item {...rest} ref={ref}>
        {children}
        <Breadcrumb.Separator>
          <IoChevronForward color="gray.800" />
        </Breadcrumb.Separator>
      </Breadcrumb.Item>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
