import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

import { disabledControl, disabledText } from '@/utils/disabledControl';

import { resolveLegacyButtonVariant } from './Button.legacy';
import {
  ButtonColorPalette,
  ButtonVariant,
  LegacyButtonVariant,
} from './Button.types';

type StyleProps = Partial<ChakraButtonProps>;

/**
 * The press is timed apart from everything else.
 *
 * This used to be `transitionProperty="all"` at a flat `0.25s`, which put the
 * press on the same 250ms clock as a colour change. A press has to read as
 * *contact* — the finger is already gone by 250ms and the button is still
 * sinking — so it takes `motion.press` (120ms) while colour, border and shadow
 * keep the slower step, since those are feedback rather than touch.
 *
 * ## Why the press uses `scale`, not `transform: scale()`
 *
 * `transform` is a single property, so a `_active` of `transform: scale(0.97)`
 * *replaced* whatever transform the call site had set — and call sites use it
 * for layout. `CopyableCode` centres its button with `translateY(-50%)`, so
 * pressing it dropped the button half its own height, and once `transform` was
 * being transitioned that drop became a visible slide.
 *
 * The individual `scale` property composes with `transform` instead of
 * overwriting it, so a consumer can position with `transform` and still get the
 * press. Anything that presses should use `scale`, never `transform: scale()`.
 *
 * Naming the properties also stops `all` from animating things nobody asked it
 * to (width, padding) when a consumer changes them on hover.
 */
const PRESS = 'var(--chakra-durations-motion-press)';
const FEEDBACK = 'var(--chakra-durations-fast)';
const STANDARD = 'var(--chakra-easings-standard)';
// The press is contact, so it eases out: `standard` starts slowly and the
// first frames lag behind the finger.
const EMPHASIZED = 'var(--chakra-easings-emphasized)';

export const buttonTransition = [
  `scale ${PRESS} ${EMPHASIZED}`,
  ...[
    'background-color',
    'border-color',
    'color',
    // No `box-shadow`: no variant sets one, so the only box-shadow that ever
    // changes here is the keyboard focus ring, and that should appear at once.
    'opacity',
    // Both moved by `lift`, listed unconditionally because a property nobody
    // changes costs nothing, and leaving them out would make the opt-in jump.
    'translate',
    // Nothing here sets `transform` — the press deliberately uses `scale` so it
    // cannot clobber a call site. But call sites do set it (a 2px press ledge,
    // an icon nudge), and under the old `transitionProperty: all` those moved
    // smoothly. Naming the properties took that away and left them snapping,
    // which is a regression the call site cannot see in this file. Listing it
    // costs nothing while we set it nowhere.
    'transform',
    'filter',
  ].map((property) => `${property} ${FEEDBACK} ${STANDARD}`),
].join(', ');

/**
 * The pressed scale every variant shares. Contact feedback, not colour — see
 * `buttonTransition` for why it is `scale` and not `transform`.
 */
const PRESSED = '0.97';

/**
 * Button styles per role (5.0 BAZE palette).
 *
 * Token-to-state assignments follow the prototype gallery (`.btn.*`). Every
 * variant owns `_hover`, `_active` (colour + the shared `scale` press) and
 * `_disabled`. Disabled is a fixed colour pair (`disabledControl`, or
 * `disabledText` for the fill-less ghost) — never opacity — and Chakra's
 * `_hover` / `_active` conditions already exclude `:disabled`, so a disabled
 * button does not change on hover or press.
 *
 * ## The `action` icon
 * `action` is the black "run" button whose icon is coral. The coral is applied
 * by a `& > svg` rule (`css` key below), i.e. to every icon that is a direct
 * child of the button — the leading icon in practice, since Button has no
 * `leftIcon` prop. Text stays `action.fg`. Disabled turns the icon to
 * `disabled.fg` with the label. An icon wrapped in another element is not
 * recoloured; give it `color="action.iconOnSolid"` yourself if you need that.
 */
