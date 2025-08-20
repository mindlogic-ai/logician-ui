import { Property } from 'csstype';

import theme from '@/theme/index';

export const linkTextStyles = {
  color: theme.colors.blue[700],
  fontWeight: '500',
  position: 'relative' as Property.Position,
  _hover: {
    textDecoration: 'none',
    color: theme.colors.blue[900],
  },
};
