import * as CSS from 'csstype';

import { colors } from '@/theme/colors';

export const editableStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
};

export const previewWrapperStyles = {
  display: 'inline-flex',
};

export const editablePreviewStyles = {
  transition: '0.3s border',
  borderColor: 'transparent',
  overflowWrap: 'anywhere' as CSS.Property.OverflowWrap,
  _hover: {
    borderColor: 'inherit',
  },
};

export const inputStyles = {
  maxWidth: '100%',
  display: 'inline',
  styles: {
    boxSizing: 'content-box',
  },
  _focus: {
    backgroundColor: colors.white,
  },
};
