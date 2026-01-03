import { TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';

export interface TextareaProps extends ChakraTextareaProps {
  /** Controls invalid visual state for v2 backward compatibility */
  invalid?: boolean;
  /**
   * @deprecated Use `disabled` instead. Maintained for v2 backward compatibility.
   */
  isDisabled?: boolean;
  /**
   * @deprecated Use `invalid` instead. Maintained for v2 backward compatibility.
   */
  isInvalid?: boolean;
  /**
   * @deprecated Use `readOnly` instead. Maintained for v2 backward compatibility.
   */
  isReadOnly?: boolean;
}
