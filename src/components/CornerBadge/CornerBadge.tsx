import { ForwardedRef, forwardRef } from 'react';
import { Box, Float } from '@chakra-ui/react';

import { CountBadge } from '../CountBadge';
import { CornerBadgeProps } from './CornerBadge.types';

/**
 * CornerBadge — a CountBadge on the top-end corner of the icon or avatar
 * it wraps (an icon-only button, an account avatar). Next to text, use
 * `CountBadge` on its own.
 *
 * The wrapper and the float are `<span>`s, so the whole thing is valid inside
 * a `<button>`. When the badge renders nothing (a 0 count, `invisible`), only
 * the icon shows.
 *
 * @example
 * ```tsx
 * <IconButton aria-label={`알림, 읽지 않음 ${n}개`} variant="ghost">
 *   <CornerBadge count={n} size="sm" ringColor="bg.canvas">
 *     <BellIcon />
 *   </CornerBadge>
 * </IconButton>
 * <CornerBadge dot invisible={!hasUnread} ringColor="bg.panel">
 *   <Avatar name={name} size="sm" aria-hidden />
 * </CornerBadge>
 * ```
 */
export const CornerBadge = forwardRef(
  (
    { children, ringColor, invisible = false, ...badgeProps }: CornerBadgeProps,
    ref?: ForwardedRef<HTMLSpanElement>
  ) => {
    return (
      <Box as="span" position="relative" display="inline-flex">
        {children}
        {!invisible && (
          <Float
            as="span"
            placement="top-end"
            // A dot sits just inside the corner; a number is centred on it
            offset={badgeProps.dot ? '0.5' : '0'}
            pointerEvents="none"
            // CountBadge renders nothing at 0, so the float is left empty
            _empty={{ display: 'none' }}
          >
            <CountBadge
              {...badgeProps}
              // outline, not border: a border sits inside the border-box and
              // eats the fill (FactChat's 8px dot kept only 4px of red)
              outline={ringColor ? '2px solid' : undefined}
              outlineColor={ringColor}
              ref={ref}
            />
          </Float>
        )}
      </Box>
    );
  }
);

CornerBadge.displayName = 'CornerBadge';
