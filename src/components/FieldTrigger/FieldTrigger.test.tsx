import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { controlSizes } from '../../theme/controlSizes';
import { Menu } from '../Menu';
import { Popover } from '../Popover';
import { FieldTrigger } from '.';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

/** Every rule emotion emitted for `el`'s own class (see Avatar.recipe.test). */
const declarations = (el: Element) => {
  const cls = [...el.classList].find((c) => c.startsWith('css-'));
  return [...document.querySelectorAll('style')]
    .flatMap((s) => (s.textContent ?? '').split('\n'))
    .filter((line) => line.includes(`.${cls}{`))
    .join('');
};

describe('FieldTrigger', () => {
  it('shows the placeholder while empty and marks it for the placeholder colour', () => {
    wrap(<FieldTrigger placeholder="이벤트" />);
    const button = screen.getByRole('button', { name: '이벤트' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-placeholder-shown');
  });

  it('keeps what it picks in the name once a value is shown', () => {
    wrap(<FieldTrigger placeholder="이벤트">로그인 외 2개</FieldTrigger>);
    const button = screen.getByRole('button', {
      name: '이벤트: 로그인 외 2개',
    });
    expect(button).not.toHaveAttribute('data-placeholder-shown');
  });

  it('an aria-label replaces the generated name', () => {
    wrap(
      <FieldTrigger placeholder="이벤트" aria-label="이벤트 필터, 3개 선택">
        로그인 외 2개
      </FieldTrigger>
    );
    expect(
      screen.getByRole('button', { name: '이벤트 필터, 3개 선택' })
    ).toBeInTheDocument();
  });

  it('the chevron is decoration', () => {
    wrap(<FieldTrigger placeholder="그룹" />);
    const indicator = document.querySelector('[data-part="indicator"]');
    expect(indicator).toHaveAttribute('aria-hidden', 'true');
    expect(indicator?.querySelector('svg')).not.toBeNull();
  });

  it('invalid sets aria-invalid', () => {
    wrap(<FieldTrigger placeholder="그룹" invalid />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true');
  });

  it.each(['xs', 'sm', 'md', 'lg'] as const)(
    'takes the Select height, field padding and field outline at %s',
    (size) => {
      wrap(<FieldTrigger placeholder="그룹" size={size} />);
      const css = declarations(screen.getByRole('button'));
      expect(css).toContain(
        `--select-trigger-height:var(--chakra-sizes-${controlSizes[size].height})`
      );
      expect(css).toContain('min-height:var(--select-trigger-height)');
      expect(css).toContain('border-color:var(--chakra-colors-border-control)');
    }
  );

  it('inside Popover.Trigger, Ark supplies aria-haspopup / aria-expanded', async () => {
    wrap(
      <Popover>
        <Popover.Trigger asChild>
          <FieldTrigger placeholder="이벤트" />
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Description>패널</Popover.Description>
        </Popover.Content>
      </Popover>
    );
    const button = screen.getByRole('button', { name: '이벤트' });
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    await waitFor(() =>
      expect(button).toHaveAttribute('aria-expanded', 'true')
    );
    expect(button).toHaveAttribute('data-state', 'open');
  });

  it('inside Menu.Trigger, aria-haspopup is menu', () => {
    wrap(
      <Menu>
        <Menu.Trigger asChild>
          <FieldTrigger placeholder="역할">편집자</FieldTrigger>
        </Menu.Trigger>
      </Menu>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'menu');
  });
});
