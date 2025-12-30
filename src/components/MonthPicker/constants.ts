import { format } from 'date-fns';
import { enUS, es, ja, ko, zhCN } from 'date-fns/locale';

// Map language codes to date-fns locales
const LOCALE_MAP = {
  ko: ko,
  en: enUS,
  zh: zhCN,
  ja: ja,
  es: es,
} as const;

// Map language codes to culturally appropriate date formats
const DEFAULT_FORMAT_MAP = {
  ko: 'yyyy년 MMM', // 2024년 3월
  en: 'MMM yyyy', // Mar 2024
  zh: 'yyyy年MMM', // 2024年3月
  ja: 'yyyy年MMM', // 2024年3月
  es: 'MMM yyyy', // mar 2024
} as const;

/**
 * Get the default date format for a given locale
 * @param language Language code (ko, en, zh, ja, es)
 * @returns Appropriate date format string for the locale
 */
export const getDefaultDateFormat = (language: string = 'en'): string => {
  return (
    DEFAULT_FORMAT_MAP[language as keyof typeof DEFAULT_FORMAT_MAP] ||
    DEFAULT_FORMAT_MAP.en
  );
};

/**
 * Generate month names for the given locale
 * @param language Language code (ko, en, zh, ja, es)
 * @param monthFormat Format string for month names (default: 'MMM' for abbreviated)
 * @returns Array of month names in the specified locale
 */
export const getMonthNames = (
  language: string = 'en',
  monthFormat: string = 'MMM'
): string[] => {
  const locale =
    LOCALE_MAP[language as keyof typeof LOCALE_MAP] || LOCALE_MAP.en;

  return Array.from({ length: 12 }, (_, monthIndex) => {
    const date = new Date(2024, monthIndex, 1); // Use 2024 as a reference year
    return format(date, monthFormat, { locale });
  });
};

/**
 * Get date-fns locale object for the given language
 * @param language Language code (ko, en, zh, ja, es)
 * @returns date-fns locale object
 */
export const getDateFnsLocale = (language: string = 'en') => {
  return LOCALE_MAP[language as keyof typeof LOCALE_MAP] || LOCALE_MAP.en;
};

// Legacy export for backward compatibility (English abbreviated months)
export const MONTHS = getMonthNames('en', 'MMM');
