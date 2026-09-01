import { ForwardedRef, forwardRef } from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { baseStyles, variantStyles } from './Badge.styles';
import { BadgeOwnProps } from './Badge.types';

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
const BadgeImpl = forwardRef(
  (
    { textTransform = 'none', variant = 'primary', ...rest }: BadgeOwnProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <ChakraBadge
        {...baseStyles}
        {...variantStyles[variant]}
        w="fit-content"
        textTransform={textTransform}
        {...rest}
        ref={ref}
      />
    );
  }
);

/** Type-level polymorphism over the same runtime — see the note on `Button`. */
BadgeImpl.displayName = 'Badge';

export const Badge = polymorphic<BadgeOwnProps, 'span'>(BadgeImpl);
