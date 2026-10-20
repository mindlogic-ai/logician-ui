import { ForwardedRef, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

import {
  countBadgeBaseStyles,
  countBadgeDotSizes,
  countBadgeSizeStyles,
  formatCount,
} from './CountBadge.styles';
import { CountBadgeProps } from './CountBadge.types';

/**
 * CountBadge — an unread / notification count (moved into the design system
 * from FactChat's `UnreadCountBadge`).
 *
 * - Numeric: `count` as text, capped at `max` (default 99 → `"99+"`). Renders
 *   nothing for 0 unless `showZero`.
 * - Dot (`dot`): a small circle with no number. `aria-hidden` unless it is
 *   given a `label` — then it is an `img` with that name.
 *
 * Give it a `label` whenever the number alone would not make sense out of
 * context (a count on an icon-only button: "읽지 않은 메시지 5개").
 *
 * @example
 * ```tsx
 * <CountBadge count={5} />
 * <CountBadge count={120} label="읽지 않은 알림 120개" />   // shows 99+
 * <CountBadge dot label="새 소식" />
 * ```
 */
export const CountBadge = forwardRef(
  (
    {
      count,
      max = 99,
      dot = false,
      showZero = false,
      label,
      size = 'md',
      'aria-label': ariaLabel,
      ...rest
    }: CountBadgeProps,
    ref?: ForwardedRef<HTMLSpanElement>
  ) => {
    const name = label ?? ariaLabel;
    const isEmpty = (count ?? 0) <= 0;

    if (dot) {
      if (count !== undefined && isEmpty && !showZero) return null;
      const dotSize = countBadgeDotSizes[size];
      return (
        <Box
          as="span"
          display="inline-block"
          flexShrink={0}
          boxSize={dotSize}
          borderRadius="full"
          bgColor="count.bg"
          {...(name
            ? { role: 'img', 'aria-label': name }
            : { 'aria-hidden': true })}
          data-count-badge="dot"
          {...rest}
          ref={ref}
        />
      );
    }

    if (isEmpty && !showZero) return null;

    const text = formatCount(count ?? 0, max);

    return (
      <Box
        as="span"
        {...countBadgeBaseStyles}
        {...countBadgeSizeStyles[size]}
        data-count-badge="count"
        {...rest}
        ref={ref}
      >
        {name ? (
          <>
            <Box as="span" aria-hidden>
              {text}
            </Box>
            <Box as="span" srOnly>
              {name}
            </Box>
          </>
        ) : (
          text
        )}
      </Box>
    );
  }
);

CountBadge.displayName = 'CountBadge';
