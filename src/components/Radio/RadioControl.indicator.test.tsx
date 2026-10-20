import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

/**
 * Chakra's `RadioGroup.ItemIndicator` is a second `item-control` (a Radiomark)
 * that covers the outer control and carries the recipe's own
 * `border.emphasized` ring and `_disabled: { opacity: 0.5 }`. The visible part
 * is the indicator, so that is what these read.
 */
const renderGroup = (props: { disabled?: boolean } = {}) =>
  render(
    <ChakraProvider value={system}>
      <RadioGroup defaultValue="a" {...props}>
        <Radio value="a">
          <Radio.Control />
          <Radio.Text>A</Radio.Text>
        </Radio>
        <Radio value="b">
          <Radio.Control />
          <Radio.Text>B</Radio.Text>
        </Radio>
      </RadioGroup>
    </ChakraProvider>
  );

const indicators = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll<HTMLElement>(
      '[data-part="item-control"] [data-part="item-control"]'
    )
  );

describe('Radio indicator', () => {
  it('unchecked ring is border.control, not the recipe border.emphasized', () => {
    const { container } = renderGroup();
    const [, unchecked] = indicators(container);
    const style = getComputedStyle(unchecked);
    expect(style.borderColor).toContain('--chakra-colors-border-control');
    expect(style.getPropertyValue('background')).toContain(
      '--chakra-colors-bg-surface'
    );
  });

  it('checked fill is primary.main with an fg.onPrimary dot', () => {
    const { container } = renderGroup();
    const [checked] = indicators(container);
    expect(checked).toHaveAttribute('data-state', 'checked');
    const style = getComputedStyle(checked);
    expect(style.getPropertyValue('background')).toContain(
      '--chakra-colors-primary-main'
    );
    expect(style.color).toContain('--chakra-colors-fg-on-primary');
    expect(checked.querySelector('.dot')).not.toBeNull();
  });

  it('disabled is full-opacity disabled.* colours', () => {
    const { container } = renderGroup({ disabled: true });
    for (const mark of indicators(container)) {
      const style = getComputedStyle(mark);
      expect(style.opacity).toBe('1');
      expect(style.getPropertyValue('background')).toContain(
        '--chakra-colors-disabled-bg'
      );
      expect(style.color).toContain('--chakra-colors-disabled-fg');
    }
  });
});
