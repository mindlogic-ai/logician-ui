import type { BoxProps } from '@chakra-ui/react';

export type CountBadgeSize = 'sm' | 'md' | 'lg';

export type CountBadgeProps = Omit<BoxProps, 'children'> & {
  /**
   * The number to show. In numeric mode a count of 0 (or less, or missing)
   * renders nothing unless `showZero`. In dot mode a count is optional — pass
   * one to hide the dot when it reaches 0.
   */
  count?: number;
  /**
   * Largest number shown as-is; anything above renders as `"{max}+"`.
   * @default 99
   */
  max?: number;
  /** Dot mode: a small circle with no number ("something new"). */
  dot?: boolean;
  /** Render `0` (numeric) / the dot (dot mode) even when `count` is 0. */
  showZero?: boolean;
  /**
   * Accessible name. In numeric mode it is read INSTEAD of the bare number
   * (e.g. "읽지 않은 알림 120개" rather than "99+"); in dot mode it is what
   * makes the dot visible to assistive tech at all — without it the dot is
   * `aria-hidden`. `aria-label` is accepted as an alias.
   */
  label?: string;
  /** @default 'md' */
  size?: CountBadgeSize;
};
