import { forwardRef } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { buttonTransition, getButtonStyles } from './Button.styles';
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
 * <Button colorPalette="primary" variant="solid" lift>Get started</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      colorPalette,
      variant = 'soft',
      size,
      lift,
      children,
      _hover: hoverProp,
      _active: activeProp,
      ...rest
    },
    ref
  ) => {
    const palette = colorPalette ?? 'primary';

    const base = getButtonStyles(palette, variant);

    // Merged rather than spread after: each variant already owns `_hover` and
    // `_active` for its colours, and replacing either would drop them.
    const styles = lift
      ? {
          ...base,
          _hover: {
            ...base._hover,
            translate: '0 -1px',
            // `drop-shadow`, not `box-shadow`. The keyboard focus ring is a
            // box-shadow, and Chakra emits `:hover` after `:focus-visible`, so
            // a focused button being hovered would lose its ring to this. A
            // different property cannot collide with it at all — and unlike a
            // box-shadow it follows the border radius for free.
            filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.18))',
            // A black shadow does nothing on a dark canvas; deepen it there.
            _dark: { filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.55))' },
          },
          // Pressing puts it back on the surface, under the `scale`.
          _active: { ...base._active, translate: '0 0', filter: 'none' },
          // `:hover` still matches a disabled button, so the lift has to be
          // switched off here rather than left to pointer-events.
          _disabled: { translate: '0 0', filter: 'none' },
        }
      : base;

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
        // Merged, not left to `{...rest}`. A prop spread later replaces the
        // whole object, so a call site adding one line — the 2px press ledge
        // FactChat puts on its quiz buttons — used to silently drop the
        // variant's pressed colour *and* the scale with it, and the button
        // stopped reading as pressed at all. Its own keys still win; it just
        // no longer erases the ones it did not mention.
        _hover={{ ...styles._hover, ...hoverProp }}
        _active={{ ...styles._active, ...activeProp }}
        {...focusRing}
        cursor="pointer"
        // Explicit identity so the press transitions from a definite value
        // rather than relying on `scale: none` being read as 1.
        scale="1"
        // Two clocks on one element — the press is faster than the colour
        // change — so the shorthand is written out and only the reduced-motion
        // guard comes from the vocabulary.
        transition={buttonTransition}
        animationStyle="composite"
        ref={ref}
        {...rest}
      >
        {children}
      </ChakraButton>
    );
  }
);

Button.displayName = 'Button';
