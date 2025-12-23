import { ForwardedRef, forwardRef } from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

import { getIconButtonStyles } from './IconButton.styles';
import { IconButtonProps } from './IconButton.types';

/**
 * IconButton component with two-dimensional variant system.
 *
 * Uses the same `colorScheme` and `variant` system as Button
 * for consistent styling across the design system.
 *
 * @example
 * ```tsx
 * <IconButton colorScheme="primary" variant="soft"><Icon /></IconButton>
 * <IconButton colorScheme="danger" variant="solid"><Icon /></IconButton>
 * <IconButton colorScheme="neutral" variant="ghost"><Icon /></IconButton>
 * ```
 */
export const IconButton = forwardRef(
  (
    { colorScheme = 'primary', variant = 'soft', css, ...rest }: IconButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const styles = getIconButtonStyles(colorScheme, variant);

    return (
      <ChakraIconButton
        border="1px solid"
        borderRadius="full"
        {...styles}
        {...rest}
        ref={ref}
        css={{
          ...css,
          '& svg': {
            pointerEvents: 'none',
            ...(css as any)?.['& svg'],
          },
          '& svg *': {
            pointerEvents: 'none',
            ...(css as any)?.['& svg *'],
          },
        }}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
