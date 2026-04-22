import { forwardRef } from 'react';
import {
  CodeBlock as ChakraCodeBlock,
  CodeBlockCopyTriggerProps,
} from '@chakra-ui/react';

/**
 * Copy-to-clipboard button for the code block. Defaults the accessible label
 * and renders a `Code.CopyIndicator` when no children are provided.
 */
export const CodeCopyTrigger = forwardRef<
  HTMLButtonElement,
  CodeBlockCopyTriggerProps
>(({ 'aria-label': ariaLabel = 'Copy code', children, ...props }, ref) => (
  <ChakraCodeBlock.CopyTrigger ref={ref} aria-label={ariaLabel} {...props}>
    {children ?? <ChakraCodeBlock.CopyIndicator />}
  </ChakraCodeBlock.CopyTrigger>
));
CodeCopyTrigger.displayName = 'Code.CopyTrigger';
