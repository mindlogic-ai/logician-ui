import {
  createSystem,
  defaultConfig,
  defineConfig,
  SystemConfig,
} from '@chakra-ui/react';

import { colors, semanticTokens } from './colors';
import { globalCss } from './global';

const config = defineConfig({
  globalCss,
  theme: {
    tokens: {
      colors: {
        gray: {
          50: { value: colors.gray[50] },
          100: { value: colors.gray[100] },
          200: { value: colors.gray[200] },
          300: { value: colors.gray[300] },
          400: { value: colors.gray[400] },
          500: { value: colors.gray[500] },
          600: { value: colors.gray[600] },
          700: { value: colors.gray[700] },
          800: { value: colors.gray[800] },
          900: { value: colors.gray[900] },
          1000: { value: colors.gray[1000] },
          1100: { value: colors.gray[1100] },
          1200: { value: colors.gray[1200] },
          1300: { value: colors.gray[1300] },
          1400: { value: colors.gray[1400] },
          1500: { value: colors.gray[1500] },
        },
        blue: {
          100: { value: colors.blue[100] },
          200: { value: colors.blue[200] },
          300: { value: colors.blue[300] },
          400: { value: colors.blue[400] },
          500: { value: colors.blue[500] },
          600: { value: colors.blue[600] },
          700: { value: colors.blue[700] },
          800: { value: colors.blue[800] },
          900: { value: colors.blue[900] },
          1000: { value: colors.blue[1000] },
        },
        red: {
          50: { value: colors.red[50] },
          100: { value: colors.red[100] },
          200: { value: colors.red[200] },
          300: { value: colors.red[300] },
          400: { value: colors.red[400] },
          500: { value: colors.red[500] },
          600: { value: colors.red[600] },
          700: { value: colors.red[700] },
          800: { value: colors.red[800] },
          900: { value: colors.red[900] },
        },
        white: { value: colors.white },
        black: { value: colors.black },
      },
      fonts: {
        body: { value: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif' },
        heading: { value: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif' },
      },
      fontSizes: {
        subtitle: { value: '1em' },
        subtext: { value: '1em' },
        p: { value: '1em' },
        h5: { value: '1.2em' },
        h4: { value: '1.44em' },
        h3: { value: '1.75em' },
        h2: { value: '2.5em' },
        h1: { value: '3em' },
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
      colors: {
        'primary.lightest': { value: semanticTokens.colors.primary.lightest },
        'primary.lighter': { value: '{colors.blue.50}' },
        'primary.light': { value: '{colors.blue.300}' },
        'primary.main': { value: '{colors.blue.900}' },
        'primary.dark': { value: '{colors.blue.1000}' },
        'secondary.lighter': { value: '{colors.purple.50}' },
        'secondary.light': { value: '{colors.purple.300}' },
        'secondary.main': { value: '{colors.purple.500}' },
        'secondary.dark': { value: '{colors.purple.700}' },
        'danger.lighter': { value: '{colors.red.50}' },
        'danger.light': { value: semanticTokens.colors.danger.light },
        'danger.main': { value: '{colors.red.500}' },
        'danger.dark': { value: semanticTokens.colors.danger.dark },
        'success.lighter': { value: semanticTokens.colors.success.lighter },
        'success.light': { value: semanticTokens.colors.success.light },
        'success.main': { value: semanticTokens.colors.success.main },
        'success.dark': { value: semanticTokens.colors.success.dark },
        'warning.lighter': { value: semanticTokens.colors.warning.lighter },
        'warning.light': { value: semanticTokens.colors.warning.light },
        'warning.main': { value: '{colors.yellow.400}' },
        'warning.dark': { value: semanticTokens.colors.warning.dark },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

// Export config type for external use
export type ThemeConfig = typeof config;
export type System = typeof system;

// Legacy exports for backward compatibility during migration
export const theme = config;
export default system;
