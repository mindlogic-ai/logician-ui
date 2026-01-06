import { SwitchRootProps as ChakraSwitchRootProps } from '@chakra-ui/react';

export interface SwitchProps extends Omit<
  ChakraSwitchRootProps,
  'checked' | 'disabled'
> {
  /** v3 prop: controls checked state */
  checked?: boolean;
  /** v3 prop: controls disabled state */
  disabled?: boolean;
  /**
   * @deprecated Use `checked` instead. Maintained for v2 backward compatibility.
   */
  isChecked?: boolean;
  /**
   * @deprecated Use `disabled` instead. Maintained for v2 backward compatibility.
   */
  isDisabled?: boolean;
}
