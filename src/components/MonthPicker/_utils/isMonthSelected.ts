import { isSameMonth } from 'date-fns';

import { Month } from '../MonthPicker.types';

export const isMonthSelected = (
  month: number,
  year: number,
  selectedMonth?: Month | null,
): boolean => {
  if (!selectedMonth) return false;

  const monthDate = new Date(year, month, 1);
  return (
    isSameMonth(monthDate, selectedMonth.startMonth) ||
    (selectedMonth.endMonth
      ? isSameMonth(monthDate, selectedMonth.endMonth)
      : false)
  );
};
