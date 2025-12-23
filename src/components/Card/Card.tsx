import { forwardRef } from 'react';
import { Card as ChakraCard } from '@chakra-ui/react';

import { clickableStyles, variantStyles } from './Card.styles';
import { CardProps } from './Card.types';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ clickable, variant = 'default', ...rest }, ref) => {
    return (
      <ChakraCard.Root
        ref={ref}
        position="relative"
        bgColor="inherit"
        color="inherit"
        boxShadow="none"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
        transition="0.3s all"
        p={8}
        {...(clickable ? clickableStyles : {})}
        {...variantStyles[variant]}
        {...rest}
      />
    );
  }
);

Card.displayName = 'Card';
