import {
  ChakraProvider,
  createListCollection,
  Popover,
} from '@chakra-ui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Select } from '../Select';
import { DatePickerTrigger, DatePickerTriggerProps } from './DatePickerTrigger';

/*
 * The trigger is tested inside a bare Chakra Popover: chakra-dayzed-datepicker
 * resolves Chakra's CJS build under vitest, a second context the test
 * ChakraProvider does not reach. SingleDatePicker / RangeDatePicker render
 * exactly this component as their Popover trigger.
 */
const Trigger = (props: Omit<DatePickerTriggerProps, 'children'>) => (
  <Popover.Root>
    <DatePickerTrigger {...props}>2026. 01. 02.</DatePickerTrigger>
  </Popover.Root>
);

const collection = createListCollection({
  items: [{ label: 'React', value: 'react' }],
});

// What jsdom resolves reliably from Chakra's emitted CSS. Height, weight and
// radius come from the same recipe call and are checked in the browser.
const STYLE_KEYS = [
  'border-color',
  'padding-left',
  'padding-right',
  'background-color',
  'color',
] as const;

const pick = (el: Element) => {
  const cs = getComputedStyle(el);
  return Object.fromEntries(STYLE_KEYS.map((k) => [k, cs.getPropertyValue(k)]));
};

describe('DatePickerTrigger', () => {
  it.each(['xs', 'sm', 'md', 'lg'] as const)(
    'size %s draws exactly like a closed Select trigger',
    (size) => {
      render(
        <ChakraProvider value={system}>
          <Select.Root collection={collection} size={size}>
            <Select.Control>
              <Select.Trigger data-testid="select-trigger">
                <Select.ValueText placeholder="Select" />
              </Select.Trigger>
            </Select.Control>
          </Select.Root>
          <Trigger size={size} />
        </ChakraProvider>
      );
      const dateTrigger = screen.getByRole('button', { name: /2026/ });
      expect(dateTrigger.tagName).toBe('BUTTON');
      expect(pick(dateTrigger)).toEqual(
        pick(screen.getByTestId('select-trigger'))
      );
    }
  );

  it('keeps triggerBtnProps: aria-label and style props reach the trigger and win', () => {
    render(
      <ChakraProvider value={system}>
        <Trigger
          size="md"
          triggerProps={{ 'aria-label': '시작일 선택', bg: 'red', size: 'sm' }}
        />
      </ChakraProvider>
    );
    const trigger = screen.getByRole('button', { name: '시작일 선택' });
    expect(getComputedStyle(trigger).backgroundColor).toBe('rgb(255, 0, 0)');
    expect(trigger.hasAttribute('size')).toBe(false);
  });

  it('opens the popover and marks itself open', async () => {
    render(
      <ChakraProvider value={system}>
        <Trigger />
      </ChakraProvider>
    );
    const trigger = screen.getByRole('button', { name: /2026/ });
    fireEvent.click(trigger);
    await waitFor(() =>
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    );
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('takes the picker disabled prop', () => {
    render(
      <ChakraProvider value={system}>
        <Trigger disabled />
      </ChakraProvider>
    );
    expect(
      (screen.getByRole('button', { name: /2026/ }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });
});
