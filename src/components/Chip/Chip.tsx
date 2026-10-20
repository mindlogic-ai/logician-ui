import { ForwardedRef, forwardRef } from 'react';

import { polymorphic } from '../../types/polymorphic';
import { Tag } from '../Tag/Tag';
import { mapLegacyTagProps, warnTagDeprecation } from '../Tag/Tag.styles';
import { ChipOwnProps } from './Chip.types';

/**
 * @deprecated Since 5.0 `Chip` is a thin alias of `Tag` and will be removed in
 * 6.0. Replace `<Chip colorScheme="danger" variant="soft">` with
 * `<Tag tone="danger">`, a "solid primary" filter chip with
 * `<Tag as="button" selected>`, and everything else with `<Tag>`.
 *
 * The alias keeps Chip's pill shape (32px radius, roomier padding) so an
 * unmigrated screen does not shift.
 */
const ChipImpl = forwardRef(
  (
    {
      colorScheme,
      colorPalette,
      variant = 'soft',
      tone,
      selected,
      ...rest
    }: ChipOwnProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    warnTagDeprecation(
      'chip-deprecated',
      '<Chip> is deprecated since 5.0 and will be removed in 6.0. Use <Tag tone | selected | category> instead.'
    );
    const mapped = mapLegacyTagProps(
      colorScheme ?? colorPalette ?? 'primary',
      variant
    );
    return (
      <Tag
        borderRadius="32px"
        px={3}
        py={2}
        fontWeight="medium"
        textTransform="none"
        tone={tone ?? mapped.tone}
        selected={selected ?? mapped.selected}
        {...rest}
        ref={ref}
      />
    );
  }
);

ChipImpl.displayName = 'Chip';

/**
 * @deprecated Use `Tag`. Removed in 6.0.
 *
 * Type-level polymorphism over the same runtime — see `polymorphic`.
 */
export const Chip = polymorphic<ChipOwnProps, 'span'>(ChipImpl);
