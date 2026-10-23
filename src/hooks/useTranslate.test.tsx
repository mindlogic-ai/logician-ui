import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { Button } from '@/components/Button';
import { LogicianProvider } from '@/components/LogicianProvider';
import { system } from '@/theme';

beforeAll(() => {
  // LogicianProvider's color-mode machinery calls it on mount; jsdom has none.
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
});

// Read through Button's 처리 중 default, the string an app sees most.
describe('useTranslate follows LogicianProvider language', () => {
  it('stays Korean outside a provider', () => {
    render(
      <ChakraProvider value={system}>
        <Button loading>x</Button>
      </ChakraProvider>
    );
    expect(screen.getByRole('button')).toHaveTextContent('처리 중');
  });

  it.each([
    ['ko', '처리 중'],
    ['en', 'Processing'],
    ['ja', '処理中'],
  ] as const)('renders %s', (language, text) => {
    render(
      <LogicianProvider language={language} loadFonts={false}>
        <Button loading>x</Button>
      </LogicianProvider>
    );
    expect(screen.getByRole('button')).toHaveTextContent(text);
  });
});
