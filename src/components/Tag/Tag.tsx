import { ForwardedRef, forwardRef } from 'react';
import { Tag as ChakraTag } from '@chakra-ui/react';

import { getTagStyles } from './Tag.styles';
import { TagProps } from './Tag.types';

/**
 * Tag component for categorization, filtering, and labeling.
 *
 * Uses a two-dimensional variant system:
 * - `colorScheme`: What semantic color (primary, secondary, danger, etc.)
 * - `variant`: How it looks visually (soft, solid, outline)
 *
 * Supports close button via TagCloseButton sub-component.
 *
 * @example
 * ```tsx
 * <Tag colorScheme="primary">Category</Tag>
 * <Tag colorScheme="danger" variant="solid">Error</Tag>
 * <Tag colorScheme="success" variant="outline">
 *   Completed
 *   <TagCloseButton />
 * </Tag>
 * ```
 */
export const Tag = forwardRef(
  (
    { colorScheme = 'neutral', variant = 'soft', ...rest }: TagProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const styles = getTagStyles(colorScheme, variant);

    return <ChakraTag.Root border="1px solid" {...styles} {...rest} ref={ref} />;
  }
);

Tag.displayName = 'Tag';
