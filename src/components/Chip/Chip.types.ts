import { BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';

/**
 * Chip color schemes - determines the semantic color of the chip.
 *
 * This prop overrides Chakra UI's native `colorScheme` prop to provide
 * a controlled set of color options that align with our design system.
 *
 * @example
 * <Chip colorScheme="primary" variant="solid">Primary</Chip>
 * <Chip colorScheme="danger" variant="soft">Error</Chip>
 */
export type ChipColorScheme =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * Chip variants - determines the visual style of the chip.
 *
 * - solid: Filled background with contrasting text
 * - soft: Light background tint with darker text
 * - outline: Transparent background with colored border
 */
export type ChipVariant = 'solid' | 'soft' | 'outline';

/**
 * ChipProps uses a two-dimensional variant system:
 * - `colorScheme`: What semantic color (primary, secondary, danger, etc.)
 * - `variant`: How it looks visually (solid, soft, outline)
 *
 * This matches the Button component's architecture for consistency.
 */
export interface ChipProps extends Omit<
  ChakraBadgeProps,
  'colorScheme' | 'variant'
> {
  colorScheme?: ChipColorScheme;
  variant?: ChipVariant;
}
