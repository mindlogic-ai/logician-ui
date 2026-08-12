import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

/**
 * Button color palette - defines the semantic color family.
 *
 * This overrides Chakra UI's colorPalette prop with our Golden Ratio
 * color system values. Chakra's default colorPalettes are not supported.
 *
 * - `primary`: Blue - main brand actions, CTAs
 * - `secondary`: Violet - accent actions, highlights
 * - `danger`: Rose - destructive actions, errors
 * - `success`: Green - positive actions, confirmations
 * - `warning`: Gold - caution actions, alerts
 * - `neutral`: Gray - low-emphasis, tertiary actions
 */
export type ButtonColorPalette =
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
 * Combines `colorPalette` (what color) with `variant` (how it looks)
 * for flexible, consistent button styling.
 *
 * @note Overrides Chakra UI's `variant` and `colorPalette` props.
 *       Chakra's default values are not supported.
 *
 * @example
 * ```tsx
 * <Button colorPalette="primary" variant="solid">Submit</Button>
 * <Button colorPalette="danger" variant="soft">Delete</Button>
 * <Button colorPalette="secondary" variant="outline">Cancel</Button>
 * ```
 */
export type ButtonProps = Omit<
  ChakraButtonProps,
  'variant' | 'colorScheme' | 'colorPalette' | 'leftIcon' | 'rightIcon'
> & {
  /**
   * The color palette of the button (semantic color family).
   * Overrides Chakra UI's colorPalette prop (Chakra v3).
   * @default 'primary'
   */
  colorPalette?: ButtonColorPalette;
  /**
   * The visual variant of the button (fill style).
   * Overrides Chakra UI's variant prop.
   * @default 'solid'
   */
  variant?: ButtonVariant;
  /**
   * Raises the button 1px on hover and puts a shadow under it, so it reads as
   * lifting toward the pointer. Pressing sets it back down, under the existing
   * `scale` press.
   *
   * Off by default and deliberately opt-in: a lift is emphasis, and a form of
   * six buttons all lifting is noise. Use it where one button is the point of
   * the screen — a primary call to action, a card that is itself a button — not
   * as a house style.
   *
   * The shadow yields to the keyboard focus ring, which is also a `box-shadow`;
   * a focused button that is also hovered keeps its ring and still lifts.
   *
   * @default false
   */
  lift?: boolean;
};
