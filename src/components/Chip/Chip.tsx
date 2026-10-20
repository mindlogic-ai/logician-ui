import { ForwardedRef, forwardRef } from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { polymorphic } from '../../types/polymorphic';
import { baseStyles, getChipStyles } from './Chip.styles';
import { ChipOwnProps } from './Chip.types';

/**
 * A chip component for displaying tags, labels, or status indicators.
 *
 * Uses a two-dimensional variant system:
 * - `colorScheme`: What semantic color (primary, secondary, danger, etc.)
 * - `variant`: How it looks visually (solid, soft, outline)
 *
 * @example
 * ```tsx
 * <Chip colorScheme="primary" variant="solid">Active</Chip>
 * <Chip colorScheme="danger" variant="soft">Error</Chip>
 * <Chip colorScheme="success" variant="outline">Completed</Chip>
 * ```
 */
const ChipImpl = forwardRef(
  (
    { colorScheme = 'primary', variant = 'soft', ...rest }: ChipOwnProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const styles = getChipStyles(colorScheme, variant);

    return (
      <ChakraBadge
        {...baseStyles}
        {...styles}
        {...focusRing}
        {...rest}
        ref={ref}
      />
    );
  }
);

ChipImpl.displayName = 'Chip';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Chip = polymorphic<ChipOwnProps, 'span'>(ChipImpl);
