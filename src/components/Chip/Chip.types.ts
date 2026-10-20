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
 * `colorScheme` / `variant` / `colorPalette` are still in the type ONLY so
 * unmigrated 4.x call sites keep compiling; they are deprecated aliases,
 * mapped at runtime by `mapLegacyTagProps` (with a once-per-combination dev
 * warning) and removed with Chip in 6.0:
 *
 * - `primary` / `secondary` / `neutral` × `soft` (default) or `outline` → neutral
 * - `primary` / `secondary` / `neutral` × `solid` → `selected` (look only — not
 *   a toggle unless `selected` is passed explicitly)
 * - `danger` / `success` / `warning` × `soft` → that `tone`
 * - `danger` / `success` / `warning` × `solid` → that `tone` (no solid fill
 *   in 5.0 — warns "choose by hand")
 * - `danger` / `success` / `warning` × `outline` → neutral (warns "choose by hand")
 *
 * New Tag props (`tone`, `selected`, `category`) win when given.
 */
export type ChipOwnProps = TagOwnProps & {
  /**
   * @deprecated 4.x alias, mapped at runtime — use Tag's `tone` / `selected`.
   * Defaults to `primary` (the 4.x Chip default).
   */
  colorScheme?: ChipColorScheme;
  /**
   * @deprecated 4.x alias, mapped at runtime — use Tag's `selected` (for
   * `solid`) or nothing. Defaults to `soft`.
   */
  variant?: ChipVariant;
  /**
   * @deprecated 4.x alias of `colorScheme` (Chakra's palette prop), mapped
   * at runtime. `colorScheme` wins when both are given.
   */
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
