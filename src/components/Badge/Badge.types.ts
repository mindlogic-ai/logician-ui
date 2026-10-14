import type { ElementType } from 'react';
import { BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

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

export type BadgeOwnProps = Omit<ChakraBadgeProps, 'variant' | 'as'> & {
  /**
   * The color variant of the badge.
   * @default 'primary'
   */
  variant?: BadgeVariant;
};

/**
 * Props for `Badge`, typed for whatever element `as` renders.
 *
 * Defaults to `'span'`, so bare `BadgeProps` is unchanged. A badge that acts as
 * a citation or filter link is the case that needs this.
 *
 * ```tsx
 * <Badge as="a" href={`#cite-${n}`}>{n}</Badge>
 * ```
 */
export type BadgeProps<TElement extends ElementType = 'span'> =
  PolymorphicProps<TElement, BadgeOwnProps>;
