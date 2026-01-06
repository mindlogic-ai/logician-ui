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
    { children, separator = '›', separatorGap = 2, ...rest }: BreadcrumbProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    // Filter out invalid React elements (null, undefined, false, etc.) to ensure only valid children are rendered
    const validChildren = Children.toArray(children).filter(isValidElement);

    return (
      // ChakraBreadcrumb.List is included internally for backward compatibility with v2 projects that don't expose List separately
      <ChakraBreadcrumb.Root {...rest} ref={ref}>
        <ChakraBreadcrumb.List gap={separatorGap}>
          {validChildren.map((child, index) => {
            // Check if current item is the last breadcrumb to avoid rendering separator after it
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
