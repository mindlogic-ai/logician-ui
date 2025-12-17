/**
 * IconButton styles - reuses Button styles for consistency.
 *
 * Since IconButton and Button share the same two-dimensional variant system
 * (colorScheme × variant), we simply re-export the Button styles.
 */
export {
  colorSchemes,
  colorSchemeStyles,
  getButtonStyles as getIconButtonStyles,
  variants,
} from '../Button/Button.styles';
