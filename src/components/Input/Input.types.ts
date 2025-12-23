import {
  Input,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

type InputElementProps = React.ComponentProps<typeof Input>;

export interface InputProps extends ChakraInputProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  wrapperProps?: React.ComponentProps<typeof Input>;
  leftElementProps?: InputElementProps;
  rightElementProps?: InputElementProps;
  maskNumber?: boolean;
  /** 빈값일 때 공백 입력 방지 및 복사 붙여넣기 시 앞뒤 공백 제거 */
  trimWhiteSpace?: boolean;
  /** 모든 공백을 허용하지 않음 */
  noSpaces?: boolean;
}
