import type { SystemHue } from '@/theme/colors';
import { SYSTEM_HUES } from '@/theme/palette.generated';

/**
 * Default stroke order for multi-series charts.
 *
 * Series 1 is the data blue (`blue.base`): blue means data (SemanticTokens.mdx,
 * "Blue means data and links"), and a single-measure chart draws in the same
 * blue, so adding a second series does not repaint the first. It used to be
 * the ink `primary.main`, which read as body text rather than as data.
 *
 * The rest cycle hues that carry no meaning in the system, alternating cool
 * and warm so neighbouring lines separate. Red, yellow and green are the
 * danger, warning and success colours, so none of them may colour a series by
 * default — a red "UV" line reads as an error. Brown comes late: next to the
 * other dusty warm hues it reads as mud.
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
  { hue: 'teal', light: 'base' },
  { hue: 'pink', light: 'base' },
  { hue: 'indigo', light: 'base' },
  { hue: 'purple', light: 'base' },
  { hue: 'brown', light: 'base' },
  { hue: 'cyan', light: 'hc' },
  { hue: 'mint', light: 'hc' },
  { hue: 'orange', light: 'hc' },
];

/** Stroke for series `index` (0-based); index 0 is the data blue. */
export const seriesColor = (index: number, isDark: boolean): string => {
  if (index === 0) {
    return isDark ? SYSTEM_HUES.blue.baseDark : SYSTEM_HUES.blue.base;
  }
  const { hue, light } =
    CHART_SERIES_HUES[(index - 1) % CHART_SERIES_HUES.length];
  return isDark ? SYSTEM_HUES[hue].baseDark : SYSTEM_HUES[hue][light];
};
