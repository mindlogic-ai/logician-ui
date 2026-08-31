import type { ElementType } from 'react';
import { TagRootProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

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
export type TagOwnProps = Omit<
  TagRootProps,
  'colorPalette' | 'variant' | 'as'
> & {
  colorPalette?: TagColorPalette;
  variant?: TagVariant;
};

/**
 * Props for `Tag`, typed for whatever element `as` renders. Defaults to
 * `'span'`, so the bare type is unchanged.
 */
export type TagProps<TElement extends ElementType = 'span'> = PolymorphicProps<
  TElement,
  TagOwnProps
>;
