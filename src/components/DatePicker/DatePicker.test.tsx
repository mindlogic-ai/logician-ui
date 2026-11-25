import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LanguageContext } from '@/hooks/useLanguage';

import { system } from '../../theme';
import { controlSizes } from '../../theme/controlSizes';
import { RangeDatePicker, SingleDatePicker } from '.';
import { toFieldTriggerSize } from './DatePicker.trigger';

const noop = () => {};

const wrap = (ui: React.ReactNode, language: 'ko' | 'en' = 'ko') =>
  render(
    <ChakraProvider value={system}>
      <LanguageContext.Provider value={{ language }}>
        {ui}
      </LanguageContext.Provider>
    </ChakraProvider>
  );

/** Every rule emotion emitted for `el`'s own class (see FieldTrigger.test). */
const declarations = (el: Element) => {
  const cls = [...el.classList].find((c) => c.startsWith('css-'));
  return [...document.querySelectorAll('style')]
    .flatMap((s) => (s.textContent ?? '').split('\n'))
    .filter((line) => line.includes(`.${cls}{`))
    .join('');
};

const OCT_1 = new Date(2026, 9, 1);
const OCT_22 = new Date(2026, 9, 22);

describe('SingleDatePicker trigger', () => {
  it('is a FieldTrigger: placeholder while empty, calendar in the indicator slot', () => {
    wrap(<SingleDatePicker onDateChange={noop} />);
    const button = screen.getByRole('button', { name: '날짜 선택' });
    expect(button).toHaveAttribute('data-placeholder-shown');
    expect(declarations(button)).toContain(
      'border-color:var(--chakra-colors-border-control)'
    );
    const indicator = button.querySelector('[data-part="indicator"]');
    expect(indicator).toHaveAttribute('aria-hidden', 'true');
    // One cue: the calendar replaces the chevron, nothing leads the value.
    expect(button.querySelectorAll('svg')).toHaveLength(1);
    expect(indicator?.querySelector('svg')).not.toBeNull();
  });

  it('follows the provider language for the default placeholder', () => {
    wrap(<SingleDatePicker onDateChange={noop} />, 'en');
    expect(
      screen.getByRole('button', { name: 'Select date' })
    ).toBeInTheDocument();
  });

  it('shows the controlled date and keeps the placeholder in the name', () => {
    const { rerender } = wrap(
      <SingleDatePicker date={OCT_1} onDateChange={noop} placeholder="만료일" />
    );
    const button = screen.getByRole('button', {
      name: '만료일: 2026년 10월 01일',
    });
    expect(button).not.toHaveAttribute('data-placeholder-shown');
    rerender(
      <ChakraProvider value={system}>
        <LanguageContext.Provider value={{ language: 'ko' }}>
          <SingleDatePicker
            date={undefined}
            onDateChange={noop}
            placeholder="만료일"
          />
        </LanguageContext.Provider>
      </ChakraProvider>
    );
    expect(screen.getByRole('button', { name: '만료일' })).toHaveAttribute(
      'data-placeholder-shown'
    );
  });

  it('passes triggerBtnProps through: aria-label, width, size', () => {
    wrap(
      <SingleDatePicker
        date={OCT_1}
        onDateChange={noop}
        propsConfigs={{
          triggerBtnProps: { 'aria-label': '만료일, 10월 1일', w: '240px' },
        }}
      />
    );
    const button = screen.getByRole('button', { name: '만료일, 10월 1일' });
    expect(declarations(button)).toContain('width:240px');
  });

  it('opens the calendar through Popover.Trigger', async () => {
    wrap(<SingleDatePicker date={OCT_1} onDateChange={noop} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    fireEvent.click(button);
    await waitFor(() =>
      expect(button).toHaveAttribute('aria-expanded', 'true')
    );
  });

  it('a disabled picker disables its trigger', () => {
    wrap(<SingleDatePicker onDateChange={noop} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('RangeDatePicker trigger', () => {
  it('reads "기간 선택" while empty', () => {
    wrap(<RangeDatePicker selectedDates={[]} onDateChange={noop} />);
    expect(screen.getByRole('button', { name: '기간 선택' })).toHaveAttribute(
      'data-placeholder-shown'
    );
  });

  it('shows the picked range, and the open end while only the start is picked', () => {
    const { rerender } = wrap(
      <RangeDatePicker selectedDates={[OCT_1, OCT_22]} onDateChange={noop} />
    );
    expect(
      screen.getByRole('button', {
        name: '기간 선택: 2026년 10월 01일 - 2026년 10월 22일',
      })
    ).toBeInTheDocument();
    rerender(
      <ChakraProvider value={system}>
        <LanguageContext.Provider value={{ language: 'ko' }}>
          <RangeDatePicker selectedDates={[OCT_1]} onDateChange={noop} />
        </LanguageContext.Provider>
      </ChakraProvider>
    );
    expect(screen.getByRole('button')).toHaveTextContent('2026년 10월 01일 -');
  });

  it.each(['xs', 'sm', 'md', 'lg'] as const)(
    'size %s takes the Select height of that size',
    (size) => {
      wrap(
        <RangeDatePicker selectedDates={[]} onDateChange={noop} size={size} />
      );
      expect(declarations(screen.getByRole('button'))).toContain(
        `--select-trigger-height:var(--chakra-sizes-${controlSizes[size].height})`
      );
    }
  );
});

describe('toFieldTriggerSize', () => {
  it('maps the control scale onto the four field sizes', () => {
    expect(toFieldTriggerSize(undefined)).toBe('md');
    expect(toFieldTriggerSize('2xs')).toBe('xs');
    expect(toFieldTriggerSize('xs')).toBe('xs');
    expect(toFieldTriggerSize('xl')).toBe('lg');
  });
});
