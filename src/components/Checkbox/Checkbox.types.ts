import { CheckboxRootProps as ChakraCheckboxRootProps } from '@chakra-ui/react';

export interface CheckboxProps extends Omit<
  ChakraCheckboxRootProps,
  'checked' | 'disabled' | 'invalid'
> {
  /** v3 prop: controls checked state */
  checked?: boolean;
  /** v3 prop: controls disabled state */
  disabled?: boolean;
  /** v3 prop: controls invalid state */
  invalid?: boolean;
  /**
   * @deprecated Use `checked` instead. Maintained for v2 backward compatibility.
   */
  isChecked?: boolean;
  /**
   * @deprecated Use `disabled` instead. Maintained for v2 backward compatibility.
   */
  isDisabled?: boolean;
  /**
   * @deprecated Use `invalid` instead. Maintained for v2 backward compatibility.
   */
  isInvalid?: boolean;
}
