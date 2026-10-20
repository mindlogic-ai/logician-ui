import { createSystem, defaultConfig } from '@chakra-ui/react';
import { describe, expect, it } from 'vitest';

import { createSemanticColors } from './colors';
import { createLogicianTheme, normalizeSemanticOverrides } from './index';

type Tree = Record<string, unknown>;

const leaves = (node: Tree, prefix = ''): string[] =>
  Object.entries(node).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && 'value' in (child as Tree))
      return [path];
    return child && typeof child === 'object'
      ? leaves(child as Tree, path)
      : [];
  });

/** Every `--chakra-colors-*` declaration, keyed `selector :: var`. */
const tokenDecls = (
  node: unknown,
  selector = '',
  out = new Map<string, string>()
) => {
  for (const [key, child] of Object.entries(node as Tree)) {
    if (child && typeof child === 'object')
      tokenDecls(child, key.startsWith('@') ? selector : key, out);
    else out.set(`${selector} :: ${key}`, String(child));
  }
  return out;
};
const ROOT = '&:where(html, .chakra-theme)';
const LIGHT = ':root &, .light &';

const chakraColors = defaultConfig.theme?.semanticTokens?.colors as Tree;

describe("Chakra's own neutral and status colour names", () => {
  // Chakra's recipes read these (menu/combobox `_highlighted: bg.emphasized/60`,
  // radiomark `border.emphasized`, field `fg.error`). Without a Logician value
  // they resolve to Chakra's zinc/red palette, which 5.0 no longer shadows.
  for (const scheme of ['ink', 'slate'] as const) {
    it(`are all defined by the ${scheme} theme`, () => {
      const ours = new Set(
        leaves(createSemanticColors({ neutral: scheme }) as Tree)
      );
      const missing = ['bg', 'fg', 'border']
        .flatMap((group) =>
          leaves(chakraColors[group] as Tree).map((p) => `${group}.${p}`)
        )
        .filter((p) => !ours.has(p));
      expect(missing).toEqual([]);
    });
  }

  it('resolve to Logician roles, not Chakra palette values', () => {
    const system = createSystem(defaultConfig, createLogicianTheme());
    const decls = tokenDecls(system.getTokenCss());
    expect(decls.get(`${ROOT} :: --chakra-colors-bg-emphasized`)).toBe(
      'var(--chakra-colors-layer-1-active)'
    );
    expect(decls.get(`${ROOT} :: --chakra-colors-fg-error`)).toBe(
      'var(--chakra-colors-danger-fg)'
    );
  });
});

describe('normalizeSemanticOverrides', () => {
  const override = {
    theme: {
      semanticTokens: {
        colors: {
          primary: { main: { value: { base: '#ff0000', _dark: '#00ff00' } } },
        },
      },
    },
  };

  it('copies base into _light so a 4.x-style override wins in light mode', () => {
    const out = normalizeSemanticOverrides(override);
    expect(
      (
        out.theme?.semanticTokens?.colors as Tree & {
          primary: { main: { value: unknown } };
        }
      ).primary.main.value
    ).toEqual({ _light: '#ff0000', base: '#ff0000', _dark: '#00ff00' });
  });

  it('the merged system renders the override, not the library _light', () => {
    const lightValue = (cfg: typeof override) =>
      tokenDecls(
        createSystem(defaultConfig, createLogicianTheme(), cfg).getTokenCss()
      ).get(`${LIGHT} :: --chakra-colors-primary-main`);
    // Without normalising, the library's `_light` (ink) wins in light mode.
    expect(lightValue(override)).not.toBe('#ff0000');
    expect(lightValue(normalizeSemanticOverrides(override))).toBe('#ff0000');
  });

  it('leaves string values and explicit _light untouched', () => {
    const cfg = {
      theme: {
        semanticTokens: {
          colors: {
            a: { value: '#123456' },
            b: { value: { _light: '#111111', base: '#222222' } },
          },
        },
      },
    };
    const colors = normalizeSemanticOverrides(cfg).theme?.semanticTokens
      ?.colors as Tree & { a: { value: unknown }; b: { value: unknown } };
    expect(colors.a.value).toBe('#123456');
    expect(colors.b.value).toEqual({ _light: '#111111', base: '#222222' });
  });
});
