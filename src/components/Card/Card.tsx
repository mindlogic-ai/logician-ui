import { forwardRef } from 'react';
import { Card as ChakraCard } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { clickableStyles, variantStyles } from './Card.styles';
import { CardOwnProps } from './Card.types';

const CardImpl = forwardRef<HTMLDivElement, CardOwnProps>(
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
        borderColor="border.subtle"
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

/** Type-level polymorphism over the same runtime — see the note on `Button`. */
CardImpl.displayName = 'Card';

export const Card = polymorphic<CardOwnProps, 'div'>(CardImpl);
