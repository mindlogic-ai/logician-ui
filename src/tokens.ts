/**
 * Logician UI — plain JS hex constants for the design token palette.
 *
 * Use this module when you need token values outside the React/Chakra tree:
 * Canvas API calls, runtime CSS-string injection, chart color arrays,
 * customer-facing embed snippets, or any plain `.ts` module that cannot
 * access the Chakra theme context.
 *
 * @example
 * ```ts
 * import { colorTokens } from '@mindlogic-ai/logician-ui/tokens';
 *
 * // Canvas
 * ctx.strokeStyle = colorTokens.blue[500]; // '#1751D0'
 *
 * // CSS string injection
 * const css = `outline: 2px solid ${colorTokens.blue[500]};`;
 *
 * // Chart palette
 * const scale: [string, string] = [colorTokens.blue[25], colorTokens.blue[500]];
 * ```
 *
 * For JSX/Chakra component usage, continue using semantic tokens via style props:
 * `<Box color="primary.main" />` — no import needed.
 */

export const colorTokens = {
  blue: {
    25: '#F4F7FD',
    50: '#E8EEFB',
    100: '#B9CBF3',
    200: '#7DA0E8',
    300: '#4A79DC',
    500: '#1751D0',
    600: '#1241A6',
    700: '#0D317D',
    800: '#092053',
    900: '#04102A',
  },
  rose: {
    25: '#FDF5F5',
    50: '#FBE8E9',
    100: '#F3B9BD',
    200: '#E87D84',
    300: '#DC4A53',
    500: '#D01721',
    600: '#A6121A',
    700: '#7D0D14',
    800: '#53090D',
    900: '#2A0407',
  },
  green: {
    25: '#F4FDF4',
    50: '#E9FBE8',
    100: '#BDF3B9',
    200: '#84E87D',
    300: '#53DC4A',
    500: '#21D017',
    600: '#1AA612',
    700: '#147D0D',
    800: '#0D5309',
    900: '#072A04',
  },
  violet: {
    25: '#FAF4FD',
    50: '#F4E8FB',
    100: '#DEB9F3',
    200: '#C17DE8',
    300: '#A84ADC',
    500: '#9117D0',
    600: '#7412A6',
    700: '#570D7D',
    800: '#3A0953',
    900: '#1D042A',
  },
  gold: {
    25: '#FDFBF4',
    50: '#FBF6E8',
    100: '#F3E4B9',
    200: '#E8CD7D',
    300: '#DCB84A',
    500: '#D0A117',
    600: '#A68112',
    700: '#7D610D',
    800: '#534109',
    900: '#2A2004',
  },
  gray: {
    0: '#FDFDFF',
    50: '#F7F9FC',
    100: '#F0F3F9',
    200: '#E2E6F0',
    300: '#CDD3E0',
    400: '#B0B8C9',
    500: '#9AA3B8',
    600: '#8690A7',
    700: '#737D96',
    800: '#616B85',
    900: '#505A74',
    1000: '#414A63',
    1100: '#343C52',
    1200: '#2A3142',
    1300: '#1E2433',
    1400: '#141924',
    1500: '#0B0E17',
  },
  white: '#FFFFFF',
  black: '#0B0E17',
} as const;

/** Semantic aliases that mirror the Chakra `semanticTokens.colors` map. */
export const semanticColorTokens = {
  primary: {
    lightest: colorTokens.blue[25],
    extralight: colorTokens.blue[50],
    lighter: colorTokens.blue[100],
    light: colorTokens.blue[200],
    main: colorTokens.blue[500],
    dark: colorTokens.blue[700],
    darker: colorTokens.blue[900],
  },
  secondary: {
    lightest: colorTokens.violet[25],
    extralight: colorTokens.violet[50],
    lighter: colorTokens.violet[100],
    light: colorTokens.violet[200],
    main: colorTokens.violet[500],
    dark: colorTokens.violet[700],
    darker: colorTokens.violet[900],
  },
  success: {
    lightest: colorTokens.green[25],
    extralight: colorTokens.green[50],
    lighter: colorTokens.green[100],
    light: colorTokens.green[200],
    main: colorTokens.green[600],
    dark: colorTokens.green[700],
    darker: colorTokens.green[900],
  },
  warning: {
    lightest: colorTokens.gold[25],
    extralight: colorTokens.gold[50],
    lighter: colorTokens.gold[100],
    light: colorTokens.gold[200],
    main: colorTokens.gold[500],
    dark: colorTokens.gold[700],
    darker: colorTokens.gold[900],
  },
  danger: {
    lightest: colorTokens.rose[25],
    extralight: colorTokens.rose[50],
    lighter: colorTokens.rose[100],
    light: colorTokens.rose[200],
    main: colorTokens.rose[500],
    dark: colorTokens.rose[700],
    darker: colorTokens.rose[900],
  },
} as const;
