import { ReactElement } from 'react';
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
 * @deprecated Use ButtonColorPalette instead. Will be removed in next major version.
 */
export type ButtonColorScheme = ButtonColorPalette;

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
   * @deprecated Use colorPalette instead. Maintained for backward compatibility.
   */
  colorScheme?: ButtonColorPalette;
  /**
   * The visual variant of the button (fill style).
   * Overrides Chakra UI's variant prop.
   * @default 'solid'
   */
  variant?: ButtonVariant;
  /**
   * @deprecated Use `loading` instead. Maintained for v2 backward compatibility.
   */
  isLoading?: boolean;
  /**
   * @deprecated Use `disabled` instead. Maintained for v2 backward compatibility.
   */
  isDisabled?: boolean;
  /**
   * @deprecated Render icon as child instead. Maintained for v2 backward compatibility.
   * Example: <Button><Icon /> Text</Button>
   */
  leftIcon?: ReactElement;
  /**
   * @deprecated Render icon as child instead. Maintained for v2 backward compatibility.
   * Example: <Button>Text <Icon /></Button>
   */
  rightIcon?: ReactElement;
};
