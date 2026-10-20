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
import { MonthRange } from '../MonthPicker.types';
import { MonthButtonProps } from './MonthButton.types';

type MonthButtonStyle = {
  variant: ButtonVariant;
};

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

    const getMonthButtonStyle = (
      month: number,
      year: number,
      selectedRange?: MonthRange | null,
      selectionStart?: Date | null,
      hoveredMonth?: { month: number; year: number } | null
    ): MonthButtonStyle => {
      // Selected months get the primary fill
      if (isMonthSelected(month, year, selectedRange)) {
        return { variant: 'primary' };
      }
      if (isSelectionStart(month, year, selectionStart)) {
        return { variant: 'primary' };
      }

      // In-range months get the subtle wash
      if (isMonthInRange(month, year, selectedRange)) {
        return { variant: 'subtle' };
      }

      // Preview range when hovering with a selection start
      if (
        isMonthInPreviewRange(
          month,
          year,
          selectionStart || null,
          hoveredMonth || null
        )
      ) {
        return { variant: 'subtle' };
      }

      // Default: outlined
      return { variant: 'secondary' };
    };

    const style = getMonthButtonStyle(
      month,
      year,
      selectedRange,
      selectionStart,
      hoveredMonth
    );

    return (
      <Button
        size="sm"
        variant={style.variant}
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
  }
);

MonthButton.displayName = 'MonthButton';
