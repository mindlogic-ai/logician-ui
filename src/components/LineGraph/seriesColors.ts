import type { SystemHue } from '@/theme/colors';
import { SYSTEM_HUES } from '@/theme/palette.generated';

/**
 * Default stroke order for multi-series charts.
 *
 * Series 1 is the neutral brand line (`primary.main`); the rest cycle hues
 * that carry no meaning in the system. Red, yellow and green are the danger,
 * warning and success colours, and blue is info and links, so none of them
 * may colour a series by default — a red "UV" line reads as an error.
 * (Blue is reserved for data as a whole: a single-measure chart is a blue
 * monochrome ramp — SemanticTokens.mdx, "Blue means data and links".)
 *
 * Every stroke clears 3:1 against the page in both modes. Cyan, mint and
 * orange are too light at their base value in light mode (≈1.9:1), so they
 * come last and use their increased-contrast value there.
 */
type SeriesHue = {
  hue: Exclude<SystemHue, 'red' | 'yellow' | 'green' | 'blue'>;
  light: 'base' | 'hc';
};

export const CHART_SERIES_HUES: readonly SeriesHue[] = [
  { hue: 'brown', light: 'base' },
  { hue: 'indigo', light: 'base' },
  { hue: 'pink', light: 'base' },
  { hue: 'teal', light: 'base' },
  { hue: 'purple', light: 'base' },
  { hue: 'cyan', light: 'hc' },
  { hue: 'mint', light: 'hc' },
  { hue: 'orange', light: 'hc' },
];

/** Stroke for series `index` (0-based); index 0 is the caller's primary line. */
export const seriesColor = (
  index: number,
  primary: string,
  isDark: boolean
): string => {
  if (index === 0) return primary;
  const { hue, light } =
    CHART_SERIES_HUES[(index - 1) % CHART_SERIES_HUES.length];
  return isDark ? SYSTEM_HUES[hue].baseDark : SYSTEM_HUES[hue][light];
};
