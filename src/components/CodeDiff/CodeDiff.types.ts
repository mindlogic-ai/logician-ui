import { CodeBlockRootProps } from '@chakra-ui/react';

export type CodeDiffMode = 'unified' | 'split';

/**
 * CodeDiff component props
 */
export interface CodeDiffProps extends Omit<
  CodeBlockRootProps,
  'code' | 'children' | 'onCopy' | 'language'
> {
  /** Code before the change. */
  before: string;

  /** Code after the change. */
  after: string;

  /**
   * Language identifier for syntax highlighting (e.g. `typescript`, `json`).
   * `js` is normalized to `javascript` for consistency with the `Code` component.
   */
  language?: string;

  /**
   * Filename rendered in the header (e.g. `src/foo.ts`).
   * Omitted when not provided.
   */
  filename?: string;

  /**
   * View layout. `unified` shows additions and deletions in a single column,
   * `split` shows them side by side.
   * @default 'unified'
   */
  mode?: CodeDiffMode;

  /**
   * Show the `+N −N` stats in the header.
   * @default true
   */
  showStats?: boolean;

  /**
   * Show line numbers in code blocks. Diff context usually benefits from
   * line numbers, so the default differs from `Code`.
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * Hide the entire header (filename, stats, language, copy).
   * @default false
   */
  hideHeader?: boolean;

  /**
   * Optional callback fired after the copy action. Receives the `after` code.
   * The clipboard write happens automatically; the callback is for side
   * effects such as analytics. The copy button is always rendered when the
   * header is visible.
   */
  onCopy?: (afterCode: string) => void;

  /**
   * Additional props forwarded to the underlying `CodeBlock.Root` element(s).
   */
  containerProps?: Omit<CodeBlockRootProps, 'code' | 'language' | 'children'>;
}
