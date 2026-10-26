import { createContext, useContext } from 'react';

import type { NavListResponsiveOrientation } from './NavList.types';

export const NavListContext = createContext<{
  orientation: NavListResponsiveOrientation;
  isCollapsed: boolean;
  /**
   * The direction the list inherits, measured after mount — for the rows'
   * tooltips (their text direction, and which side a collapsed rail's tooltip
   * opens on) and the `dir` attribute zag stamps on its parts. Never for
   * layout: rows inherit `direction` in CSS, so a server render is right
   * before this is known.
   */
  tooltipDir: 'ltr' | 'rtl';
  /** A row that just became current asks the list to bring it into view. */
  revealCurrent: () => void;
}>({
  orientation: 'vertical',
  isCollapsed: false,
  tooltipDir: 'ltr',
  revealCurrent: () => {},
});

export const useNavListContext = () => useContext(NavListContext);
