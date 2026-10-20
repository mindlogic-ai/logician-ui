import { Icon } from '@chakra-ui/react';

export { Tag } from './Tag';
export type { LegacyTagResolution, TagStyleOptions } from './Tag.styles';
export {
  getTagStyles,
  mapLegacyTagProps,
  tagTones,
  tagToneStyles,
} from './Tag.styles';
export type {
  TagColorPalette,
  TagOwnProps,
  TagProps,
  TagTone,
  TagVariant,
} from './Tag.types';
export * from './TagCloseButton';
export * from './TagLabel';

/**
 * @deprecated In Chakra UI v3, use Icon component directly inside Tag
 */
export { Icon as TagLeftIcon };

/**
 * @deprecated In Chakra UI v3, use Icon component directly inside Tag
 */
export { Icon as TagRightIcon };
