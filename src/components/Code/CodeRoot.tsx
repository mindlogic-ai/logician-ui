import { forwardRef } from 'react';
import {
  CodeBlock as ChakraCodeBlock,
  CodeBlockRootProps,
} from '@chakra-ui/react';

export const CodeRoot = forwardRef<HTMLDivElement, CodeBlockRootProps>(
  ({ className, ...props }, ref) => (
    <ChakraCodeBlock.Root
      ref={ref}
      borderRadius="none"
      textStyle="p"
      overflow="hidden"
      className={['ml-code', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
);
CodeRoot.displayName = 'Code.Root';
