import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { Button } from './Button';

/**
 * `focusableWhenDisabled` — a disabled button that can still be reached and
 * pressed, so the screen can say why it is disabled.
 *
 * A native `disabled` button leaves the Tab order and swallows every click.
 * FactChat's checkout pay button sat locked until a consent box was ticked,
 * and pressing it did nothing at all — the reason was off screen. With the
 * prop the button is disabled by `aria-disabled` instead: it looks and refuses
 * the same, but focus and a press reach it, and `onDisabledClick` answers.
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('Button focusableWhenDisabled', () => {
  it('drops native disabled for aria-disabled and data-disabled', () => {
    wrap(
      <Button disabled focusableWhenDisabled>
        결제
      </Button>
    );
    const button = screen.getByRole('button', { name: '결제' });
    expect(button).not.toHaveAttribute('disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('data-disabled');
  });

  it('keeps the disabled look and cursor', () => {
    wrap(
      <>
        <Button variant="primary" disabled>
          native
        </Button>
        <Button variant="primary" disabled focusableWhenDisabled>
          soft
        </Button>
      </>
    );
    const native = getComputedStyle(
      screen.getByRole('button', { name: 'native' })
    );
    const soft = getComputedStyle(screen.getByRole('button', { name: 'soft' }));
    expect(soft.cursor).toBe('not-allowed');
    expect(soft.backgroundColor).toBe(native.backgroundColor);
    expect(soft.color).toBe(native.color);
  });

  it('stays in the Tab order', async () => {
    const user = userEvent.setup();
    wrap(
      <>
        <Button>before</Button>
        <Button disabled focusableWhenDisabled>
          결제
        </Button>
      </>
    );
    await user.tab();
    await user.tab();
    expect(screen.getByRole('button', { name: '결제' })).toHaveFocus();
  });

  it('click, Enter and Space call onDisabledClick, never onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onDisabledClick = vi.fn();
    wrap(
      <Button
        disabled
        focusableWhenDisabled
        onClick={onClick}
        onDisabledClick={onDisabledClick}
      >
        결제
      </Button>
    );
    const button = screen.getByRole('button', { name: '결제' });
    await user.click(button);
    button.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).not.toHaveBeenCalled();
    expect(onDisabledClick).toHaveBeenCalledTimes(3);
  });

  it('a type="submit" button does not submit its form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    wrap(
      <form onSubmit={onSubmit}>
        <input aria-label="이름" />
        <Button type="submit" disabled focusableWhenDisabled>
          보내기
        </Button>
      </form>
    );
    await user.click(screen.getByRole('button', { name: '보내기' }));
    // Implicit submission: Enter in a field clicks the default button.
    await user.type(screen.getByRole('textbox', { name: '이름' }), '{Enter}');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('once enabled, behaves like any button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onDisabledClick = vi.fn();
    wrap(
      <Button
        disabled={false}
        focusableWhenDisabled
        onClick={onClick}
        onDisabledClick={onDisabledClick}
      >
        결제
      </Button>
    );
    const button = screen.getByRole('button', { name: '결제' });
    expect(button).not.toHaveAttribute('aria-disabled');
    expect(button).not.toHaveAttribute('data-disabled');
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onDisabledClick).not.toHaveBeenCalled();
  });

  it('loading keeps the native disabled attribute', () => {
    const onDisabledClick = vi.fn();
    wrap(
      <Button
        disabled
        loading
        focusableWhenDisabled
        onDisabledClick={onDisabledClick}
      >
        결제
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute('aria-disabled');
    expect(getComputedStyle(button).cursor).toBe('progress');
  });

  it('the click does not reach an ancestor', async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    const onDisabledClick = vi.fn();
    wrap(
      <div onClick={onRowClick}>
        <Button
          disabled
          focusableWhenDisabled
          onDisabledClick={onDisabledClick}
        >
          결제
        </Button>
      </div>
    );
    await user.click(screen.getByRole('button', { name: '결제' }));
    expect(onDisabledClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('a call-site aria-disabled / data-disabled cannot undo it', () => {
    wrap(
      <Button
        disabled
        focusableWhenDisabled
        aria-disabled={false}
        data-disabled={undefined}
      >
        결제
      </Button>
    );
    const button = screen.getByRole('button', { name: '결제' });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('data-disabled');
  });

  describe('without the prop nothing changes', () => {
    it('disabled is the native attribute, out of the Tab order', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const onDisabledClick = vi.fn();
      wrap(
        <>
          <Button>before</Button>
          <Button disabled onClick={onClick} onDisabledClick={onDisabledClick}>
            결제
          </Button>
        </>
      );
      const button = screen.getByRole('button', { name: '결제' });
      expect(button).toBeDisabled();
      expect(button).not.toHaveAttribute('aria-disabled');
      await user.tab();
      await user.tab();
      expect(button).not.toHaveFocus();
      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
      expect(onDisabledClick).not.toHaveBeenCalled();
    });

    it('an enabled button calls onClick', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      wrap(<Button onClick={onClick}>결제</Button>);
      await user.click(screen.getByRole('button', { name: '결제' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
