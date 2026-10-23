'use client';

import { createContext, useContext } from 'react';

import type { SupportedLanguage } from '@/components/MonthPicker/constants';

export interface LanguageContextValue {
  language: SupportedLanguage;
}

/**
 * The value seen outside any `LogicianProvider`. Exported so `useTranslate`
 * can tell "no provider" (keep Korean) from a provider set to `en`.
 */
export const NO_PROVIDER_LANGUAGE: LanguageContextValue = { language: 'en' };

export const LanguageContext =
  createContext<LanguageContextValue>(NO_PROVIDER_LANGUAGE);

export const useLanguage = () => useContext(LanguageContext);

export default useLanguage;
