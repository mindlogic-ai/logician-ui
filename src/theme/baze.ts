import { defineConfig } from '@chakra-ui/react';

/**
 * BAZE theme exploration — a full-palette override exercising the theming
 * seams of the design system (see the `grayDark` scale in ./colors.ts).
 *
 * Every scale below was extrapolated from the BAZE brand screenshots by
 * luminance-matching each step of the existing AA-verified scales in OKLCH:
 * keep the step's lightness (so every semantic-token contrast relationship
 * carries over by construction), swap hue/chroma to the sampled brand anchor,
 * then re-audit the WCAG pairs the semantic layer actually forms and darken/
 * lighten the handful of steps the darker cream canvas pushed under AA.
 *
 * Anchors sampled from the brand boards:
 * - terracotta `#D98E80` (app-icon clay — pinned verbatim at `blue.200`; the
 *   text/action steps are darker clay so `primary.main` keeps AA on cream)
 * - cream `#F2EDE0` (canvas), warm ink for the text ramp
 * - warm near-black `#1A1714` (dark-mode canvas family, via `grayDark.*`)
 * - sage `#93C7A9` → success ramp, steel blue `#5D9FBF` → secondary ramp
 *
 * Audited pairs (all pass, WCAG 2.1): primary.main on surface 6.7:1, white
 * label on primary.fill 6.7:1, fg.default on canvas 10.3:1, fg.subtle on
 * bg.muted 5.3:1, dark-mode fg.default on canvas 12.8:1, dark-mode
 * primary.main on canvas 4.6:1 — full table in the exploration PR.
 *
 * `rose.*` (danger) and `gold.*` (warning) are deliberately not overridden:
 * both are already warm and sit acceptably on the cream canvas. Note the
 * reduced hue distance between the terracotta primary and the rose danger —
 * flagged for design review in the exploration write-up.
 */
export const bazeColors = {
  // Brand — terracotta clay (replaces blue.*; the whole primary.* ramp retints)
  blue: {
    25: { value: '#FDF5F3' },
    50: { value: '#FAEAE6' },
    100: { value: '#EFBEB4' },
    200: { value: '#D98E80' },
    300: { value: '#BC6657' },
    500: { value: '#954234' },
    600: { value: '#7E2D21' },
    700: { value: '#67170C' },
    800: { value: '#490702' },
    900: { value: '#250503' },
  },
  // Secondary — muted steel blue (replaces violet.*)
  violet: {
    25: { value: '#EEF8FE' },
    50: { value: '#DBF1FD' },
    100: { value: '#8CD5F9' },
    200: { value: '#60A9CD' },
    300: { value: '#3E89AB' },
    500: { value: '#227092' },
    600: { value: '#025A79' },
    700: { value: '#03435B' },
    800: { value: '#022C3D' },
    900: { value: '#00151F' },
  },
  // Success — sage (replaces green.*)
  green: {
    25: { value: '#F2FDF6' },
    50: { value: '#E4FCED' },
    100: { value: '#AAF6CB' },
    200: { value: '#91E1B5' },
    300: { value: '#80CFA4' },
    500: { value: '#72C096' },
    600: { value: '#297B53' },
    700: { value: '#156B46' },
    800: { value: '#005232' },
    900: { value: '#002A17' },
  },
  // Light neutrals — cream sand → warm ink (replaces gray.*). Light end lifted
  // twice off the raw splash-screen cream (rev 3: +L and ~40% less chroma,
  // landing on warm off-white): the brand cream reads right on a poster but
  // too heavy as a working canvas.
  gray: {
    0: { value: '#FBF9F4' },
    50: { value: '#F5F3EB' },
    100: { value: '#EEEBE0' },
    200: { value: '#E2DED1' },
    300: { value: '#CCC7B6' },
    400: { value: '#B5AF9E' },
    500: { value: '#9C9585' },
    600: { value: '#837C6B' },
    700: { value: '#665F50' },
    800: { value: '#5D5748' },
    900: { value: '#4F493C' },
    1000: { value: '#423D31' },
    1100: { value: '#363126' },
    1200: { value: '#2C2820' },
    1300: { value: '#231F17' },
    1400: { value: '#1A1710' },
    1500: { value: '#0F0D08' },
  },
  // Dark neutrals — warm charcoal (replaces grayDark.*)
  grayDark: {
    0: { value: '#FEFEFD' },
    50: { value: '#FAF9F7' },
    100: { value: '#F5F4F1' },
    200: { value: '#E9E8E4' },
    300: { value: '#D7D5D0' },
    400: { value: '#BDBAB2' },
    500: { value: '#A9A69E' },
    600: { value: '#96938B' },
    700: { value: '#848179' },
    800: { value: '#726F67' },
    900: { value: '#615E57' },
    1000: { value: '#514E47' },
    1100: { value: '#434039' },
    1200: { value: '#36342D' },
    1300: { value: '#252220' },
    1400: { value: '#1B1917' },
    1500: { value: '#131110' },
    fg600: { value: '#918E86' },
    fg700: { value: '#949189' },
    fgSubtle: { value: '#A19E96' },
  },
  // BAZE has no pure white/black anywhere: `white` backs bg.surface/raised/
  // panel and the labels on solid brand fills, so warm paper here is what
  // makes cards and button labels read cream instead of clinical white.
  white: { value: '#FEFDFB' },
  black: { value: '#14110D' },
};

export const bazeThemeConfig = defineConfig({
  theme: { tokens: { colors: bazeColors } },
});
