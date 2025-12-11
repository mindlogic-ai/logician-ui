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
 * <IconButton colorScheme="primary" variant="solid" icon={<Icon />} />
 * <IconButton colorScheme="danger" variant="soft" icon={<Icon />} />
 * <IconButton colorScheme="neutral" variant="ghost" icon={<Icon />} />
 * ```
 */
export const IconButton = forwardRef(
  (
    {
      colorScheme = 'primary',
      variant = 'solid',
      sx,
      ...rest
    }: IconButtonProps,
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
        sx={{
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
      />
    );
  }
);

IconButton.displayName = 'IconButton';
