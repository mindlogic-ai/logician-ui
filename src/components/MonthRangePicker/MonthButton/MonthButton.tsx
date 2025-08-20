import React, { memo } from 'react';

import { Button } from '@/components/Button';
import { ButtonVariant } from '@/components/Button/Button.types';

import {
  isMonthDisabled,
  isMonthInPreviewRange,
  isMonthInRange,
  isMonthSelected,
  isSelectionStart,
} from '../_utils';
import { MonthRange } from '../MonthRangePicker.types';
import { MonthButtonProps } from './MonthButton.types';

export const MonthButton: React.FC<MonthButtonProps> = memo(
  ({
    month,
    year,
    monthName,
    selectedRange,
    selectionStart,
    hoveredMonth,
    minMonth,
    maxMonth,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...buttonProps
  }) => {
    const disabled = isMonthDisabled(month, year, minMonth, maxMonth);

    const handleClick = () => {
      if (!disabled) {
        onClick(month, year);
      }
    };

    const handleMouseEnter = () => {
      if (!disabled && onMouseEnter) {
        onMouseEnter(month, year);
      }
    };

    const handleMouseLeave = () => {
      if (onMouseLeave) {
        onMouseLeave();
      }
    };

    const getMonthButtonVariant = (
      month: number,
      year: number,
      selectedRange?: MonthRange | null,
      selectionStart?: Date | null,
      hoveredMonth?: { month: number; year: number } | null,
      minMonth?: Date,
      maxMonth?: Date,
    ): ButtonVariant => {
      if (isMonthDisabled(month, year, minMonth, maxMonth)) return 'tertiary';
      if (isMonthSelected(month, year, selectedRange)) return 'primary';
      if (isSelectionStart(month, year, selectionStart)) return 'primary';
      if (isMonthInRange(month, year, selectedRange)) return 'secondary';

      // Show preview range when hovering with a selection start
      if (
        isMonthInPreviewRange(
          month,
          year,
          selectionStart || null,
          hoveredMonth || null,
        )
      ) {
        return 'secondary';
      }

      return 'tertiary';
    };

    return (
      <Button
        size="sm"
        variant={getMonthButtonVariant(
          month,
          year,
          selectedRange,
          selectionStart,
          hoveredMonth,
          minMonth,
          maxMonth,
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        opacity={disabled ? 0.4 : 1}
        {...buttonProps}
      >
        {monthName}
      </Button>
    );
  },
);

MonthButton.displayName = 'MonthButton';
