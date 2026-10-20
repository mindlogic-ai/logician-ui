import type { InputHTMLAttributes } from 'react';
import type { PinInput as ChakraPinInput } from '@chakra-ui/react';

export interface PinInputProps extends Omit<
  ChakraPinInput.RootProps,
  | 'count'
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
  | 'onValueComplete'
  | 'onChange'
  | 'children'
> {
  length: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
