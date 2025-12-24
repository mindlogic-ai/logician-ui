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
      // Disable Chakra default fontSizes - use inherit to match v2 behavior
      fontSizes: {
        '2xs': { value: 'inherit' },
        xs: { value: 'inherit' },
        sm: { value: 'inherit' },
        md: { value: 'inherit' },
        lg: { value: 'inherit' },
        xl: { value: 'inherit' },
        '2xl': { value: 'inherit' },
        '3xl': { value: 'inherit' },
        '4xl': { value: 'inherit' },
        '5xl': { value: 'inherit' },
        '6xl': { value: 'inherit' },
        '7xl': { value: 'inherit' },
        '8xl': { value: 'inherit' },
        '9xl': { value: 'inherit' },
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
      // Font sizes - using single values (responsive handled at component level if needed)
      fontSizes: {
        subtext: { value: '0.92em' },
        subtitle: { value: '0.92em' },
        p: { value: '1em' },
        h5: { value: '1.2em' },
        h4: { value: '1.44em' },
        h3: { value: '1.75em' },
        h2: { value: '2.5em' },
        h1: { value: '3em' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

// Re-export for backwards compatibility
export const theme = system;
export default system;
