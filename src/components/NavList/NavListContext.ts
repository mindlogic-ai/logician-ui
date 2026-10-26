import { createContext, useContext } from 'react';

import type { NavListResponsiveOrientation } from './NavList.types';

export const NavListContext = createContext<{
  orientation: NavListResponsiveOrientation;
}>({ orientation: 'vertical' });

export const useNavListContext = () => useContext(NavListContext);
