import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { IconButton } from '../IconButton';
import {
  getIconButtonStyles,
  iconButtonVariantStyles,
} from '../IconButton/IconButton.styles';
import { IconButtonVariant } from '../IconButton/IconButton.types';
import { Button } from './Button';
import {
  buttonVariantStyles,
  getButtonStyles,
  openHoverMedia,
  openHoverSelector,
  openStateSelector,
} from './Button.styles';
import { ButtonVariant } from './Button.types';

/**
 * The open state of a menu / popover trigger (`aria-expanded="true"`): the
 * variant's pressed colours, no press `scale`, unchanged by hover, and not
 * triggered by a Tooltip's `data-expanded` (R30 3차 QA #4).
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

/** A token as Chakra emits it — proof the token resolved, not `primary.active`. */
const token = (path: string) =>
  `var(--chakra-colors-${path
    .replace(/\./g, '-')
    .replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)})`;

const bg = (el: HTMLElement) => getComputedStyle(el).backgroundColor;

type States = Record<string, Record<string, unknown>>;
const openOf = (style: object) =>
  (style as { css?: States }).css?.[openStateSelector];

describe('Button / IconButton open state', () => {
  describe('derived for every variant', () => {
    it.each(Object.keys(buttonVariantStyles) as ButtonVariant[])(
      'Button %s: open = _active colours, no scale',
      (variant) => {
        const style = buttonVariantStyles[variant] as unknown as States;
        const open = openOf(getButtonStyles(variant));
        expect(open).toBeDefined();
        expect(open!.bgColor).toBe(style._active.bgColor);
        expect(open!.borderColor).toBe(style._active.borderColor);
        expect(open).not.toHaveProperty('scale');
      }
    );

    it.each(Object.keys(iconButtonVariantStyles) as IconButtonVariant[])(
      'IconButton %s: open = _active colours, no scale',
      (variant) => {
        const style = iconButtonVariantStyles[variant] as unknown as States;
        const open = openOf(getIconButtonStyles(variant));
        expect(open).toBeDefined();
        expect(open!.bgColor).toBe(style._active.bgColor);
        expect(open).not.toHaveProperty('scale');
      }
    );

    it('adds no border where the variant sets none in its states', () => {
      expect(openOf(getButtonStyles('secondary'))).not.toHaveProperty(
        'borderColor'
      );
      expect(openOf(getIconButtonStyles('ghost'))).not.toHaveProperty(
        'borderColor'
      );
    });

    it('keeps the isDestructive label colour', () => {
      expect(openOf(getButtonStyles('ghost', true))!.color).toBe('danger.fg');
      expect(openOf(getIconButtonStyles('ghost', true))!.color).toBe(
        'danger.fg'
      );
    });

    it('keeps the action icon rule alongside it', () => {
      const css = getButtonStyles('action').css as States;
      expect(css['& > svg']).toEqual({ color: 'action.iconOnSolid' });
      expect(css[openStateSelector]).toBeDefined();
    });

    it('excludes everything _disabled matches, incl. [disabled] (as="a")', () => {
      for (const arm of [openStateSelector, openHoverSelector]) {
        for (const d of [
          ':disabled',
          '[disabled]',
          '[data-disabled]',
          '[aria-disabled=true]',
        ]) {
          expect(arm).toContain(d);
        }
      }
    });

    it('the resting arm adds no specificity beyond aria-expanded', () => {
      // Exclusion inside :where(), so a call site's `&[aria-expanded=true]`
      // ties it and wins by merging later (Codex review on #293).
      expect(openStateSelector).toMatch(
        /^&\[aria-expanded=true\]:where\(:not\([^)]*\)\)$/
      );
    });

    it('the hover arm sits under @media (hover: hover), like _hover', () => {
      // A tap leaves :hover stuck on touch screens while _hover is off.
      const css = getButtonStyles('secondary').css as States;
      expect(openHoverMedia).toBe('@media (hover: hover)');
      expect(
        (css[openHoverMedia] as unknown as States)[openHoverSelector]
      ).toEqual(css[openStateSelector]);
      expect(Object.keys(css)).not.toContain(openHoverSelector);
    });

    it('the selector never uses data-expanded (Tooltip sets it)', () => {
      expect(openStateSelector).not.toMatch(/data-expanded/);
      expect(openHoverSelector).not.toMatch(/data-expanded/);
    });
  });

  describe('rendered', () => {
    it('aria-expanded=true shows the pressed fill, with a resolved token', () => {
      wrap(
        <Button variant="primary" aria-expanded="true">
          A
        </Button>
      );
      const button = screen.getByRole('button');
      expect(bg(button)).toBe(token('primary.active'));
    });

    it('aria-expanded=true does not scale', () => {
      wrap(
        <Button variant="secondary" aria-expanded="true">
          A
        </Button>
      );
      const button = screen.getByRole('button');
      expect(bg(button)).toBe(token('primary.washActive'));
      expect(getComputedStyle(button).getPropertyValue('scale')).toBe('1');
    });

    it('closed (aria-expanded=false) keeps the resting fill', () => {
      wrap(
        <Button variant="primary" aria-expanded="false">
          A
        </Button>
      );
      expect(bg(screen.getByRole('button'))).toBe(token('primary.main'));
    });

    it("a Tooltip's data-expanded alone does not look open", () => {
      wrap(
        <Button variant="secondary" data-expanded="">
          A
        </Button>
      );
      expect(bg(screen.getByRole('button'))).toBe(token('bg.surface'));
    });

    it('open + hover stays open', () => {
      wrap(
        <Button variant="secondary" aria-expanded="true" data-hover="">
          A
        </Button>
      );
      expect(bg(screen.getByRole('button'))).toBe(token('primary.washActive'));
    });

    it('disabled still wins over open', () => {
      wrap(
        <Button variant="primary" aria-expanded="true" disabled>
          A
        </Button>
      );
      expect(bg(screen.getByRole('button'))).not.toBe(token('primary.active'));
    });

    it('a call-site css does not drop the open state', () => {
      wrap(
        <IconButton
          aria-label="menu"
          aria-expanded="true"
          css={{ '& svg': { width: '1px' } }}
        >
          <svg />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(bg(button)).toBe(token('primary.washActive'));
      // ghost's glyph darkens on hover/press, so it is dark while open too.
      expect(getComputedStyle(button).color).toBe(token('fg.default'));
    });

    it('IconButton keeps an array css (each entry merged in order)', () => {
      wrap(
        <IconButton
          aria-label="menu"
          css={[{ width: '123px' }, { height: '45px' }]}
        >
          <svg />
        </IconButton>
      );
      const button = screen.getByRole('button');
      expect(getComputedStyle(button).width).toBe('123px');
      expect(getComputedStyle(button).height).toBe('45px');
    });

    it('Button keeps an array css too', () => {
      wrap(<Button css={[{ width: '123px' }]}>A</Button>);
      expect(getComputedStyle(screen.getByRole('button')).width).toBe('123px');
    });

    it('a lift button does not lift while open, and keeps its own translate', () => {
      wrap(
        <Button
          variant="primary"
          lift
          aria-expanded="true"
          data-hover=""
          css={{ translate: '0 5px' }}
        >
          A
        </Button>
      );
      expect(getComputedStyle(screen.getByRole('button')).translate).toBe(
        '0 5px'
      );
    });

    it('IconButton: data-expanded alone does not look open', () => {
      wrap(
        <IconButton aria-label="menu" data-expanded="">
          <svg />
        </IconButton>
      );
      expect(bg(screen.getByRole('button'))).not.toBe(
        token('primary.washActive')
      );
    });
  });
});
