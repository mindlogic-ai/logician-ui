import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

import { disabledControl, disabledText } from '@/utils/disabledControl';

import { resolveLegacyButtonVariant } from '../Button/Button.legacy';
import {
  buttonColorPalettes,
  buttonVariantStyles,
} from '../Button/Button.styles';
import {
  ButtonColorPalette,
  LegacyButtonVariant,
} from '../Button/Button.types';
import { IconButtonVariant } from './IconButton.types';

type StyleProps = Partial<ChakraButtonProps>;

const PRESSED = '0.97';

/**
 * IconButton styles per role (prototype gallery `.ib`, `.ib.secondary`,
 * `.ib.primary`, `.send`).
 *
 * The filled roles reuse Button's so the two never drift; the icon-only roles
 * differ from Button's ghost/secondary in one way — the resting glyph is
 * `fg.icon` (3:1 non-text) and darkens to `fg.default` on hover.
 */
export const iconButtonVariantStyles: Record<IconButtonVariant, StyleProps> = {
  ghost: {
    borderColor: 'transparent',
    bgColor: 'transparent',
    color: 'fg.icon',
    _hover: { bgColor: 'primary.wash', color: 'fg.default' },
    _active: { bgColor: 'primary.washActive', scale: PRESSED },
    _disabled: { ...disabledText },
  },
  secondary: {
    borderColor: 'border.default',
    bgColor: 'transparent',
    color: 'fg.icon',
    _hover: { bgColor: 'primary.wash', color: 'fg.default' },
    _active: { bgColor: 'primary.washActive', scale: PRESSED },
    _disabled: { ...disabledControl },
  },
  primary: buttonVariantStyles.primary,
  danger: buttonVariantStyles.danger,
  /** The coral SEND button. */
  action: {
    borderColor: 'transparent',
    bgColor: 'send.bg',
    color: 'send.fg',
    _hover: { bgColor: 'send.bgHover' },
    _active: { bgColor: 'send.bgActive', scale: PRESSED },
    _disabled: { ...disabledControl },
  },
};

export const iconButtonVariants: IconButtonVariant[] = [
  'ghost',
  'secondary',
  'primary',
  'danger',
  'action',
];

/** `isDestructive` recolours the glyph on these only. */
const destructiveCapable: readonly IconButtonVariant[] = ['ghost', 'secondary'];

export const getIconButtonStyles = (
  variant: IconButtonVariant = 'ghost',
  isDestructive = false
): StyleProps => {
  const base =
    iconButtonVariantStyles[variant] ?? iconButtonVariantStyles.ghost;
  if (!isDestructive || !destructiveCapable.includes(variant)) return base;
  return {
    ...base,
    color: 'danger.fg',
    _hover: { ...(base._hover as object), color: 'danger.fg' },
  };
};

const legacyVariants: LegacyButtonVariant[] = [
  'solid',
  'soft',
  'outline',
  'ghost',
];

/**
 * @deprecated 4.x grid, derived from `iconButtonVariantStyles` through the
 * IconButton column of the codemod table. Use `iconButtonVariantStyles`.
 */
export const iconButtonColorPaletteStyles = Object.fromEntries(
  buttonColorPalettes.map((palette) => [
    palette,
    Object.fromEntries(
      legacyVariants.map((variant) => {
        const mapped = resolveLegacyButtonVariant('icon', palette, variant);
        return [
          variant,
          getIconButtonStyles(
            mapped.variant as IconButtonVariant,
            mapped.isDestructive
          ),
        ];
      })
    ),
  ])
) as Record<ButtonColorPalette, Record<LegacyButtonVariant, StyleProps>>;

export {
  /** @deprecated 5.0 removed `colorPalette`. */
  buttonColorPalettes as iconButtonColorPalettes,
  /** @deprecated 5.0 removed `colorPalette`. */
  buttonColorPalettes as iconButtonColorSchemes,
  /** @deprecated Use iconButtonVariantStyles. */
  iconButtonColorPaletteStyles as iconButtonColorSchemeStyles,
};
