import { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';

// Re-export Button types for consistency
export type { ButtonColorScheme, ButtonVariant } from '../Button/Button.types';

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
 * @deprecated Use IconButtonColorPalette instead. Will be removed in next major version.
 */
export type IconButtonColorScheme = IconButtonColorPalette;

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
export type IconButtonProps = Omit<
  ChakraIconButtonProps,
  'variant' | 'colorPalette' | 'icon'
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
