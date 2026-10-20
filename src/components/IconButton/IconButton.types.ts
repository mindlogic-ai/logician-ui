import type { ElementType } from 'react';
import { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';

import type { PolymorphicProps } from '../../types/polymorphic';

// Re-export Button types for consistency
export type { ButtonVariant } from '../Button/Button.types';

/**
 * IconButton color scheme - reuses Button color schemes.
 * @see ButtonColorScheme
 */
export type IconButtonColorPalette =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * IconButton variant - reuses Button variants.
 * @see ButtonVariant
 */
export type IconButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';

/**
 * IconButton props with two-dimensional variant system.
 *
 * Uses the same `colorPalette` and `variant` system as Button
 * for consistent styling across the design system.
 *
 * @note Overrides Chakra UI's `variant` and `colorPalette` props.
 *
 * @example
 * ```tsx
 * <IconButton colorPalette="primary" variant="solid"><Icon /></IconButton>
 * <IconButton colorPalette="danger" variant="soft"><Icon /></IconButton>
 * ```
 */
export type IconButtonOwnProps = Omit<
  ChakraIconButtonProps,
  'variant' | 'colorPalette' | 'colorScheme' | 'icon' | 'as'
> & {
  /**
   * The color scheme of the icon button (semantic color family).
   * Overrides Chakra UI's colorPalette prop.
   * @default 'primary'
   */
  colorPalette?: IconButtonColorPalette;
  /**
   * The visual variant of the icon button (fill style).
   * Overrides Chakra UI's variant prop.
   * @default 'solid'
   */
  variant?: IconButtonVariant;
};

/**
 * Props for `IconButton`, typed for whatever element `as` renders.
 *
 * Defaults to `'button'`, so `IconButtonProps` on its own is unchanged. Same
 * shape and same reasoning as `ButtonProps` — see `Button.types.ts` and
 * `src/types/polymorphic.ts`.
 *
 * ```tsx
 * <IconButton as="a" href={file} download aria-label="내려받기"><Icon /></IconButton>
 * ```
 */
export type IconButtonProps<TElement extends ElementType = 'button'> =
  PolymorphicProps<TElement, IconButtonOwnProps>;
