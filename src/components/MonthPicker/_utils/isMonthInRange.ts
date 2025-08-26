import { startOfMonth } from 'date-fns';

import { Month } from '../MonthPicker.types';

export const isMonthInRange = (
  month: number,
  year: number,
  selectedRange?: Month | null,
): boolean => {
  if (!selectedRange || !selectedRange.endMonth) return false;

  const monthDate = new Date(year, month, 1);
  const start = startOfMonth(selectedRange.startMonth);
  const end = startOfMonth(selectedRange.endMonth);

  return monthDate >= start && monthDate <= end;
};
