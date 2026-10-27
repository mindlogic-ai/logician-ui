/**
 * Shared style objects for the Select and Combobox components.
 *
 * These mirror the Input component (`Input.tsx`) so the form controls share
 * the same border, hover, focus and disabled behavior. They are applied on
 * top of Chakra's built-in `select` / `combobox` slot recipes via the `css`
 * prop — only the design-system deltas live here. When `Input.tsx` changes,
 * update these values to match.
 */

import { disabledControl, disabledText } from '@/utils/disabledControl';

const focusVars = {
  '--focus-color': 'var(--chakra-colors-primary-main)',
  '--error-color': 'var(--chakra-colors-danger-solid)',
};

const fieldBase = {
  ...focusVars,
  bg: 'bg.surface',
  color: 'fg.default',
  borderColor: 'border.control',
  _hover: { borderColor: 'fg.icon' },
  _focus: {
    borderColor: 'primary.main',
    boxShadow: '0 0 0 1px var(--chakra-colors-primary-main)',
  },
  _invalid: {
    borderColor: 'danger.solid',
    _hover: { borderColor: 'danger.solid' },
    _focus: { borderColor: 'danger.solid' },
  },
  _disabled: {
    ...disabledControl,
    cursor: 'not-allowed',
    fontWeight: 'semibold',
  },
};

/**
 * Room for the × and its divider at the end of the value, while the × shows.
 *
 * The indicator group overlays the value. Chakra keeps the value off the
 * chevron with `maxW: 80%` on a Select (too little in a narrow filter) and a
 * 1.5× height padding on a Combobox, and neither counts the × with its
 * divider. This reserves the whole group instead: padding on both sides, the
 * × (`8`) with its `me` (`3`), the group `gap` (`1`) and the chevron (`1em`),
 * so a long value ends in an ellipsis before the ×.
 */
const clearTriggerRoom = (paddingVar: string) => ({
  '[data-part=control]:has([data-part=clear-trigger]:not([hidden])) > &': {
    pe: `calc(var(${paddingVar}) * 2 + 4em)`,
    '& [data-part=value-text]': { maxW: 'none' },
  },
});

/** Select trigger — the clickable control. */
export const triggerStyles = {
  ...fieldBase,
  ...clearTriggerRoom('--select-trigger-padding-x'),
  cursor: 'pointer',
  _open: {
    borderColor: 'primary.main',
    boxShadow: '0 0 0 1px var(--chakra-colors-primary-main)',
  },
};

/**
 * `variant="ghost"` delta on top of `triggerStyles`, for dense rows (settings
 * lists) where a column of bordered triggers outweighs the card around them.
 * No border at rest; hover brings back `border.control`, focus/open keep the
 * normal ring, and an invalid field keeps its red border at rest so an error
 * is never hidden. The chevron identifies the control (`fg.muted`, well over
 * the 3:1 non-text floor), which is what lets the resting border go.
 */
export const ghostTriggerStyles = {
  bg: 'transparent',
  borderColor: 'transparent',
  // Content-sized: Chakra caps the value at `maxW: 80%` of the trigger and
  // overlays the chevron, which is circular once the trigger sizes to the
  // value — it truncates to "앱 …". Lift the cap and reserve the chevron's
  // room (indicator group = icon + padding on both sides) instead.
  pe: 'calc(var(--select-trigger-padding-x) * 2 + 1rem)',
  '& [data-part=value-text]': { maxW: 'none', whiteSpace: 'nowrap' },
  _hover: { borderColor: 'border.control' },
  _disabled: {
    ...disabledText,
    // A field, not a ghost button: the value text stays readable at
    // `disabled.fg` (well apart from the resting `fg.default` already).
    // `disabled.fgGhost` is for fill-less buttons whose resting glyph is
    // `fg.icon`.
    color: 'disabled.fg',
    cursor: 'not-allowed',
    fontWeight: 'semibold',
  },
};

/** Combobox text input — the typeable control. */
export const inputStyles = {
  ...fieldBase,
  ...clearTriggerRoom('--combobox-input-padding-x'),
};

/** Dropdown panel for both Select and Combobox. */
export const contentStyles = {
  bg: 'bg.surface',
  borderColor: 'border.default',
  borderWidth: '1px',
  borderRadius: '8px',
  boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)',
  padding: '4px',
};

/**
 * Dropdown panel for a ghost trigger — at least as wide as the trigger, but
 * grown to the longest option, since a content-sized trigger is often
 * narrower than the options it opens.
 */
export const ghostContentStyles = {
  width: 'max-content',
  minW: 'var(--reference-width)',
};

/** Individual option for both Select and Combobox. */
export const itemStyles = {
  borderRadius: '4px',
  cursor: 'pointer',
  color: 'fg.default',
  _highlighted: { bg: 'primary.wash' },
  _checked: {
    bg: 'primary.selected',
    color: 'fg.default',
    fontWeight: 'bold',
  },
  _disabled: { color: 'fg.subtle', cursor: 'not-allowed' },
};

/** Dropdown chevron — softened so it doesn't outweigh adjacent icons. */
export const indicatorStyles = {
  color: 'fg.muted',
};

/**
 * Clear (×) button for both Select and Combobox.
 *
 * Chakra's recipe gives this part a colour and no size, and its default icon
 * is `1em`, so a bare `ClearTrigger` drew a 21px × next to a 14px chevron. The
 * × is the secondary action, so it is smaller (`3.5`, 12px at 14px text) and
 * lighter (`fg.icon`) than the chevron, on an `8` box. `& svg` rather than
 * `_icon` so the size also wins over an icon passed with its own `boxSize`.
 *
 * On a touch screen the hit area widens to 44px, toward the value only: the
 * chevron sits to the right and has to keep opening the list. The height stays
 * the control's own height (`heightVar`), so the area never reaches the field
 * above or below. Every control height is over the 24px KWCAG minimum.
 */
const clearTriggerStyles = (heightVar: string) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSize: '8',
  // The divider sits `1` past the box. `3` leaves the same space between the
  // divider and the chevron glyph as between the × glyph and the divider
  // (about 13px at 14px text).
  me: '3',
  color: 'fg.icon',
  cursor: 'pointer',
  _hover: { color: 'fg.default' },
  // The divider marks where opening starts: it sits in the `me` gap, takes no
  // clicks, and everything right of it belongs to the chevron.
  _after: {
    content: '""',
    position: 'absolute',
    insetEnd: '-1',
    top: '50%',
    transform: 'translateY(-50%)',
    h: '4',
    borderEndWidth: '1px',
    borderColor: 'border.subtle',
    pointerEvents: 'none',
  },
  // zag hides the × with the `hidden` attribute while nothing is selected,
  // and the `display` above would otherwise override it.
  _hidden: { display: 'none' },
  '& svg': { width: '3.5', height: '3.5' },
  '@media (pointer: coarse)': {
    '&::before': {
      content: '""',
      position: 'absolute',
      insetEnd: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '44px',
      height: `var(${heightVar})`,
    },
  },
});

export const selectClearTriggerStyles = clearTriggerStyles(
  '--select-trigger-height'
);

export const comboboxClearTriggerStyles = clearTriggerStyles(
  '--combobox-input-height'
);
