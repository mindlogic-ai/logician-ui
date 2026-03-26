import { ForwardedRef, forwardRef } from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';

import { baseStyles, sizeStyles, variantStyles } from './Badge.styles';
import { BadgeProps } from './Badge.types';

/**
 * Badge component with color variants using the Golden Ratio color system.
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="danger">Error</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="secondary">Featured</Badge>
 * <Badge variant="neutral">Draft</Badge>
 * ```
 */
export const Badge = forwardRef(
  (
    {
      textTransform = 'none',
      variant = 'primary',
      size = 'md',
      ...rest
    }: BadgeProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <ChakraBadge
        {...baseStyles}
        {...sizeStyles[size]}
        {...variantStyles[variant]}
        w="fit-content"
        textTransform={textTransform}
        {...rest}
        ref={ref}
      />
    );
  }
);

Badge.displayName = 'Badge';
