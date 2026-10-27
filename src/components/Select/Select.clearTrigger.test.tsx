import { ChakraProvider, createListCollection } from '@chakra-ui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { Select } from './Select';

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
  ],
});

const renderClearable = (
  clearTrigger: React.ReactNode,
  onValueChange = vi.fn(),
  defaultValue = ['react']
) =>
  render(
    <ChakraProvider value={system}>
      <Select.Root
        collection={collection}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText />
          </Select.Trigger>
          <Select.IndicatorGroup>
            {clearTrigger}
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
      </Select.Root>
    </ChakraProvider>
  );

describe('Select.ClearTrigger', () => {
  it('names itself in the library language instead of "Clear value"', () => {
    renderClearable(<Select.ClearTrigger />);

    const button = screen.getByRole('button', { name: '선택 지우기' });
    expect(button.querySelector('svg')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Clear value' })).toBeNull();
  });

  it("keeps the caller's aria-label and still clears the value", async () => {
    const onValueChange = vi.fn();
    renderClearable(
      <Select.ClearTrigger aria-label="조직 선택 지우기" />,
      onValueChange
    );

    fireEvent.click(screen.getByRole('button', { name: '조직 선택 지우기' }));

    await waitFor(() =>
      expect(onValueChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: [] })
      )
    );
  });

  it('stays hidden while nothing is selected', () => {
    renderClearable(<Select.ClearTrigger />, vi.fn(), []);

    const button = document.querySelector<HTMLElement>(
      '[data-part="clear-trigger"]'
    );
    expect(button).not.toBeNull();
    expect(button).toHaveAttribute('hidden');
    expect(getComputedStyle(button!).display).toBe('none');
  });
});
