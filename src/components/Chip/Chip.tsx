import { Badge as ChakraBadge } from '@chakra-ui/react';

import { baseStyles, useCaseStyles } from './Chip.styles';
import { ChipProps, ChipVariant } from './Chip.types';

/**
 * A component that wraps the Chakra Badge component, but styled to look like a Chip component
 */
export const Chip = ({
  useCase = 'primary',
  variant = 'subtle',
  ...rest
}: ChipProps) => {
  const variantStyles = useCaseStyles[useCase]?.[variant] || {};

  return (
    <ChakraBadge
      {...baseStyles}
      {...variantStyles}
      {...rest}
    />
  );
};

Chip.displayName = 'Chip';
