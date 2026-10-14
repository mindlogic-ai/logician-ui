import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

import {
  buttonColorPalettes,
  buttonColorPaletteStyles,
  buttonVariants,
} from '../Button/Button.styles';
import { ButtonColorPalette, ButtonVariant } from '../Button/Button.types';

export {
  buttonColorPalettes as iconButtonColorPalettes,
  buttonColorPalettes as iconButtonColorSchemes, // Deprecated
  buttonVariants as iconButtonVariants,
};

type StyleProps = Partial<ChakraButtonProps>;

/**
 * Override certain Button styles that don't apply to IconButton.
 */
export const iconButtonColorPaletteStyles: Record<
  ButtonColorPalette,
  Record<ButtonVariant, StyleProps>
> = {
  ...buttonColorPaletteStyles,
  neutral: {
    ...buttonColorPaletteStyles.neutral,
    ghost: {
      ...buttonColorPaletteStyles.neutral.ghost,
      color: 'fg.subtle',
    },
  },
};

export {
  iconButtonColorPaletteStyles as iconButtonColorSchemeStyles, // Deprecated
};

export const getIconButtonStyles = (
  colorPalette: ButtonColorPalette = 'neutral',
  variant: ButtonVariant = 'ghost'
): StyleProps => iconButtonColorPaletteStyles[colorPalette][variant];
