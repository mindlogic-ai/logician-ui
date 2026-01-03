import { forwardRef } from 'react';
import { Button as ChakraButton, useToken } from '@chakra-ui/react';

import { getButtonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

/**
 * Button component with two-dimensional variant system.
 *
 * Combines `colorPalette` (semantic color) with `variant` (visual appearance)
 * for flexible, consistent button styling.
 *
 * Supports v2 backward compatibility:
 * - `colorScheme` → `colorPalette`
 * - `isLoading` → `loading`
 * - `isDisabled` → `disabled`
 * - `leftIcon` / `rightIcon` → rendered as children
 *
 * @example
 * ```tsx
 * <Button colorPalette="primary" variant="soft">Submit</Button>
 * <Button colorPalette="danger" variant="solid">Delete</Button>
 * <Button colorPalette="secondary" variant="outline">Cancel</Button>
 * <Button colorPalette="neutral" variant="ghost">Close</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      colorPalette,
      colorScheme, // Deprecated, but maintained for backward compatibility
      variant = 'soft',
      _focus,
      size,
      // v2 backward compatibility props
      isLoading,
      isDisabled,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    const primaryMainColor = useToken('colors', 'primary.main')[0];

    // Support both colorPalette (v3) and colorScheme (v2) for backward compatibility
    const palette = colorPalette ?? colorScheme ?? 'primary';

    const styles = getButtonStyles(palette, variant);

    // v2 → v3 prop mapping
    const isLoadingState = loading ?? isLoading;
    const isDisabledState = disabled ?? isDisabled;

    return (
      <ChakraButton
        border="1px solid"
        lineHeight="1.2"
        fontWeight="semibold"
        size={size}
        textStyle={size === 'xs' ? 'sm' : size} // xs is too small
        borderRadius="md"
        {...styles}
        _focus={{
          outline: 'none',
          boxShadow: `rgb(255, 255, 255) 0px 0px 0px 2px, ${primaryMainColor} 0px 0px 0px 4px`,
          ..._focus,
        }}
        transition="all 0.25s ease-in-out"
        ref={ref}
        loading={isLoadingState}
        disabled={isDisabledState}
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
