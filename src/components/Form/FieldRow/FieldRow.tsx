import { FormControl } from '@/components/FormControl';

import { FieldError } from '../FieldError';
import { FieldHelp } from '../FieldHelp';
import { FieldLabel } from '../FieldLabel';
import { FieldRowProps } from './FieldRow.types';

/**
 * The composition keystone for a form field: wraps a control in a logician
 * `FormControl` (Chakra `Field.Root`) and lays out its label, optional
 * description/help, and error consistently. Because it delegates to the `Field`
 * context, the label↔control association, the `required` asterisk, `aria-invalid`
 * and the error/helper `aria-describedby` wiring are all handled automatically —
 * callers never thread ids by hand.
 *
 * It is form-library agnostic: pass `value`/`onChange` controls directly (media
 * forms) or render a form-connected adapter as the child (studio/admin forms). Set
 * `error` to flip the field to invalid and surface the message.
 */
export const FieldRow = ({
  label,
  description,
  endAdornment,
  helperText,
  error,
  invalid,
  children,
  labelProps,
  ...rootProps
}: FieldRowProps) => {
  return (
    <FormControl invalid={invalid ?? Boolean(error)} {...rootProps}>
      {(label != null || endAdornment != null) && (
        <FieldLabel
          heading={label}
          description={description}
          endAdornment={endAdornment}
          {...labelProps}
        />
      )}
      {children}
      {helperText != null && <FieldHelp>{helperText}</FieldHelp>}
      <FieldError>{error}</FieldError>
    </FormControl>
  );
};
