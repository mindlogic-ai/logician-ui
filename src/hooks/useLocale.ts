'use client';

import { createContext, useContext } from 'react';

export interface LocaleContextValue {
  language: string;
}

export const LocaleContext = createContext<LocaleContextValue>({
  language: 'en',
});

export const useLocale = () => useContext(LocaleContext);

export default useLocale;
