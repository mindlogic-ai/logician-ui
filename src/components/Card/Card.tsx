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
        bg="bg.surface"
        color="fg.default"
        boxShadow="none"
        border="1px solid"
        // border.default (gray.300 / gray.1100 _dark) instead of border.subtle:
        // subtle's _dark (gray.1300 #1E2433) is ~invisible on bg.surface in dark,
        // so cards blended into the canvas. default gives the card a discernible
        // edge in both modes. The `gradient` variant keeps its primary.light border.
        borderColor="border.default"
        borderRadius="lg"
        // Was `transitionDuration="normal"` — a Chakra v2 token absent from v3.
        // It fell through as a literal, `transition-duration: normal` is invalid
        // CSS, and the whole declaration was dropped, so hover never transitioned.
        animationStyle="feedback"
        transitionProperty="common"
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
