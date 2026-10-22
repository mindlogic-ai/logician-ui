import { isDev } from '@/utils/isDev';

import type { IconButtonVariant } from '../IconButton/IconButton.types';
import type { ButtonVariant } from './Button.types';

/**
 * Runtime back-compat for 4.x `colorPalette × variant` props.
 *
 * 5.0 removed `colorPalette` from the types and renamed the variants, but an
 * untyped (JS) caller or one behind `as any` can still pass the old pair. Rather
 * than render an unstyled button, the pair is mapped with the same table the
 * migration codemod uses, and a development-only warning names the combination
 * once so it gets fixed.
 */

type Kind = 'button' | 'icon';

/** The 5.0 variants shared by Button and IconButton; IconButton has no subtle. */
type MappedVariant = ButtonVariant;

export type LegacyResolution = {
  variant: MappedVariant;
  isDestructive: boolean;
  /** True when the old pair has no faithful 5.0 equivalent (warn louder). */
  needsHuman: boolean;
};

/**
 * Exhaustive records, not hand-written lists: adding a role to
 * `ButtonVariant` / `IconButtonVariant` is a compile error here until it is
 * listed, so a new 5.0 variant can never be mistaken for a 4.x one.
 */
const BUTTON_VARIANT_KEYS: Record<ButtonVariant, true> = {
  primary: true,
  action: true,
  accent: true,
  secondary: true,
  subtle: true,
  ghost: true,
  danger: true,
};

const ICON_VARIANT_KEYS: Record<IconButtonVariant, true> = {
  ghost: true,
  secondary: true,
  primary: true,
  danger: true,
  action: true,
};

const NEW_BUTTON_VARIANTS: ReadonlySet<string> = new Set(
  Object.keys(BUTTON_VARIANT_KEYS)
);
const NEW_ICON_VARIANTS: ReadonlySet<string> = new Set(
  Object.keys(ICON_VARIANT_KEYS)
);

/**
 * Whether a variant/colorPalette pair is a 4.x one that needs mapping. A new
 * variant with no colorPalette is the normal path and returns false.
 */
export const isLegacyButtonProps = (
  kind: Kind,
  colorPalette: unknown,
  variant: unknown
): boolean => {
  const valid = kind === 'icon' ? NEW_ICON_VARIANTS : NEW_BUTTON_VARIANTS;
  if (colorPalette != null) return true;
  return variant != null && !valid.has(String(variant));
};

/**
 * Map an old pair to the 5.0 role.
 *
 * | old colorPalette / variant                 | Button              | IconButton          |
 * |--------------------------------------------|---------------------|---------------------|
 * | (none)·primary·neutral / solid             | primary             | primary             |
 * | danger / solid                             | danger              | danger              |
 * | secondary·warning·success / solid          | primary (needs human)| primary (needs human)|
 * | any non-danger / outline                   | secondary           | secondary           |
 * | danger / outline                           | secondary + destr.  | secondary + destr.  |
 * | any non-danger / ghost                     | ghost               | ghost               |
 * | danger / ghost                             | ghost + destr.      | ghost + destr.      |
 * | any non-danger / soft                      | subtle              | ghost               |
 * | danger / soft                              | subtle + destr.     | ghost + destr.      |
 *
 * A missing variant falls back to the 4.x code default: `soft` for Button,
 * `ghost` for IconButton. A colorPalette next to a 5.0 variant name keeps the
 * variant and only reads `danger` as destructive.
 */
export const resolveLegacyButtonVariant = (
  kind: Kind,
  colorPalette: unknown,
  variant: unknown
): LegacyResolution => {
  const palette = colorPalette == null ? undefined : String(colorPalette);
  const isDanger = palette === 'danger';
  const v =
    variant == null ? (kind === 'icon' ? 'ghost' : 'soft') : String(variant);

  const valid = kind === 'icon' ? NEW_ICON_VARIANTS : NEW_BUTTON_VARIANTS;
  // `ghost` is both a 4.x and a 5.0 name; it is handled by the switch below,
  // which gives the same answer.
  if (valid.has(v) && v !== 'ghost') {
    // Already a 5.0 role; a stray colorPalette only contributes "danger".
    const destructiveCapable = v === 'secondary' || v === 'subtle';
    return {
      variant: v as MappedVariant,
      isDestructive: isDanger && destructiveCapable,
      needsHuman: false,
    };
  }

  switch (v) {
    case 'solid':
      if (isDanger)
        return { variant: 'danger', isDestructive: false, needsHuman: false };
      return {
        variant: 'primary',
        isDestructive: false,
        needsHuman:
          palette === 'secondary' ||
          palette === 'warning' ||
          palette === 'success',
      };
    case 'outline':
      return {
        variant: 'secondary',
        isDestructive: isDanger,
        needsHuman: false,
      };
    case 'ghost':
      return { variant: 'ghost', isDestructive: isDanger, needsHuman: false };
    case 'soft':
      return {
        variant: kind === 'icon' ? 'ghost' : 'subtle',
        isDestructive: isDanger,
        needsHuman: false,
      };
    default:
      // Unknown value (e.g. Chakra's `plain`/`surface`): the component default.
      return {
        variant: kind === 'icon' ? 'ghost' : 'subtle',
        isDestructive: isDanger,
        needsHuman: true,
      };
  }
};

const warned = new Set<string>();

/**
 * Warn once per (component, colorPalette, variant) combination, development
 * only. Exported for tests.
 */
export const warnLegacyButtonProps = (
  component: string,
  colorPalette: unknown,
  variant: unknown,
  resolved: LegacyResolution
): void => {
  if (!isDev()) return;
  const key = `${component}|${String(colorPalette)}|${String(variant)}`;
  if (warned.has(key)) return;
  warned.add(key);
  const to = `variant="${resolved.variant}"${
    resolved.isDestructive ? ' isDestructive' : ''
  }`;
  console.warn(
    `[logician-ui] <${component} colorPalette="${String(
      colorPalette
    )}" variant="${String(variant)}"> uses the 4.x API, which 5.0 removed. ` +
      `Rendering as ${to}.` +
      (resolved.needsHuman
        ? ' This combination has no exact 5.0 equivalent — please choose a variant by hand.'
        : ' Replace the props with that.')
  );
};

/** Test-only: forget which combinations have warned. */
export const __resetLegacyButtonWarnings = (): void => warned.clear();
