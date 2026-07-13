import { ReactNode } from 'react';
import { BoxProps } from '@chakra-ui/react';

export interface FormSectionProps extends Omit<BoxProps, 'title'> {
  /** Section heading. */
  title?: string;
  /**
   * Inline element rendered immediately after the heading (e.g. an
   * `InfoSprinkle`). Flat variant only — the collapsible variant owns its own
   * header. Distinct from `action`, which sits at the far right.
   */
  titleAdornment?: ReactNode;
  /** Secondary description under the heading. */
  description?: ReactNode;
  /** Right-aligned header slot (e.g. an add button or info-sprinkle trigger). */
  action?: ReactNode;
  /** Draw a top divider to separate this section from the previous one. */
  divider?: boolean;
  /**
   * Render as a collapsible accordion (delegates to logician `CollapsibleSection`).
   * Requires `title`.
   */
  collapsible?: boolean;
  /** Initial expanded state when `collapsible`. Defaults to open. */
  defaultOpen?: boolean;
  /**
   * Flag a section that contains errors. When `collapsible` and collapsed, the
   * chevron is replaced by a danger glyph so hidden errors aren't missed.
   */
  hasError?: boolean;
  /** Vertical gap between child fields. Defaults to the standard field rhythm. */
  gap?: BoxProps['gap'];
  children: ReactNode;
}
