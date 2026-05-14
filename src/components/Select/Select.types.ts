import { GroupBase, Props } from 'react-select';

export type SelectVariant = 'default' | 'danger';

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
  variant?: SelectVariant;
  invalid?: boolean;
  /**
   * Matches Chakra `Input`/`Textarea` recipe sizes so the three controls
   * share the same height, padding and font progression when placed
   * side by side. Defaults to `md`.
   */
  size?: SelectSize;
};

export type SelectOption<T> = {
  label: string;
  value: T;
};
