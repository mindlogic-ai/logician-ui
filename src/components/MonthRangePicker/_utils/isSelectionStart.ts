import { isSameMonth } from 'date-fns';

export const isSelectionStart = (
  month: number,
  year: number,
  selectionStart?: Date | null
): boolean => {
  if (!selectionStart) return false;

  const monthDate = new Date(year, month, 1);
  return isSameMonth(monthDate, selectionStart);
};
