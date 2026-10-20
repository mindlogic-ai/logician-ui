import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { IconButton } from '../IconButton';
import { getIconButtonStyles } from '../IconButton/IconButton.styles';
import { Button } from './Button';
import {
  __resetLegacyButtonWarnings,
  resolveLegacyButtonVariant,
} from './Button.legacy';
import { buttonVariantStyles, getButtonStyles } from './Button.styles';

/**
 * 5.0 API: one `variant` role, `isDestructive` for danger text, and runtime
 * mapping of the removed 4.x `colorPalette × variant` pair.
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('Button variants (5.0)', () => {
  it("defaults to 'subtle'", () => {
    wrap(<Button>A</Button>);
    expect(screen.getByRole('button').dataset.variant).toBe('subtle');
  });

  it.each(Object.keys(buttonVariantStyles))('renders %s', (variant) => {
    wrap(<Button variant={variant as never}>A</Button>);
    expect(screen.getByRole('button').dataset.variant).toBe(variant);
  });

  it('reads no raw palette scales', () => {
    const raw = JSON.stringify(buttonVariantStyles);
    expect(raw).not.toMatch(/"(blue|violet|rose|gold|green|gray)\.\d/);
  });

  it('isDestructive recolours text on secondary/ghost/subtle only', () => {
    expect(getButtonStyles('secondary', true).color).toBe('danger.fg');
    expect(getButtonStyles('ghost', true).color).toBe('danger.fg');
    expect(getButtonStyles('subtle', true).color).toBe('danger.fg');
    // border stays the variant's own
    expect(getButtonStyles('secondary', true).borderColor).toBe(
      'border.default'
    );
    expect(getButtonStyles('primary', true).color).toBe('fg.onPrimary');
    expect(getButtonStyles('danger', true).color).toBe('danger.onSolid');
  });

  it('disabled is a fixed colour pair, not opacity', () => {
    expect(buttonVariantStyles.primary._disabled).toMatchObject({
      bg: 'disabled.bg',
      color: 'disabled.fg',
      opacity: 1,
    });
    expect(buttonVariantStyles.ghost._disabled).toMatchObject({
      bg: 'transparent',
      color: 'disabled.fg',
    });
  });
});

describe('legacy 4.x props', () => {
  let warn: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    __resetLegacyButtonWarnings();
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => warn.mockRestore());

  it('danger/outline renders as secondary + destructive, and warns once', () => {
    const legacy = { colorPalette: 'danger', variant: 'outline' } as any;
    wrap(
      <>
        <Button {...legacy}>삭제</Button>
        <Button {...legacy}>삭제</Button>
      </>
    );
    const [first] = screen.getAllByRole('button');
    expect(first.dataset.variant).toBe('secondary');
    expect(first.dataset.destructive).toBe('true');
    // never forwarded to the DOM / Chakra
    expect(first.getAttribute('colorpalette')).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('maps the codemod table', () => {
    const m = (p: unknown, v: unknown, k: 'button' | 'icon' = 'button') => {
      const r = resolveLegacyButtonVariant(k, p, v);
      return `${r.variant}${r.isDestructive ? '+d' : ''}`;
    };
    expect(m(undefined, 'solid')).toBe('primary');
    expect(m('neutral', 'solid')).toBe('primary');
    expect(m('danger', 'solid')).toBe('danger');
    expect(m('neutral', 'outline')).toBe('secondary');
    expect(m('primary', 'ghost')).toBe('ghost');
    expect(m('danger', 'ghost')).toBe('ghost+d');
    expect(m('danger', 'soft')).toBe('subtle+d');
    expect(m('primary', 'soft')).toBe('subtle');
    expect(m('primary', undefined)).toBe('subtle');
    expect(
      resolveLegacyButtonVariant('button', 'warning', 'solid').needsHuman
    ).toBe(true);
    expect(m('danger', 'soft', 'icon')).toBe('ghost+d');
    expect(m('neutral', 'ghost', 'icon')).toBe('ghost');
    expect(m(undefined, undefined, 'icon')).toBe('ghost');
  });

  it('a new variant with no colorPalette does not warn', () => {
    wrap(<Button variant="primary">A</Button>);
    expect(warn).not.toHaveBeenCalled();
  });
});

describe('IconButton variants (5.0)', () => {
  it("defaults to 'ghost' with fg.icon", () => {
    wrap(
      <IconButton aria-label="x">
        <svg />
      </IconButton>
    );
    expect(screen.getByRole('button').dataset.variant).toBe('ghost');
    expect(getIconButtonStyles().color).toBe('fg.icon');
  });

  it('action is the coral send button', () => {
    wrap(
      <IconButton aria-label="send" variant="action">
        <svg />
      </IconButton>
    );
    expect(screen.getByRole('button').dataset.variant).toBe('action');
    expect(getIconButtonStyles('action').bgColor).toBe('send.bg');
    expect(getIconButtonStyles('action').color).toBe('send.fg');
  });

  it('legacy danger colorPalette maps to ghost + destructive', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    wrap(
      <IconButton aria-label="x" {...({ colorPalette: 'danger' } as any)}>
        <svg />
      </IconButton>
    );
    const button = screen.getByRole('button');
    expect(button.dataset.variant).toBe('ghost');
    expect(button.dataset.destructive).toBe('true');
    warn.mockRestore();
  });
});
