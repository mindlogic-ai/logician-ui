import { TabList as ChakraTabList, TabListProps } from "@chakra-ui/react";

import { useTabsContext } from "@/components/Tabs/TabsContext";

import { tabListStyles, verticalStyles } from "./TabList.styles";

export const TabList = (props: TabListProps) => {
  const { orientation } = useTabsContext();
  return (
    <ChakraTabList
      width="100%"
      borderBottom="1px solid"
      borderColor="gray.100"
      {...tabListStyles}
      {...(orientation === "vertical" && verticalStyles)}
      {...props}
    />
  );
};
