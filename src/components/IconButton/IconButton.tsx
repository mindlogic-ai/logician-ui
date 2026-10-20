import { ForwardedRef, forwardRef } from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { polymorphic } from '../../types/polymorphic';
import {
  isLegacyButtonProps,
  resolveLegacyButtonVariant,
  warnLegacyButtonProps,
} from '../Button/Button.legacy';
import { buttonTransition } from '../Button/Button.styles';
import { getIconButtonStyles } from './IconButton.styles';
import {
  IconButtonOwnProps,
  IconButtonProps,
  IconButtonVariant,
} from './IconButton.types';

/**
 * IconButton — one `variant` role per button (5.0 BAZE palette).
 *
 * @example
 * ```tsx
 * <IconButton aria-label="닫기"><XIcon /></IconButton> // ghost
 * <IconButton aria-label="삭제" isDestructive><TrashIcon /></IconButton>
 * <IconButton aria-label="추가" variant="primary"><PlusIcon /></IconButton>
 * <IconButton aria-label="보내기" variant="action"><SendIcon /></IconButton>
 * ```
 */
const IconButtonImpl = forwardRef(
  (
    {
      variant: variantProp,
      isDestructive: isDestructiveProp = false,
      children,
      ...restWithLegacy
    }: IconButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    // 4.x `colorPalette` / old variant names from untyped callers — mapped,
    // never forwarded to Chakra. See `Button.legacy.ts`.
    const { colorPalette: legacyPalette, ...rest } =
      restWithLegacy as typeof restWithLegacy & { colorPalette?: unknown };

    let variant: IconButtonVariant = variantProp ?? 'ghost';
    let isDestructive = isDestructiveProp;
    if (isLegacyButtonProps('icon', legacyPalette, variantProp)) {
      const resolved = resolveLegacyButtonVariant(
        'icon',
        legacyPalette,
        variantProp
      );
      warnLegacyButtonProps('IconButton', legacyPalette, variantProp, resolved);
      variant = resolved.variant as IconButtonVariant;
      isDestructive = isDestructive || resolved.isDestructive;
    }

    const styles = getIconButtonStyles(variant, isDestructive);

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
        data-variant={variant}
        data-destructive={isDestructive || undefined}
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
