import { isDev } from '@/utils/isDev';

import { BadgeVariant } from './Badge.types';

/**
 * Badge base styles, shared by every variant.
 */
export const baseStyles = {
  borderRadius: '2xl',
  fontWeight: 'medium',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Badge colours per variant (5.0 BAZE tokens).
 *
 * `neutral` is a neutral `bg.muted` fill with `secondary.fgStrong` text — the
 * sand tint (`secondary.surface`) is not a component background, so the
 * secondary identity rides on the text only. The status variants use their family's soft
 * `.bg` + `.fg`, which the contrast audit checks in both modes.
 */
export const variantStyles: Record<
  BadgeVariant,
  { bgColor: string; color: string }
> = {
  neutral: {
    bgColor: 'bg.muted',
    color: 'secondary.fgStrong',
  },
  success: {
    bgColor: 'success.bg',
    color: 'success.fg',
  },
  warning: {
    bgColor: 'warning.bg',
    color: 'warning.fg',
  },
  danger: {
    bgColor: 'danger.bg',
    color: 'danger.fg',
  },
  info: {
    bgColor: 'info.bg',
    color: 'info.fg',
  },
};

/** Every 5.0 badge variant, in display order. */
export const badgeVariants: BadgeVariant[] = [
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
];

const warned = new Set<string>();

/**
 * Resolve a (possibly 4.x) variant to a 5.0 one. `primary` / `secondary` and
 * anything unknown fall back to `neutral`, warning once per value in
 * development so a consumer's untyped call site still renders.
 */
export const resolveBadgeVariant = (variant: unknown): BadgeVariant => {
  if (
    typeof variant === 'string' &&
    Object.prototype.hasOwnProperty.call(variantStyles, variant)
  ) {
    return variant as BadgeVariant;
  }
  if (variant !== undefined && isDev() && !warned.has(String(variant))) {
    warned.add(String(variant));
    console.warn(
      `[logician-ui] <Badge variant="${String(variant)}"> was removed in 5.0 and now renders as "neutral". ` +
        'Use variant="neutral" (or a status variant: success | warning | danger | info).'
    );
  }
  return 'neutral';
};
