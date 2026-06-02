'use client';

import { createContext, useContext } from 'react';

import type { SupportedLanguage } from '@/components/MonthPicker/constants';

export interface LanguageContextValue {
  language: SupportedLanguage;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
});

export const useLanguage = () => useContext(LanguageContext);

export default useLanguage;
