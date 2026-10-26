import { createContext, useContext } from 'react';

import type { NavListResponsiveOrientation } from './NavList.types';

export const NavListContext = createContext<{
  orientation: NavListResponsiveOrientation;
  isCollapsed: boolean;
}>({ orientation: 'vertical', isCollapsed: false });

export const useNavListContext = () => useContext(NavListContext);
