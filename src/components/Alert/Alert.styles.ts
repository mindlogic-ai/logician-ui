/**
 * Alert variant styles using the Golden Ratio color system.
 *
 * Uses `lightest` backgrounds with `dark` text for optimal readability
 * and WCAG AA compliance.
 */
export const AlertStyles = {
  error: {
    bg: 'danger.lightest', // #FBE8E9
    color: 'danger.dark', // #7D0D14
  },
  success: {
    bg: 'success.lightest', // #E9FBE8
    color: 'success.dark', // #147D0D
  },
  warning: {
    bg: 'warning.lightest', // #FBF6E8
    color: 'warning.dark', // #7D610D
  },
  info: {
    bg: 'primary.lightest', // #E8EEFB
    color: 'primary.dark', // #0D317D
  },
  loading: {},
};
