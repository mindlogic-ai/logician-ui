import { ChakraProvider } from '@chakra-ui/react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Menu } from './Menu';
import { ItemVariant } from './MenuItem.types';

/**
 * Zag menus never hover-highlight through `:hover` alone: the active row carries
 * `data-highlighted` (keyboard and pointer alike). Item colours set only under
 * `_hover` left arrow-key navigation on Chakra's recipe `bg.emphasized/60`.
 */
const cssText = () =>
  Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');

/** Every rule body whose selector targets this element's classes and `[data-highlighted]`. */
const highlightedRules = (el: HTMLElement) => {
  const css = cssText();
  return Array.from(el.classList).flatMap((cls) => {
    const out: string[] = [];
    const re = new RegExp(
      `\\.${cls.replace(/[^\w-]/g, (c) => `\\\\${c}`)}[^{}]*data-highlighted[^{}]*\\{([^}]*)\\}`,
      'g'
    );
    for (const m of css.matchAll(re)) out.push(m[1]);
    return out;
  });
};

const renderMenu = () =>
  render(
    <ChakraProvider value={system}>
      <Menu defaultOpen>
        <Menu.Trigger>open</Menu.Trigger>
        <Menu.List portalled={false}>
          <Menu.Item value="edit">Edit</Menu.Item>
          <Menu.Item value="delete" variant={ItemVariant.Danger}>
            Delete
          </Menu.Item>
        </Menu.List>
      </Menu>
    </ChakraProvider>
  );

describe('MenuItem highlight', () => {
  it('arrow keys highlight the row with the item role tokens', async () => {
    renderMenu();
    const menu = await screen.findByRole('menu');
    await act(async () => {
      fireEvent.keyDown(menu, { key: 'ArrowDown' });
    });
    const items = screen.getAllByRole('menuitem');
    const highlighted = items.find((i) => i.hasAttribute('data-highlighted'));
    expect(highlighted).toBeDefined();

    const rules = highlightedRules(items[0]).join(';');
    expect(rules).toContain('--chakra-colors-primary-wash');
    expect(rules).toContain('--chakra-colors-fg-default');
  });

  it('the danger row highlights with danger.bg', async () => {
    renderMenu();
    await screen.findByRole('menu');
    const danger = screen.getByRole('menuitem', { name: 'Delete' });
    expect(highlightedRules(danger).join(';')).toContain(
      '--chakra-colors-danger-bg'
    );
  });
});
