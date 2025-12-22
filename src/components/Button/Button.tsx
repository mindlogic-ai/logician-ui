import { forwardRef } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

import { variantStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary', // default to secondary as they are less likely to cause bigger design issues
      _focus,
      size,
      leftIcon,
      rightIcon,
      children,
      ...rest
    },
    ref
  ) => {
    // Use a CSS variable for the primary color
    const primaryMainColor = 'var(--chakra-colors-primary-main, #1A3E8A)';

    return (
      <ChakraButton
        border="1px solid"
        lineHeight="1.2"
        size={size}
        fontSize={size === 'xs' ? 'sm' : size} // xs is too small
        variant={variant === 'link' ? 'plain' : undefined} // if variant isn't link, use our custom variant styles
        {...variantStyles[variant]}
        _focus={{
          outline: 'none',
          boxShadow: `rgb(255, 255, 255) 0px 0px 0px 2px, ${primaryMainColor} 0px 0px 0px 4px`,
          ..._focus,
        }}
        transition="all 0.25s ease-in-out"
        ref={ref}
        {...rest}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </ChakraButton>
    );
  }
);

Button.displayName = 'Button';
