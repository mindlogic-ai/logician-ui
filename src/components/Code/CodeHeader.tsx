import { forwardRef } from 'react';
import {
  CodeBlock as ChakraCodeBlock,
  CodeBlockHeaderProps,
} from '@chakra-ui/react';

export const CodeHeader = forwardRef<HTMLDivElement, CodeBlockHeaderProps>(
  ({ className, ...props }, ref) => (
    <ChakraCodeBlock.Header
      ref={ref}
      px={4}
      py={2}
      bgColor="white"
      borderBottom="1px solid"
      borderColor="primary.light"
      zIndex={2}
      className={['ml-code-header', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
);
CodeHeader.displayName = 'Code.Header';
