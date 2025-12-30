import { isSameMonth } from 'date-fns';

import { MonthRange } from '../MonthPicker.types';

export const isMonthSelected = (
  month: number,
  year: number,
  selectedRange?: MonthRange | null
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
