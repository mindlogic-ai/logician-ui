import { GroupBase, Props } from 'react-select';

export type SelectVariant = 'default' | 'danger';

export type SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
  variant?: SelectVariant;
  invalid?: boolean;
};

export type SelectOption<T> = {
  label: string;
  value: T;
};
