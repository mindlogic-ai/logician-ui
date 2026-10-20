import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '@/theme';
import { ROLE_TOKEN_PATHS } from '@/theme/colors';
import { SCHEMES } from '@/theme/palette.generated';

import { CodeTabs } from './CodeTabs';
import { CODE_CHROME } from './CodeTabs.styles';

/**
 * The tab bar sits on Shiki `github-dark`, which is dark in both app modes, so
 * the chrome has to be too. It read `bg.inverse` (= `tooltip.bg`: near-black in
 * light, light sand in dark) with flipping `fg.muted` labels — ~1.4:1 in light
 * and ~1.1:1 in dark.
 *
 * jsdom cannot resolve a `_dark` conditional into a colour, so the palette is
 * measured from the generated scheme table for the token names the component
 * reads, and a render check pins that the component reads them.
 */
type Mode = 'light' | 'dark' | 'hcLight' | 'hcDark';
const MODES: Mode[] = ['light', 'dark', 'hcLight', 'hcDark'];
type Scheme = keyof typeof SCHEMES;

const BY_PATH = Object.fromEntries(
  Object.entries(ROLE_TOKEN_PATHS).map(([flat, path]) => [path, flat])
) as Record<string, keyof (typeof SCHEMES)['ink']['light']>;

const rgb = (hex: string) =>
  [0, 2, 4].map((i) => parseInt(hex.replace('#', '').slice(i, i + 2), 16));

const luminance = ([r, g, b]: number[]) => {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

const contrast = (a: number[], b: number[]) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** Token (optionally `token/NN` alpha) → rgb, composited over `under`. */
const resolve = (
  scheme: Scheme,
  mode: Mode,
  token: string,
  under?: number[]
) => {
  const [path, alpha] = token.split('/');
  const flat = BY_PATH[path];
  if (!flat) throw new Error(`no scheme entry for ${path}`);
  const value = rgb(SCHEMES[scheme][mode][flat]);
  if (!alpha) return value;
  const t = Number(alpha) / 100;
  return value.map((v, i) => v * t + under![i] * (1 - t));
};

const WHITE = [255, 255, 255];

describe('CodeTabs chrome palette', () => {
  for (const scheme of Object.keys(SCHEMES) as Scheme[]) {
    for (const mode of MODES) {
      it(`${scheme} ${mode}: dark surface, labels ≥ 4.5:1`, () => {
        const bg = resolve(scheme, mode, CODE_CHROME.bg);
        const hover = resolve(scheme, mode, CODE_CHROME.bgHover);
        // Dark in every mode: light text on it, like github-dark's own ground.
        expect(contrast(bg, WHITE)).toBeGreaterThan(7);

        const fg = resolve(scheme, mode, CODE_CHROME.fg);
        expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(fg, hover)).toBeGreaterThanOrEqual(4.5);

        const muted = resolve(scheme, mode, CODE_CHROME.fgMuted, bg);
        expect(contrast(muted, bg)).toBeGreaterThanOrEqual(4.5);
      });
    }

    it(`${scheme}: same surface family in light and dark`, () => {
      // Not the same hex (BAZE dark is a warmer ink), but never flipped.
      const light = luminance(resolve(scheme, 'light', CODE_CHROME.bg));
      const dark = luminance(resolve(scheme, 'dark', CODE_CHROME.bg));
      expect(Math.abs(light - dark)).toBeLessThan(0.05);
    });
  }
});

describe('CodeTabs reads the chrome tokens', () => {
  it('tab bar and labels use CODE_CHROME', () => {
    render(
      <ChakraProvider value={system}>
        <CodeTabs code={{ js: 'a', py: 'b' }} onCopy={() => {}} />
      </ChakraProvider>
    );
    const selected = screen.getByRole('tab', { name: 'js' });
    const root = selected.closest<HTMLElement>(
      '[data-scope="tabs"][data-part="root"]'
    )!;
    expect(getComputedStyle(root).backgroundColor).toContain(
      '--chakra-colors-action-bg'
    );
    expect(getComputedStyle(selected).color).toContain(
      '--chakra-colors-action-fg'
    );
  });
});
