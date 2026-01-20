import {
  ButtonProps,
  TabsRootProps as ChakraTabsRootProps,
} from '@chakra-ui/react';

export type TabsProps = Omit<ChakraTabsRootProps, 'onChange' | 'index'> & {
  /**
   * If provided, the selected tab will be synced with the provided url param
   */
  urlParam?: string;
  /**
   * The index of the selected tab
   */
  index?: number;
  /**
   * Callback when tab changes
   */
  onChange?: (index: number) => void;
};

export type TabProps = ButtonProps & {
  /**
   * The name of the tab
   * @default `tab-${index}`
   */
  name?: string;
};
