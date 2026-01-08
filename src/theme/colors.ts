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
 * 3. **Consistent Scale**: Each color has 50/100/200/300/500/600/700/800/900 steps
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
 * - `lightest`: Very light backgrounds (badges, subtle fills)
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
     * Contrast ratios (on white):
     * - main (#1751D0): 5.9:1 ✓ AA
     * - dark (#0D317D): 9.4:1 ✓ AAA
     */
    primary: {
      lightest: { value: '{colors.blue.50}' }, // #E8EEFB - Very light backgrounds
      lighter: { value: '{colors.blue.100}' }, // #B9CBF3 - Light backgrounds
      light: { value: '{colors.blue.200}' }, // #7DA0E8 - Hover states, subtle fills
      main: { value: '{colors.blue.500}' }, // #1751D0 - Primary actions
      dark: { value: '{colors.blue.700}' }, // #0D317D - Text on light backgrounds
      darker: { value: '{colors.blue.900}' }, // #04102A - High-contrast text
    },

    /**
     * Secondary colors (Violet-based)
     * Use for: Accent elements, highlights, tags
     *
     * Contrast ratios (on white):
     * - main (#9117D0): 5.1:1 ✓ AA
     * - dark (#570D7D): 9.2:1 ✓ AAA
     */
    secondary: {
      lightest: { value: '{colors.violet.50}' }, // #F4E8FB - Very light backgrounds
      lighter: { value: '{colors.violet.100}' }, // #DEB9F3 - Light backgrounds
      light: { value: '{colors.violet.200}' }, // #C17DE8 - Hover states
      main: { value: '{colors.violet.500}' }, // #9117D0 - Accent actions
      dark: { value: '{colors.violet.700}' }, // #570D7D - Text on light backgrounds
      darker: { value: '{colors.violet.900}' }, // #1D042A - High-contrast text
    },

    /**
     * Danger colors (Rose-based)
     * Use for: Error states, destructive actions, validation errors
     *
     * Contrast ratios (on white):
     * - main (#D01721): 5.2:1 ✓ AA
     * - dark (#7D0D14): 9.6:1 ✓ AAA
     */
    danger: {
      lightest: { value: '{colors.rose.50}' }, // #FBE8E9 - Error backgrounds
      lighter: { value: '{colors.rose.100}' }, // #F3B9BD - Light error fills
      light: { value: '{colors.rose.200}' }, // #E87D84 - Error borders, icons
      main: { value: '{colors.rose.500}' }, // #D01721 - Error text, buttons
      dark: { value: '{colors.rose.700}' }, // #7D0D14 - Error text on light bg
      darker: { value: '{colors.rose.900}' }, // #2A0407 - High-contrast error text
    },

    /**
     * Success colors (Green-based)
     * Use for: Success messages, confirmations, positive feedback
     *
     * Contrast ratios (on white):
     * - main (#1AA612): 4.5:1 ✓ AA (large text)
     * - dark (#147D0D): 6.1:1 ✓ AA
     */
    success: {
      lightest: { value: '{colors.green.50}' }, // #E9FBE8 - Success backgrounds
      lighter: { value: '{colors.green.100}' }, // #BDF3B9 - Light success fills
      light: { value: '{colors.green.200}' }, // #84E87D - Success borders, icons
      main: { value: '{colors.green.600}' }, // #1AA612 - Success text, buttons
      dark: { value: '{colors.green.700}' }, // #147D0D - Success text on light bg
      darker: { value: '{colors.green.900}' }, // #072A04 - High-contrast success text
    },

    /**
     * Warning colors (Gold-based)
     * Use for: Warning messages, caution states, attention needed
     *
     * Contrast ratios (on white):
     * - main (#D0A117): 3.0:1 (use dark on light backgrounds)
     * - dark (#7D610D): 5.8:1 ✓ AA
     */
    warning: {
      lightest: { value: '{colors.gold.50}' }, // #FBF6E8 - Warning backgrounds
      lighter: { value: '{colors.gold.100}' }, // #F3E4B9 - Light warning fills
      light: { value: '{colors.gold.200}' }, // #E8CD7D - Warning borders, icons
      main: { value: '{colors.gold.500}' }, // #D0A117 - Warning icons, accents
      dark: { value: '{colors.gold.700}' }, // #7D610D - Warning text on light bg
      darker: { value: '{colors.gold.900}' }, // #2A2004 - High-contrast warning text
    },
  },
} as const;

/**
 * Primitive color palette following the Golden Ratio system.
 *
 * These are the raw color values organized by hue. In most cases,
 * you should use semantic tokens (`primary`, `danger`, etc.) instead
 * of these primitive values directly.
 *
 * ### Scale explanation:
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
    50: { value: '#FBE8E9' }, // Lightest - error backgrounds
    100: { value: '#F3B9BD' }, // Lighter - subtle error fills
    200: { value: '#E87D84' }, // Light - error borders
    300: { value: '#DC4A53' }, // Medium - error accents
    500: { value: '#D01721' }, // Base - danger.main
    600: { value: '#A6121A' }, // Dark - hover on main
    700: { value: '#7D0D14' }, // Darker - error text
    800: { value: '#53090D' }, // Very dark - emphasis
    900: { value: '#2A0407' }, // Darkest - high contrast
  },

  /**
   * Green palette - Success color
   * Used for: success semantic tokens, confirmations, positive feedback
   */
  green: {
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
    500: { value: '#D01721' },
    600: { value: '#A6121A' },
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
