import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Code } from '@/components/Code';
import { Tab, TabList, Tabs } from '@/components/Tabs';

import { CODE_CHROME } from './CodeTabs.styles';
import { CodeTabsProps } from './CodeTabs.types';
import { CopyButton } from './CopyButton';

export const CodeTabs = ({ code, onCopy, ...rest }: CodeTabsProps) => {
  const languages = Object.keys(code);
  const [selectedValue, setSelectedValue] = useState(languages[0] || '');

  if (languages.length === 0) {
    return null;
  }

  const currentCode = code[selectedValue]?.trim() || '';

  return (
    <Tabs
      // Fixed dark chrome in both modes — see `CODE_CHROME`.
      bgColor={CODE_CHROME.bg}
      borderRadius="md"
      value={selectedValue}
      onValueChange={(details) => setSelectedValue(details.value)}
      {...rest}
    >
      <TabList px={2} alignItems="center" borderColor={CODE_CHROME.divider}>
        <Flex w="100%" flex={1}>
          {languages.map((language) => (
            <Tab
              key={`${language}-tab`}
              value={language}
              bg="none"
              px={3}
              py={1}
              m={2}
              borderRadius="full"
              textTransform="uppercase"
              fontWeight="bold"
              textStyle="subtext"
              color={CODE_CHROME.fgMuted}
              _selected={{ color: CODE_CHROME.fg }}
              _hover={{
                bgColor: CODE_CHROME.bgHover,
                color: CODE_CHROME.fg,
              }}
            >
              {language}
            </Tab>
          ))}
        </Flex>
        {onCopy && <CopyButton onCopy={onCopy} code={currentCode} />}
      </TabList>
      <Box display="grid">
        {languages.map((language) => {
          const isSelected = language === selectedValue;
          return (
            <Code
              key={`${language}-panel`}
              language={language}
              hideHeader
              aria-hidden={!isSelected}
              containerProps={{
                // The body sits on the same fixed-dark surface: Chakra's Shiki
                // adapter strips the `<pre>` that carries github-dark's own
                // background, so the block would otherwise paint `bg`
                // (= `bg.canvas`, white in light mode) under light token colours.
                bg: CODE_CHROME.bg,
                // Before Shiki loads, the text is plain `color`.
                color: CODE_CHROME.fg,
                borderColor: CODE_CHROME.bg,
                borderRadius: 'none',
                borderBottomRadius: 'md',
                gridArea: '1 / 1',
                visibility: isSelected ? 'visible' : 'hidden',
              }}
            >
              {code[language]?.trim() || ''}
            </Code>
          );
        })}
      </Box>
    </Tabs>
  );
};
