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
  /**
   * Coral fill, dark label — the coloured CTA. Reuses the `send.*` tokens of
   * the IconButton send button so the brand has one coral surface, and the
   * contrast audit checks `send.fg` on all three fills as *text* (4.5:1).
   */
  accent: {
    borderColor: 'send.bg',
    bgColor: 'send.bg',
    color: 'send.fg',
    _hover: { borderColor: 'send.bgHover', bgColor: 'send.bgHover' },
    _active: {
      borderColor: 'send.bgActive',
      bgColor: 'send.bgActive',
      scale: PRESSED,
    },
    _disabled: { ...disabledControl },
  },
  secondary: {
    // The light card border, not the field's `border.control`. A labelled
    // button is identified by its label, so its outline is decoration and
    // needs no 3:1; at 3:1 every 취소 / 관리자 페이지 chip outweighed the
    // content around it (R30 3차 QA #2). A button that *acts as a field* — it
    // opens a list and shows the chosen value — is `FieldTrigger`, which keeps
    // the field outline.
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

/**
 * The open state of a menu / popover trigger: `aria-expanded="true"`.
 *
 * Menu, Popover and Select triggers are Buttons and IconButtons, and with no
 * open state in the library each product styled "open" its own way — a border
 * here, an ad-hoc `aria-expanded` rule there, Chakra's `_expanded`, a util, an
 * icon colour (R30 3차 QA #4). Open now looks like the variant *held down*:
 * the colours a press shows, without the press `scale` (nothing is being
 * touched) and without an added border.
 *
 * ## Why not Chakra's `_expanded`
 * `_expanded` is `:is([aria-expanded=true], [data-expanded], …)`, and a
 * Tooltip puts `data-expanded` on its trigger while it shows — so hovering a
 * button that has a tooltip would make it look open. Only `aria-expanded` is
 * set by the things that actually open (Menu, Popover).
 *
 * ## Why the hover arm
 * `_hover` and the bare open selector have the same specificity, so whichever
 * Chakra happens to emit later would win and an open trigger would change
 * under the pointer. Matching `:hover` too (and `[data-hover]`, as `_hover`
 * does) makes open + hover read the same as open.
 *
 * ## Disabled still wins
 * The selector excludes everything `_disabled` matches, so a disabled trigger
 * keeps its disabled colours even with `aria-expanded="true"`.
 */
const OPEN =
  '&[aria-expanded=true]:not(:disabled, [data-disabled], [aria-disabled=true])';
export const openStateSelector = `${OPEN}, ${OPEN}:is(:hover, [data-hover])`;

/** The colour properties a press changes; the open state copies only these. */
const OPEN_PROPERTIES = ['bgColor', 'borderColor', 'color'] as const;

/**
 * Derive the open state from a variant's own states, so a new variant gets it
 * without writing one.
 *
 * A press is seen while hovering, so the pressed look is `_hover` with
 * `_active` on top — that is what this copies (e.g. IconButton ghost's glyph
 * darkens on hover and stays dark while pressed, so it stays dark while open).
 * Only colours: `scale` and anything else `_active` carries is left out.
 * Variants that set no `borderColor` in either state get none, so open adds no
 * border. Pass the styles *after* `isDestructive` so its label colour carries.
 */
export const withOpenState = (style: StyleProps): StyleProps => {
  const pressed = {
    ...(style._hover as Record<string, unknown> | undefined),
    ...(style._active as Record<string, unknown> | undefined),
  };
  const open = Object.fromEntries(
    OPEN_PROPERTIES.filter((key) => pressed[key] !== undefined).map((key) => [
      key,
      pressed[key],
    ])
  );
  if (Object.keys(open).length === 0) return style;
  return {
    ...style,
    css: {
      ...(style.css as Record<string, unknown> | undefined),
      [openStateSelector]: open,
    },
  } as StyleProps;
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
 * wins, because `_disabled` sets its own colour. Includes the open state
 * (`withOpenState`).
 */
export const getButtonStyles = (
  variant: ButtonVariant = 'subtle',
  isDestructive = false
): StyleProps => {
  const base = buttonVariantStyles[variant] ?? buttonVariantStyles.subtle;
  if (!isDestructive || !destructiveCapableVariants.includes(variant)) {
    return withOpenState(base);
  }
  return withOpenState({
    ...base,
    color: 'danger.fg',
    _hover: { ...(base._hover as object), color: 'danger.fg' },
  });
};

/**
 * List of all available variants.
 */
export const buttonVariants: ButtonVariant[] = [
  'primary',
  'action',
  'accent',
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
