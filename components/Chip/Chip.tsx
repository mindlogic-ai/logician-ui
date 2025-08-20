import { Badge as ChakraBadge } from '@chakra-ui/react';

import { baseStyles, useCaseStyles } from './Chip.styles';
import { ChipProps } from './Chip.types';

/**
 * A component that wraps the Chakra Badge component, but styled to look like a Chip component
 */
export const Chip = ({
  useCase = 'primary', // default to secondary as they are less likely to cause bigger design issues
  variant = 'subtle',
  ...rest
}: ChipProps) => {
  return (
    <ChakraBadge
      {...baseStyles}
      {...useCaseStyles[useCase][variant]}
      {...rest}
    />
  );
};

Chip.displayName = 'Chip';
