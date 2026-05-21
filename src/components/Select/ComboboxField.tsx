import { Portal, useFilter, useListCollection } from '@chakra-ui/react';

import { Combobox } from './Combobox';
import { ComboboxFieldProps, SelectOption } from './Select.types';

/**
 * Single-select combobox — a Select with a typeable, filterable input.
 * The ergonomic counterpart to `Input` for searchable option lists; pass
 * `options`, `value` and `onChange` and it renders the full composition
 * internally.
 *
 * For grouped options or custom layouts, compose the `Combobox` primitives
 * directly.
 */
export function ComboboxField<T = string>({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  label,
  size = 'md',
  invalid,
  disabled,
  readOnly,
  required,
  name,
  width = 'full',
  emptyText = 'No results found',
}: ComboboxFieldProps<T>) {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection<SelectOption<T>>({
    initialItems: options,
    filter: contains,
    itemToValue: (item) => String(item.value),
    itemToString: (item) => item.label,
    isItemDisabled: (item) => Boolean(item.disabled),
  });

  const toKeys = (val: T | null | undefined) =>
    val === null || val === undefined ? [] : [String(val)];

  return (
    <Combobox.Root
      collection={collection}
      size={size}
      width={width}
      invalid={invalid}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      value={value === undefined ? undefined : toKeys(value)}
      defaultValue={
        defaultValue === undefined ? undefined : toKeys(defaultValue)
      }
      onValueChange={(details) => {
        const selected = details.items[0];
        onChange?.(selected ? selected.value : null);
      }}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      {label != null && <Combobox.Label>{label}</Combobox.Label>}
      <Combobox.Control>
        <Combobox.Input placeholder={placeholder} />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>{emptyText}</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={String(item.value)}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}
