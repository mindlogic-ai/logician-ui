import type {
  ConditionalValue,
  SystemStyleObject,
  TagRootProps,
} from '@chakra-ui/react';

import type { SystemHue } from '@/theme/colors';
import {
  CONTROL_RADIUS,
  type ControlSizeSpec,
  getControlSize,
} from '@/theme/controlSizes';
import { disabledControl } from '@/utils/disabledControl';
import { isDev } from '@/utils/isDev';

import { TagColorPalette, TagSize, TagTone, TagVariant } from './Tag.types';

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

type ResponsiveTagSize = ConditionalValue<TagSize>;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Map every leaf of a Chakra conditional value (`'sm'`, `['xs', null, 'md']`,
 * `{ base: 'xs', md: 'lg' }`, nested conditions) through `fn`, keeping its
 * shape so Chakra still applies each result at its breakpoint. `null` array
 * slots ("no change at this breakpoint") stay `null`.
 */
const mapConditional = <R>(
  value: ResponsiveTagSize,
  fn: (size: TagSize) => R
): ConditionalValue<R> => {
  if (Array.isArray(value)) {
    return value.map((v) => (v == null ? null : (mapConditional(v, fn) as R)));
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [
        k,
        v == null ? v : mapConditional(v as ResponsiveTagSize, fn),
      ])
    ) as ConditionalValue<R>;
  }
  return fn(value as TagSize);
};

/**
 * An interactive tag must draw a control size at every width. A responsive
 * value that starts above `base` (`{ md: 'lg' }`, `[null, 'sm']`) would leave
 * the narrowest screens on the badge recipe, so they start at the default `md`.
 */
const withBaseSize = (
  size: ResponsiveTagSize | undefined
): ResponsiveTagSize => {
  if (size == null) return 'md';
  if (Array.isArray(size)) {
    return size[0] == null ? ['md', ...size.slice(1)] : size;
  }
  if (isPlainObject(size)) {
    return 'base' in size && size.base != null ? size : { base: 'md', ...size };
  }
  return size;
};

/**
 * Size styles for a tag.
 *
 * - **Interactive** (a filter chip, a toggle, a link): the shared control
 *   scale — the same height, type, inline padding, gap, icon size and radius
 *   as a `Button` of that `size` (default `md`), so a chip row lines up with
 *   the search field and buttons next to it. A responsive `size` resolves the
 *   scale per breakpoint. A composed `TagLabel` inherits the control type
 *   instead of the badge recipe's smaller label type.
 * - **Static** (a badge): Chakra's tag sizes, unchanged. `xs` exists only on
 *   the control scale, so a static `xs` falls back to the smallest badge.
 */
export const getTagSizeStyles = (
  size: ResponsiveTagSize | undefined,
  interactive: boolean
): {
  sizeStyles: StyleProps;
  recipeSize: TagRootProps['size'];
  cssVars?: SystemStyleObject;
} => {
  const recipeSize =
    size == null
      ? undefined
      : (mapConditional(size, (s) =>
          s === 'xs' ? 'sm' : s
        ) as TagRootProps['size']);
  if (!interactive) return { sizeStyles: { fontSize: 'sm' }, recipeSize };
  const scale = withBaseSize(size);
  const pick = <K extends keyof ControlSizeSpec>(key: K) =>
    mapConditional(scale, (s) => getControlSize(s)[key]);
  const height = pick('height');
  return {
    sizeStyles: {
      h: height,
      minH: height,
      px: pick('actionPaddingX'),
      gap: pick('gap'),
      textStyle: pick('textStyle') as StyleProps['textStyle'],
      borderRadius: CONTROL_RADIUS,
    },
    recipeSize,
    cssVars: {
      // The `icon` slot is sized by this variable.
      '--tag-element-size': mapConditional(
        scale,
        (s) =>
          `var(--chakra-sizes-${getControlSize(s).iconSize.replace('.', '\\.')})`
      ),
      // The tag recipe gives its label the badge type (`xs` at sm/md). Inside
      // a control that would shrink the label below the root's control type
      // (12.25px instead of Button's 14px at desktop md), so it inherits.
      '& .chakra-tag__label': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
      },
    } as SystemStyleObject,
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
