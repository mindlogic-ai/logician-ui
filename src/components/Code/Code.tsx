import { forwardRef } from 'react';
import { CodeBlock as ChakraCodeBlock } from '@chakra-ui/react';

import { CodeProps } from './Code.types';
import { CodeAdapterProvider } from './CodeAdapterProvider';
import { CodeCopyTrigger } from './CodeCopyTrigger';
import { CodeHeader } from './CodeHeader';
import { CodeRoot } from './CodeRoot';
import { CodeTitle } from './CodeTitle';

const CodeBase = forwardRef<React.ComponentRef<typeof CodeRoot>, CodeProps>(
  (
    {
      children,
      language: languageProp,
      onCopy,
      hideHeader = false,
      containerProps,
      ...rest
    },
    ref
  ) => {
    const language = languageProp === 'js' ? 'javascript' : languageProp;

    const handleCopy = () => {
      onCopy?.(children);
    };

    return (
      <CodeAdapterProvider>
        <CodeRoot
          ref={ref}
          code={children}
          language={language}
          {...containerProps}
          {...rest}
          onCopy={handleCopy}
        >
          {!hideHeader && language && (
            <CodeHeader>
              <CodeTitle>{language}</CodeTitle>
              <ChakraCodeBlock.Control>
                {onCopy && <CodeCopyTrigger />}
              </ChakraCodeBlock.Control>
            </CodeHeader>
          )}
          <ChakraCodeBlock.Content>
            <ChakraCodeBlock.Code>
              <ChakraCodeBlock.CodeText />
            </ChakraCodeBlock.Code>
          </ChakraCodeBlock.Content>
        </CodeRoot>
      </CodeAdapterProvider>
    );
  }
);
CodeBase.displayName = 'Code';

export const Code = Object.assign(CodeBase, {
  AdapterProvider: CodeAdapterProvider,
  Root: CodeRoot,
  Header: CodeHeader,
  Title: CodeTitle,
  Control: ChakraCodeBlock.Control,
  Content: ChakraCodeBlock.Content,
  Code: ChakraCodeBlock.Code,
  CodeText: ChakraCodeBlock.CodeText,
  CopyTrigger: CodeCopyTrigger,
  CopyIndicator: ChakraCodeBlock.CopyIndicator,
});
