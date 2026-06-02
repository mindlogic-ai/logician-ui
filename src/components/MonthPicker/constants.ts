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

export type SupportedLanguage = keyof typeof LOCALE_MAP;

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
export const getDefaultDateFormat = (
  language: SupportedLanguage = 'en'
): string => {
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
  language: SupportedLanguage = 'en',
  monthFormat: string = 'MMM'
): string[] => {
  const locale = LOCALE_MAP[language] || LOCALE_MAP.en;

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
export const getDateFnsLocale = (language: SupportedLanguage = 'en') => {
  return LOCALE_MAP[language] || LOCALE_MAP.en;
};

/**
 * Generate day names for the given locale
 * @param language Language code (ko, en, zh, ja, es)
 * @param dayFormat Format string for day names (default: 'EEEEEE' for 2-letter abbreviated)
 * @returns Array of day names in the specified locale (starting from Sunday)
 */
export const getDayNames = (
  language: SupportedLanguage = 'en',
  dayFormat: string = 'EEEEEE'
): string[] => {
  const locale = LOCALE_MAP[language] || LOCALE_MAP.en;

  // 2024-01-07 is a Sunday
  return Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(2024, 0, 7 + dayIndex);
    return format(date, dayFormat, { locale });
  });
};

/**
 * Get the default date format (with day) for a given locale
 * @param language Language code (ko, en, zh, ja, es)
 * @returns Appropriate date format string for the locale
 */
export const getDefaultFullDateFormat = (
  language: SupportedLanguage = 'en'
): string => {
  const formats: Record<SupportedLanguage, string> = {
    ko: 'yyyy년 MM월 dd일',
    en: 'MMM dd, yyyy',
    zh: 'yyyy年MM月dd日',
    ja: 'yyyy年MM月dd日',
    es: 'dd MMM yyyy',
  };
  return formats[language] || formats.en;
};

// Legacy export for backward compatibility (English abbreviated months)
export const MONTHS = getMonthNames('en', 'MMM');
