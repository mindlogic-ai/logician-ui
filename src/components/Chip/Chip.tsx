import { ForwardedRef, forwardRef } from 'react';

import { polymorphic } from '../../types/polymorphic';
import { Tag } from '../Tag/Tag';
import { ChipOwnProps } from './Chip.types';

/**
 * @deprecated Since 5.0 `Chip` is a thin alias of `Tag` and will be removed in
 * 6.0. Replace `<Chip colorScheme="danger" variant="soft">` with
 * `<Tag tone="danger">`, a "solid" (primary / secondary / neutral) chip with
 * `<Tag as="button" selected>`, and everything else with `<Tag>`. Full table:
 * `mapLegacyTagProps`. Warns once per colorScheme × variant in development.
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
    // Tag owns the mapping (see `mapLegacyTagProps`) and the once-per-combo
    // dev warning; Chip only supplies its 4.x defaults (primary / soft) and
    // its name. Passing the pair through, rather than a mapped `selected`,
    // keeps a "solid" Chip a selected *look* without turning it into a toggle.
    const legacy = {
      colorPalette: colorScheme ?? colorPalette ?? 'primary',
      variant,
      __legacyComponent: 'Chip',
    } as object;
    return (
      <Tag
        borderRadius="32px"
        px={3}
        py={2}
        fontWeight="medium"
        textTransform="none"
        tone={tone}
        selected={selected}
        {...legacy}
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
