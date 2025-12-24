import { forwardRef } from 'react';
import { Button as ChakraButton, useToken } from '@chakra-ui/react';

import { getButtonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

/**
 * Button component with two-dimensional variant system.
 *
 * Combines `colorScheme` (semantic color) with `variant` (visual appearance)
 * for flexible, consistent button styling.
 *
 * @example
 * ```tsx
 * <Button colorScheme="primary" variant="soft">Submit</Button>
 * <Button colorScheme="danger" variant="solid">Delete</Button>
 * <Button colorScheme="secondary" variant="outline">Cancel</Button>
 * <Button colorScheme="neutral" variant="ghost">Close</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      colorScheme = 'primary',
      variant = 'soft',
      _focus,
      size,
      ...rest
    },
    ref
  ) => {
    const primaryMainColor = useToken('colors', 'primary.main')[0];

    const styles = getButtonStyles(colorScheme, variant);

    return (
      <ChakraButton
        border="1px solid"
        lineHeight="1.2"
        size={size}
        fontSize={size === 'xs' ? 'sm' : size} // xs is too small
        {...styles}
        _focus={{
          outline: 'none',
          boxShadow: `rgb(255, 255, 255) 0px 0px 0px 2px, ${primaryMainColor} 0px 0px 0px 4px`,
          ..._focus,
        }}
        transition="all 0.25s ease-in-out"
        ref={ref}
        {...rest}
      />
    );
  }
);

Button.displayName = 'Button';
