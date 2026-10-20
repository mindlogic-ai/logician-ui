import type { ElementType } from 'react';
import { BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

/**
 * Badge variants (5.0).
 *
 * - `neutral` (default): beige `secondary.surface` with `secondary.fgStrong`
 *   text — the everyday label ("Pro", "Beta", "Draft").
 * - `success` / `warning` / `danger` / `info`: the status family's soft
 *   `{status}.bg` surface with `{status}.fg` text. Use these ONLY when the
 *   badge reports a status — never as decoration.
 *
 * **Breaking in 5.0:** `primary` and `secondary` were removed. At runtime they
 * still render (as `neutral`) and warn once in development.
 */
export type BadgeVariant =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * 4.x variants that 5.0 maps to `neutral` at runtime.
 * @deprecated Removed from the type in 5.0; use `neutral`.
 */
export type LegacyBadgeVariant = 'primary' | 'secondary';

export type BadgeOwnProps = Omit<ChakraBadgeProps, 'variant' | 'as'> & {
  /**
   * The colour role of the badge.
   * @default 'neutral'
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