export const buttonVariantStyles: Record<ButtonVariant, StyleProps> = {
  primary: {
    borderColor: 'primary.main',
    bgColor: 'primary.main',
    color: 'fg.onPrimary',
    _hover: { borderColor: 'primary.hover', bgColor: 'primary.hover' },
    _active: {
      borderColor: 'primary.active',
      bgColor: 'primary.active',
      scale: PRESSED,
    },
    _disabled: { ...disabledControl },
  },
  action: {
    borderColor: 'action.border',
    bgColor: 'action.bg',
    color: 'action.fg',
    _hover: { bgColor: 'action.bgHover' },
    _active: { bgColor: 'action.bgActive', scale: PRESSED },
    _disabled: { ...disabledControl },
    css: {
      '& > svg': { color: 'action.iconOnSolid' },
      '&:is(:disabled, [disabled], [data-disabled]) > svg': {
        color: 'disabled.fg',
      },
    },
  },
  secondary: {
    borderColor: 'border.default',
    bgColor: 'bg.surface',
    color: 'fg.default',
    _hover: { bgColor: 'primary.wash' },
    _active: { bgColor: 'primary.washActive', scale: PRESSED },
    _disabled: { ...disabledControl },
  },
  subtle: {
    borderColor: 'transparent',
    bgColor: 'primary.wash',
    color: 'fg.default',
    _hover: { bgColor: 'primary.washActive' },
    _active: { bgColor: 'primary.selected', scale: PRESSED },
    _disabled: { ...disabledControl },
  },
  ghost: {
    borderColor: 'transparent',
    bgColor: 'transparent',
    color: 'fg.default',
    _hover: { bgColor: 'primary.wash' },
    _active: { bgColor: 'primary.washActive', scale: PRESSED },
    _disabled: { ...disabledText },
  },
  danger: {
    borderColor: 'danger.solid',
    bgColor: 'danger.solid',
    color: 'danger.onSolid',
    _hover: { borderColor: 'danger.solidHover', bgColor: 'danger.solidHover' },
    _active: {
      borderColor: 'danger.solidActive',
      bgColor: 'danger.solidActive',
      scale: PRESSED,
    },
    _disabled: { ...disabledControl },
  },
};

/** Variants on which `isDestructive` recolours the label. */
export const destructiveCapableVariants: readonly ButtonVariant[] = [
  'secondary',
  'subtle',
  'ghost',
];

/**
 * Get the styles for a variant, optionally destructive.
 *
 * `isDestructive` swaps only the text colour to `danger.fg` (prototype
 * `.btn.destr`); fill, border and states stay the variant's. Disabled still
 * wins, because `_disabled` sets its own colour.
 */
export const getButtonStyles = (
  variant: ButtonVariant = 'subtle',
  isDestructive = false
): StyleProps => {
  const base = buttonVariantStyles[variant] ?? buttonVariantStyles.subtle;
  if (!isDestructive || !destructiveCapableVariants.includes(variant)) {
    return base;
  }
  return {
    ...base,
    color: 'danger.fg',
    _hover: { ...(base._hover as object), color: 'danger.fg' },
  };
};

/**
 * List of all available variants.
 */
export const buttonVariants: ButtonVariant[] = [
  'primary',
  'action',
  'secondary',
  'subtle',
  'ghost',
  'danger',
];

/**
 * @deprecated 5.0 removed `colorPalette`. Kept so imports keep resolving.
 */
export const buttonColorPalettes: ButtonColorPalette[] = [
  'primary',
  'secondary',
  'danger',
  'success',
  'warning',
  'neutral',
];

const legacyVariants: LegacyButtonVariant[] = [
  'solid',
  'soft',
  'outline',
  'ghost',
];

/**
 * @deprecated 4.x `colorPalette × variant` grid, now *derived* from
 * `buttonVariantStyles` through the same codemod table the runtime uses for
 * old props (e.g. `neutral.solid` → `primary`, `danger.outline` →
 * `secondary` + destructive). Use `buttonVariantStyles[variant]` /
 * `getButtonStyles(variant, isDestructive)` instead. Removed in 6.0.
 */
export const buttonColorPaletteStyles = Object.fromEntries(
  buttonColorPalettes.map((palette) => [
    palette,
    Object.fromEntries(
      legacyVariants.map((variant) => {
        const mapped = resolveLegacyButtonVariant('button', palette, variant);
        return [variant, getButtonStyles(mapped.variant, mapped.isDestructive)];
      })
    ),
  ])
) as Record<ButtonColorPalette, Record<LegacyButtonVariant, StyleProps>>;

/**
 * @deprecated Use buttonVariants instead. Will be removed in next major version.
 */
export const buttonColorSchemes = buttonColorPalettes;

/**
 * @deprecated Use buttonVariantStyles instead. Will be removed in next major version.
 */
export const buttonColorSchemeStyles = buttonColorPaletteStyles;
