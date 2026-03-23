import { ForwardedRef, forwardRef } from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

import { getIconButtonStyles } from './IconButton.styles';
import { IconButtonProps } from './IconButton.types';

/**
 * IconButton component with two-dimensional variant system.
 *
 * Uses the same `colorPalette` and `variant` system as Button
 * for consistent styling across the design system.
 *
 * @example
 * ```tsx
 * <IconButton colorPalette="primary" variant="soft"><Icon /></IconButton>
 * <IconButton colorPalette="danger" variant="solid"><Icon /></IconButton>
 * <IconButton colorPalette="neutral" variant="ghost"><Icon /></IconButton>
 * ```
 */
export const IconButton = forwardRef(
  (
    {
      colorPalette = 'neutral',
      variant = 'ghost',
      color = 'gray.600',
      children,
      ...rest
    }: IconButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const styles = getIconButtonStyles(colorPalette, variant);

    return (
      <ChakraIconButton
        ref={ref}
        border="1px solid"
        rounded="full"
        {...styles}
        {...rest}
      >
        {children}
      </ChakraIconButton>
    );
  }
);

IconButton.displayName = 'IconButton';
