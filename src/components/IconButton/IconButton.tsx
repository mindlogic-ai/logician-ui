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
      colorPalette,
      colorScheme,
      variant = 'soft',
      css,
      loading,
      disabled,
      children,
      // v2 backward compatibility props
      isLoading,
      isDisabled,
      icon,
      ...rest
    }: IconButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    // v2 backward compatibility: colorScheme -> colorPalette
    const palette = colorPalette ?? colorScheme ?? 'primary';
    // v2 backward compatibility: isLoading -> loading, isDisabled -> disabled
    const loadingState = loading ?? isLoading;
    const disabledState = disabled ?? isDisabled;

    const styles = getIconButtonStyles(palette, variant);

    return (
      <ChakraIconButton
        border="1px solid"
        borderRadius="full"
        {...styles}
        loading={loadingState}
        disabled={disabledState}
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
      >
        {/* v2 backward compatibility: icon prop -> children */}
        {icon || children}
      </ChakraIconButton>
    );
  }
);

IconButton.displayName = 'IconButton';
