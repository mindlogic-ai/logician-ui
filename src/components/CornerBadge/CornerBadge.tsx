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
 * a `<button>`. Nothing floats when the badge would render nothing (a 0
 * count, `invisible`), so no empty span is left on the icon.
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
    const { count, dot = false, showZero = false } = badgeProps;
    const isEmpty = (count ?? 0) <= 0;
    // Same rule CountBadge uses: a dot without a count always shows
    const isHidden =
      invisible ||
      (!showZero && (dot ? count !== undefined && isEmpty : isEmpty));
    // outline, not border: a border is inside the border-box and eats the
    // fill (an 8px dot kept only 4px of red in FactChat's UnreadDot)
    const ring = ringColor
      ? { outline: '2px solid', outlineColor: ringColor }
      : undefined;

    return (
      <Box as="span" position="relative" display="inline-flex">
        {children}
        {!isHidden && (
          <Float
            as="span"
            placement="top-end"
            // A dot sits just inside the corner; a number is centred on it
            offset={dot ? '0.5' : '0'}
            pointerEvents="none"
          >
            <CountBadge {...badgeProps} {...ring} ref={ref} />
          </Float>
        )}
      </Box>
    );
  }
);

CornerBadge.displayName = 'CornerBadge';
