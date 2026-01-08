/**
 * IconButton styles - reuses Button styles for consistency.
 *
 * Since IconButton and Button share the same two-dimensional variant system
 * (colorPalette × variant), we simply re-export the Button styles.
 */
export {
  getButtonStyles as getIconButtonStyles,
  buttonColorPalettes as iconButtonColorPalettes,
  buttonColorPaletteStyles as iconButtonColorPaletteStyles,
  buttonColorSchemes as iconButtonColorSchemes, // Deprecated
  buttonColorSchemeStyles as iconButtonColorSchemeStyles, // Deprecated
  buttonVariants as iconButtonVariants,
} from '../Button/Button.styles';
