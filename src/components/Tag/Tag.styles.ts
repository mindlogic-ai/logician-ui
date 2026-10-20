import { TagRootProps } from '@chakra-ui/react';

import type { SystemHue } from '@/theme/colors';
import { disabledControl } from '@/utils/disabledControl';
import { isDev } from '@/utils/isDev';

import { TagColorPalette, TagTone, TagVariant } from './Tag.types';

type StyleProps = Partial<TagRootProps>;

/**
 * Colour per tone (5.0 BAZE tokens). `hoverBorder` is applied only when the
 * tag is interactive (clickable / toggle).
 */
export const tagToneStyles: Record<
  TagTone,
  { bgColor: string; color: string; hoverBorder: string }
> = {
  neutral: {
    bgColor: 'bg.muted',
    color: 'fg.default',
    hoverBorder: 'secondary.border',
  },
  success: {
    bgColor: 'success.bg',
    color: 'success.fg',
    hoverBorder: 'success.border',
  },
  warning: {
    bgColor: 'warning.bg',
    color: 'warning.fg',
    hoverBorder: 'warning.border',
  },
  danger: {
    bgColor: 'danger.bg',
    color: 'danger.fg',
    hoverBorder: 'danger.border',
  },
  info: {
    bgColor: 'info.bg',
    color: 'info.fg',
    hoverBorder: 'info.border',
  },
};

/** Every 5.0 tone, in display order. */
export const tagTones: TagTone[] = [
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
];

/** Colour transition only — a focus ring or press must not lag. */
const TAG_TRANSITION: StyleProps = {
  transitionProperty: 'background-color, border-color, color',
  transitionDuration: 'fast',
  transitionTimingFunction: 'standard',
};

export interface TagStyleOptions {
  tone?: TagTone;
  selected?: boolean;
  category?: SystemHue;
  interactive?: boolean;
}

/**
 * Resolve the colour styles for a tag. Precedence: `selected` > `category` >
 * `tone`.
 */
export const getTagStyles = ({
  tone = 'neutral',
  selected = false,
  category,
  interactive = false,
}: TagStyleOptions = {}): StyleProps => {
  let colors: StyleProps;
  if (selected) {
    colors = {
      bgColor: 'primary.main',
      color: 'fg.onPrimary',
      ...(interactive && {
        _hover: { bgColor: 'primary.hover' },
        _active: { bgColor: 'primary.active' },
      }),
    };
  } else if (category) {
    colors = {
      bgColor: `category.${category}.surface`,
      color: 'fg.default',
      ...(interactive && { _hover: { borderColor: 'secondary.border' } }),
    };
  } else {
    const { bgColor, color, hoverBorder } =
      tagToneStyles[tone] ?? tagToneStyles.neutral;
    colors = {
      bgColor,
      color,
      ...(interactive && { _hover: { borderColor: hoverBorder } }),
    };
  }

  return {
    borderColor: 'transparent',
    ...colors,
    ...TAG_TRANSITION,
    cursor: interactive ? 'pointer' : undefined,
    _disabled: { ...disabledControl, cursor: 'not-allowed' },
  };
};

/**
 * Result of mapping a 4.x `colorPalette × variant` pair onto 5.0 Tag props.
 * `needsHuman` marks a pair 5.0 cannot render faithfully (a status `solid`
 * fill, a status `outline`, an unknown value): it still renders, but the
 * dev warning asks for a hand decision instead of saying "replace with X".
 */
export type LegacyTagResolution = {
  tone: TagTone;
  selected?: boolean;
  needsHuman: boolean;
};

const PLAIN_PALETTES = new Set(['primary', 'secondary', 'neutral']);
const STATUS_PALETTES = new Set(['danger', 'success', 'warning']);

/**
 * Map 4.x `colorPalette` × `variant` (or Chip's `colorScheme` × `variant`) to
 * 5.0 Tag props. A missing palette / variant takes the 4.x default of the
 * component it came from — Tag was `neutral` / `soft`, Chip `primary` / `soft`
 * (Chip passes its own default in).
 *
 * | palette \ variant           | soft (or —)    | solid                  | outline                 |
 * |-----------------------------|----------------|------------------------|-------------------------|
 * | primary · secondary · neutral | neutral        | selected               | neutral                 |
 * | danger · success · warning  | that tone      | that tone (needsHuman) | neutral (needsHuman)    |
 * | anything else               | neutral (needsHuman, as does any unknown variant)                  |
 *
 * `neutral`/`secondary` × `solid` → `selected`, same as `primary`: 4.x
 * call sites toggled `colorScheme={on ? 'primary' : 'neutral'}` or
 * `variant={on ? 'solid' : 'soft'}`, and both arms must stay distinct.
 * Selected here is the *look* only — it does not make the tag a toggle
 * (no hover, no `aria-pressed`); only an explicit `selected` prop does.
 */
export const mapLegacyTagProps = (
  colorPalette: TagColorPalette | string | undefined,
  variant: TagVariant | string | undefined
): LegacyTagResolution => {
  const palette = colorPalette ?? 'neutral';
  const v = variant ?? 'soft';
  const plain = PLAIN_PALETTES.has(palette);
  const status = STATUS_PALETTES.has(palette);

  if (!plain && !status) return { tone: 'neutral', needsHuman: true };
  switch (v) {
    case 'soft':
      return status
        ? { tone: palette as TagTone, needsHuman: false }
        : { tone: 'neutral', needsHuman: false };
    case 'solid':
      return status
        ? { tone: palette as TagTone, needsHuman: true }
        : { tone: 'neutral', selected: true, needsHuman: false };
    case 'outline':
      return { tone: 'neutral', needsHuman: status };
    default:
      return { tone: 'neutral', needsHuman: true };
  }
};

const warned = new Set<string>();

/**
 * Warn once per (component, palette, variant) in development, naming the
 * combination and what it now renders as. Exported for tests.
 */
export const warnLegacyTagProps = (
  component: 'Tag' | 'Chip',
  colorPalette: unknown,
  variant: unknown,
  resolved: LegacyTagResolution
): void => {
  if (!isDev()) return;
  const key = `${component}|${String(colorPalette)}|${String(variant)}`;
  if (warned.has(key)) return;
  warned.add(key);
  const paletteProp = component === 'Chip' ? 'colorScheme' : 'colorPalette';
  const to = resolved.selected
    ? '<Tag selected>'
    : resolved.tone === 'neutral'
      ? '<Tag>'
      : `<Tag tone="${resolved.tone}">`;
  const lead =
    component === 'Chip'
      ? '<Chip> is deprecated since 5.0 and will be removed in 6.0. '
      : '';
  console.warn(
    `[logician-ui] ${lead}<${component} ${paletteProp}="${String(
      colorPalette
    )}" variant="${String(variant)}"> uses the 4.x API, which 5.0 removed. ` +
      `Rendering as ${to}.` +
      (resolved.needsHuman
        ? ' This combination has no exact 5.0 equivalent — please choose tone / selected / category by hand.'
        : ' Replace the props with that.')
  );
};

/** Test-only: forget which combinations have warned. */
export const __resetLegacyTagWarnings = (): void => warned.clear();
