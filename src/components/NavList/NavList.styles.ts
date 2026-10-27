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
 *
 * `currentLabel` is `fg.emphasized`, which the theme aliases to `fg.default`
 * today — so on the stock theme the current row is told apart by WEIGHT and
 * FILL, not by a second ink. The role is still named separately so a theme
 * that splits the two (and the app's nav rail, which reads the same pair)
 * moves the current label without touching the rest.
 *
 * **Pressed is one step past hover**, on every row, current ones included —
 * otherwise a press on the row you are already on gives no sign it landed.
 * No `bg.*` role is darker than `bg.emphasized` in light (it is the top of
 * the `layer.1` ladder), so the step is `border.default`: the next neutral in
 * both modes (light `#D8D2CA` after `#E5DFD9`, dark `#48443E` after
 * `#3F3B34`), the same fill the BottomSheet handle uses. Under
 * `prefers-contrast: more` that token turns into a 3:1 stroke grey and the
 * label would drop to 2.8:1, so high contrast takes `border.strong`, which
 * high contrast leaves alone. `NavList.test.tsx` checks every pair.
 */
export const NAV_LIST_RAMP = {
  label: 'fg.default',
  currentLabel: 'fg.emphasized',
  currentFill: 'bg.emphasized',
  hoverFill: 'bg.emphasized',
  pressedFill: 'border.default',
  pressedFillMoreContrast: 'border.strong',
  trailing: 'fg.muted',
  groupTitle: 'fg.muted',
} as const;

/** The pressed fill, with its high-contrast swap. */
export const pressedFill = {
  bg: NAV_LIST_RAMP.pressedFill,
  _moreContrast: { bg: NAV_LIST_RAMP.pressedFillMoreContrast },
} as const;

/**
 * Chakra's `_rtl`/`_ltr` and `:dir()` read `dir` ATTRIBUTES, and zag stamps
 * `dir="ltr"` on every part it renders (tooltip triggers — the rows — and the
 * collapsible group) from Ark's locale, before any effect can measure the
 * page. An author `direction` beats the UA rule that maps the attribute, so
 * every stamped element takes the direction it inherits instead: the server
 * render lays an RTL rail out right to left on its first paint.
 */
export const inheritDirection = { direction: 'inherit' } as const;

/**
 * A locale whose direction is `dir`: the inherited one when it already
 * agrees, so a Korean app keeps formatting in Korean, otherwise a stand-in.
 * Ark has no other way to set the `dir` zag stamps (its hooks omit the prop).
 */
export const localeFor = (
  inherited: { locale: string; dir: 'ltr' | 'rtl' },
  dir: 'ltr' | 'rtl'
) =>
  inherited.dir === dir ? inherited.locale : dir === 'rtl' ? 'ar' : 'en-US';

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

/** The list box shared by the root list and every group's list. */
export const listStyles = (orientation: NavListResponsiveOrientation) =>
  ({
    listStyleType: 'none',
    m: 0,
    p: 0,
    display: 'flex',
    gap: 0.5,
    minW: 0,
    flexDirection: byOrientation(orientation, 'column', 'row'),
    alignItems: byOrientation(orientation, 'stretch', 'center'),
    // A row never wraps: a strip that grows to three lines as items are added
    // eats the content it navigates. The root scrolls sideways instead.
    flexWrap: 'nowrap',
  }) as const;
