import { ForwardedRef, forwardRef } from 'react';
import {
  Badge as ChakraBadge,
  BadgeProps as ChakraBadgeProps,
} from '@chakra-ui/react';

import { baseStyles } from './Badge.styles';

export const Badge = forwardRef(
  (
    { textTransform = 'none', ...rest }: ChakraBadgeProps,
    ref?: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <ChakraBadge
        {...baseStyles}
        w="fit-content"
        textTransform={textTransform}
        {...rest}
        ref={ref}
      />
    );
  },
);

Badge.displayName = 'Badge';
