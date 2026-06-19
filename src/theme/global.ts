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
    '--chakra-colors-chakra-body-text': '#E5E8EC', // desaturated gray.200 - Primary text (dark); matches fg.default's _dark
    '--chakra-colors-chakra-body-bg': '#0E1014', // desaturated gray.1500 - Background (dark); matches bg.canvas's _dark
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

  // Global scrollbar styling. Without this, scrollbars fall back to the raw
  // browser chrome — a bright, square, high-contrast track that stands out
  // badly in dark mode. A thin, transparent-track, rounded thumb (mode-aware
  // via the `slate` ramp) is unobtrusive in both modes. Components that opt out
  // (e.g. hidden scrollbars) still override locally.
  '*': {
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--chakra-colors-slate-300) transparent',
  },
  '::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'var(--chakra-colors-slate-300)',
    borderRadius: '9999px',
    border: '2px solid transparent',
    backgroundClip: 'content-box',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'var(--chakra-colors-slate-400)',
  },
  '::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
});

// Legacy export for backwards compatibility
export const global = globalCss;
