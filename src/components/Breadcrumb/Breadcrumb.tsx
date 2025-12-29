import {
  Children,
  ForwardedRef,
  forwardRef,
  Fragment,
  isValidElement,
} from 'react';
import { Breadcrumb as ChakraBreadcrumb } from '@chakra-ui/react';

import { BreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb = forwardRef(
  (
    { children, separator, separatorGap, ...rest }: BreadcrumbProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const validChildren = Children.toArray(children).filter(isValidElement);

    return (
      <ChakraBreadcrumb.Root {...rest} ref={ref}>
        <ChakraBreadcrumb.List gap={separatorGap}>
          {validChildren.map((child, index) => {
            const last = index === validChildren.length - 1;
            return (
              <Fragment key={`breadcrumb-${index}`}>
                {child}
                {!last && (
                  <ChakraBreadcrumb.Separator>
                    {separator}
                  </ChakraBreadcrumb.Separator>
                )}
              </Fragment>
            );
          })}
        </ChakraBreadcrumb.List>
      </ChakraBreadcrumb.Root>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
