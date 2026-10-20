import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Code } from '@/components/Code';
import { Tab, TabList, Tabs } from '@/components/Tabs';

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
      // Fixed dark chrome to match the Shiki `github-dark` code theme below it
      // (Code.tsx), which doesn't flip with the app's mode either. `bg.inverse`
      // is the token built for exactly this — a surface that stays visually
      // distinct from the page in both light and dark — rather than the
      // removed `gray.1500` raw primitive.
      bgColor="bg.inverse"
      borderRadius="md"
      value={selectedValue}
      onValueChange={(details) => setSelectedValue(details.value)}
      {...rest}
    >
      <TabList px={2} alignItems="center">
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
              _selected={{ color: 'fg.inverse' }}
              _hover={{
                bgColor: 'whiteAlpha.500',
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
