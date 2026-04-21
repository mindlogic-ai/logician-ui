import {
  CodeBlock as ChakraCodeBlock,
  createShikiAdapter,
} from '@chakra-ui/react';
import type { HighlighterGeneric } from 'shiki';

import { CodeProps } from './Code.types';

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import('shiki');
    return createHighlighter({
      langs: [
        'bash',
        'css',
        'go',
        'html',
        'java',
        'javascript',
        'json',
        'jsx',
        'markdown',
        'python',
        'rust',
        'shell',
        'sql',
        'tsx',
        'typescript',
        'xml',
        'yaml',
      ],
      themes: ['github-dark'],
    });
  },
  theme: 'github-dark',
});

export const Code = ({
  children,
  language: languageProp,
  onCopy,
  hideHeader = false,
  containerProps,
  ...rest
}: CodeProps) => {
  const language = languageProp === 'js' ? 'javascript' : languageProp;

  const handleCopy = () => {
    onCopy?.(children);
  };

  return (
    <ChakraCodeBlock.AdapterProvider value={shikiAdapter}>
      <ChakraCodeBlock.Root
        code={children}
        language={language}
        borderRadius="none"
        textStyle="p"
        overflow="hidden"
        {...containerProps}
        {...rest}
        onCopy={handleCopy}
        className={['ml-code', containerProps?.className]
          .filter(Boolean)
          .join(' ')}
      >
        {!hideHeader && language && (
          <ChakraCodeBlock.Header
            className="ml-code-header"
            px={4}
            py={2}
            bgColor="white"
            borderBottom="1px solid"
            borderColor="primary.light"
            zIndex={2}
          >
            <ChakraCodeBlock.Title
              fontFamily="mono"
              fontWeight="bold"
              color="gray.1200"
              textStyle="xs"
            >
              {language}
            </ChakraCodeBlock.Title>
            <ChakraCodeBlock.Control>
              {onCopy && (
                <ChakraCodeBlock.CopyTrigger aria-label="Copy code">
                  <ChakraCodeBlock.CopyIndicator />
                </ChakraCodeBlock.CopyTrigger>
              )}
            </ChakraCodeBlock.Control>
          </ChakraCodeBlock.Header>
        )}
        <ChakraCodeBlock.Content>
          <ChakraCodeBlock.Code>
            <ChakraCodeBlock.CodeText />
          </ChakraCodeBlock.Code>
        </ChakraCodeBlock.Content>
      </ChakraCodeBlock.Root>
    </ChakraCodeBlock.AdapterProvider>
  );
};
