import { BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';

/**
 * Badge variant types for the Golden Ratio color system.
 *
 * Each variant uses the `lightest` background shade with `dark` text
 * for optimal readability and WCAG AA compliance.
 *
 * - `primary`: Default blue badge for general purpose
 * - `secondary`: Violet accent badge
 * - `success`: Green badge for positive states
 * - `warning`: Gold badge for caution states
 * - `danger`: Rose badge for error/negative states
 * - `neutral`: Gray badge for neutral information
 */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<ChakraBadgeProps, 'variant' | 'size'> {
  /**
   * The color variant of the badge.
   * @default 'primary'
   */
  variant?: BadgeVariant;
  /**
   * The size of the badge.
   * @default 'md'
   */
  size?: BadgeSize;
}
