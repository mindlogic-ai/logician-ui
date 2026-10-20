import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { Badge } from '../Badge';
import { Chip } from '../Chip';
import { Tag } from './Tag';
import { getTagStyles, mapLegacyTagProps } from './Tag.styles';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

afterEach(() => vi.restoreAllMocks());

describe('Tag 5.0 API', () => {
  it('resolves tone / selected / category styles', () => {
    expect(getTagStyles()).toMatchObject({
      bgColor: 'secondary.surface',
      color: 'fg.default',
    });
    expect(getTagStyles({ tone: 'danger' })).toMatchObject({
      bgColor: 'danger.bg',
      color: 'danger.fg',
    });
    expect(getTagStyles({ tone: 'info', selected: true })).toMatchObject({
      bgColor: 'primary.main',
      color: 'fg.onPrimary',
    });
    expect(getTagStyles({ category: 'blue' })).toMatchObject({
      bgColor: 'category.blue.surface',
      color: 'fg.default',
    });
  });

  it('only interactive tags get the hover border', () => {
    expect(getTagStyles()._hover).toBeUndefined();
    expect(getTagStyles({ interactive: true })._hover).toEqual({
      borderColor: 'secondary.border',
    });
  });

  it('maps 4.x colorPalette × variant', () => {
    // Full table: Tag.legacy.test.tsx.
    expect(mapLegacyTagProps('primary', 'solid')).toMatchObject({
      tone: 'neutral',
      selected: true,
    });
    expect(mapLegacyTagProps('danger', 'soft')).toMatchObject({
      tone: 'danger',
    });
    expect(mapLegacyTagProps('success', 'outline')).toMatchObject({
      tone: 'neutral',
    });
    expect(mapLegacyTagProps('secondary', 'soft')).toMatchObject({
      tone: 'neutral',
    });
  });

  it('a toggle rendered as a button exposes aria-pressed', () => {
    wrap(
      <Tag as="button" selected onClick={() => {}}>
        Images
      </Tag>
    );
    const button = screen.getByRole('button', { name: 'Images' });
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('disabled button tag is natively disabled', () => {
    wrap(
      <Tag as="button" disabled onClick={() => {}}>
        Off
      </Tag>
    );
    expect(
      (screen.getByRole('button', { name: 'Off' }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });

  it('renders the leading icon', () => {
    wrap(
      <Tag category="purple" icon={<span data-testid="mark">#</span>}>
        research
      </Tag>
    );
    expect(screen.getByTestId('mark')).toBeTruthy();
    expect(screen.getByText('research')).toBeTruthy();
  });
});

describe('deprecated aliases', () => {
  it('Chip still renders (as a Tag) and warns', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    wrap(
      <Chip colorScheme="danger" variant="soft">
        Error
      </Chip>
    );
    expect(screen.getByText('Error')).toBeTruthy();
    expect(warn.mock.calls.some(([m]) => String(m).includes('<Chip>'))).toBe(
      true
    );
  });

  it('Badge maps a removed variant to neutral', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // @ts-expect-error — `primary` was removed from BadgeVariant in 5.0
    wrap(<Badge variant="primary">Old</Badge>);
    expect(screen.getByText('Old')).toBeTruthy();
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
