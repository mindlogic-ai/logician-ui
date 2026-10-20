/**
 * Layout only. Colours, hover/press and disabled come from the ghost Button
 * recipe (`<Button variant="ghost">`), so SeeMoreButton cannot drift from it.
 * The top hairline is structural (it separates the button from the list it
 * extends), so it is the ONLY border — Button draws 1px on every side, which
 * would put transparent borders left/right/bottom — and it survives the
 * disabled ("all shown") state, where the ghost recipe's `_disabled` would
 * otherwise turn it transparent.
 */
export const seeMoreButtonStyles = {
  alignSelf: 'stretch',
  w: '100%',
  display: 'flex',
  borderRadius: 'none',
  borderWidth: '0',
  borderTopWidth: '1px',
  borderTopColor: 'border.subtle',
  fontSize: 'subtitle',
  _disabled: { borderTopColor: 'border.subtle' },
} as const;
