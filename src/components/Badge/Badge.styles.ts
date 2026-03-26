import { BadgeSize, BadgeVariant } from './Badge.types';

/**
 * Badge base styles using the Golden Ratio color system.
 *
 * These styles are shared across all badge variants.
 */
export const baseStyles = {
  borderRadius: '2xl',
  fontWeight: 'medium',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Badge variant styles using the Golden Ratio color system.
 *
 * Each variant uses the `extralight` background shade with `dark` text
 * for optimal readability and WCAG AA compliance.
 *
 * Pattern: bg = `*.extralight`, color = `*.dark`
 * This matches the Alert/Toast/Banner component styling.
 */
export const sizeStyles: Record<BadgeSize, { px: number; py: number; fontSize: string }> = {
  sm: { px: 1.5, py: 0, fontSize: '11px' },
  md: { px: 2.5, py: 0.5, fontSize: '12px' },
  lg: { px: 3, py: 1, fontSize: '14px' },
};

export const variantStyles: Record<
  BadgeVariant,
  { bgColor: string; color: string }
> = {
  /**
   * Primary badge - Default, general purpose
   * Blue extralight background with dark blue text
   */
  primary: {
    bgColor: 'primary.extralight', // #E8EEFB
    color: 'primary.dark', // #0D317D
  },

  /**
   * Secondary badge - Accent, highlight
   * Violet extralight background with dark violet text
   */
  secondary: {
    bgColor: 'secondary.extralight', // #F4E8FB
    color: 'secondary.dark', // #570D7D
  },

  /**
   * Success badge - Positive states
   * Green extralight background with dark green text
   */
  success: {
    bgColor: 'success.extralight', // #E9FBE8
    color: 'success.dark', // #147D0D
  },

  /**
   * Warning badge - Caution states
   * Gold extralight background with dark gold text
   */
  warning: {
    bgColor: 'warning.extralight', // #FBF6E8
    color: 'warning.dark', // #7D610D
  },

  /**
   * Danger badge - Error/negative states
   * Rose extralight background with dark rose text
   */
  danger: {
    bgColor: 'danger.extralight', // #FBE8E9
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
