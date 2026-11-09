import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { Badge } from '../Badge';
import { Chip } from '../Chip';
import { Tag } from './Tag';
import {
  getTagSizeStyles,
  getTagStyles,
  mapLegacyTagProps,
} from './Tag.styles';
import { TagLabel } from './TagLabel';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

afterEach(() => vi.restoreAllMocks());

describe('Tag 5.0 API', () => {
  it('resolves tone / selected / category styles', () => {
    expect(getTagStyles()).toMatchObject({
      bgColor: 'bg.muted',
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

describe('Tag size', () => {
  it('resolves a responsive size per breakpoint on an interactive tag', () => {
    const { sizeStyles, cssVars, recipeSize } = getTagSizeStyles(
      { base: 'xs', md: 'lg' },
      true
    );
    expect(sizeStyles).toMatchObject({
      h: { base: '8', md: '11' },
      minH: { base: '8', md: '11' },
      px: { base: '2.5', md: '5' },
      gap: { base: '1', md: '3' },
      textStyle: { base: 'xs', md: 'md' },
    });
    expect(cssVars?.['--tag-element-size']).toEqual({
      base: 'var(--chakra-sizes-4)',
      md: 'var(--chakra-sizes-5)',
    });
    // `xs` is not a badge recipe size.
    expect(recipeSize).toEqual({ base: 'sm', md: 'lg' });
  });

  it('keeps array slots and starts a base-less value at md', () => {
    expect(getTagSizeStyles(['sm', null, 'lg'], true).sizeStyles.h).toEqual([
      '9',
      null,
      '11',
    ]);
    expect(getTagSizeStyles([null, 'xs'], true).sizeStyles.h).toEqual([
      '10',
      '8',
    ]);
    expect(getTagSizeStyles({ lg: 'xs' }, true).sizeStyles.h).toEqual({
      base: '10',
      lg: '8',
    });
  });

  it('leaves a responsive static badge on the recipe', () => {
    const { sizeStyles, recipeSize, cssVars } = getTagSizeStyles(
      { base: 'xs', md: 'lg' },
      false
    );
    expect(sizeStyles).toEqual({ fontSize: 'sm' });
    expect(recipeSize).toEqual({ base: 'sm', md: 'lg' });
    expect(cssVars).toBeUndefined();
  });

  it('a TagLabel inside an interactive tag inherits the control type', () => {
    const { cssVars } = getTagSizeStyles('md', true);
    expect(cssVars?.['& .chakra-tag__label']).toEqual({
      fontSize: 'inherit',
      lineHeight: 'inherit',
    });
    wrap(
      <Tag as="button" selected={false} size={{ base: 'sm', md: 'lg' }}>
        <TagLabel>Images</TagLabel>
      </Tag>
    );
    const label = screen.getByText('Images');
    expect(label.className).toContain('chakra-tag__label');
    const css = Array.from(document.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('\n');
    expect(css).toMatch(/\.chakra-tag__label\s*\{[^}]*font-size:\s*inherit/);
  });

  it('accepts responsive sizes on Tag and the Chip alias (type-level)', () => {
    wrap(
      <>
        <Tag size={{ base: 'sm', md: 'lg' }}>Static</Tag>
        <Tag size={['xs', 'md']} onClick={() => {}}>
          Clickable
        </Tag>
        <Chip size={{ base: 'sm', lg: 'md' }}>Chip</Chip>
      </>
    );
    expect(screen.getByText('Static')).toBeTruthy();
    expect(screen.getByText('Chip')).toBeTruthy();
  });
});
