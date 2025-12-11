import { BadgeVariant } from './Badge.types';

/**
 * Badge base styles using the Golden Ratio color system.
 *
 * These styles are shared across all badge variants.
 */
export const baseStyles = {
  borderRadius: '2xl',
  px: 2.5,
  fontSize: 'subtitle',
  fontWeight: 'medium',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Badge variant styles using the Golden Ratio color system.
 *
 * Each variant uses the `lightest` background shade with `dark` text
 * for optimal readability and WCAG AA compliance.
 *
 * Pattern: bg = `*.lightest`, color = `*.dark`
 * This matches the Alert/Toast/Banner component styling.
 */
export const variantStyles: Record<BadgeVariant, { bgColor: string; color: string }> = {
  /**
   * Primary badge - Default, general purpose
   * Blue lightest background with dark blue text
   */
  primary: {
    bgColor: 'primary.lightest', // #E8EEFB
    color: 'primary.dark', // #0D317D
  },

  /**
   * Secondary badge - Accent, highlight
   * Violet lightest background with dark violet text
   */
  secondary: {
    bgColor: 'secondary.lightest', // #F4E8FB
    color: 'secondary.dark', // #570D7D
  },

  /**
   * Success badge - Positive states
   * Green lightest background with dark green text
   */
  success: {
    bgColor: 'success.lightest', // #E9FBE8
    color: 'success.dark', // #147D0D
  },

  /**
   * Warning badge - Caution states
   * Gold lightest background with dark gold text
   */
  warning: {
    bgColor: 'warning.lightest', // #FBF6E8
    color: 'warning.dark', // #7D610D
  },

  /**
   * Danger badge - Error/negative states
   * Rose lightest background with dark rose text
   */
  danger: {
    bgColor: 'danger.lightest', // #FBE8E9
    color: 'danger.dark', // #7D0D14
  },

  /**
   * Neutral badge - Neutral information
   * Gray background with dark gray text
   */
  neutral: {
    bgColor: 'gray.100', // #F0F3F9
    color: 'gray.1200', // #2A3142
  },
};
