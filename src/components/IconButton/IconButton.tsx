import { ForwardedRef, forwardRef } from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

import { variantStyles } from './IconButton.styles';
import { IconButtonProps } from './IconButton.types';

export const IconButton = forwardRef(
  (
    { variant = 'link', sx, icon, children, ...rest }: IconButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    // Support both deprecated icon prop and new children prop
    const content = children ?? icon;

    return (
      <ChakraIconButton
        border="1px solid"
        borderRadius="full"
        background="transparent"
        {...variantStyles[variant]}
        {...rest}
        ref={ref}
        css={{
          ...sx,
          '& svg': {
            pointerEvents: 'none',
            ...(sx as any)?.['& svg'],
          },
          '& svg *': {
            pointerEvents: 'none',
            ...(sx as any)?.['& svg *'],
          },
        }}
      >
        {content}
      </ChakraIconButton>
    );
  }
);

IconButton.displayName = 'IconButton';
