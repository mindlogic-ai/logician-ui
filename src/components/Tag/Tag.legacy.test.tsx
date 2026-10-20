import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { Chip } from '../Chip';
import { Tag } from './Tag';
import { __resetLegacyTagWarnings, mapLegacyTagProps } from './Tag.styles';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

const asAny = (props: Record<string, unknown>) => props as never;

describe('mapLegacyTagProps (4.x → 5.0 table)', () => {
  it.each([
    // palette, variant, tone, selected, needsHuman
    ['primary', 'soft', 'neutral', undefined, false],
    ['secondary', 'soft', 'neutral', undefined, false],
    ['neutral', 'soft', 'neutral', undefined, false],
    ['primary', 'solid', 'neutral', true, false],
    ['secondary', 'solid', 'neutral', true, false],
    ['neutral', 'solid', 'neutral', true, false],
    ['primary', 'outline', 'neutral', undefined, false],
    ['secondary', 'outline', 'neutral', undefined, false],
    ['neutral', 'outline', 'neutral', undefined, false],
    ['danger', 'soft', 'danger', undefined, false],
    ['success', 'soft', 'success', undefined, false],
    ['warning', 'soft', 'warning', undefined, false],
    ['danger', 'solid', 'danger', undefined, true],
    ['success', 'solid', 'success', undefined, true],
    ['warning', 'solid', 'warning', undefined, true],
    ['danger', 'outline', 'neutral', undefined, true],
    ['success', 'outline', 'neutral', undefined, true],
    ['warning', 'outline', 'neutral', undefined, true],
    // 4.x Tag defaults: neutral / soft
    [undefined, undefined, 'neutral', undefined, false],
    [undefined, 'solid', 'neutral', true, false],
    ['danger', undefined, 'danger', undefined, false],
    // unknown values
    ['purple', 'soft', 'neutral', undefined, true],
    ['primary', 'surface', 'neutral', undefined, true],
  ] as const)(
    '%s × %s → tone %s, selected %s, needsHuman %s',
    (palette, variant, tone, selected, needsHuman) => {
      const r = mapLegacyTagProps(palette, variant);
      expect(r.tone).toBe(tone);
      expect(r.selected).toBe(selected);
      expect(r.needsHuman).toBe(needsHuman);
    }
  );

  it('neutral·secondary solid is distinct from soft (4.x selected toggles)', () => {
    // `<Chip colorScheme={on ? 'primary' : 'neutral'} variant="solid">` and
    // `<Chip variant={on ? 'solid' : 'soft'}>` both have to keep two looks.
    for (const palette of ['neutral', 'secondary'] as const) {
      expect(mapLegacyTagProps(palette, 'solid')).not.toEqual(
        mapLegacyTagProps(palette, 'soft')
      );
    }
  });
});

describe('legacy Tag / Chip rendering and warnings', () => {
  let warn: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    __resetLegacyTagWarnings();
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it('a solid neutral Chip renders selected, a soft one does not', () => {
    wrap(
      <>
        <Chip colorScheme="neutral" variant="solid" data-testid="on">
          on
        </Chip>
        <Chip colorScheme="neutral" variant="soft" data-testid="off">
          off
        </Chip>
      </>
    );
    expect(screen.getByTestId('on').hasAttribute('data-selected')).toBe(true);
    expect(screen.getByTestId('off').hasAttribute('data-selected')).toBe(false);
  });

  it('a mapped selected is a look only, not a toggle', () => {
    wrap(
      <Chip as="button" colorScheme="primary" variant="solid">
        x
      </Chip>
    );
    const button = screen.getByRole('button');
    expect(button.hasAttribute('data-selected')).toBe(true);
    expect(button.getAttribute('aria-pressed')).toBeNull();
  });

  it('warns once per (palette, variant), naming the combination', () => {
    wrap(
      <>
        <Tag {...asAny({ colorPalette: 'danger', variant: 'solid' })}>a</Tag>
        <Tag {...asAny({ colorPalette: 'danger', variant: 'solid' })}>b</Tag>
        <Tag {...asAny({ colorPalette: 'success', variant: 'soft' })}>c</Tag>
      </>
    );
    expect(warn).toHaveBeenCalledTimes(2);
    const [first, second] = warn.mock.calls.map((c) => String(c[0]));
    expect(first).toContain('colorPalette="danger" variant="solid"');
    expect(first).toContain('<Tag tone="danger">');
    expect(first).toContain('by hand');
    expect(second).toContain('colorPalette="success" variant="soft"');
    expect(second).not.toContain('by hand');
  });

  it('Chip warns per colorScheme × variant with its own name', () => {
    wrap(
      <>
        <Chip>a</Chip>
        <Chip>b</Chip>
        <Chip colorScheme="neutral" variant="solid">
          c
        </Chip>
      </>
    );
    expect(warn).toHaveBeenCalledTimes(2);
    const [first, second] = warn.mock.calls.map((c) => String(c[0]));
    expect(first).toContain('<Chip> is deprecated');
    expect(first).toContain('colorScheme="primary" variant="soft"');
    expect(second).toContain('colorScheme="neutral" variant="solid"');
    expect(second).toContain('<Tag selected>');
  });

  it('does not forward the internal Chip flag to the DOM', () => {
    wrap(<Chip data-testid="c">c</Chip>);
    expect(screen.getByTestId('c').outerHTML.toLowerCase()).not.toContain(
      'legacycomponent'
    );
  });
});

describe('disabled interactive Tag without a native disabled', () => {
  it('a disabled link tag is aria-disabled and out of the tab order', () => {
    wrap(
      <Tag as="a" href="/x" disabled>
        Docs
      </Tag>
    );
    const link = screen.getByText('Docs').closest('a')!;
    expect(link.getAttribute('aria-disabled')).toBe('true');
    expect(link.getAttribute('tabindex')).toBe('-1');
  });

  it('a disabled clickable span tag is aria-disabled and not tabbable', () => {
    wrap(
      <Tag disabled onClick={() => {}} tabIndex={0} data-testid="t">
        x
      </Tag>
    );
    const tag = screen.getByTestId('t');
    expect(tag.getAttribute('aria-disabled')).toBe('true');
    expect(tag.getAttribute('tabindex')).toBe('-1');
  });

  it('an enabled link tag and a plain disabled tag are untouched', () => {
    wrap(
      <>
        <Tag as="a" href="/x" data-testid="a">
          a
        </Tag>
        <Tag disabled data-testid="p">
          p
        </Tag>
      </>
    );
    expect(screen.getByTestId('a').getAttribute('aria-disabled')).toBeNull();
    expect(screen.getByTestId('a').getAttribute('tabindex')).toBeNull();
    expect(screen.getByTestId('p').getAttribute('aria-disabled')).toBeNull();
  });
});
