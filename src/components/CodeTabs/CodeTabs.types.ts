import { ComponentProps } from 'react';
import { Tabs } from '@chakra-ui/react';

export interface CodeTabsProps
  extends Omit<ComponentProps<typeof Tabs.Root>, 'children' | 'onCopy'> {
  /**
   * Code samples to display in tabs
   * Each language contains code samples for different providers
   */
  code: {
    [language: string]: string;
  };

  /**
   * Callback for when the copy button is clicked
   * The function will receive the selected code sample
   */
  onCopy?: (code: string) => void;
}
