import { ForwardedRef, forwardRef } from 'react';
import { Select } from '@chakra-ui/react';

export interface SelectTriggerProps extends Select.ControlProps {
  clearable?: boolean;
}

/**
 * SelectTrigger — wraps Select.Control + Select.Trigger + Select.Indicator.
 *
 * Provides the clickable trigger area with a dropdown indicator.
 * Pass `clearable` to show a clear button.
 */
export const SelectTrigger = forwardRef(
  (
    { children, clearable, ...rest }: SelectTriggerProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Select.Control {...rest}>
        <Select.Trigger ref={ref}>{children}</Select.Trigger>
        <Select.IndicatorGroup>
          {clearable && <Select.ClearTrigger cursor="pointer" />}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';
