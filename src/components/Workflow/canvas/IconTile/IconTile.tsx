'use client';

import { Box } from '@chakra-ui/react';

import { getCategoryTokens } from './IconTile.styles';
import type { IconTileProps } from './IconTile.types';

/**
 * The 24×24 tile that carries the only category-derived color in a node.
 * Background uses the category's `bg` token; icon uses the `fg` token.
 *
 * `size` is the tile's outer side in px; the icon renders at the `xs`
 * t-shirt token (16px) to match logician-ui's Icon sizing scale.
 */
export function IconTile({
  category,
  icon: Icon,
  size = 24,
  tokens,
}: IconTileProps) {
  const c = getCategoryTokens(category, tokens);
  return (
    <Box
      width={`${size}px`}
      height={`${size}px`}
      borderRadius="sm"
      bg={c.bg}
      color={c.fg}
      display="grid"
      placeItems="center"
      flexShrink={0}
    >
      <Icon boxSize="xs" />
    </Box>
  );
}
