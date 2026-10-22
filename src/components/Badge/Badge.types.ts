import type { ElementType } from 'react';
import { BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

/**
 * Badge variants (5.0).
 *
 * - `neutral` (default): `bg.muted` + `secondary.fgStrong` — an attribute
 *   with no state ("Pro", "Beta", "Draft").
 * - `success` / `warning` / `danger` / `info`: `{status}.bg` + `{status}.fg`,
 *   for a meaning every user shares and that is well defined. `info` is a
 *   non-error system fact: scope ("이 그룹만"), permission, read-only, "New".
 *   A label that only classifies or groups is a `Tag` with `category`, never
 *   a status colour. The same label gets the same variant on every screen.
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
