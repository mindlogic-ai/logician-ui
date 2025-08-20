import { TagProps as ChakraTagProps } from '@chakra-ui/react';

export interface TagProps extends ChakraTagProps {
  variant?: 'default' | 'active';
}
