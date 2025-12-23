import { BoxProps, Popover } from '@chakra-ui/react';

// Popover root props from the namespace
type PopoverRootProps = React.ComponentProps<typeof Popover.Root>;

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
  popoverProps?: Partial<PopoverRootProps>;

  /** Name attribute for form usage */
  name?: string;
}
