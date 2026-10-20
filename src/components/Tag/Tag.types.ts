import type { ElementType, ReactNode } from 'react';
import { TagRootProps } from '@chakra-ui/react';

import type { SystemHue } from '@/theme/colors';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

/**
 * Tag tones (5.0).
 *
 * - `neutral` (default): beige `secondary.surface` with `fg.default` text.
 * - `success` / `warning` / `danger` / `info`: status family `.bg` + `.fg`.
 *   Use them only when the tag reports a status.
 */
export type TagTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

/**
 * 4.x colour palettes. Removed from `TagProps` in 5.0; still accepted at
 * runtime (mapped to `tone` / `selected`) with a one-time dev warning.
 * @deprecated Use `tone`, `selected` or `category`.
 */
export type TagColorPalette =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * 4.x visual variants. Removed from `TagProps` in 5.0 (`outline` is gone).
 * @deprecated Use `tone`, `selected` or `category`.
 */
export type TagVariant = 'soft' | 'solid' | 'outline';

export type TagOwnProps = Omit<
  TagRootProps,
  'colorPalette' | 'variant' | 'as'
> & {
  /**
   * Colour role of the tag. Ignored while `selected` is true or `category`
   * is set.
   * @default 'neutral'
   */
  tone?: TagTone;
  /**
   * Filter-chip "on" state: black `primary.main` fill with `fg.onPrimary`
   * text. Passing it (true OR false) marks the tag as a toggle, so it gets
   * the interactive hover; with `as="button"` it also sets `aria-pressed`.
   */
  selected?: boolean;
  /**
   * Decorative category colour (no status meaning): `category.{hue}.surface`
   * fill with `fg.default` text. `icon` is coloured `category.{hue}.fg`.
   */
  category?: SystemHue;
  /**
   * Leading icon / mark. Takes `category.{hue}.fg` when `category` is set,
   * otherwise the tag's text colour.
   */
  icon?: ReactNode;
  /**
   * Disabled: fixed `disabled.bg` / `disabled.fg`, no hover, clicks ignored.
   * With `as="button"` it sets the native `disabled` attribute.
   */
  disabled?: boolean;
};

/**
 * Props for `Tag`, typed for whatever element `as` renders. Defaults to
 * `'span'`. A filter chip should render `as="button"` (or `as="a"` when it
 * navigates) so it is focusable and keyboard-operable.
 *
 * ```tsx
 * <Tag>Draft</Tag>
 * <Tag tone="success">Active</Tag>
 * <Tag as="button" selected={on} onClick={toggle}>Images</Tag>
 * <Tag category="blue" icon="#">design</Tag>
 * ```
 */
export type TagProps<TElement extends ElementType = 'span'> = PolymorphicProps<
  TElement,
  TagOwnProps
>;
