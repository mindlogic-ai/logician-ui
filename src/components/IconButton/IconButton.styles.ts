/**
 * IconButton styles - reuses Button styles for consistency.
 *
 * Since IconButton and Button share the same two-dimensional variant system
 * (colorScheme × variant), we simply re-export the Button styles.
 */
export {
  getButtonStyles as getIconButtonStyles,
  buttonColorSchemes as iconButtonColorSchemes,
  buttonColorSchemeStyles as iconButtonColorSchemeStyles,
  buttonVariants as iconButtonVariants,
} from '../Button/Button.styles';
