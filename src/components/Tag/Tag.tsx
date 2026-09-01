import { ForwardedRef, forwardRef } from 'react';
import { Tag as ChakraTag } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { getTagStyles } from './Tag.styles';
import { TagOwnProps } from './Tag.types';

/**
 * Tag component for categorization, filtering, and labeling.
 *
 * Uses a two-dimensional variant system:
 * - `colorPalette`: What semantic color (primary, secondary, danger, etc.)
 * - `variant`: How it looks visually (soft, solid, outline)
 *
 * Supports close button via TagCloseButton sub-component.
 *
 * @example
 * ```tsx
 * <Tag colorPalette="primary">Category</Tag>
 * <Tag colorPalette="danger" variant="solid">Error</Tag>
 * <Tag colorPalette="success" variant="outline">
 *   Completed
 *   <TagCloseButton />
 * </Tag>
 * ```
 */
const TagImpl = forwardRef(
  (
    {
      colorPalette = 'neutral',
      variant = 'soft',
      children,
      ...rest
    }: TagOwnProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const styles = getTagStyles(colorPalette, variant);

    return (
      <ChakraTag.Root
        border="1px solid"
        borderRadius="md"
        boxShadow="none"
        fontSize="sm"
        fontWeight="semibold"
        {...styles}
        {...rest}
        ref={ref}
      >
        {children}
      </ChakraTag.Root>
    );
  }
);

TagImpl.displayName = 'Tag';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Tag = polymorphic<TagOwnProps, 'span'>(TagImpl);
