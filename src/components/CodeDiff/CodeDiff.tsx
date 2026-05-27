import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  CodeBlock as ChakraCodeBlock,
  CodeBlockRootProps,
  Flex,
  Grid,
  HStack,
  Text,
} from '@chakra-ui/react';

import { shikiAdapter } from '@/components/Code';
import { useTranslate } from '@/hooks/useTranslate';

import { FaCheck, FaRegCopy } from '../Icon';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';
import { CodeDiffProps } from './CodeDiff.types';
import { SplitDiff, toSplit, toUnified, UnifiedDiff } from './computeDiff';

type CodeBlockMeta = NonNullable<CodeBlockRootProps['meta']>;

type DiffResult =
  | ({ mode: 'unified' } & UnifiedDiff)
  | ({ mode: 'split' } & SplitDiff);

const COPY_RESET_MS = 1500;

const normalizeLanguage = (language?: string) =>
  language === 'js' ? 'javascript' : language;

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

interface CodeDiffHeaderProps {
  filename?: string;
  language?: string;
  showStats: boolean;
  addedCount: number;
  removedCount: number;
  afterCode: string;
  onCopy?: (afterCode: string) => void;
}

const CodeDiffHeader = ({
  filename,
  language,
  showStats,
  addedCount,
  removedCount,
  afterCode,
  onCopy,
}: CodeDiffHeaderProps) => {
  const translate = useTranslate();
  const [isCopied, setIsCopied] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(
    undefined
  );
  const copyResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
    },
    []
  );

  const handleCopy = async () => {
    await copyToClipboard(afterCode);
    onCopy?.(afterCode);

    setIsCopied(true);
    setIsTooltipOpen(true);

    if (copyResetTimerRef.current) {
      clearTimeout(copyResetTimerRef.current);
    }
    copyResetTimerRef.current = setTimeout(() => {
      setIsCopied(false);
      setIsTooltipOpen(undefined);
      copyResetTimerRef.current = null;
    }, COPY_RESET_MS);
  };

  return (
    <Flex
      className="ml-code-diff-header"
      align="center"
      justify="space-between"
      px={4}
      py={2}
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.300"
      gap={3}
    >
      <HStack gap={3} minW={0} flex={1}>
        {filename && (
          <Text
            fontFamily="mono"
            fontWeight="bold"
            color="gray.1200"
            textStyle="caption"
            truncate
          >
            {filename}
          </Text>
        )}
        {showStats && (
          <HStack gap={1} textStyle="caption" fontFamily="mono">
            <Text color="success.main">+{addedCount}</Text>
            <Text color="danger.main">−{removedCount}</Text>
          </HStack>
        )}
      </HStack>
      <HStack gap={2}>
        {language && (
          <Text
            fontFamily="mono"
            fontWeight="bold"
            color="gray.1200"
            textStyle="caption"
          >
            {language}
          </Text>
        )}
        <Tooltip
          content={isCopied ? translate('copied') : translate('copy')}
          placement="top"
          open={isTooltipOpen}
        >
          <IconButton
            aria-label={
              isCopied ? String(translate('copied')) : String(translate('copy'))
            }
            size="sm"
            colorPalette="neutral"
            variant="ghost"
            color="gray.800"
            onClick={handleCopy}
          >
            {isCopied ? (
              <FaCheck color="success.main" boxSize="xs" />
            ) : (
              <FaRegCopy boxSize="xs" />
            )}
          </IconButton>
        </Tooltip>
      </HStack>
    </Flex>
  );
};

export const CodeDiff = ({
  before,
  after,
  language: languageProp,
  filename,
  mode = 'unified',
  showStats = true,
  showLineNumbers = true,
  hideHeader = false,
  onCopy,
  containerProps,
  ...rest
}: CodeDiffProps) => {
  const language = normalizeLanguage(languageProp);

  const diff = useMemo<DiffResult>(
    () =>
      mode === 'unified'
        ? { mode: 'unified', ...toUnified(before, after) }
        : { mode: 'split', ...toSplit(before, after) },
    [mode, before, after]
  );

  const { meta: containerMeta, ...containerPropsRest } = containerProps ?? {};
  const { meta: restMeta, ...restWithoutMeta } = rest;

  const buildMeta = (
    extra: Partial<CodeBlockMeta>
  ): CodeBlockMeta | undefined => {
    const hasMeta =
      Boolean(containerMeta) ||
      Boolean(restMeta) ||
      Object.keys(extra).length > 0;
    if (!hasMeta) return undefined;
    return {
      ...containerMeta,
      ...restMeta,
      showLineNumbers,
      ...extra,
    };
  };

  return (
    <Box
      className="ml-code-diff"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="md"
      overflow="hidden"
      role="group"
      aria-label="Code diff"
    >
      {!hideHeader && (
        <CodeDiffHeader
          filename={filename}
          language={language}
          showStats={showStats}
          addedCount={diff.addedCount}
          removedCount={diff.removedCount}
          afterCode={after}
          onCopy={onCopy}
        />
      )}
      <ChakraCodeBlock.AdapterProvider value={shikiAdapter}>
        {diff.mode === 'unified' && (
          <ChakraCodeBlock.Root
            code={diff.code}
            language={language}
            textStyle="Body"
            borderRadius="none"
            borderWidth={0}
            {...containerPropsRest}
            {...restWithoutMeta}
            meta={buildMeta({
              addedLineNumbers: diff.addedLineNumbers,
              removedLineNumbers: diff.removedLineNumbers,
            })}
          >
            <ChakraCodeBlock.Content>
              <ChakraCodeBlock.Code>
                <ChakraCodeBlock.CodeText />
              </ChakraCodeBlock.Code>
            </ChakraCodeBlock.Content>
          </ChakraCodeBlock.Root>
        )}
        {diff.mode === 'split' && (
          // `containerProps` is intentionally applied to both panes so the
          // consumer's overrides (e.g. background, size) stay symmetric.
          <Grid templateColumns="1fr 1fr" gap={0}>
            <Box
              borderRightWidth="1px"
              borderColor="gray.300"
              overflow="hidden"
              aria-label="Before"
            >
              <ChakraCodeBlock.Root
                code={diff.leftCode}
                language={language}
                textStyle="Body"
                borderRadius="none"
                borderWidth={0}
                {...containerPropsRest}
                {...restWithoutMeta}
                meta={buildMeta({
                  removedLineNumbers: diff.leftRemovedLineNumbers,
                })}
              >
                <ChakraCodeBlock.Content>
                  <ChakraCodeBlock.Code>
                    <ChakraCodeBlock.CodeText />
                  </ChakraCodeBlock.Code>
                </ChakraCodeBlock.Content>
              </ChakraCodeBlock.Root>
            </Box>
            <Box overflow="hidden" aria-label="After">
              <ChakraCodeBlock.Root
                code={diff.rightCode}
                language={language}
                textStyle="Body"
                borderRadius="none"
                borderWidth={0}
                {...containerPropsRest}
                {...restWithoutMeta}
                meta={buildMeta({
                  addedLineNumbers: diff.rightAddedLineNumbers,
                })}
              >
                <ChakraCodeBlock.Content>
                  <ChakraCodeBlock.Code>
                    <ChakraCodeBlock.CodeText />
                  </ChakraCodeBlock.Code>
                </ChakraCodeBlock.Content>
              </ChakraCodeBlock.Root>
            </Box>
          </Grid>
        )}
      </ChakraCodeBlock.AdapterProvider>
    </Box>
  );
};

CodeDiff.displayName = 'CodeDiff';
