import {
  extendTheme,
  Theme as ChakraTheme,
  ThemeOverride,
} from '@chakra-ui/react';

import { colors, semanticTokens } from './colors';
import { global } from './global';

export const theme = {
  colors,
  styles: {
    global,
  },

  components: {
    Switch: {
      baseStyle: {
        track: {
          _checked: {
            bg: 'primary.main',
          },
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'gray.200',
          },
          td: {
            borderColor: 'gray.200',
          },
          tbody: {
            'tr:last-child': {
              td: {
                borderBottom: 'none',
              },
            },
          },
        },
      },
    },
  },

  fonts: {
    body: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
    heading: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
  },

  // Responsive font sizes - smaller on mobile, standard on desktop
  // Only custom tokens are available; Chakra defaults are disabled
  fontSizes: {
    // Disable Chakra default tokens
    xs: undefined,
    sm: undefined,
    md: undefined,
    lg: undefined,
    xl: undefined,
    '2xl': undefined,
    '3xl': undefined,
    '4xl': undefined,
    '5xl': undefined,
    '6xl': undefined,
    '7xl': undefined,
    '8xl': undefined,
    '9xl': undefined,

    // Custom font size tokens (em units for relative scaling)
    subtext: { base: '0.92em', md: '1em' },
    subtitle: { base: '0.92em', md: '1em' },
    p: { base: '1em', md: '1em' },
    h5: { base: '1.1em', md: '1.2em' },
    h4: { base: '1.25em', md: '1.44em' },
    h3: { base: '1.5em', md: '1.75em' },
    h2: { base: '2em', md: '2.5em' },
    h1: { base: '2.4em', md: '3em' },
  },
  semanticTokens,
  radii: {
    none: '0',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '32px',
    full: '9999px',
  },
} satisfies Omit<ThemeOverride, 'semanticTokens'> & {
  semanticTokens: typeof semanticTokens;
};

export type Theme = typeof theme & ChakraTheme;

export default extendTheme(theme);
