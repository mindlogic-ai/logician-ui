import { describe, expect, it } from 'vitest';

import {
  DEPRECATED_ALIASES,
  getSwatchGroups,
  resolveColor,
} from './paletteSwatches';

describe('Setup/Theme → Default swatches', () => {
  const groups = getSwatchGroups();
  const swatches = groups.flatMap(([, s]) => s);

  it('every swatch shows a resolved colour, never a "{colors…}" reference', () => {
    const unresolved = swatches.filter(
      (s) => s.light.startsWith('{') || s.dark.startsWith('{') || !s.light
    );
    expect(unresolved).toEqual([]);
  });

  it('shows no 4.x alias and no 4.x slate step row', () => {
    expect(swatches.filter((s) => s.path in DEPRECATED_ALIASES)).toEqual([]);
    expect(groups.map(([g]) => g)).not.toContain('slate');
  });

  it('shows the neutral steps as neutral.1–12', () => {
    const neutral = groups
      .find(([g]) => g === 'neutral')?.[1]
      .map((s) => s.path);
    expect(neutral).toEqual(
      Array.from({ length: 12 }, (_, i) => `neutral.${i + 1}`)
    );
  });

  it('follows semantic → semantic references per mode', () => {
    // fg.default → neutral.11 (light) / cream-ish (dark): two different hexes.
    const light = resolveColor('{colors.fg.default}', 'light');
    const dark = resolveColor('{colors.fg.default}', 'dark');
    expect(light).toMatch(/^#[0-9a-f]{6}$/i);
    expect(dark).toMatch(/^#[0-9a-f]{6}$/i);
    expect(light).not.toBe(dark);
  });
});
