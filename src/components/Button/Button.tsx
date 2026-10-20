import { forwardRef } from 'react';
import { Button as ChakraButton, SystemStyleObject } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';
import { mergeCss } from '@/utils/mergeCss';

import { polymorphic } from '../../types/polymorphic';
import {
  isLegacyButtonProps,
  resolveLegacyButtonVariant,
  warnLegacyButtonProps,
} from './Button.legacy';
import { buttonTransition, getButtonStyles } from './Button.styles';
import { ButtonOwnProps, ButtonProps, ButtonVariant } from './Button.types';

/**
 * Button — one `variant` role per button (5.0 BAZE palette).
 *
 * @example
 * ```tsx
 * <Button variant="primary">저장</Button>
 * <Button variant="secondary">취소</Button>
 * <Button>더 보기</Button> // subtle
 * <Button variant="ghost" isDestructive>삭제</Button>
 * <Button variant="danger">영구 삭제</Button>
 * <Button variant="action"><Sparkles />실행</Button> // coral icon
 * <Button variant="primary" lift>Get started</Button>
 *
 * // `as` carries the element's own props (see Button.types.ts):
 * <Button as="a" href="/docs" target="_blank">문서</Button>
 * ```
 */
const ButtonImpl = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant: variantProp,
      isDestructive: isDestructiveProp = false,
      size,
      lift,
      children,
      _hover: hoverProp,
      _active: activeProp,
      _disabled: disabledProp,
      css: cssProp,
      ...restWithLegacy
    },
    ref
  ) => {
    // 4.x callers (untyped JS, `as any`) can still hand us `colorPalette` and
    // an old variant name. Strip it so it never reaches Chakra's own recipe,
    // and map the pair onto a 5.0 role — see `Button.legacy.ts`.
    const { colorPalette: legacyPalette, ...rest } =
      restWithLegacy as typeof restWithLegacy & { colorPalette?: unknown };

    let variant: ButtonVariant = variantProp ?? 'subtle';
    let isDestructive = isDestructiveProp;
    if (isLegacyButtonProps('button', legacyPalette, variantProp)) {
      const resolved = resolveLegacyButtonVariant(
        'button',
        legacyPalette,
        variantProp
      );
      warnLegacyButtonProps('Button', legacyPalette, variantProp, resolved);
      variant = resolved.variant;
      isDestructive = isDestructive || resolved.isDestructive;
    }

    const base = getButtonStyles(variant, isDestructive);

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
          // Merged so the variant's fixed disabled colours survive.
          _disabled: {
            ...(base._disabled as object),
            translate: '0 0',
            filter: 'none',
          },
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
        // no longer erases the ones it did not mention. Deep, so a nested
        // condition (lift's `_hover._dark`) survives a call site's own `_dark`.
        _hover={mergeCss(styles._hover, hoverProp)}
        _active={mergeCss(styles._active, activeProp)}
        // `cursor` is a style prop, so it lands outside Chakra's
        // `@layer recipes` and beat the recipe's disabled cursor — every
        // disabled Button showed a pointer and read as clickable. The
        // disabled cursor has to sit at this level, merged like the two above
        // so a call site's `_disabled` cannot drop it.
        _disabled={mergeCss(
          '_disabled' in styles ? styles._disabled : undefined,
          // Chakra disables a `loading` button too; it is working, not
          // forbidden, so it gets `progress`.
          { cursor: rest.loading ? 'progress' : 'not-allowed' },
          disabledProp
        )}
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
        data-variant={variant}
        data-destructive={isDestructive || undefined}
        {...rest}
        // The `action` icon rule lives in `css` (a nested selector cannot be a
        // style prop); merged so a call site's `css` adds to it.
        css={mergeCss(base.css as SystemStyleObject | undefined, cssProp)}
      >
        {children}
      </ChakraButton>
    );
  }
);

/**
 * Type-level polymorphism over the same runtime — see `polymorphic` in
 * `src/types/polymorphic.ts` for what the cast does and why it is needed.
 *
 * `as` defaults to `'button'`, so nothing that already compiles stops
 * compiling.
 */
ButtonImpl.displayName = 'Button';

export const Button = polymorphic<ButtonOwnProps>(ButtonImpl);
