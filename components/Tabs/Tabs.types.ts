import {
  TabProps as ChakraTabProps,
  TabsProps as ChakraTabsProps,
} from '@chakra-ui/react';

export type TabsProps = ChakraTabsProps & {
  /**
   * If provided, the selected tab will be synced with the provided url param
   */
  urlParam?: string;
};

export type TabProps = ChakraTabProps & {
  /**
   * The name of the tab
   * @default `tab-${index}`
   */
  name?: string;
};
