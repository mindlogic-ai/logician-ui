import { forwardRef } from 'react';
import {
  CodeBlock as ChakraCodeBlock,
  CodeBlockTitleProps,
} from '@chakra-ui/react';

export const CodeTitle = forwardRef<HTMLDivElement, CodeBlockTitleProps>(
  (props, ref) => (
    <ChakraCodeBlock.Title
      ref={ref}
      fontFamily="mono"
      fontWeight="bold"
      color="gray.1200"
      textStyle="xs"
      {...props}
    />
  )
);
CodeTitle.displayName = 'Code.Title';
