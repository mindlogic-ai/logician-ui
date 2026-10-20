import type { SystemHue } from '../../theme/colors';
import { CORAL, RAMPS, SYSTEM_HUES } from '../../theme/palette.generated';

/**
 * Hues that carry meaning elsewhere in the system and so never colour a piece
 * by default: red, yellow and green are the danger, warning and success
 * solids, and blue is info and links. The same rule as the chart series
 * defaults (`LineGraph/seriesColors.ts`) — a red piece in a "payment complete"
 * burst says something the screen does not.
 */
export const CONFETTI_EXCLUDED_HUES = [
  'red',
  'yellow',
  'green',
  'blue',
] as const;

const DECORATIVE_HUES = (Object.keys(SYSTEM_HUES) as SystemHue[]).filter(
  (hue) => !(CONFETTI_EXCLUDED_HUES as readonly string[]).includes(hue)
);

/**
 * Default piece colours: the house coral (`CORAL.base`, the send/accent coral —
 * not a status colour), the house beige (`RAMPS.sand.light['8']`, the raw step
 * behind `secondary.fg`), and the light-mode base of every system hue that
 * carries no status meaning (brown, orange, mint, teal, cyan, indigo, purple,
 * pink …).
 *
 * Raw hex rather than tokens is a choice, not a constraint. Each piece is a
 * `<Box bg={…}>`, so a token string would resolve just as well; hex keeps the
 * default in the same shape as the `colors` prop (any CSS colour string), and
 * keeps the burst the same in both modes. The cost, stated rather than hidden:
 * these are the LIGHT-mode values and do not follow dark mode — acceptable for
 * a two-second burst that carries no information. `colors` is a prop for an
 * app that needs its own (tokens included).
 */
export const DEFAULT_CONFETTI_COLORS: string[] = [
  CORAL.base,
  RAMPS.sand.light['8'],
  ...DECORATIVE_HUES.map((hue) => SYSTEM_HUES[hue].base),
];
