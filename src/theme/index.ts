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
  },

  fonts: {
    body: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
    heading: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
  },

  // 반응형 폰트 사이즈 - 모바일에서는 더 작은 폰트 크기, 데스크톱에서는 기존 크기 유지
  fontSizes: {
    // 커스텀 폰트 크기 토큰 (em 단위 사용)
    // xs: { base: '0.7em', md: '0.7em' },
    subtitle: { base: '0.92em', md: '1em' },
    subtext: { base: '0.92em', md: '1em' },
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
