import { defineGlobalStyles } from '@chakra-ui/react';

import { inter, noto, pretendard } from './font';

/**
 * Global styles for the design system.
 *
 * Colors come from the BAZE semantic tokens (see ./colors.ts); nothing here
 * hardcodes a palette value except the Chakra body fallbacks below, which
 * mirror `fg.default` / `bg.canvas` for the default (ink) scheme.
 *
 * @see ./colors.ts for full color palette documentation
 */
export const globalCss = defineGlobalStyles({
  // Body fallbacks for Chakra's legacy body vars — point at the live tokens so
  // they follow the theme (and high contrast) instead of a literal.
  ':root': {
    '--chakra-colors-chakra-body-text': 'var(--chakra-colors-fg-default)',
    '--chakra-colors-chakra-body-bg': 'var(--chakra-colors-bg-canvas)',
  },

  html: {
    height: 'var(--chakra-vh)',
    // Global base font size. The whole type/spacing scale is em-relative, so
    // this single value drives the app-wide baseline; surfaces that need a
    // different base (e.g. FactChat chat at 16px) opt in via <ScaledContext>.
    fontSize: 14,
    fontFamily: [
      pretendard.style.fontFamily,
      inter.style.fontFamily,
      noto.style.fontFamily,
    ].join(','),
    overflow: 'auto',
    fontSmooth: 'antialiased',
  },

  'html, body': {
    // Mode-aware primary text (neutral.11 light / cream dark).
    color: 'fg.default',
  },

  // Korean breaks between 어절, not mid-word — but only Korean. Japanese and
  // Chinese have no spaces, so `keep-all` turns a whole sentence into one
  // unbreakable run that overflows its box. Set once on <html> by language
  // and let it inherit (`word-break` is inherited), so a component that asks
  // for `break-all` (emails, keys, file names) still gets it. The Typography
  // components used to hard-code `keep-all` on themselves, which left every
  // ja screen to undo it one call site at a time.
  'html:lang(ko)': {
    wordBreak: 'keep-all',
  },
  // Japanese wraps at phrase boundaries (文節) where the browser can find them
  // (Chromium 119+, ja only). Elsewhere the rule is skipped and ja keeps the
  // default `normal`, which breaks between characters — never `keep-all`.
  'html:lang(ja)': {
    '@supports (word-break: auto-phrase)': {
      wordBreak: 'auto-phrase',
    },
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
  // via the `neutral` steps) is unobtrusive in both modes. Components that opt out
  // (e.g. hidden scrollbars) still override locally.
  '*': {
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--chakra-colors-neutral-5) transparent',
  },
  '::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'var(--chakra-colors-neutral-5)',
    borderRadius: '9999px',
    border: '2px solid transparent',
    backgroundClip: 'content-box',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'var(--chakra-colors-neutral-6)',
  },
  '::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
});

// Legacy export for backwards compatibility
export const global = globalCss;
