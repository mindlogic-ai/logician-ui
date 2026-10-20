import { TagRootProps } from '@chakra-ui/react';

import type { SystemHue } from '@/theme/colors';
import { disabledControl } from '@/utils/disabledControl';

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
    bgColor: 'secondary.surface',
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

const warned = new Set<string>();

const warnOnce = (key: string, message: string) => {
  if (
    typeof process === 'undefined' ||
    process.env?.NODE_ENV === 'production' ||
    warned.has(key)
  ) {
    return;
  }
  warned.add(key);
  console.warn(`[logician-ui] ${message}`);
};

/** @internal Exposed for the deprecated `Chip` alias. */
export const warnTagDeprecation = warnOnce;

/**
 * Map 4.x `colorPalette` × `variant` (or Chip's `colorScheme` × `variant`) to
 * 5.0 Tag props.
 *
 * - `variant="outline"` → `neutral`
 * - `primary` + `solid` → `selected`
 * - `danger` / `success` / `warning` → that `tone`
 * - `primary` / `secondary` / `neutral` → `neutral`
 */
export const mapLegacyTagProps = (
  colorPalette: TagColorPalette | string | undefined,
  variant: TagVariant | string | undefined
): { tone: TagTone; selected?: boolean } => {
  if (variant === 'outline') return { tone: 'neutral' };
  if (colorPalette === 'primary' && variant === 'solid') {
    return { tone: 'neutral', selected: true };
  }
  if (
    colorPalette === 'danger' ||
    colorPalette === 'success' ||
    colorPalette === 'warning'
  ) {
    return { tone: colorPalette };
  }
  return { tone: 'neutral' };
};
