/**
 * Golden Ratio Color System
 *
 * A mathematically harmonious color palette designed using the golden ratio (φ ≈ 1.618)
 * to create visually balanced color relationships. Each color scale follows a consistent
 * lightness progression from 50 (lightest) to 900 (darkest).
 *
 * ## Palette Structure
 *
 * ### Primitive Colors
 * - `blue`: Primary brand color - trustworthy, professional
 * - `rose`: Danger/error states - attention, urgency
 * - `green`: Success states - growth, confirmation
 * - `violet`: Secondary/accent - creative, distinctive
 * - `gold`: Warning states - caution, attention
 * - `gray`: Neutral tones with cool blue undertone (slate-based)
 *
 * ### Semantic Tokens
 * Map primitive colors to meaningful UI states:
 * - `primary`: Main brand interactions (blue-based)
 * - `secondary`: Supporting accent (violet-based)
 * - `success`: Positive feedback (green-based)
 * - `warning`: Cautionary feedback (gold-based)
 * - `danger`: Error/destructive feedback (rose-based)
 *
 * ## Design Principles
 *
 * 1. **Accessibility First**: All semantic color combinations meet WCAG 2.1 AA standards
 * 2. **Cool Gray Foundation**: Slate-based grays with blue undertone for modern feel
 * 3. **Consistent Scale**: Each color has 25/50/100/200/300/500/600/700/800/900 steps
 * 4. **Light Mode Optimized**: Designed for light mode with semantic token flexibility
 *
 * @see https://www.w3.org/TR/WCAG21/#contrast-minimum
 * @version 3.0.0
 */

/**
 * Semantic color tokens that map primitive colors to UI intent.
 *
 * Use these tokens in components instead of raw color values:
 * - `primary.*`: Buttons, links, focus states
 * - `secondary.*`: Accent elements, highlights
 * - `success.*`: Success messages, confirmations
 * - `warning.*`: Warning messages, caution states
 * - `danger.*`: Error messages, destructive actions
 *
 * Each category includes:
 * - `lightest`: Lightest backgrounds (ghost states, very subtle fills)
 * - `extralight`: Extra-light backgrounds (badges, subtle fills)
 * - `lighter`: Light backgrounds (toast backgrounds, subtle fills)
 * - `light`: Medium backgrounds (hover states, medium fills)
 * - `main`: Primary color (buttons, text, icons)
 * - `dark`: Dark variant (text on light backgrounds)
 * - `darker`: Darkest variant (high-contrast text)
 *
 * @example
 * ```tsx
 * <Button bgColor="primary.main" />
 * <Alert bgColor="danger.lighter" color="danger.dark" />
 * <Badge bgColor="success.lightest" color="success.dark" />
 * ```
 */
