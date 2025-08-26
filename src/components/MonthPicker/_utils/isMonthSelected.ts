import { isSameMonth } from 'date-fns';

import { Month } from '../MonthPicker.types';

export const isMonthSelected = (
  month: number,
  year: number,
  selectedRange?: Month | null,
): boolean => {
  if (!selectedRange) return false;

  const monthDate = new Date(year, month, 1);
  return (
    isSameMonth(monthDate, selectedRange.startMonth) ||
    (selectedRange.endMonth
      ? isSameMonth(monthDate, selectedRange.endMonth)
      : false)
  );
};
