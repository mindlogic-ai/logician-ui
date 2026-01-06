import { CheckboxRootProps as ChakraCheckboxRootProps } from '@chakra-ui/react';

export interface CheckboxProps extends ChakraCheckboxRootProps {
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
