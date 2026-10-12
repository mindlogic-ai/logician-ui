import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Button } from './Button';

/**
 * A disabled Button must not show the pointer.
 *
 * The Button sets `cursor="pointer"` as a style prop, which Chakra emits
 * outside its cascade layers, while the recipe's disabled cursor sits inside
 * `@layer recipes` — so the pointer won and a disabled button read as
 * clickable (FactChat's 「현재 플랜」 button).
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('Button disabled cursor', () => {
  it('enabled keeps the pointer', () => {
    wrap(<Button>on</Button>);
    expect(getComputedStyle(screen.getByRole('button')).cursor).toBe('pointer');
  });

  it('disabled shows not-allowed', () => {
    wrap(<Button disabled>off</Button>);
    expect(getComputedStyle(screen.getByRole('button')).cursor).toBe(
      'not-allowed'
    );
  });

  it('a call-site _disabled does not drop it', () => {
    wrap(
      <Button disabled _disabled={{ opacity: 0.3 }}>
        off
      </Button>
    );
    expect(getComputedStyle(screen.getByRole('button')).cursor).toBe(
      'not-allowed'
    );
  });

  it('lift keeps it too', () => {
    wrap(
      <Button disabled lift>
        off
      </Button>
    );
    expect(getComputedStyle(screen.getByRole('button')).cursor).toBe(
      'not-allowed'
    );
  });
});
