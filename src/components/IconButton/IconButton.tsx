import { ForwardedRef, forwardRef } from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { polymorphic } from '../../types/polymorphic';
import { buttonTransition } from '../Button/Button.styles';
import { getIconButtonStyles } from './IconButton.styles';
import { IconButtonOwnProps, IconButtonProps } from './IconButton.types';

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
        // Same press as Button: it inherits the `_active` scale from the shared
        // styles, but Chakra's `common` transition list has no `scale`, so the
        // press used to snap. Same clock and reduced-motion guard as Button.
        scale="1"
        transition={buttonTransition}
        animationStyle="composite"
        {...rest}
      >
        {children}
      </ChakraIconButton>
    );
  }
);

/** Type-level polymorphism over the same runtime — see the note on `Button`. */
IconButtonImpl.displayName = 'IconButton';

export const IconButton = polymorphic<IconButtonOwnProps>(IconButtonImpl);
