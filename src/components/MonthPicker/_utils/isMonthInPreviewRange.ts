import { isAfter, isBefore, isSameMonth } from 'date-fns';

export const isMonthInPreviewRange = (
  month: number,
  year: number,
  selectionStart: Date | null,
  hoveredMonth: { month: number; year: number } | null
): boolean => {
  if (!selectionStart || !hoveredMonth) return false;

  const monthDate = new Date(year, month, 1);
  const hoveredDate = new Date(hoveredMonth.year, hoveredMonth.month, 1);

  // Don't highlight if hovering the same month as selection start
  if (
    isSameMonth(monthDate, selectionStart) ||
    isSameMonth(monthDate, hoveredDate)
  ) {
    return false;
  }

  // Determine range boundaries (start could be before or after hovered)
  const rangeStart = isBefore(selectionStart, hoveredDate)
    ? selectionStart
    : hoveredDate;
  const rangeEnd = isAfter(selectionStart, hoveredDate)
    ? selectionStart
    : hoveredDate;

  // Check if month is between start and end (exclusive)
  return isAfter(monthDate, rangeStart) && isBefore(monthDate, rangeEnd);
};
