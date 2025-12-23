import { ComponentProps } from 'react';
import { Tabs as ChakraTabs, ButtonProps } from '@chakra-ui/react';

export type TabsProps = ComponentProps<typeof ChakraTabs.Root> & {
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
  /**
   * The content of the tab
   */
  children?: React.ReactNode;
};
