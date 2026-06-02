import { TabsProps } from '@/components/Tabs';

export interface CodeTabsProps extends Omit<TabsProps, 'children' | 'onCopy'> {
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
