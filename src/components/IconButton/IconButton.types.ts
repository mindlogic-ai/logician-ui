import { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';

// Re-export Button types for consistency
export type { ButtonColorScheme, ButtonVariant } from '../Button/Button.types';

/**
 * IconButton color scheme - reuses Button color schemes.
 * @see ButtonColorScheme
 */
export type IconButtonColorScheme =
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
 * Uses the same `colorScheme` and `variant` system as Button
 * for consistent styling across the design system.
 *
 * @note Overrides Chakra UI's `variant` and `colorScheme` props.
 *
 * @example
 * ```tsx
 * <IconButton colorScheme="primary" variant="solid" icon={<Icon />} />
 * <IconButton colorScheme="danger" variant="soft" icon={<Icon />} />
 * ```
 */
export type IconButtonProps = Omit<
  ChakraIconButtonProps,
  'variant' | 'colorScheme'
> & {
  /**
   * The color scheme of the icon button (semantic color family).
   * Overrides Chakra UI's colorScheme prop.
   * @default 'primary'
   */
  colorScheme?: IconButtonColorScheme;
  /**
   * The visual variant of the icon button (fill style).
   * Overrides Chakra UI's variant prop.
   * @default 'solid'
   */
  variant?: IconButtonVariant;
};
