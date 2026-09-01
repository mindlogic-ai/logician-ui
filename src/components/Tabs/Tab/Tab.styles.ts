// TODO: investigate why these TS issues are coming up
export const verticalStyles = {
  borderInlineStart: 'none',
  position: 'relative',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textAlign: 'left',
  p: 4,
  width: '100%',
};

/**
 * The steps the horizontal tab's selected state paints, exported as tokens so
 * the contrast regression in `src/components/a11y.kwcag.test.tsx` measures what
 * this component actually renders rather than an arithmetic restatement of it.
 *
 * **A selected tab is a PLACE, not a value.** It answers "where am I", which is
 * the same question the app nav rail answers — so it is carried by ink and
 * weight rather than by the brand hue. Colour is reserved for what a control
 * MEANS (primary action, danger, success); spending it on chrome is what stops
 * a state colour from registering when it appears.
 *
 * Ink also retires the defect the previous ramp was written around. The old
 * `primary.main` label was 4.59:1 on the dark PAGE but only **4.19:1** on a
 * raised surface, so a tab list passed every full-page scan and failed the
 * first time it rendered inside a modal or a popover. `fg.emphasized` is the
 * near-black/near-white step by construction — **15.49:1** on the light canvas
 * and **13.62:1** on the dark raised surface — so no surface it can land on is
 * marginal, and the mode-aware two-arm ramp is no longer needed.
 *
 * The indicator moves with the label. It was left on `primary.main` because a
 * 2px underline is a GRAPHIC judged at 3:1, which the old value cleared — but
 * that argument only justified LEAVING it, and an azure bar under an ink label
 * is the half-migrated look.
 *
 * `primary.main` itself is not re-pegged, and should not be: it is a solid fill
 * under white labels (`Checkbox`, `Switch`, `Banner`) where white on
 * `blue.200` measures 2.60:1. Form controls keep the brand hue on purpose —
 * a checkbox is a VALUE, not a place.
 */
export const TAB_RAMP = {
  label: 'fg.emphasized',
  indicator: 'fg.emphasized',
} as const;

export const horizontalSelectedStyles = {
  color: TAB_RAMP.label,
  fontWeight: 'semibold',
  position: 'relative',
  _after: {
    content: '""',
    position: 'absolute',
    top: 'calc(100% - 1px)',
    left: 0,
    width: '100%',
    height: '2px',
    background: TAB_RAMP.indicator,
  },
};

export const verticalSelectedStyles = {
  // Neutral fill, not a brand tint, for the same reason the label is ink: the
  // vertical tab rail is navigation chrome. `bg.muted` inverts with the mode,
  // where `primary.extralight` was a fixed light wash.
  backgroundColor: 'bg.muted',
  color: 'fg.emphasized',
  fontWeight: 'bold',
  _after: { content: 'none' },
  _before: {
    content: '""',
    position: 'absolute',
    insetInlineStart: 0,
    // Prevents the "line" variant's _before from rendering a right-side indicator
    insetInlineEnd: 'unset',
    insetBlock: 0,
    width: '2px',
    background: 'primary.main',
  },
};
