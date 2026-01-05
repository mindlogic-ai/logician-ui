import { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { BoxProps } from '@chakra-ui/react';

/**
 * Code component props
 */
export interface CodeProps extends Omit<
  SyntaxHighlighterProps,
  'style' | 'customStyle'
> {
  children: string;
  /**
   * Callback for when the copy button is clicked. No copy button is rendered if this prop is not provided.
   * The user is expected to handle the copying behavior.
   *
   * @param str The copied text
   */
  onCopy?: (str: string) => void;

  language?: string;

  // Style object from react-syntax-highlighter
  style?: { [key: string]: React.CSSProperties };

  // Custom style object for the syntax highlighter
  customStyle?: React.CSSProperties;

  containerProps?: BoxProps;

  /**
   * Threshold in pixels for when the header should become sticky.
   * This is typically the height of any fixed header above this component.
   * @default 48
   */
  stickyHeaderThreshold?: number;

  /**
   * Whether to hide the header of the code block.
   * @default false
   */
  hideHeader?: boolean;
}
