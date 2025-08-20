import {
  GroupBase,
  MenuListProps as ReactSelectMenuListProps,
} from 'react-select';

export interface MenuListProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> extends ReactSelectMenuListProps<Option, IsMulti, Group> {
  onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
}

export interface VirtualizedMenuListProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> extends Omit<MenuListProps<Option, IsMulti, Group>, 'maxHeight'> {
  optionHeight?: number;
  maxHeight?: number;
}
