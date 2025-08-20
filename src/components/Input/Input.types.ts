import {
  InputGroupProps,
  InputLeftElementProps,
  InputProps as ChakraInputProps,
  InputRightElementProps,
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  wrapperProps?: InputGroupProps;
  leftElementProps?: InputLeftElementProps;
  rightElementProps?: InputRightElementProps;
  maskNumber?: boolean;
  /** 빈값일 때 공백 입력 방지 및 복사 붙여넣기 시 앞뒤 공백 제거 */
  trimWhiteSpace?: boolean;
  /** 모든 공백을 허용하지 않음 */
  noSpaces?: boolean;
}
