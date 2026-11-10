import { ForwardedRef, forwardRef } from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { baseStyles, resolveBadgeVariant, variantStyles } from './Badge.styles';
import { BadgeOwnProps } from './Badge.types';

/**
 * Badge — a small, non-interactive label.
 *
 * `neutral` (default) is the everyday badge; `success` / `warning` /
 * `danger` / `info` carry a well-defined meaning (a status, or for `info` a
 * system fact such as scope or permission). For an unread/notification number
 * use `CountBadge`; for a removable, selectable or category-only label use
 * `Tag`.
 *
 * @example
 * ```tsx
 * <Badge>Pro</Badge>
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="danger">Error</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="info">New</Badge>
 * ```
 */
const BadgeImpl = forwardRef(
  (
    { textTransform = 'none', variant, ...rest }: BadgeOwnProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const resolved = resolveBadgeVariant(variant);
    return (
      <ChakraBadge
        {...baseStyles}
        {...variantStyles[resolved]}
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
