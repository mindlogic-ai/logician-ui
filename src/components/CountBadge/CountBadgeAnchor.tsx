import { ForwardedRef, forwardRef } from 'react';
import { Box, Float } from '@chakra-ui/react';

import { CountBadge } from './CountBadge';
import { CountBadgeProps } from './CountBadge.types';

/**
 * Floats a CountBadge at the top-end corner of the icon or avatar it wraps.
 * Internal: `CountBadge` renders this when it is given `children`.
 *
 * The wrapper and the float are `<span>`s, so the whole thing is valid inside
 * a `<button>`. Nothing floats when the badge would render nothing (a 0
 * count, `invisible`), so no empty span is left on the icon.
 */
export const CountBadgeAnchor = forwardRef(
  (
    {
      children,
      invisible = false,
      floatOffset,
      ...badgeProps
    }: CountBadgeProps,
    ref?: ForwardedRef<HTMLSpanElement>
  ) => {
    const { count, dot = false, showZero = false } = badgeProps;
    const isEmpty = (count ?? 0) <= 0;
    // Same rule CountBadge uses: a dot without a count always shows
    const isHidden =
      invisible ||
      (!showZero && (dot ? count !== undefined && isEmpty : isEmpty));

    return (
      <Box as="span" position="relative" display="inline-flex">
        {children}
        {!isHidden && (
          <Float
            as="span"
            placement="top-end"
            offset={floatOffset ?? (dot ? '0.5' : '0')}
            pointerEvents="none"
          >
            <CountBadge {...badgeProps} ref={ref} />
          </Float>
        )}
      </Box>
    );
  }
);

CountBadgeAnchor.displayName = 'CountBadgeAnchor';
