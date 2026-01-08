import { TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';

export interface TextareaProps extends ChakraTextareaProps {
  /** Controls invalid visual state */
  invalid?: boolean;
}