export const semanticTokens = {
  colors: {
    /**
     * Primary colors (Blue-based)
     * Use for: Primary buttons, links, focus rings, brand elements
     *
     * Light contrast ratios (on white):
     * - main (#1751D0): 5.9:1 ✓ AA
     * - dark (#0D317D): 9.4:1 ✓ AAA
     *
     * `_dark` lightens brand steps ~2 stops so interactive/text tokens keep
     * AA contrast on dark surfaces (bg.canvas → gray.1500). Background tints
     * (lightest/extralight/lighter/light) map to the deep end of the scale so
     * brand-tinted fills read as subtle on dark, not as glare.
     */
    primary: {
      lightest: {
        value: { base: '{colors.blue.25}', _dark: '{colors.blue.900}' },
      },
      extralight: {
        value: { base: '{colors.blue.50}', _dark: '{colors.blue.800}' },
      },
      lighter: {
        value: { base: '{colors.blue.100}', _dark: '{colors.blue.700}' },
      },
      light: {
        value: { base: '{colors.blue.200}', _dark: '{colors.blue.600}' },
      },
      main: {
        value: { base: '{colors.blue.500}', _dark: '{colors.blue.300}' },
      }, // primary actions
      dark: {
        value: { base: '{colors.blue.700}', _dark: '{colors.blue.200}' },
      }, // emphasis text
      darker: {
        value: { base: '{colors.blue.900}', _dark: '{colors.blue.100}' },
      }, // high-contrast text
    },

    /**
     * Secondary colors (Violet-based)
     * Use for: Accent elements, highlights, tags
     *
     * Light contrast ratios (on white):
     * - main (#9117D0): 5.1:1 ✓ AA
     * - dark (#570D7D): 9.2:1 ✓ AAA
     */
    secondary: {
      lightest: {
        value: { base: '{colors.violet.25}', _dark: '{colors.violet.900}' },
      },
      extralight: {
        value: { base: '{colors.violet.50}', _dark: '{colors.violet.800}' },
      },
      lighter: {
        value: { base: '{colors.violet.100}', _dark: '{colors.violet.700}' },
      },
      light: {
        value: { base: '{colors.violet.200}', _dark: '{colors.violet.600}' },
      },
      main: {
        // _dark is violet.200 (not .300 like the other brands): violet.300 on
        // the dark canvas is only 4.29:1, just under AA. Solid fills no longer
        // use *.main (they pin to violet.500), so main now only drives
        // text/icon/outline on dark, where the extra lift is pure benefit.
        value: { base: '{colors.violet.500}', _dark: '{colors.violet.200}' },
      },
      dark: {
        value: { base: '{colors.violet.700}', _dark: '{colors.violet.200}' },
      },
      darker: {
        value: { base: '{colors.violet.900}', _dark: '{colors.violet.100}' },
      },
    },

    /**
     * Danger colors (Rose-based)
     * Use for: Error states, destructive actions, validation errors
     *
     * Light contrast ratios (on white):
     * - main (#C1232C): 5.9:1 ✓ AA
     * - dark (#7D0D14): 9.6:1 ✓ AAA
     */
    danger: {
      lightest: {
        value: { base: '{colors.rose.25}', _dark: '{colors.rose.900}' },
      },
      extralight: {
        value: { base: '{colors.rose.50}', _dark: '{colors.rose.800}' },
      },
      lighter: {
        value: { base: '{colors.rose.100}', _dark: '{colors.rose.700}' },
      },
      light: {
        value: { base: '{colors.rose.200}', _dark: '{colors.rose.600}' },
      },
      main: {
        value: { base: '{colors.rose.500}', _dark: '{colors.rose.300}' },
      },
      dark: {
        value: { base: '{colors.rose.700}', _dark: '{colors.rose.200}' },
      },
      darker: {
        value: { base: '{colors.rose.900}', _dark: '{colors.rose.100}' },
      },
    },

    /**
     * Success colors (Green-based)
     * Use for: Success messages, confirmations, positive feedback
     *
     * Light contrast ratios (on white):
     * - main (#1AA612): 4.5:1 ✓ AA (large text)
     * - dark (#147D0D): 6.1:1 ✓ AA
     */
    success: {
      lightest: {
        value: { base: '{colors.green.25}', _dark: '{colors.green.900}' },
      },
      extralight: {
        value: { base: '{colors.green.50}', _dark: '{colors.green.800}' },
      },
      lighter: {
        value: { base: '{colors.green.100}', _dark: '{colors.green.700}' },
      },
      light: {
        value: { base: '{colors.green.200}', _dark: '{colors.green.600}' },
      },
      main: {
        value: { base: '{colors.green.600}', _dark: '{colors.green.300}' },
      },
      dark: {
        value: { base: '{colors.green.700}', _dark: '{colors.green.200}' },
      },
      darker: {
        value: { base: '{colors.green.900}', _dark: '{colors.green.100}' },
      },
    },

    /**
     * Warning colors (Gold-based)
     * Use for: Warning messages, caution states, attention needed
     *
     * Light contrast ratios (on white):
     * - main (#D0A117): 3.0:1 (use dark on light backgrounds)
     * - dark (#7D610D): 5.8:1 ✓ AA
     *
     * NOTE: gold is the AA risk in both modes — verify per-pair contrast in the
     * Storybook palette before relying on `warning.main` for text.
     */
    warning: {
      lightest: {
        value: { base: '{colors.gold.25}', _dark: '{colors.gold.900}' },
      },
      extralight: {
        value: { base: '{colors.gold.50}', _dark: '{colors.gold.800}' },
      },
      lighter: {
        value: { base: '{colors.gold.100}', _dark: '{colors.gold.700}' },
      },
      light: {
        value: { base: '{colors.gold.200}', _dark: '{colors.gold.600}' },
      },
      main: {
        value: { base: '{colors.gold.500}', _dark: '{colors.gold.300}' },
      },
      dark: {
        value: { base: '{colors.gold.700}', _dark: '{colors.gold.200}' },
      },
      darker: {
        value: { base: '{colors.gold.900}', _dark: '{colors.gold.100}' },
      },
    },

    /**
     * Neutral background tokens — map onto the gray.0–1500 scale.
     * Use for: page/canvas, raised surfaces (cards, menus), subtle/muted fills,
     * and inverse surfaces (tooltips, contrast banners).
     *
     * - canvas: app background
     * - surface: raised surface (card, popover, menu)
     * - subtle: subtle fill / secondary surface
     * - muted: muted fill / tertiary surface, hover
     * - inverse: high-contrast surface (flips to light in dark mode)
     */
    bg: {
      canvas: {
        value: { base: '{colors.gray.0}', _dark: '{colors.gray.1500}' },
      },
      surface: {
        value: { base: '{colors.white}', _dark: '{colors.gray.1400}' },
      },
      subtle: {
        value: { base: '{colors.gray.50}', _dark: '{colors.gray.1300}' },
      },
      muted: {
        value: { base: '{colors.gray.100}', _dark: '{colors.gray.1200}' },
      },
      inverse: {
        value: { base: '{colors.gray.1300}', _dark: '{colors.gray.50}' },
      },
      // Override Chakra's default `bg.panel` (whose `_dark` resolves to Chakra's
      // own gray.950 = #111111, off our slate palette). Light value is white —
      // identical to Chakra's default — so this only realigns dark overlay
      // surfaces (Menu / Modal / Popover / Toast) onto our gray scale.
      panel: {
        value: { base: '{colors.white}', _dark: '{colors.gray.1400}' },
      },
      /**
       * Row/selection state tints. Use these for selected rows,
       * validation-error rows, and transient highlights instead of
       * hand-picking `primary.*`/`danger.*` tints at the call site.
       *
       * Values mirror `primary.lightest` / `danger.lightest` /
       * `warning.lightest` (this Chakra version doesn't resolve
       * semantic→semantic token references, so the primitive pairs are
       * repeated here — keep them in sync with the brand ramps above).
       */
      selected: {
        value: { base: '{colors.blue.25}', _dark: '{colors.blue.900}' },
      },
      invalid: {
        subtle: {
          value: { base: '{colors.rose.25}', _dark: '{colors.rose.900}' },
        },
      },
      highlighted: {
        value: { base: '{colors.gold.25}', _dark: '{colors.gold.900}' },
      },
    },

    /**
     * Neutral foreground (text/icon) tokens — map onto the gray.0–1500 scale.
     *
     * - default: primary text/icons
     * - muted: secondary text
     * - subtle: tertiary / placeholder text
     * - inverse: text on inverse surfaces (flips with mode)
     */
    fg: {
      default: {
        // _dark is gray.200 (not gray.50): near-white text on the dark canvas
        // ran ~18:1 — brighter than the light baseline (~15:1) and close to pure
        // white, which causes glare/halation. gray.200 matches the light
        // contrast (~15.4:1) while staying AAA.
        value: { base: '{colors.gray.1300}', _dark: '{colors.gray.200}' },
      },
      muted: {
        // _dark lifts gray.400 → gray.300: secondary text read as too dim on the
        // dark canvas next to fg.default (gray.200). gray.300 sits one step under
        // default — restoring the light-mode hierarchy gap — while staying well
        // clear of AA (~12.8:1 on bg.canvas, ~11.7:1 on bg.surface). Light value
        // (gray.900) is unchanged.
        value: { base: '{colors.gray.900}', _dark: '{colors.gray.300}' },
      },
      subtle: {
        value: { base: '{colors.gray.700}', _dark: '{colors.gray.600}' },
      },
      inverse: {
        value: { base: '{colors.gray.0}', _dark: '{colors.gray.1400}' },
      },
    },

    /**
     * Neutral border tokens — map onto the gray.0–1500 scale.
     *
     * - default: standard borders, dividers
     * - subtle: low-emphasis dividers
     * - strong: high-emphasis borders, focus outlines on neutral
     */
    border: {
      default: {
        value: { base: '{colors.gray.300}', _dark: '{colors.gray.1100}' },
      },
      subtle: {
        value: { base: '{colors.gray.200}', _dark: '{colors.gray.1300}' },
      },
      strong: {
        value: { base: '{colors.gray.500}', _dark: '{colors.gray.900}' },
      },
    },
  },
} as const;

