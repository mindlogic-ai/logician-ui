/**
 * Format a number with thousands separators
 * @param value - The number to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns Formatted number string
 */
export const formatNumber = (
  value: number | string,
  locale: string = "en-US"
): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return "";
  }

  return new Intl.NumberFormat(locale).format(numericValue);
};

/**
 * Parse a formatted number string back to a number
 * @param formattedValue - The formatted number string
 * @returns Parsed number or NaN if invalid
 */
export const parseFormattedNumber = (formattedValue: string): number => {
  // Remove all non-digit characters except decimal point and negative sign
  const cleanedValue = formattedValue.replace(/[^\d.-]/g, "");
  return parseFloat(cleanedValue);
};
