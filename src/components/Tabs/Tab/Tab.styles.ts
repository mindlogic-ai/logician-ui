import * as CSS from 'csstype';

import theme from '@/theme/index';

// TODO: investigate why these TS issues are coming up
export const verticalStyles = {
  borderInlineStart: 'none',
  position: 'relative' as CSS.Property.Position,
  justifyContent: 'flex-start',
  alignItems: 'center',
  textAlign: 'left' as CSS.Property.TextAlign,
  p: 4,
  width: '100%',
};

export const horizontalSelectedStyles = {
  color: theme.semanticTokens.colors.primary.main,
  fontWeight: 'semibold',
  position: 'relative',
  _after: {
    content: '""',
    position: 'absolute',
    top: 'calc(100% - 1px)',
    left: 0,
    width: '100%',
    height: '2px',
    background: theme.semanticTokens.colors.primary.main,
  },
};

export const verticalSelectedStyles = {
  backgroundColor: 'primary.light',
  color: 'primary.dark',
  fontWeight: 'bold',
};
