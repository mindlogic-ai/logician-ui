import { ForwardedRef, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

import {
  formatCount,
  notificationBadgeBaseStyles,
  notificationBadgeDotSizes,
  notificationBadgeSizeStyles,
} from './NotificationBadge.styles';
import { NotificationBadgeProps } from './NotificationBadge.types';

/**
 * NotificationBadge — an unread / notification count (moved into the design system
 * from FactChat's `UnreadCountBadge`; formerly `CountBadge`).
 *
 * - Numeric: `count` as text, capped at `max` (default 99 → `"99+"`). Renders
 *   nothing for 0 unless `showZero`.
 * - Dot (`dot`): a small circle with no number. `aria-hidden` unless it is
 *   given a `label` — then it is an `img` with that name.
 *
 * Give it a `label` whenever the number alone would not make sense out of
 * context and the badge sits in readable content — next to a nav item's
 * text, in a list row.
 *
 * NOT on an icon-only button: the button's `aria-label` replaces its whole
 * subtree as the accessible name, so the badge's hidden label is never
 * announced. Put the count in the button's `aria-label` instead and leave
 * the badge unlabelled (it is then only the visible number):
 *
 * ```tsx
 * <IconButton aria-label={`알림, 읽지 않음 ${n}개`} variant="ghost">
 *   <BellIcon />
 *   <NotificationBadge count={n} position="absolute" top={0} right={0} />
 * </IconButton>
 * ```
 *
 * @example
 * ```tsx
 * <NotificationBadge count={5} />
 * <NotificationBadge count={120} label="읽지 않은 알림 120개" />   // shows 99+
 * <NotificationBadge dot label="새 소식" />
 * ```
 */
export const NotificationBadge = forwardRef(
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
    }: NotificationBadgeProps,
    ref?: ForwardedRef<HTMLSpanElement>
  ) => {
    const name = label ?? ariaLabel;
    const isEmpty = (count ?? 0) <= 0;

    if (dot) {
      if (count !== undefined && isEmpty && !showZero) return null;
      const dotSize = notificationBadgeDotSizes[size];
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
          data-notification-badge="dot"
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
        {...notificationBadgeBaseStyles}
        {...notificationBadgeSizeStyles[size]}
        data-notification-badge="count"
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

NotificationBadge.displayName = 'NotificationBadge';
