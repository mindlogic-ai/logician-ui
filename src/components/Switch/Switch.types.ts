import { SwitchRootProps as ChakraSwitchRootProps } from '@chakra-ui/react';

export interface SwitchProps extends ChakraSwitchRootProps {
  /**
   * @deprecated Use `checked` instead. Maintained for v2 backward compatibility.
   */
  isChecked?: boolean;
  /**
   * @deprecated Use `disabled` instead. Maintained for v2 backward compatibility.
   */
  isDisabled?: boolean;
}
