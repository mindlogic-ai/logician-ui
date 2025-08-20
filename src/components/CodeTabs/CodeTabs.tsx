import { useState } from "react";
import { Flex } from "@chakra-ui/react";

import { Code } from "@/components/Code";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@/components/Tabs";
import { useTranslate } from "@/hooks/useTranslate";

import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { useTabsContext } from "../Tabs/TabsContext";
import { Tooltip } from "../Tooltip";
import { CodeTabsProps } from "./CodeTabs.types";
const CopyButton = ({
  onCopy,
  code,
}: Pick<CodeTabsProps, "onCopy" | "code">) => {
  const translate = useTranslate();
  const [tooltipText, setTooltipText] = useState(translate("copy"));
  const { selectedIndex } = useTabsContext();

  const handleCopyClick = () => {
    onCopy?.(code[Object.keys(code)[selectedIndex]]);
    setTooltipText(translate("copied"));
    const t = setTimeout(() => {
      setTooltipText(translate("copy"));
    }, 1500);
    return () => clearTimeout(t);
  };

  return (
    <Tooltip label={tooltipText} placement="top">
      <IconButton
        aria-label="Copy"
        borderRadius="full"
        icon={<Icon icon="FaRegCopy" boxSize="xs" />}
        size="sm"
        _hover={{
          bgColor: "whiteAlpha.500",
        }}
        onClick={handleCopyClick}
      />
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
              color="gray.800"
              px={3}
              py={1}
              m={2}
              borderRadius="full"
              textTransform="uppercase"
              fontWeight="bold"
              _selected={{ color: "white" }}
              _hover={{
                bgColor: "whiteAlpha.500",
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
                borderBottomRadius: "md",
                overflow: "hidden",
              }}
            >
              {code[language]?.trim() || ""}
            </Code>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
