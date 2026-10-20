import { ElementType, ForwardedRef, forwardRef, MouseEvent } from 'react';
import { Tag as ChakraTag } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { polymorphic } from '../../types/polymorphic';
import {
  getTagStyles,
  mapLegacyTagProps,
  warnTagDeprecation,
} from './Tag.styles';
import { TagOwnProps } from './Tag.types';

/** 4.x props that are no longer in the type but may still arrive at runtime. */
type LegacyTagInput = {
  colorPalette?: string;
  variant?: string;
  as?: ElementType;
};

/**
 * Tag — a label for categorising, filtering and removable selections. Since
 * 5.0 it also replaces `Chip`.
 *
 * - `tone`: `neutral` (default, beige) · `success` · `warning` · `danger` · `info`
 * - `selected`: filter-chip "on" (black fill)
 * - `category`: decorative hue (`blue`, `green`, …) with an optional `icon` mark
 *
 * A tag is interactive (hover border, pointer) when it has `onClick`, is a
 * toggle (`selected` passed) or renders as a `button` / `a`. Render filter
 * chips `as="button"` so they are keyboard-operable.
 *
 * @example
 * ```tsx
 * <Tag>Draft</Tag>
 * <Tag tone="danger">Failed</Tag>
 * <Tag as="button" selected={on} onClick={toggle}>Images</Tag>
 * <Tag category="purple" icon="#">research</Tag>
 * <Tag>Removable<TagCloseButton /></Tag>
 * ```
 */
const TagImpl = forwardRef(
  (props: TagOwnProps, ref?: ForwardedRef<HTMLDivElement>) => {
    const {
      tone: toneProp,
      selected: selectedProp,
      category,
      icon,
      disabled = false,
      onClick,
      children,
      colorPalette: legacyPalette,
      variant: legacyVariant,
      as,
      ...rest
    } = props as TagOwnProps & LegacyTagInput;

    let tone = toneProp;
    let selected = selectedProp;
    if (legacyPalette !== undefined || legacyVariant !== undefined) {
      warnTagDeprecation(
        'tag-legacy-props',
        '<Tag colorPalette / variant> were removed in 5.0. Use tone="neutral|success|warning|danger|info", ' +
          'selected (filter chip on) or category="<hue>". The old props are mapped for now.'
      );
      const mapped = mapLegacyTagProps(legacyPalette, legacyVariant);
      tone ??= mapped.tone;
      selected ??= mapped.selected;
    }

    const isButton = as === 'button';
    const interactive =
      !disabled &&
      (onClick != null || isButton || as === 'a' || selectedProp !== undefined);

    const styles = getTagStyles({ tone, selected, category, interactive });

    const handleClick = disabled
      ? (event: MouseEvent<HTMLSpanElement>) => event.preventDefault()
      : onClick;

    return (
      <ChakraTag.Root
        border="1px solid"
        borderRadius="md"
        boxShadow="none"
        fontSize="sm"
        fontWeight="semibold"
        {...styles}
        {...focusRing}
        data-selected={selected ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        aria-pressed={
          isButton && selectedProp !== undefined ? !!selected : undefined
        }
        aria-disabled={disabled && !isButton && onClick ? true : undefined}
        {...(isButton && { type: 'button', disabled })}
        onClick={handleClick}
        {...rest}
        as={as}
        ref={ref}
      >
        {icon != null ? (
          <ChakraTag.StartElement
            color={category ? `category.${category}.fg` : undefined}
            fontWeight="bold"
          >
            {icon}
          </ChakraTag.StartElement>
        ) : null}
        {children}
      </ChakraTag.Root>
    );
  }
);

TagImpl.displayName = 'Tag';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Tag = polymorphic<TagOwnProps, 'span'>(TagImpl);
