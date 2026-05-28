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
  ':root': {
    '--chakra-colors-chakra-body-text': '#1E2433', // gray.1300 - Primary text
    '--chakra-colors-chakra-body-bg': '#FDFDFF', // gray.0 - Background
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
    color: 'gray.1300', // Primary text color (Golden Ratio palette)
  },

  '#__next': {
    height: 'var(--chakra-vh)',
  },
  "body[data-lang='es']": {
    fontFamily: inter.style.fontFamily,
  },

  /**
   * Respect the user's `prefers-reduced-motion` setting (WCAG 2.3.3).
   *
   * When the OS-level "reduce motion" accessibility preference is enabled,
   * we collapse all animations, transitions, and scroll behaviors to a
   * near-instant duration. This applies globally to:
   *   - CSS transitions / animations declared via Chakra style props
   *     (e.g. `transition="opacity 0.3s"`, `animationDuration="0.65s"`)
   *   - Chakra/Ark UI internal animations
   *   - framer-motion animations (also respects the media query natively,
   *     but this is a belt-and-suspenders fallback)
   *
   * The selector lives on the universal selectors (`*`, `*::before`,
   * `*::after`) with the `@media` query nested inside so that Chakra v3's
   * `defineGlobalStyles` typing (which expects `SystemStyleObject` values)
   * accepts it.
   *
   * @see https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
   */
  '*, *::before, *::after': {
    '@media (prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.01ms !important',
      scrollBehavior: 'auto !important',
    },
  },
});

// Legacy export for backwards compatibility
export const global = globalCss;
