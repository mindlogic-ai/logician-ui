import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { ProgressBar } from './ProgressBar';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

const rulesFor = (el: Element) => {
  const css = Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');
  return el.className
    .split(' ')
    .filter((c) => c.startsWith('css-'))
    .flatMap((c) => [
      ...css.matchAll(new RegExp(`\\.${c}[^{]*\\{([^}]*)\\}`, 'g')),
    ])
    .map((m) => m[1])
    .join('\n');
};

const range = (container: HTMLElement) =>
  container.querySelector('[data-part="range"]')!;

describe('ProgressBar indeterminate', () => {
  it('keeps the determinate bar on a transition, not a loop', () => {
    const { container } = wrap(<ProgressBar value={40} />);
    const rules = rulesFor(range(container));

    expect(rules).toContain('transition-property:width');
    expect(rules).not.toContain('animation-iteration-count:infinite');
  });

  it('sweeps a solid block across the track when there is no value', () => {
    const { container } = wrap(<ProgressBar indeterminate />);
    const rules = rulesFor(range(container));

    expect(rules).toContain('animation-name:indeterminate');
    expect(rules).toContain('animation-iteration-count:infinite');
    // `translate`, so a loop that may run for the length of a slow request
    // stays on the compositor. Chakra's own indeterminate styling animates
    // `left`, which lays out every frame.
    expect(rules).toContain('background-image:none');
  });

  it('spells the missing value the way Chakra Progress expects', () => {
    // `null`, not `undefined` — `undefined` reads as uncontrolled and the bar
    // falls back to its default value instead of going indeterminate.
    const { container } = wrap(<ProgressBar indeterminate value={70} />);
    expect(range(container).getAttribute('data-state')).toBe('indeterminate');
  });
});
