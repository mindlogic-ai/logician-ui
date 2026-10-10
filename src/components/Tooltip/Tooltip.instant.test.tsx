import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Tooltip } from './Tooltip';

/**
 * zag marks a tooltip `data-instant` when the pointer moves to it from another
 * open one. It skips the open delay there by itself; the animation is ours to
 * skip. The rule has to outrank the presence clock's `:is([data-state=open])`,
 * so this checks the emitted selector rather than trusting the cascade.
 */
describe('Tooltip instant mode', () => {
  it('drops the enter/exit animation when zag marks the content instant', () => {
    const { getByRole } = render(
      <ChakraProvider value={system}>
        <Tooltip content="hint" open>
          <button type="button">trigger</button>
        </Tooltip>
      </ChakraProvider>
    );
    const content = getByRole('tooltip');
    const css = Array.from(document.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    const classes = content.className
      .split(' ')
      .filter((c) => c.startsWith('css-'));
    const rule = classes
      .flatMap((c) => [
        ...css.matchAll(
          new RegExp(
            `\\.${c}\\[data-instant\\]\\[data-state\\]\\{([^}]*)\\}`,
            'g'
          )
        ),
      ])
      .map((m) => m[1])
      .join(';');
    expect(rule).toContain('animation-duration:0ms');
  });
});
