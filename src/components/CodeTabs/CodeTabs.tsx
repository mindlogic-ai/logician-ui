import { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { Code } from '@/components/Code';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@/components/Tabs';
import { useTranslate } from '@/hooks/useTranslate';

import { FaRegCopy } from '../Icon';
import { IconButton } from '../IconButton';
import { useTabsContext } from '../Tabs/TabsContext';
import { Tooltip } from '../Tooltip';
import { CodeTabsProps } from './CodeTabs.types';

const CopyButton = ({
  onCopy,
  code,
}: Pick<CodeTabsProps, 'onCopy' | 'code'>) => {
  const translate = useTranslate();
  const [tooltipText, setTooltipText] = useState(translate('copy'));
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(
    undefined
  );
  const { selectedIndex } = useTabsContext();

  const handleCopyClick = async () => {
    const codeToCopy = code[Object.keys(code)[selectedIndex]];

    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(codeToCopy || '');
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = codeToCopy || '';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    // Call onCopy callback if provided
    onCopy?.(codeToCopy);

    // Show "Copied!" tooltip
    setTooltipText(translate('copied'));
    setIsTooltipOpen(true);

    setTimeout(() => {
      setTooltipText(translate('copy'));
      setIsTooltipOpen(undefined);
    }, 1500);
  };

  return (
    <Tooltip content={tooltipText} placement="top" open={isTooltipOpen}>
      <IconButton
        aria-label="Copy"
        borderRadius="full"
        size="sm"
        colorPalette="neutral"
        variant="ghost"
        color="gray.800"
        _hover={{
          bgColor: 'whiteAlpha.400',
        }}
        _active={{
          bgColor: 'whiteAlpha.400',
        }}
        onClick={handleCopyClick}
      >
        <FaRegCopy boxSize="xs" />
      </IconButton>
    </Tooltip>
  );
};

export const CodeTabs = ({ code, onCopy, ...rest }: CodeTabsProps) => {
  // Extract languages from code samples
  const languages = Object.keys(code);

  if (languages.length === 0) {
    return null;
  }

  return (
    <Tabs bgColor="gray.1500" borderRadius="md" {...rest}>
      <TabList px={2} alignItems="center">
        <Flex w="100%" flex={1}>
          {languages.map((language) => (
            <Tab
              key={`${language}-tab`}
              bg="none"
              px={3}
              py={1}
              m={2}
              borderRadius="full"
              textTransform="uppercase"
              fontWeight="bold"
              _selected={{ color: 'white' }}
              _hover={{
                bgColor: 'whiteAlpha.500',
              }}
            >
              {language}
            </Tab>
          ))}
        </Flex>
        {onCopy && <CopyButton onCopy={onCopy} code={code} />}
      </TabList>
      <TabPanels>
        {languages.map((language) => (
          <TabPanel key={`${language}-tab-panel`}>
            <Code
              language={language}
              hideHeader
              containerProps={{
                borderWidth: 0,
                borderBottomRadius: 'md',
                overflow: 'hidden',
              }}
            >
              {code[language]?.trim() || ''}
            </Code>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
