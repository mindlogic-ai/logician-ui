import { forwardRef } from 'react';
import { Card as ChakraCard } from '@chakra-ui/react';

import { clickableStyles, variantStyles } from './Card.styles';
import { CardProps } from './Card.types';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ clickable, variant = 'default', _hover, ...rest }, ref) => {
    const mergedHover = clickable
      ? { ...clickableStyles._hover, ..._hover }
      : _hover;

    return (
      <ChakraCard.Root
        ref={ref}
        position="relative"
        bg="white"
        color="inherit"
        boxShadow="none"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        css={{ transition: '0.3s all' }}
        p={8}
        {...(clickable ? { cursor: clickableStyles.cursor } : {})}
        {...variantStyles[variant]}
        {...rest}
        _hover={mergedHover}
      />
    );
  }
);

Card.displayName = 'Card';
