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
/**
 * Halved-saturation counterpart of each primitive `gray.N` — same hue and
 * lightness, HSL saturation cut by ~50% (e.g. `gray.1300` #1E2433 @ 26% →
 * #23262E @ 13%). The blue-tinted `gray` ramp reads as the right neutral in
 * light mode but turns muddy/over-chromatic as a dark surface, so every
 * dark-mode neutral below (`slate.*`, and the `_dark` of `bg`/`fg`/`border`)
 * resolves to this desaturated mirror instead of the raw `gray` step. Light
 * mode is untouched — it keeps referencing `{colors.gray.*}` verbatim.
 *
 * Single source of truth: change a dark neutral here, not at each token.
 */
const desaturatedGray = {
  0: '#FEFEFF',
  50: '#F8F9FB',
  100: '#F2F4F7',
  200: '#E5E8EC',
  300: '#D2D5DB',
  400: '#B6BAC3',
  500: '#A2A6B1',
  600: '#8E939F',
  700: '#7C818D',
  800: '#6A6F7C',
  900: '#595E6B',
  1000: '#4A4E5A',
  1100: '#3C404B',
  1200: '#30343C',
  1300: '#23262E',
  1400: '#181A20',
  1500: '#0E1014',
} as const;

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
      // Solid brand-blue *fills* for surfaces with white text/icons on top
      // (modal headers, hero/banner gradients, brand badges). `primary.main`/
      // `primary.dark` lighten ~2 stops in dark — right for foreground, too
      // light as a fill — so these stay a deep blue in dark instead. `base`
      // repeats the old main/dark values, so light is unchanged. Bare accents
      // (dots, progress bars) keep `primary.main`.
      fill: {
        value: { base: '{colors.blue.500}', _dark: '{colors.blue.700}' },
      },
      fillStrong: {
        value: { base: '{colors.blue.700}', _dark: '{colors.blue.800}' },
      },
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
     * `slate.*` — the foundational **mode-aware neutral family**.
     *
     * A first-class neutral palette alongside the raw `gray.*` primitives, but
     * mode-aware: each `slate.N` resolves to `gray.N` in light and to the
     * desaturated counterpart of the *mirrored* step in dark, so a single token
     * carries the same tonal level in both modes (e.g. `slate.300` is a light
     * divider in light and the equivalent dark divider in dark — no `_dark={{…}}`
     * at the call site). It lives under `semanticTokens` only because Chakra
     * requires that for the `_dark` flip; conceptually it is a *foundation*
     * (a tonal scale), not a *role*.
     *
     * When to use which:
     * - Prefer the **role tokens** (`fg`/`bg`/`border`) when one matches the
     *   intent — they carry semantics and AA-tuned dark values.
     * - Reach for **`slate.N`** when you need a specific neutral tonal step that
     *   no role names (mirroring how you'd otherwise drop to a raw `gray.N`, but
     *   keeping the dark flip). `slate` and the role tokens are *distinct* ramps
     *   (slate is a mechanical mirror; roles are hand-tuned), so they are not
     *   interchangeable in dark mode.
     *
     * `600`/`700` are lifted off the straight mirror (#8E939F/#7C818D) so the
     * secondary/muted text they most often carry clears WCAG AA 4.5:1 on the
     * dark canvas/surface — the straight mirrors measured ~3.0–3.9 there.
     */
    slate: {
      0: { value: { base: '{colors.gray.0}', _dark: desaturatedGray[1500] } },
      50: { value: { base: '{colors.gray.50}', _dark: desaturatedGray[1400] } },
      100: {
        value: { base: '{colors.gray.100}', _dark: desaturatedGray[1300] },
      },
      200: {
        value: { base: '{colors.gray.200}', _dark: desaturatedGray[1200] },
      },
      300: {
        value: { base: '{colors.gray.300}', _dark: desaturatedGray[1100] },
      },
      400: {
        value: { base: '{colors.gray.400}', _dark: desaturatedGray[1000] },
      },
      500: {
        value: { base: '{colors.gray.500}', _dark: desaturatedGray[900] },
      },
      600: { value: { base: '{colors.gray.600}', _dark: '#898E99' } },
      700: { value: { base: '{colors.gray.700}', _dark: '#8D919D' } },
      800: {
        value: { base: '{colors.gray.800}', _dark: desaturatedGray[600] },
      },
      900: {
        value: { base: '{colors.gray.900}', _dark: desaturatedGray[500] },
      },
      1000: {
        value: { base: '{colors.gray.1000}', _dark: desaturatedGray[400] },
      },
      1100: {
        value: { base: '{colors.gray.1100}', _dark: desaturatedGray[300] },
      },
      1200: {
        value: { base: '{colors.gray.1200}', _dark: desaturatedGray[200] },
      },
      1300: {
        value: { base: '{colors.gray.1300}', _dark: desaturatedGray[100] },
      },
      1400: {
        value: { base: '{colors.gray.1400}', _dark: desaturatedGray[50] },
      },
      1500: {
        value: { base: '{colors.gray.1500}', _dark: desaturatedGray[0] },
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
      // Chakra's own global css paints `html { background: bg }` — the *plain*
      // `bg` token, not `bg.canvas` — so this is the actual page background
      // wherever no component paints over it. `_light` is pure white (Chakra's
      // value, so light is untouched); `_dark` rejoins our neutral floor instead
      // of Chakra's off-palette black.
      DEFAULT: {
        value: { _light: '{colors.white}', _dark: desaturatedGray[1500] },
      },
      canvas: {
        value: { base: '{colors.gray.0}', _dark: desaturatedGray[1500] },
      },
      surface: {
        value: { base: '{colors.white}', _dark: desaturatedGray[1400] },
      },
      // Strongly-raised neutral surface — one level above `surface` (e.g. the
      // selected thumb of a SegmentedControl). In dark this is the *lightest*
      // neutral bg token so a raised element reads as lifted toward the light,
      // not recessed. (The `bg.*` dark ramp is otherwise compressed such that
      // `surface` sits below `subtle`/`muted`; `raised` deliberately tops the
      // scale so "raised" has a token that behaves correctly in dark.)
      // NB: named `raised`, not Chakra's `emphasized` — that default token name
      // cannot be overridden via semanticTokens in this setup (it keeps
      // resolving to Chakra's own gray.200), whereas a fresh name is honoured.
      raised: {
        value: { base: '{colors.white}', _dark: desaturatedGray[1100] },
      },
      subtle: {
        value: { base: '{colors.gray.50}', _dark: desaturatedGray[1300] },
      },
      muted: {
        value: { base: '{colors.gray.100}', _dark: desaturatedGray[1200] },
      },
      inverse: {
        value: { base: '{colors.gray.1300}', _dark: desaturatedGray[50] },
      },
      // Sunken page wash for list/overview surfaces: a gray floor in light so
      // `bg.surface` cards read as raised above it. In dark the `bg.*` ramp is
      // compressed (`subtle` sits *lighter* than `surface`), which would invert
      // that elevation — so the dark value drops to the canvas floor instead.
      // Component-level fills (hover, chips, inner blocks) keep using `bg.subtle`.
      sunken: {
        value: { base: '{colors.gray.50}', _dark: desaturatedGray[1500] },
      },
      // Override Chakra's default `bg.panel` (whose `_dark` resolves to Chakra's
      // own gray.950 = #111111, off our slate palette). Light value is white —
      // identical to Chakra's default — so this only realigns dark overlay
      // surfaces (Menu / Modal / Popover / Toast) onto our gray scale.
      panel: {
        value: { base: '{colors.white}', _dark: desaturatedGray[1400] },
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
      // Plain `fg` is Chakra's html-level text color (`html { color: fg }`).
      // `_light` repeats Chakra's value (black); `_dark` rejoins our desaturated
      // neutral so legacy html-level text tracks `fg.default`.
      DEFAULT: {
        value: { _light: '{colors.black}', _dark: desaturatedGray[50] },
      },
      // Strongest text — headings, titles, key figures, emphasis. This is the
      // near-black step that `fg.default` used to be; `default` is now re-pegged
      // to a lighter body weight (see below), so reach for `emphasized` when you
      // specifically want maximum contrast.
      emphasized: {
        value: { base: '{colors.gray.1300}', _dark: desaturatedGray[200] },
      },
      default: {
        // Primary *body* text. Re-pegged from gray.1300 → gray.1000: near-black
        // (gray.1300, ~14:1 on white) is unusually heavy for running copy, and
        // real product usage clustered well below it. gray.1000 (~9:1) is a
        // comfortable AAA body weight; the old near-black step lives on as
        // `fg.emphasized`. _dark drops one step from emphasized for hierarchy.
        value: { base: '{colors.gray.1000}', _dark: desaturatedGray[300] },
      },
      muted: {
        // Secondary text. _dark sits one step below `default` (~9.5:1 on the dark
        // canvas) to keep the default→muted hierarchy gap. Light value (gray.900)
        // is unchanged.
        value: { base: '{colors.gray.900}', _dark: desaturatedGray[400] },
      },
      subtle: {
        // Tertiary / placeholder / icon text. _dark a11y-bumped from the straight
        // mirror (desaturatedGray[600] #8E939F, ~4.06:1 on bg.muted) to #989DA9
        // (~4.6:1) so it clears AA while staying below fg.muted. Light value
        // (gray.700) is unchanged.
        value: { base: '{colors.gray.700}', _dark: '#989DA9' },
      },
      inverse: {
        value: { base: '{colors.gray.0}', _dark: desaturatedGray[1400] },
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
      // Plain `border` feeds Chakra's `--global-color-border` (the implicit
      // default border color). Not a text color, so its `_dark` takes the
      // straight halved-saturation mirror (no a11y bump). `_light` repeats
      // Chakra's value so light is untouched.
      DEFAULT: {
        value: { _light: '{colors.gray.200}', _dark: desaturatedGray[800] },
      },
      default: {
        value: { base: '{colors.gray.300}', _dark: desaturatedGray[1100] },
      },
      subtle: {
        value: { base: '{colors.gray.200}', _dark: desaturatedGray[1300] },
      },
      strong: {
        value: { base: '{colors.gray.500}', _dark: desaturatedGray[900] },
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
 * Note: `bg.panel` and the bare `bg`/`fg`/`border` DEFAULT tokens are
 * deliberately omitted — they are internal realignments of Chakra defaults
 * (overlay surfaces and html-level globals), not part of the public migration
 * contract. App code should use `bg.surface`/`bg.canvas`, `fg.default`, etc.
 */
export type SemanticColorToken =
  | `bg.${
      | 'canvas'
      | 'surface'
      | 'raised'
      | 'subtle'
      | 'muted'
      | 'sunken'
      | 'inverse'
      | 'selected'
      | 'highlighted'}`
  | 'bg.invalid.subtle'
  | `fg.${'emphasized' | 'default' | 'muted' | 'subtle' | 'inverse'}`
  | `border.${'default' | 'subtle' | 'strong'}`
  // `slate.*` — foundational mode-aware neutral family (a tonal scale, not a
  // role). Prefer a `fg`/`bg`/`border` role token when one fits; reach for
  // `slate.N` when you need a specific neutral step no role names.
  | `slate.${
      | 0
      | 50
      | 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800
      | 900
      | 1000
      | 1100
      | 1200
      | 1300
      | 1400
      | 1500}`
  | `primary.${'fill' | 'fillStrong'}`
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
