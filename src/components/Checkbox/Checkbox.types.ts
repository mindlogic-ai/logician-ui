import { CheckboxRootProps as ChakraCheckboxRootProps } from '@chakra-ui/react';

export type CheckboxProps = ChakraCheckboxRootProps & {
  id?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};