/**
 * Union of every semantic color token name exposed by the Logician theme,
 * in Chakra dotted-path form (e.g. `fg.default`, `bg.surface`, `primary.main`).
 *
 * This is the contract consumed by the factchat primitive→semantic codemod and
 * by reviewers. It is intentionally hand-maintained alongside `semanticTokens`
 * so a rename here is a visible, reviewable diff.
 *
 * Note: `bg.panel` is deliberately omitted — it is an internal realignment of a
 * Chakra default (for overlay surfaces), not part of the public migration
 * contract. App code should use `bg.surface`/`bg.canvas`.
 */
export type SemanticColorToken =
  | `bg.${
      | 'canvas'
      | 'surface'
      | 'subtle'
      | 'muted'
      | 'inverse'
      | 'selected'
      | 'highlighted'}`
  | 'bg.invalid.subtle'
  | `fg.${'default' | 'muted' | 'subtle' | 'inverse'}`
  | `border.${'default' | 'subtle' | 'strong'}`
  | `${'primary' | 'secondary' | 'danger' | 'success' | 'warning'}.${
      | 'lightest'
      | 'extralight'
      | 'lighter'
      | 'light'
      | 'main'
      | 'dark'
      | 'darker'}`;

/**
 * Primitive color palette following the Golden Ratio system.
 *
 * These are the raw color values organized by hue. In most cases,
 * you should use semantic tokens (`primary`, `danger`, etc.) instead
 * of these primitive values directly.
 *
 * ### Scale explanation:
 * - **25**: Lightest backgrounds, ghost states
 * - **50-200**: Light shades for backgrounds, subtle fills
 * - **300**: Medium shade for borders, hover states
 * - **500**: Base color, primary usage
 * - **600-700**: Dark shades for text, emphasis
 * - **800-900**: Darkest shades for high-contrast text
 *
 * ### Gray scale (Slate-based):
 * Extended from 0-1500 for fine-grained control:
 * - **0**: Pure background (near-white with blue tint)
 * - **50-200**: Light backgrounds, subtle borders
 * - **300-500**: Borders, disabled states
 * - **600-800**: Secondary text, icons
 * - **900-1200**: Primary text
 * - **1300-1500**: Darkest backgrounds, high-contrast text
 *
 * @example
 * ```tsx
 * // Prefer semantic tokens
 * <Button bgColor="primary.main" />
 *
 * // Use primitives only when semantic tokens don't apply
 * <Box borderColor="gray.300" />
 * ```
 */
