import type { ReactNode } from 'react';
import type { HTMLChakraProps } from '@chakra-ui/react';

import type { SelectSize, SelectVariant } from '../Select/Select.types';

export interface FieldTriggerProps extends Omit<
  HTMLChakraProps<'button'>,
  'children'
> {
  /**
   * What is chosen, as the field shows it — a label, a summary such as
   * `「교육」 외 2개`, or chips. Empty (`null`, `undefined`, `''`, `false`) shows
   * `placeholder` in the placeholder colour instead.
   */
  children?: ReactNode;
  /** Shown while nothing is chosen. Also the accessible name unless `aria-label` is passed. */
  placeholder?: string;
  /** Same scale as `Select`. Defaults to `md`. */
  size?: SelectSize;
  /**
   * Same as `Select`: `outline` (default) is a bordered field; `ghost` drops
   * the resting border for dense rows and sizes the field to its value.
   */
  variant?: SelectVariant;
  /** Red border, like an invalid `Select` or `Input`. */
  invalid?: boolean;
}
