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
 * `label` is mode-aware for the same reason `LINK_RAMP` is. `primary.main`
 * resolves to `blue.300` (#4A79DC) in dark, which is 4.59:1 on the page
 * background (#0E1014) but only **4.19:1** on a raised surface (#181A20) — so
 * the selected tab cleared AA on a full-page layout and failed it the moment
 * the same tab list rendered inside a modal or a popover. KWCAG 5.3.3
 * (텍스트 콘텐츠의 명도 대비) asks 4.5:1 of text, and this is text. The `.dark`
 * end of the ramp is `blue.200` (#7DA0E8): 6.68:1 on the surface, 7.31:1 on the
 * page. Light is untouched — `primary.main` is 6.62:1 on white.
 *
 * `indicator` stays `primary.main` deliberately. The 2px underline is a
 * GRAPHIC, judged at 3:1, which 4.19:1 clears; moving it would be a visual
 * change the standard does not ask for.
 *
 * `primary.main` itself is not re-pegged, and should not be: it is also a solid
 * fill under white labels (`Checkbox`, `Switch`, `Banner`), where white on
 * `blue.200` measures 2.60:1. The same reasoning already produced
 * `secondary.main`'s `_dark` step — see its note in `theme/colors.ts`, which
 * moved violet off `.300` at 4.29:1 for exactly this. Blue never got the same
 * treatment.
 */
export const TAB_RAMP = {
  label: { base: 'primary.main', _dark: 'primary.dark' },
  indicator: 'primary.main',
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
  backgroundColor: 'primary.extralight', // #E8EEFB
  color: 'primary.dark', // #0D317D
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
