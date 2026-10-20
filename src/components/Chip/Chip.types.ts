import type { ElementType } from 'react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';
import type { TagOwnProps } from '../Tag/Tag.types';

/**
 * 4.x Chip colour schemes, mapped onto Tag at runtime.
 * @deprecated `Chip` is now an alias of `Tag` — use `tone` / `selected` /
 * `category` on `Tag`. Removed in 6.0.
 */
export type ChipColorScheme =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * 4.x Chip variants, mapped onto Tag at runtime.
 * @deprecated Use `Tag`. Removed in 6.0.
 */
export type ChipVariant = 'solid' | 'soft' | 'outline';

/**
 * @deprecated `Chip` is an alias of `Tag` since 5.0 — use `TagOwnProps`.
 * Removed in 6.0.
 *
 * Mapping of the old props: `outline` → neutral, `primary` + `solid` →
 * `selected`, `danger` / `success` / `warning` → that `tone`, everything else
 * → neutral. New Tag props (`tone`, `selected`, `category`) win when given.
 */
export type ChipOwnProps = TagOwnProps & {
  /** @deprecated Use Tag's `tone` / `selected`. */
  colorScheme?: ChipColorScheme;
  /** @deprecated Use Tag's `tone` / `selected`. */
  variant?: ChipVariant;
  /** @deprecated Accepted for 4.x call sites that passed Chakra's palette. */
  colorPalette?: ChipColorScheme;
};

/**
 * @deprecated `Chip` is an alias of `Tag` since 5.0 — use `TagProps`.
 * Removed in 6.0.
 */
export type ChipProps<TElement extends ElementType = 'span'> = PolymorphicProps<
  TElement,
  ChipOwnProps
>;