export const colors = {
  /**
   * Blue palette - Primary brand color
   * Used for: primary semantic tokens, interactive elements
   */
  blue: {
    25: { value: '#F4F7FD' }, // Ultra-light - ghost backgrounds
    50: { value: '#E8EEFB' }, // Lightest - backgrounds
    100: { value: '#B9CBF3' }, // Lighter - subtle fills
    200: { value: '#7DA0E8' }, // Light - hover, focus rings
    300: { value: '#4A79DC' }, // Medium - borders
    500: { value: '#1751D0' }, // Base - primary.main
    600: { value: '#1241A6' }, // Dark - hover on main
    700: { value: '#0D317D' }, // Darker - text
    800: { value: '#092053' }, // Very dark - emphasis
    900: { value: '#04102A' }, // Darkest - high contrast
  },

  /**
   * Rose palette - Danger/error color
   * Used for: danger semantic tokens, error states, destructive actions
   */
  rose: {
    25: { value: '#FDF5F5' }, // Ultra-light - ghost backgrounds
    50: { value: '#FBE8E9' }, // Lightest - error backgrounds
    100: { value: '#F3B9BD' }, // Lighter - subtle error fills
    200: { value: '#E87D84' }, // Light - error borders
    300: { value: '#DC4A53' }, // Medium - error accents
    500: { value: '#C1232C' }, // Base - danger.main (desaturated ~1 notch from #D01721)
    600: { value: '#9C1C23' }, // Dark - hover on main (desaturated to match .500)
    700: { value: '#7D0D14' }, // Darker - error text
    800: { value: '#53090D' }, // Very dark - emphasis
    900: { value: '#2A0407' }, // Darkest - high contrast
  },

  /**
   * Green palette - Success color
   * Used for: success semantic tokens, confirmations, positive feedback
   */
  green: {
    25: { value: '#F4FDF4' }, // Ultra-light - ghost backgrounds
    50: { value: '#E9FBE8' }, // Lightest - success backgrounds
    100: { value: '#BDF3B9' }, // Lighter - subtle success fills
    200: { value: '#84E87D' }, // Light - success borders
    300: { value: '#53DC4A' }, // Medium - success accents
    500: { value: '#21D017' }, // Bright - icons (avoid for text)
    600: { value: '#1AA612' }, // Base - success.main
    700: { value: '#147D0D' }, // Darker - success text
    800: { value: '#0D5309' }, // Very dark - emphasis
    900: { value: '#072A04' }, // Darkest - high contrast
  },

  /**
   * Violet palette - Secondary/accent color
   * Used for: secondary semantic tokens, highlights, tags
   */
  violet: {
    25: { value: '#FAF4FD' }, // Ultra-light - ghost backgrounds
    50: { value: '#F4E8FB' }, // Lightest - accent backgrounds
    100: { value: '#DEB9F3' }, // Lighter - subtle accent fills
    200: { value: '#C17DE8' }, // Light - accent borders
    300: { value: '#A84ADC' }, // Medium - accent elements
    500: { value: '#9117D0' }, // Base - secondary.main
    600: { value: '#7412A6' }, // Dark - hover on main
    700: { value: '#570D7D' }, // Darker - accent text
    800: { value: '#3A0953' }, // Very dark - emphasis
    900: { value: '#1D042A' }, // Darkest - high contrast
  },

  /**
   * Gold palette - Warning color
   * Used for: warning semantic tokens, caution states
   */
  gold: {
    25: { value: '#FDFBF4' }, // Ultra-light - ghost backgrounds
    50: { value: '#FBF6E8' }, // Lightest - warning backgrounds
    100: { value: '#F3E4B9' }, // Lighter - subtle warning fills
    200: { value: '#E8CD7D' }, // Light - warning borders
    300: { value: '#DCB84A' }, // Medium - warning accents
    500: { value: '#D0A117' }, // Base - warning.main
    600: { value: '#A68112' }, // Dark - hover on main
    700: { value: '#7D610D' }, // Darker - warning text
    800: { value: '#534109' }, // Very dark - emphasis
    900: { value: '#2A2004' }, // Darkest - high contrast
  },

  /**
   * Gray palette (Slate-based with cool blue undertone)
   * Extended scale from 0-1500 for fine-grained control
   *
   * Used for: backgrounds, borders, text, disabled states
   *
   * Contrast ratios against gray.0 (#FDFDFF):
   * - gray.700: 4.6:1 ✓ AA (large text)
   * - gray.900: 6.2:1 ✓ AA
   * - gray.1300: 11.2:1 ✓ AAA
   */
  gray: {
    0: { value: '#FDFDFF' }, // Pure background (near-white with blue tint)
    50: { value: '#F7F9FC' }, // Subtle background
    100: { value: '#F0F3F9' }, // Muted background
    200: { value: '#E2E6F0' }, // Light borders, dividers
    300: { value: '#CDD3E0' }, // Default borders
    400: { value: '#B0B8C9' }, // Disabled borders
    500: { value: '#9AA3B8' }, // Placeholder text, tertiary
    600: { value: '#8690A7' }, // Icons, secondary text
    700: { value: '#737D96' }, // Secondary text
    800: { value: '#616B85' }, // Body text (light)
    900: { value: '#505A74' }, // Body text (medium)
    1000: { value: '#414A63' }, // Body text (strong)
    1100: { value: '#343C52' }, // Headings (light)
    1200: { value: '#2A3142' }, // Headings (medium)
    1300: { value: '#1E2433' }, // Primary text, headings
    1400: { value: '#141924' }, // Dark backgrounds
    1500: { value: '#0B0E17' }, // Darkest background
  },

  /**
   * Legacy purple palette (aliased to violet for backwards compatibility)
   * @deprecated Use `violet` instead
   */
  purple: {
    50: { value: '#F4E8FB' },
    100: { value: '#DEB9F3' },
    200: { value: '#C17DE8' },
    300: { value: '#A84ADC' },
    500: { value: '#9117D0' },
    600: { value: '#7412A6' },
    700: { value: '#570D7D' },
    800: { value: '#3A0953' },
    900: { value: '#1D042A' },
  },

  /**
   * Legacy red palette (aliased to rose for backwards compatibility)
   * @deprecated Use `rose` instead
   */
  red: {
    50: { value: '#FBE8E9' },
    100: { value: '#F3B9BD' },
    200: { value: '#E87D84' },
    300: { value: '#DC4A53' },
    500: { value: '#C1232C' }, // kept in sync with rose.500 (deprecated alias)
    600: { value: '#9C1C23' }, // kept in sync with rose.600 (deprecated alias)
    700: { value: '#7D0D14' },
    800: { value: '#53090D' },
    900: { value: '#2A0407' },
  },

  /**
   * Legacy yellow palette (aliased to gold for backwards compatibility)
   * @deprecated Use `gold` instead
   */
  yellow: {
    50: { value: '#FBF6E8' },
    100: { value: '#F3E4B9' },
    200: { value: '#E8CD7D' },
    300: { value: '#DCB84A' },
    400: { value: '#D0A117' }, // For backwards compat (warning.main used yellow.400)
    500: { value: '#D0A117' },
    600: { value: '#A68112' },
    700: { value: '#7D610D' },
    800: { value: '#534109' },
    900: { value: '#2A2004' },
  },

  white: { value: '#FFFFFF' },
  black: { value: '#0B0E17' }, // Matches gray.1500
};
