import { BoxProps, PopoverProps } from '@chakra-ui/react';

export interface Month {
  startMonth: Date;
  endMonth: Date | null;
}

export interface MonthPickerProps extends Omit<BoxProps, 'onChange'> {
  /** The selected month range */
  selectedMonth?: Month | null;

  /** Callback when the month range changes */
  onChange?: (month: Month | null) => void;

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
