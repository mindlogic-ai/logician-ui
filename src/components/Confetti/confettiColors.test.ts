import { describe, expect, it } from 'vitest';

import { SCHEMES, SYSTEM_HUES } from '../../theme/palette.generated';
import { DEFAULT_CONFETTI_COLORS } from './confettiColors';

/**
 * Status colours mean things; a celebratory burst carries no information, so
 * its defaults must not borrow them (same rule as LineGraph/seriesColors).
 */
const STATUS_ROLES = [
  'danger-solid',
  'success-solid',
  'warning-solid',
  'info-solid',
];
const STATUS_HUES = ['red', 'yellow', 'green', 'blue'] as const;

const upper = (hex: string) => hex.toUpperCase();
const defaults = new Set(DEFAULT_CONFETTI_COLORS.map(upper));

describe('Confetti default colours', () => {
  it('contain no status solid from any scheme or mode', () => {
    const hits = Object.entries(SCHEMES).flatMap(([scheme, modes]) =>
      Object.entries(modes as Record<string, Record<string, string>>).flatMap(
        ([mode, table]) =>
          STATUS_ROLES.filter(
            (role) => table[role] && defaults.has(upper(table[role]))
          ).map((role) => `${scheme}.${mode}.${role} = ${table[role]}`)
      )
    );
    expect(hits).toEqual([]);
  });

  it('contain no red, yellow, green or blue system hue value', () => {
    const hits = STATUS_HUES.flatMap((hue) =>
      Object.entries(SYSTEM_HUES[hue])
        .filter(([, hex]) => defaults.has(upper(hex)))
        .map(([variant, hex]) => `${hue}.${variant} = ${hex}`)
    );
    expect(hits).toEqual([]);
  });

  it('still spans the decorative hues', () => {
    expect(defaults.has(upper(SYSTEM_HUES.purple.base))).toBe(true);
    expect(DEFAULT_CONFETTI_COLORS.length).toBeGreaterThanOrEqual(8);
  });
});
