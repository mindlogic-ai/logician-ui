import { useMemo } from 'react';
import { createListCollection, Portal } from '@chakra-ui/react';

import { Select } from './Select';
import { SelectFieldProps } from './Select.types';

/**
 * Single-select dropdown with the Logician design-system styling applied.
 * The ergonomic counterpart to `Input` — pass `options`, `value` and
 * `onChange` and it renders the full Select composition internally.
 *
 * For multi-select, grouped options or custom layouts, compose the `Select`
 * primitives directly.
 */
export function SelectField<T = string>({
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
}: SelectFieldProps<T>) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToValue: (item) => String(item.value),
        itemToString: (item) => item.label,
        isItemDisabled: (item) => Boolean(item.disabled),
      }),
    [options]
  );

  const toKeys = (val: T | null | undefined) =>
    val === null || val === undefined ? [] : [String(val)];

  return (
    <Select.Root
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
    >
      <Select.HiddenSelect />
      {label != null && <Select.Label>{label}</Select.Label>}
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {options.map((option) => (
              <Select.Item item={option} key={String(option.value)}>
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
