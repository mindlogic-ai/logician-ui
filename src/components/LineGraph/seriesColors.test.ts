import { describe, expect, it } from 'vitest';

import { SYSTEM_HUES } from '@/theme/palette.generated';

import { CHART_SERIES_HUES, seriesColor } from './seriesColors';

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

describe('chart series colours', () => {
  it('never default a series to a status or link hue', () => {
    const banned = new Set(['red', 'yellow', 'green', 'blue']);
    expect(CHART_SERIES_HUES.filter(({ hue }) => banned.has(hue))).toEqual([]);
  });

  it('series 1 is the primary line, series 2 is brown', () => {
    expect(seriesColor(0, '#252525', false)).toBe('#252525');
    expect(seriesColor(1, '#252525', false)).toBe(SYSTEM_HUES.brown.base);
  });

  it('every default stroke clears 3:1 against the page in both modes', () => {
    CHART_SERIES_HUES.forEach((_, i) => {
      expect(
        contrast(seriesColor(i + 1, '', false), '#FFFFFF')
      ).toBeGreaterThanOrEqual(3);
      expect(
        contrast(seriesColor(i + 1, '', true), '#1F1E1D')
      ).toBeGreaterThanOrEqual(3);
    });
  });
});
