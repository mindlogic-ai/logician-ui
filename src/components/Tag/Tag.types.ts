import { BoxProps } from '@chakra-ui/react';

/**
 * Tag color schemes - determines the semantic color of the tag.
 *
 * This prop overrides Chakra UI's native `colorPalette` prop to provide
 * a controlled set of color options that align with our design system.
 */
export type TagColorPalette =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * @deprecated Use TagColorPalette instead. Will be removed in next major version.
 */
export type TagColorScheme = TagColorPalette;

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
 * - `colorPalette`: What semantic color (primary, secondary, danger, etc.)
 * - `variant`: How it looks visually (soft, solid, outline)
 *
 * This matches the Button and Chip component architecture for consistency.
 *
 * @example
 * ```tsx
 * <Tag colorPalette="primary" variant="soft">Category</Tag>
 * <Tag colorPalette="danger" variant="solid">Error</Tag>
 * <Tag colorPalette="success" variant="outline">
 *   Completed
 *   <TagCloseButton />
 * </Tag>
 * ```
 */
export interface TagProps extends Omit<BoxProps, 'colorPalette' | 'variant'> {
  colorPalette?: TagColorPalette;
  variant?: TagVariant;
}
