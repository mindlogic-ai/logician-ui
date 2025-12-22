import { Tabs } from '@chakra-ui/react';

type ChakraTabsRootProps = React.ComponentProps<typeof Tabs.Root>;
type ChakraTabsTriggerProps = React.ComponentProps<typeof Tabs.Trigger>;

export type TabsProps = ChakraTabsRootProps & {
  /**
   * If provided, the selected tab will be synced with the provided url param
   */
  urlParam?: string;
  /**
   * For backwards compatibility - controlled tab index
   */
  index?: number;
  /**
   * For backwards compatibility - tab change callback
   */
  onChange?: (index: number) => void;
};

export type TabProps = ChakraTabsTriggerProps & {
  /**
   * The name of the tab
   * @default `tab-${index}`
   */
  name?: string;
};
