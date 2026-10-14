import { ReactNode } from 'react';
import { FlexProps } from '@chakra-ui/react';

export interface FormSectionHeaderProps extends Omit<FlexProps, 'title'> {
  /** Section heading — the fieldset-level label. */
  title?: ReactNode;
  /**
   * Inline element rendered immediately after the title text (e.g. an
   * `InfoSprinkle`). Distinct from `action`, which sits at the far right of
   * the row.
   */
  titleAdornment?: ReactNode;
  /** Secondary description under the title. */
  description?: ReactNode;
  /** Right-aligned slot on the title row (e.g. an add button). */
  action?: ReactNode;
}
