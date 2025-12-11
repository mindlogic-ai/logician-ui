import { Badge as ChakraBadge } from '@chakra-ui/react';

import { baseStyles, getChipStyles } from './Chip.styles';
import { ChipProps } from './Chip.types';

/**
 * A chip component for displaying tags, labels, or status indicators.
 *
 * Uses a two-dimensional variant system:
 * - `colorScheme`: What semantic color (primary, secondary, danger, etc.)
 * - `variant`: How it looks visually (solid, soft, outline)
 *
 * @example
 * <Chip colorScheme="primary" variant="solid">Active</Chip>
 * <Chip colorScheme="danger" variant="soft">Error</Chip>
 */
export const Chip = ({
  colorScheme = 'primary',
  variant = 'soft',
  ...rest
}: ChipProps) => {
  const styles = getChipStyles(colorScheme, variant);

  return <ChakraBadge {...baseStyles} {...styles} {...rest} />;
};

Chip.displayName = 'Chip';
