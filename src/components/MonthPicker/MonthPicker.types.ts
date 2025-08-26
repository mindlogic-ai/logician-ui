import { BoxProps, PopoverProps } from '@chakra-ui/react';

export interface MonthRange {
  startMonth: Date;
  endMonth: Date | null;
}

export interface MonthPickerProps extends Omit<BoxProps, 'onChange'> {
  /** The selected month range */
  selectedRange?: MonthRange | null;

  /** Callback when the month range changes */
  onChange?: (range: MonthRange | null) => void;

  /** Whether the picker is a range picker */
  isRange?: boolean;

  /** Minimum selectable month */
  minMonth?: Date;

  /** Maximum selectable month */
  maxMonth?: Date;

  /** Whether the picker is disabled */
  disabled?: boolean;

  /** Placeholder text for the input */
  placeholder?: string;

  /** Format for displaying the selected range */
  format?: string;

  /** Whether to use portal for the popover */
  usePortal?: boolean;

  /** Props for the popover */
  popoverProps?: Partial<PopoverProps>;

  /** Name attribute for form usage */
  name?: string;
}
