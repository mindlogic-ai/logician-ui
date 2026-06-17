import { defineGlobalStyles } from '@chakra-ui/react';

import { inter, noto, pretendard } from './font';

/**
 * Global styles for the design system.
 *
 * Uses the Golden Ratio color system with cool slate-based grays.
 * Primary text color is gray.1300 (#1E2433) for optimal readability.
 *
 * @see ./colors.ts for full color palette documentation
 */
export const globalCss = defineGlobalStyles({
  // Light mode body fallbacks (unchanged — preserves existing resolved values).
  ':root': {
    '--chakra-colors-chakra-body-text': '#1E2433', // gray.1300 - Primary text
    '--chakra-colors-chakra-body-bg': '#FDFDFF', // gray.0 - Background
  },

  // Dark mode body fallbacks. Only activates under the `.dark` class set by the
  // color-mode provider, so light-mode rendering is byte-for-byte identical.
  '.dark': {
    '--chakra-colors-chakra-body-text': '#E2E6F0', // gray.200 - Primary text (dark); softened from gray.50 to avoid near-white glare (matches fg.default)
    '--chakra-colors-chakra-body-bg': '#0B0E17', // gray.1500 - Background (dark)
  },

  html: {
    height: 'var(--chakra-vh)',
    fontSize: 16,
    fontFamily: [
      pretendard.style.fontFamily,
      inter.style.fontFamily,
      noto.style.fontFamily,
    ].join(','),
    overflow: 'auto',
    fontSmooth: 'antialiased',
  },

  'html, body': {
    // Mode-aware primary text. In light mode `fg.default` resolves to gray.1300
    // (#1E2433) — identical to the previous literal — and flips to gray.50 under
    // `.dark`. Resolved light value is unchanged; only the CSS var name differs.
    color: 'fg.default',
  },

  '#__next': {
    height: 'var(--chakra-vh)',
  },
  "body[data-lang='es']": {
    fontFamily: inter.style.fontFamily,
  },
});

// Legacy export for backwards compatibility
export const global = globalCss;
