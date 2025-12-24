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
      colorPalette = 'primary',
      variant = 'soft',
      css,
      ...rest
    }: IconButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const styles = getIconButtonStyles(colorPalette, variant);

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
