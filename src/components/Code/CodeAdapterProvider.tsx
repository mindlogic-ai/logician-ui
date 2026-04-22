import { ReactNode } from 'react';
import { CodeBlock as ChakraCodeBlock } from '@chakra-ui/react';

import { shikiAdapter } from './shikiAdapter';

export interface CodeAdapterProviderProps {
  children: ReactNode;
  /**
   * Highlight adapter to provide to the underlying `CodeBlock.AdapterProvider`.
   * Defaults to the built-in Shiki adapter pre-configured with the languages
   * and theme used by Logician UI.
   */
  value?: React.ComponentProps<typeof ChakraCodeBlock.AdapterProvider>['value'];
}

export const CodeAdapterProvider = ({
  children,
  value = shikiAdapter,
}: CodeAdapterProviderProps) => (
  <ChakraCodeBlock.AdapterProvider value={value}>
    {children}
  </ChakraCodeBlock.AdapterProvider>
);
CodeAdapterProvider.displayName = 'Code.AdapterProvider';
