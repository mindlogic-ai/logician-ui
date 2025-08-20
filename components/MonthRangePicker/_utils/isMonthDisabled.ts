import { isAfter, isBefore, startOfMonth } from 'date-fns';

export const isMonthDisabled = (
  month: number,
  year: number,
  minMonth?: Date,
  maxMonth?: Date,
): boolean => {
  const monthDate = new Date(year, month, 1);

  if (minMonth && isBefore(monthDate, startOfMonth(minMonth))) {
    return true;
  }

  if (maxMonth && isAfter(monthDate, startOfMonth(maxMonth))) {
    return true;
  }

  return false;
};
