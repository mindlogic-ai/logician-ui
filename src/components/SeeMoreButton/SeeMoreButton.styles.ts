/**
 * Layout only. Colours, hover/press and disabled come from the ghost Button
 * recipe (`<Button variant="ghost">`), so SeeMoreButton cannot drift from it.
 * The top hairline is structural (it separates the button from the list it
 * extends), so it keeps a divider colour on top of the ghost recipe.
 */
export const seeMoreButtonStyles = {
  alignSelf: 'stretch',
  w: '100%',
  display: 'flex',
  borderRadius: 'none',
  borderTopColor: 'border.subtle',
  fontSize: 'subtitle',
} as const;
