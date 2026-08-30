import { ElementType, ForwardedRef, forwardRef, ReactElement } from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import type { PolymorphicRef } from '../../types/polymorphic';
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
const IconButtonImpl = forwardRef(
  (
    {
      colorPalette = 'neutral',
      variant = 'ghost',
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
        {...focusRing}
        {...rest}
      >
        {children}
      </ChakraIconButton>
    );
  }
);

IconButtonImpl.displayName = 'IconButton';

/**
 * Type-level polymorphism over the same runtime — see the note on `Button`.
 */
export const IconButton = IconButtonImpl as (<
  TElement extends ElementType = 'button',
>(
  props: IconButtonProps<TElement> & { ref?: PolymorphicRef<TElement> }
) => ReactElement) & { displayName?: string };
