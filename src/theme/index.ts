import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { colors, semanticTokens } from './colors';
import { globalCss } from './global';

/**
 * Chakra UI v3 theme configuration for Logician UI
 *
 * Uses the Golden Ratio color system with cool slate-based grays.
 */
const config = defineConfig({
  globalCss,
  theme: {
    tokens: {
      colors,
      fonts: {
        body: { value: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif' },
        heading: {
          value: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
        },
      },
      fontSizes: {
        h1: { value: '2.25em' },
        h2: { value: '1.75em' },
        h3: { value: '1.375em' },
        h4: { value: '1.125em' },
        h5: { value: '1em' },
        p: { value: '0.875em' },
        subtext: { value: '0.75em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '6px' },
        md: { value: '8px' },
        lg: { value: '12px' },
        xl: { value: '32px' },
        full: { value: '9999px' },
      },
    },
    semanticTokens: {
      colors: semanticTokens.colors,
    },
  },
});

export const system = createSystem(defaultConfig, config);

// Re-export for backwards compatibility
export const theme = system;
export default system;
