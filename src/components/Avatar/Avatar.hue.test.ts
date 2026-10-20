import { describe, expect, it } from 'vitest';

import { SYSTEM_HUE_NAMES } from '@/theme/colors';

import { hueForName } from './Avatar';

describe('hueForName', () => {
  it('is stable for the same name', () => {
    expect(hueForName('Jaeho Shin')).toBe(hueForName('Jaeho Shin'));
    expect(hueForName('정빈')).toBe(hueForName('정빈'));
  });

  it('only ever returns a declared system hue', () => {
    for (const name of ['', 'A', 'Sean Park', '김민재', 'z'.repeat(50)]) {
      expect(SYSTEM_HUE_NAMES).toContain(hueForName(name));
    }
  });

  it('falls back to a fixed hue for an empty/undefined name', () => {
    expect(hueForName(undefined)).toBe(SYSTEM_HUE_NAMES[0]);
    expect(hueForName('')).toBe(SYSTEM_HUE_NAMES[0]);
  });

  it('spreads different names across more than one hue', () => {
    const names = [
      'Jaeho Shin',
      'Jeongbin Kim',
      'Sean Park',
      'Kunyoung Park',
      'Namkyung Jo',
      'Taehoon Kim',
      'Minjae Kim',
      'Hyungjoon Yang',
      'Hyunwoo Kim',
      'Joonpyo Lee',
      'Seungwook Kim',
      'WonJoon Shin',
    ];
    const hues = new Set(names.map(hueForName));
    // Not a cryptographic hash — just enough spread that the wheel is
    // visibly in use rather than every name landing on one hue.
    expect(hues.size).toBeGreaterThan(1);
  });
});
