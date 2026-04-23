import { forwardRef } from 'react';
import { Card as ChakraCard, mergeCss } from '@chakra-ui/react';

import { cardStyles, clickableStyles, variantStyles } from './Card.styles';
import { CardProps } from './Card.types';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ clickable, variant = 'default', _hover, css, ...rest }, ref) => {
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
        transitionProperty="common"
        transitionDuration="normal"
        transitionTimingFunction="ease"
        p={8}
        {...(clickable ? { cursor: clickableStyles.cursor } : {})}
        {...variantStyles[variant]}
        {...rest}
        css={mergeCss(cardStyles, css)}
        _hover={mergedHover}
      />
    );
  }
);

Card.displayName = 'Card';
