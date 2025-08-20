/**
 * Formats a date based on the user's locale.
 * @param {string | Date | undefined} date - The date to format (can be a string, Date object, or undefined).
 * @param {string} locale - The locale to format the date in (e.g., 'en-US', 'ko-KR').
 * @returns {string} - The formatted date string, or an empty string if the date is invalid or undefined.
 */
export function formatDateByLocale(
  date?: string | Date,
  locale: string = "en"
): string {
  if (!date) {
    // Return an empty string if date is undefined or null
    return "";
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj?.getTime())) {
    // Return an empty string if the date is invalid
    return "";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  // Adjust options for Korean locale
  if (locale === "ko") {
    options.month = "numeric"; // Avoid abbreviations in Korean
    options.day = "numeric"; // No leading zero
  }

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}
