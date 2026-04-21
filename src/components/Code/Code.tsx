import { lazy, Suspense, useState } from 'react';
import {
  Box,
  CodeBlock as ChakraCodeBlock,
  createShikiAdapter,
  Spinner,
} from '@chakra-ui/react';
import type { HighlighterGeneric } from 'shiki';

import { useTranslate } from '@/hooks/useTranslate';

import { InlineCode } from '../InlineCode';
import { SegmentedControl } from '../SegmentedControl';
import { CodeProps } from './Code.types';

// Use dynamic import to break circular dependency
const Markdown = lazy(() =>
  import('../Markdown').then((module) => ({ default: module.Markdown }))
);

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

  const translate = useTranslate();

  const [isMarkdownPreviewMode, setIsMarkdownPreviewMode] =
    useState<boolean>(false);

  const handleMarkdownModeChange = (selectedValue: string) => {
    setIsMarkdownPreviewMode(selectedValue === 'preview');
  };

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
              {language === 'markdown' && (
                <SegmentedControl
                  size="sm"
                  options={[
                    {
                      label: translate('code_markdown_raw') as string,
                      value: 'raw',
                    },
                    {
                      label: translate('code_markdown_preview') as string,
                      value: 'preview',
                    },
                  ]}
                  onSelect={handleMarkdownModeChange}
                />
              )}
              {onCopy && (
                <ChakraCodeBlock.CopyTrigger aria-label="Copy code">
                  <ChakraCodeBlock.CopyIndicator />
                </ChakraCodeBlock.CopyTrigger>
              )}
            </ChakraCodeBlock.Control>
          </ChakraCodeBlock.Header>
        )}
        {isMarkdownPreviewMode ? (
          <Box p={2}>
            <Suspense fallback={<Spinner />}>
              <Markdown
                // Prevent infinite loop of markdown rendering
                components={{
                  code: ({ className, ...props }: any) => {
                    // className denotes the language of the code block and only exists for block code
                    if (!className) {
                      return <InlineCode {...props} />;
                    }
                  },
                }}
              >
                {children}
              </Markdown>
            </Suspense>
          </Box>
        ) : (
          <ChakraCodeBlock.Content>
            <ChakraCodeBlock.Code>
              <ChakraCodeBlock.CodeText />
            </ChakraCodeBlock.Code>
          </ChakraCodeBlock.Content>
        )}
      </ChakraCodeBlock.Root>
    </ChakraCodeBlock.AdapterProvider>
  );
};
