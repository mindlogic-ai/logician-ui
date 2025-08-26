import { isMonthDisabled } from './isMonthDisabled';

export const hasEnabledMonthsInYear = (
  year: number,
  minMonth?: Date,
  maxMonth?: Date,
): boolean => {
  // Check all 12 months (0-11) to see if any are enabled
  for (let month = 0; month < 12; month++) {
    if (!isMonthDisabled(month, year, minMonth, maxMonth)) {
      return true;
    }
  }
  return false;
};
