import { ReactNode } from 'react';
import { Field } from '@chakra-ui/react';

export interface FieldHelpProps {
  /** Helper text rendered under the control. */
  children: ReactNode;
}

/**
 * Inline helper text under a form control. Renders through Chakra's
 * `Field.HelperText`, so it is associated with the control via
 * `aria-describedby` when used inside a `FieldRow`/`FormControl`. For a hover
 * info-popover instead of always-visible text, pass a logician `InfoSprinkle`
 * into the `FieldRow` `endAdornment` slot.
 */
export const FieldHelp = ({ children }: FieldHelpProps) => {
  return <Field.HelperText>{children}</Field.HelperText>;
};
