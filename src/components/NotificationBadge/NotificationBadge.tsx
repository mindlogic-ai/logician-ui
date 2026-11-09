import { ForwardedRef, forwardRef } from 'react';
import { Box, Float } from '@chakra-ui/react';

import {
  formatCount,
  notificationBadgeBaseStyles,
  notificationBadgeDotSizes,
  notificationBadgeSizeStyles,
} from './NotificationBadge.styles';
import { NotificationBadgeProps } from './NotificationBadge.types';

/**
 * NotificationBadge — an unread / notification mark (moved into the design
 * system from FactChat's `UnreadCountBadge`; formerly `CountBadge`). Display
 * only: it is never a control.
 *
 * - Numeric: `count` as text, capped at `max` (default 99 → `"99+"`). Renders
 *   nothing for 0 unless `showZero`.
 * - Dot (`dot`): a small circle with no number. `aria-hidden` unless it is
 *   given a `label` — then it is an `img` with that name.
 * - On an icon or avatar: pass it as `children`. The badge floats at its
 *   top-end corner, and `ringColor` cuts it out of what is underneath.
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
 *   <NotificationBadge count={n} ringColor="bg.canvas">
 *     <BellIcon />
 *   </NotificationBadge>
 * </IconButton>
 * ```
 *
 * @example
 * ```tsx
 * <NotificationBadge count={5} />
 * <NotificationBadge count={120} label="읽지 않은 알림 120개" />   // shows 99+
 * <NotificationBadge dot invisible={!hasUnread} ringColor="bg.panel">
 *   <Avatar name={name} size="sm" aria-hidden />
 * </NotificationBadge>
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
      children,
      ringColor,
      invisible = false,
      floatOffset,
      ...rest
    }: NotificationBadgeProps,
    ref?: ForwardedRef<HTMLSpanElement>
  ) => {
    const name = label ?? ariaLabel;
    const isEmpty = (count ?? 0) <= 0;
    // outline, not border: a border is inside the border-box and eats the
    // fill (an 8px dot kept only 4px of red in FactChat's UnreadDot)
    const ring = ringColor
      ? { outline: '2px solid', outlineColor: ringColor }
      : undefined;

    const renderBadge = () => {
      if (invisible) return null;

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
            {...ring}
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
          {...ring}
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
    };

    const badge = renderBadge();
    if (children === undefined || children === null) return badge;

    return (
      <Box as="span" position="relative" display="inline-flex">
        {children}
        {badge && (
          <Float
            as="span"
            placement="top-end"
            offset={floatOffset ?? (dot ? '0.5' : '0')}
            pointerEvents="none"
          >
            {badge}
          </Float>
        )}
      </Box>
    );
  }
);

NotificationBadge.displayName = 'NotificationBadge';
