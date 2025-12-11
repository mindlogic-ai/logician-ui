/**
 * IconButton styles - reuses Button styles for consistency.
 *
 * Since IconButton and Button share the same two-dimensional variant system
 * (colorScheme × variant), we simply re-export the Button styles.
 */
export {
  colorSchemeStyles,
  getButtonStyles as getIconButtonStyles,
  colorSchemes,
  variants,
} from '../Button/Button.styles';
