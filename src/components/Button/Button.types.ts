import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

/**
 * Button color scheme - defines the semantic color family.
 *
 * This overrides Chakra UI's colorScheme prop with our Golden Ratio
 * color system values. Chakra's default colorSchemes are not supported.
 *
 * - `primary`: Blue - main brand actions, CTAs
 * - `secondary`: Violet - accent actions, highlights
 * - `danger`: Rose - destructive actions, errors
 * - `success`: Green - positive actions, confirmations
 * - `warning`: Gold - caution actions, alerts
 * - `neutral`: Gray - low-emphasis, tertiary actions
 */
export type ButtonColorScheme =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * Button variant - defines the visual appearance/fill style.
 *
 * This overrides Chakra UI's variant prop with our custom variants.
 * Chakra's default variants (solid, outline, ghost, link) are replaced
 * with our Golden Ratio-based styling system.
 *
 * - `solid`: Filled background with contrasting text (most prominent)
 * - `soft`: Light tinted background with darker text (subtle)
 * - `outline`: Transparent with colored border (medium emphasis)
 * - `ghost`: Transparent with no border (lowest emphasis)
 */
export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';

/**
 * Button props with two-dimensional variant system.
 *
 * Combines `colorScheme` (what color) with `variant` (how it looks)
 * for flexible, consistent button styling.
 *
 * @note Overrides Chakra UI's `variant` and `colorScheme` props.
 *       Chakra's default values are not supported.
 *
 * @example
 * ```tsx
 * <Button colorScheme="primary" variant="solid">Submit</Button>
 * <Button colorScheme="danger" variant="soft">Delete</Button>
 * <Button colorScheme="secondary" variant="outline">Cancel</Button>
 * ```
 */
export type ButtonProps = Omit<
  ChakraButtonProps,
  'variant' | 'colorScheme' | 'leftIcon' | 'rightIcon'
> & {
  /**
   * The color scheme of the button (semantic color family).
   * Overrides Chakra UI's colorScheme prop.
   * @default 'primary'
   */
  colorScheme?: ButtonColorScheme;
  /**
   * The visual variant of the button (fill style).
   * Overrides Chakra UI's variant prop.
   * @default 'solid'
   */
  variant?: ButtonVariant;
};
