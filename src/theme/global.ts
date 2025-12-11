import { inter, noto, pretendard } from './font';

/**
 * Global styles for the design system.
 *
 * Uses the Golden Ratio color system with cool slate-based grays.
 * Primary text color is gray.1300 (#1E2433) for optimal readability.
 *
 * @see ./colors.ts for full color palette documentation
 */
export const global = {
  ':root': {
    '--chakra-colors-chakra-body-text': '#1E2433', // gray.1300 - Primary text
    '--chakra-colors-chakra-body-bg': '#FDFDFF', // gray.0 - Background
  },

  html: {
    height: 'var(--chakra-vh)',
    fontSize: 14,
    fontFamily: [
      pretendard.style.fontFamily,
      inter.style.fontFamily,
      noto.style.fontFamily,
    ].join(','),
    overflow: 'auto',
  },

  'html, body': {
    color: 'gray.1300', // Primary text color (Golden Ratio palette)
  },

  '#__next': {
    height: 'var(--chakra-vh)',
  },
  "body[data-lang='es']": {
    fontFamily: inter.style.fontFamily,
  },
} as const;
