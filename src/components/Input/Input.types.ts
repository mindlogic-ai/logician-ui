import {
  InputElementProps,
  InputGroupProps,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  wrapperProps?: InputGroupProps;
  leftElementProps?: InputElementProps;
  rightElementProps?: InputElementProps;
  maskNumber?: boolean;
  /** 빈값일 때 공백 입력 방지 및 복사 붙여넣기 시 앞뒤 공백 제거 */
  trimWhiteSpace?: boolean;
  /** 모든 공백을 허용하지 않음 */
  noSpaces?: boolean;
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
