import { ForwardedRef, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

import {
  countBadgeBaseStyles,
  countBadgeDotSizes,
  countBadgeSizeStyles,
  formatCount,
} from './CountBadge.styles';
import { CountBadgeProps } from './CountBadge.types';
import { CountBadgeAnchor } from './CountBadgeAnchor';

/**
 * CountBadge — an unread / notification count (moved into the design system
 * from FactChat's `UnreadCountBadge`).
 *
 * - Numeric: `count` as text, capped at `max` (default 99 → `"99+"`). Renders
 *   nothing for 0 unless `showZero`.
 * - Dot (`dot`): a small circle with no number. `aria-hidden` unless it is
 *   given a `label` — then it is an `img` with that name.
 * - On an icon or avatar: pass it as `children`. The badge floats at its
 *   top-end corner (`CountBadgeAnchor`), and `ringColor` draws a ring outside
 *   it in the colour behind it.
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
 *   <CountBadge count={n} ringColor="bg.canvas">
 *     <BellIcon />
 *   </CountBadge>
 * </IconButton>
 * ```
 *
 * @example
 * ```tsx
 * <CountBadge count={5} />
 * <CountBadge count={120} label="읽지 않은 알림 120개" />   // shows 99+
 * <CountBadge dot label="새 소식" />
 * <CountBadge dot invisible={!hasUnread} ringColor="bg.panel">
 *   <Avatar name={name} size="sm" aria-hidden />
 * </CountBadge>
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
      children,
      ringColor,
      invisible = false,
      floatOffset,
      ...rest
    }: CountBadgeProps,
    ref?: ForwardedRef<HTMLSpanElement>
  ) => {
    if (children != null) {
      return (
        <CountBadgeAnchor
          count={count}
          max={max}
          dot={dot}
          showZero={showZero}
          label={label}
          aria-label={ariaLabel}
          size={size}
          ringColor={ringColor}
          invisible={invisible}
          floatOffset={floatOffset}
          {...rest}
          ref={ref}
        >
          {children}
        </CountBadgeAnchor>
      );
    }

    if (invisible) return null;

    const name = label ?? ariaLabel;
    const isEmpty = (count ?? 0) <= 0;
    // outline, not border: a border is inside the border-box and eats the
    // fill (an 8px dot kept only 4px of red in FactChat's UnreadDot)
    const ring = ringColor
      ? { outline: '2px solid', outlineColor: ringColor }
      : undefined;

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
          {...ring}
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
  }
);

CountBadge.displayName = 'CountBadge';
