import { Tag } from '../Tag';
import { ChipProps } from './Chip.types';

/**
 * @deprecated Use `Tag` component instead. Chip will be removed in the next major version.
 *
 * The Tag component now supports all Chip functionality:
 * - `colorScheme`: primary, secondary, danger, success, warning, neutral
 * - `variant`: soft, solid, outline
 *
 * @example
 * ```tsx
 * // Before (deprecated)
 * <Chip colorScheme="primary" variant="soft">Label</Chip>
 *
 * // After
 * <Tag colorScheme="primary" variant="soft">Label</Tag>
 * ```
 */
export const Chip = ({
  colorScheme = 'primary',
  variant = 'soft',
  ...rest
}: ChipProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '[Deprecation] Chip is deprecated. Use Tag instead. ' +
        'Chip will be removed in the next major version.'
    );
  }

  return <Tag colorScheme={colorScheme} variant={variant} {...rest} />;
};

Chip.displayName = 'Chip';
