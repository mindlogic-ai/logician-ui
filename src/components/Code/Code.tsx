import { useState } from 'react';
import {
  CodeBlock as ChakraCodeBlock,
  CodeBlockRootProps,
} from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';

import { FaCheck, FaRegCopy } from '../Icon';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';
import { CodeProps } from './Code.types';
import { shikiAdapter } from './shikiAdapter';

type CodeBlockMeta = NonNullable<CodeBlockRootProps['meta']>;

export const Code = ({
  children,
  language: languageProp,
  onCopy,
  hideHeader = false,
  showLineNumbers,
  containerProps,
  ...rest
}: CodeProps) => {
  const language = languageProp === 'js' ? 'javascript' : languageProp;

  const { meta: containerMeta, ...containerPropsRest } = containerProps ?? {};
  const { meta: restMeta, ...restWithoutMeta } = rest;

  const hasMeta =
    Boolean(containerMeta) ||
    Boolean(restMeta) ||
    showLineNumbers !== undefined;
  const mergedMeta: CodeBlockMeta | undefined = hasMeta
    ? {
        ...containerMeta,
        ...restMeta,
        ...(showLineNumbers !== undefined && { showLineNumbers }),
      }
    : undefined;

  const translate = useTranslate();
  const [isCopied, setIsCopied] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(
    undefined
  );

  const showHeader = !hideHeader && language;
  const showOverlayCopy = !showHeader && Boolean(onCopy);

  const handleCopy = () => {
    onCopy?.(children);
  };

  const handleOverlayCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = children;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    onCopy?.(children);

    setIsCopied(true);
    setIsTooltipOpen(true);

    setTimeout(() => {
      setIsCopied(false);
      setIsTooltipOpen(undefined);
    }, 1500);
  };

  const headerCopyTrigger = onCopy ? (
    <ChakraCodeBlock.CopyTrigger
      aria-label="Copy code"
      color="gray.600"
      cursor="pointer"
    >
      <ChakraCodeBlock.CopyIndicator
        copied={<FaCheck color="success.main" boxSize="xs" />}
      />
    </ChakraCodeBlock.CopyTrigger>
  ) : null;

  return (
    <ChakraCodeBlock.AdapterProvider value={shikiAdapter}>
      <ChakraCodeBlock.Root
        code={children}
        language={language}
        textStyle="Body"
        position="relative"
        overflow="hidden"
        borderColor="gray.300"
        {...containerPropsRest}
        {...restWithoutMeta}
        meta={mergedMeta}
        onCopy={handleCopy}
        className={['ml-code', containerProps?.className]
          .filter(Boolean)
          .join(' ')}
      >
        {showHeader && (
          <ChakraCodeBlock.Header
            className="ml-code-header"
            px={4}
            py={2}
            bgColor="white"
            zIndex={2}
          >
            <ChakraCodeBlock.Title
              fontFamily="mono"
              fontWeight="bold"
              color="gray.1200"
            >
              {language}
            </ChakraCodeBlock.Title>
            <ChakraCodeBlock.Control>
              {headerCopyTrigger}
            </ChakraCodeBlock.Control>
          </ChakraCodeBlock.Header>
        )}
        {showOverlayCopy && (
          <Tooltip
            content={isCopied ? translate('copied') : translate('copy')}
            placement="top"
            open={isTooltipOpen}
          >
            <IconButton
              className="ml-code-copy"
              position="absolute"
              top={2}
              right={3}
              zIndex={2}
              aria-label="Copy code"
              size="sm"
              colorPalette="neutral"
              variant="ghost"
              color="gray.800"
              onClick={handleOverlayCopy}
            >
              {isCopied ? (
                <FaCheck color="success.main" boxSize="xs" />
              ) : (
                <FaRegCopy boxSize="xs" />
              )}
            </IconButton>
          </Tooltip>
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
