import { ButtonProps } from '@/components/Button/Button.types';

import { MonthRange } from '../MonthPicker.types';

export interface MonthButtonProps
  extends Omit<
    ButtonProps,
    'onClick' | 'variant' | 'disabled' | 'onMouseEnter' | 'onMouseLeave'
  > {
  /** The month index (0-11) */
  month: number;

  /** The year */
  year: number;

  /** The display name of the month */
  monthName: string;

  /** The currently selected month range */
  selectedRange?: MonthRange | null;

  /** The current selection start (intermediate state) */
  selectionStart?: Date | null;

  /** The currently hovered month for preview range */
  hoveredMonth?: { month: number; year: number } | null;

  /** Minimum selectable month */
  minMonth?: Date;

  /** Maximum selectable month */
  maxMonth?: Date;

  /** Click handler for month selection */
  onClick: (month: number, year: number) => void;

  /** Mouse enter handler for hover effects */
  onMouseEnter?: (month: number, year: number) => void;

  /** Mouse leave handler for hover effects */
  onMouseLeave?: () => void;
}
