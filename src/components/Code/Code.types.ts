import { CodeBlockRootProps } from '@chakra-ui/react';

/**
 * Code component props
 */
export interface CodeProps extends Omit<
  CodeBlockRootProps,
  'code' | 'onCopy' | 'language' | 'children'
> {
  children: string;

  /**
   * Language identifier for syntax highlighting (e.g. `typescript`, `json`).
   * `js` is normalized to `javascript` for compatibility.
   */
  language?: string;

  /**
   * Callback fired after the copy action completes. When omitted, the copy
   * button is not rendered. The clipboard write is handled automatically by
   * the underlying CodeBlock; the callback receives the copied text for any
   * additional side effects (e.g. analytics).
   *
   * @param str The copied text
   */
  onCopy?: (str: string) => void;

  /**
   * Additional props forwarded to the underlying CodeBlock root element.
   */
  containerProps?: Omit<
    CodeBlockRootProps,
    'code' | 'onCopy' | 'language' | 'children'
  >;

  /**
   * Whether to hide the header of the code block.
   * @default false
   */
  hideHeader?: boolean;
}
