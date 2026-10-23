import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Avatar, avatarColorPalette, hueForName } from '.';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

/**
 * The rules emotion emitted for `el`'s own `css-*` class, one per line. jsdom
 * cannot compute styles inside Chakra's `@layer` blocks, so the tests read the
 * generated rules instead of `getComputedStyle`.
 */
function rulesFor(el: Element | null): string[] {
  if (!el) throw new Error('element not rendered');
  const cls = [...el.classList].find((c) => c.startsWith('css-'));
  return [...document.querySelectorAll('style')]
    .flatMap((s) => (s.textContent ?? '').split('\n'))
    .filter((line) => line.includes(`.${cls}{`));
}

/** Every declaration for `el`, layered or not, as one string. */
const declarations = (el: Element | null) => rulesFor(el).join('');

/**
 * Only the rules outside any `@layer` (style props such as `colorPalette`) —
 * these beat the recipe's `@layer recipes` rules.
 */
const unlayered = (el: Element | null) =>
  rulesFor(el)
    .filter((line) => !line.startsWith('@layer'))
    .join('');

const root = (c: HTMLElement) => c.querySelector('[data-part="root"]');
const fallback = (c: HTMLElement) => c.querySelector('[data-part="fallback"]');

describe('avatar recipe', () => {
  it('the fallback fills the root and the root carries the fill', () => {
    const { container } = wrap(<Avatar name="Sean Park" />);
    const r = declarations(root(container));
    const f = declarations(fallback(container));
    // The regression: Chakra sizes only the root, so a fill on an unsized
    // fallback covered just the glyph box.
    expect(f).toContain('width:100%');
    expect(f).toContain('height:100%');
    expect(f).toContain('justify-content:center');
    expect(f).not.toMatch(/background:/);
    expect(r).toContain(
      'background:var(--chakra-colors-color-palette-surface,'
    );
    expect(r).toContain('color:var(--chakra-colors-color-palette-fg)');
    expect(r).toContain('border-width:1px');
    expect(r).toContain('overflow:hidden');
  });

  it('maps colorPalette onto the person’s category pair', () => {
    const hue = hueForName('Sean Park');
    const { container } = wrap(<Avatar name="Sean Park" />);
    // Unlayered, so it wins over the recipe's own `category.neutral` default.
    expect(unlayered(root(container))).toContain(
      `--chakra-colors-color-palette-surface:var(--chakra-colors-category-${hue}-surface)`
    );
    expect(avatarColorPalette('Sean Park')).toBe(`category.${hue}`);
    expect(avatarColorPalette('Sean Park', 'blue')).toBe('category.blue');
  });

  it('a nameless avatar — and a bare Avatar.Root — use the neutral pair', () => {
    expect(avatarColorPalette(undefined)).toBe('category.neutral');
    for (const ui of [
      <Avatar key="a" />,
      <Avatar.Root key="b">
        <Avatar.Fallback name="Bare Root" />
      </Avatar.Root>,
    ]) {
      const { container, unmount } = wrap(ui);
      const r = declarations(root(container));
      expect(r).toContain(
        '--chakra-colors-color-palette-surface:var(--chakra-colors-category-neutral-surface)'
      );
      expect(declarations(fallback(container))).toContain('width:100%');
      unmount();
    }
  });

  it('variant="logo" paints the light logo tile, not the palette', () => {
    const { container } = wrap(<Avatar name="GPT" variant="logo" />);
    const r = declarations(root(container));
    expect(r).toContain('background:var(--chakra-colors-bg-logo)');
    expect(r).toContain('color:var(--chakra-colors-fg-on-logo)');
  });

  it('a Chakra palette without `surface` still fills (falls back to `muted`)', () => {
    const { container } = wrap(<Avatar name="X" colorPalette="blue" />);
    expect(declarations(root(container))).toMatch(
      /background:var\(--chakra-colors-color-palette-surface, ?var\(--chakra-colors-color-palette-muted\)\)/
    );
  });

  it('solid / outline fall back onto the category pair', () => {
    const solid = wrap(<Avatar name="X" variant="solid" />);
    expect(declarations(root(solid.container))).toMatch(
      /background:var\(--chakra-colors-color-palette-solid, ?var\(--chakra-colors-color-palette-fg\)\)/
    );
    solid.unmount();
    const outline = wrap(<Avatar name="X" variant="outline" />);
    expect(declarations(root(outline.container))).toMatch(
      /border-color:var\(--chakra-colors-color-palette-border, ?var\(--chakra-colors-color-palette-fg\)\)/
    );
  });

  it('keeps Chakra’s size variants', () => {
    const { container } = wrap(<Avatar name="A" size="2xl" />);
    expect(declarations(root(container))).toContain(
      '--avatar-size:var(--chakra-sizes-16)'
    );
  });
});

describe('Avatar.Group max', () => {
  const names = ['김지민', '이서준', '박하은', '최유나', '정민호'];

  it('shows max avatars plus a neutral "+N" counter', () => {
    const { container } = wrap(
      <Avatar.Group max={3}>
        {names.map((n) => (
          <Avatar key={n} name={n} />
        ))}
      </Avatar.Group>
    );
    const roots = container.querySelectorAll('[data-part="root"]');
    expect(roots).toHaveLength(4);
    const counter = roots[3];
    expect(counter.textContent).toBe('+2');
    expect(declarations(counter)).toContain(
      '--chakra-colors-color-palette-surface:var(--chakra-colors-category-neutral-surface)'
    );
    expect(declarations(counter)).toContain(
      'background:var(--chakra-colors-color-palette-surface,'
    );
  });

  it('the counter stays neutral in a logo group', () => {
    const { container } = wrap(
      <Avatar.Group max={1} variant="logo">
        <Avatar name="A" />
        <Avatar name="B" />
      </Avatar.Group>
    );
    const roots = container.querySelectorAll('[data-part="root"]');
    expect(declarations(roots[0])).toContain('var(--chakra-colors-bg-logo)');
    expect(declarations(roots[1])).not.toContain('bg-logo');
  });

  it('no max, or max ≥ count, renders every avatar and no counter', () => {
    for (const max of [undefined, 5, 9]) {
      const { container, unmount } = wrap(
        <Avatar.Group max={max}>
          {names.map((n) => (
            <Avatar key={n} name={n} />
          ))}
        </Avatar.Group>
      );
      const roots = container.querySelectorAll('[data-part="root"]');
      expect(roots).toHaveLength(5);
      expect(container.textContent).not.toContain('+');
      unmount();
    }
  });
});
