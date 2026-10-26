import type {
  NavListOrientation,
  NavListResponsiveOrientation,
} from './NavList.types';

/**
 * The tokens a row paints, exported so the usage page's token table reads what
 * the component renders.
 *
 * **The current row is a PLACE, not a value** — the same rule as `TAB_RAMP`
 * and the app's nav rail (`NavigationLinkButton.utils.tsx` in factchat-nextjs).
 * It is carried by ink, weight and a neutral fill, never by the brand hue: a
 * rail that spends colour on "you are here" is what stops a success or error
 * colour from registering when it appears.
 *
 * `bg.emphasized` rather than `bg.muted` for the fill, because rails sit on the
 * sidebar wash and the fill has to separate from THAT: in light `bg.muted` is
 * only OKLab dE 0.027 from the wash, under the threshold where two flat areas
 * read as different, and `bg.emphasized` is 0.052 (measured in that file).
 * Hover uses the same fill, so the current row does not change under the
 * pointer and a hovered row previews exactly what selecting it looks like.
 */
export const NAV_LIST_RAMP = {
  label: 'fg.default',
  currentLabel: 'fg.emphasized',
  currentFill: 'bg.emphasized',
  hoverFill: 'bg.emphasized',
  trailing: 'fg.muted',
  groupTitle: 'fg.muted',
} as const;

/**
 * Map an orientation (or a per-breakpoint object of them) to a style value per
 * breakpoint, so the axis switch is CSS rather than a `useBreakpointValue`
 * that renders the wrong axis on the server.
 */
export const byOrientation = <T>(
  orientation: NavListResponsiveOrientation,
  vertical: T,
  horizontal: T
): T | Record<string, T> => {
  const pick = (o: NavListOrientation) =>
    o === 'horizontal' ? horizontal : vertical;
  if (typeof orientation === 'string') return pick(orientation);
  // A breakpoint object with no `base` still starts vertical — the default —
  // instead of leaving the smallest screens with no axis at all.
  return Object.fromEntries(
    Object.entries({ base: 'vertical', ...orientation }).map(([bp, o]) => [
      bp,
      pick(o as NavListOrientation),
    ])
  );
};
