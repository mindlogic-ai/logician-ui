import { TagProps as ChakraTagProps } from '@chakra-ui/react';

/**
 * Tag color schemes - determines the semantic color of the tag.
 *
 * This prop overrides Chakra UI's native `colorScheme` prop to provide
 * a controlled set of color options that align with our design system.
 */
export type TagColorScheme =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * Tag variants - determines the visual style of the tag.
 *
 * - soft: Light background tint with darker text (default)
 * - solid: Filled background with contrasting text
 * - outline: Transparent background with colored border
 */
export type TagVariant = 'soft' | 'solid' | 'outline';

/**
 * TagProps uses a two-dimensional variant system:
 * - `colorScheme`: What semantic color (primary, secondary, danger, etc.)
 * - `variant`: How it looks visually (soft, solid, outline)
 *
 * This matches the Button and Chip component architecture for consistency.
 *
 * @example
 * ```tsx
 * <Tag colorScheme="primary" variant="soft">Category</Tag>
 * <Tag colorScheme="danger" variant="solid">Error</Tag>
 * <Tag colorScheme="success" variant="outline">
 *   Completed
 *   <TagCloseButton />
 * </Tag>
 * ```
 */
export interface TagProps extends Omit<ChakraTagProps, 'colorScheme' | 'variant'> {
  colorScheme?: TagColorScheme;
  variant?: TagVariant;
}
