import { Icon } from '@chakra-ui/react';

export { Tag } from './Tag';
export {
  getTagStyles,
  tagColorPalettes,
  tagColorPaletteStyles,
  tagVariants,
} from './Tag.styles';
export type { TagColorPalette, TagProps, TagVariant } from './Tag.types';
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
