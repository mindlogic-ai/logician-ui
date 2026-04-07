import { forwardRef } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { getButtonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

/**
 * Button component with two-dimensional variant system.
 *
 * Combines `colorPalette` (semantic color) with `variant` (visual appearance)
 * for flexible, consistent button styling.
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
  ({ colorPalette, variant = 'soft', size, children, ...rest }, ref) => {
    const palette = colorPalette ?? 'primary';

    const styles = getButtonStyles(palette, variant);

    /**
     * Chakra Button automatically maps size prop to textStyle:
     * - 2xs, xs → textStyle="xs" (10.5px with 14px base)
     * - sm, md → textStyle="sm" (12.25px with 14px base) ← default
     * - lg, xl → textStyle="md" (14px with 14px base)
     * - 2xl → textStyle="lg" (15.75px with 14px base)
     *
     * We override fontSize for xs size to 'sm' (12.25px) for better readability.
     * Other sizes use Chakra's default textStyle mapping.
     */
    return (
      <ChakraButton
        border="1px solid"
        lineHeight="1.2"
        fontWeight="semibold"
        size={size}
        borderRadius="md"
        {...styles}
        {...focusRing}
        cursor="pointer"
        css={{ transition: 'all 0.25s ease-in-out' }}
        ref={ref}
        {...rest}
      >
        {children}
      </ChakraButton>
    );
  }
);

Button.displayName = 'Button';
