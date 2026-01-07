import React, { memo } from 'react';

import { Button } from '@/components/Button';
import {
  ButtonColorScheme,
  ButtonVariant,
} from '@/components/Button/Button.types';

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
  colorScheme: ButtonColorScheme;
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
      // Selected months get solid primary
      if (isMonthSelected(month, year, selectedRange)) {
        return { colorScheme: 'primary', variant: 'solid' };
      }
      if (isSelectionStart(month, year, selectionStart)) {
        return { colorScheme: 'primary', variant: 'solid' };
      }

      // In-range months get soft primary
      if (isMonthInRange(month, year, selectedRange)) {
        return { colorScheme: 'primary', variant: 'soft' };
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
        return { colorScheme: 'primary', variant: 'soft' };
      }

      // Default: ghost neutral
      return { colorScheme: 'neutral', variant: 'outline' };
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
        colorPalette={style.colorScheme}
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
