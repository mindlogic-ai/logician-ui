import type { BoxProps } from '@chakra-ui/react';

import type { CountBadgeSize } from './CountBadge.types';

/**
 * Shared look: the `count.*` pair (coral-red fill, white number), a pill whose
 * min-width equals its height so a single digit is a circle, and tabular
 * figures so the width does not jitter as the number changes.
 */
export const countBadgeBaseStyles: BoxProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  bgColor: 'count.bg',
  color: 'count.fg',
  borderRadius: 'full',
  fontWeight: 'bold',
  lineHeight: '1',
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
};

export const countBadgeSizeStyles: Record<CountBadgeSize, BoxProps> = {
  sm: { h: '16px', minW: '16px', px: '4px', fontSize: '10px' },
  md: { h: '18px', minW: '18px', px: '5px', fontSize: '11px' },
  lg: { h: '22px', minW: '22px', px: '6px', fontSize: '12px' },
};

export const countBadgeDotSizes: Record<CountBadgeSize, string> = {
  sm: '6px',
  md: '8px',
  lg: '10px',
};

/** `120, 99 → "99+"`; negative / non-finite → `"0"`. */
export const formatCount = (count: number, max: number): string => {
  const safe = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
  return safe > max ? `${max}+` : String(safe);
};
