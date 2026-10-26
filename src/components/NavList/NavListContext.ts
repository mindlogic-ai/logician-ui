import { createContext, useContext } from 'react';

import type { NavListResponsiveOrientation } from './NavList.types';

export const NavListContext = createContext<{
  orientation: NavListResponsiveOrientation;
  isCollapsed: boolean;
  /** The direction the list inherits, for the rows' tooltip triggers. */
  dir: 'ltr' | 'rtl';
  /** A row that just became current asks the list to bring it into view. */
  revealCurrent: () => void;
}>({
  orientation: 'vertical',
  isCollapsed: false,
  dir: 'ltr',
  revealCurrent: () => {},
});

export const useNavListContext = () => useContext(NavListContext);
