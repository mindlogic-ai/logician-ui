import { describe, expect, it } from 'vitest';

import { omitUndefined } from './omitUndefined';

describe('omitUndefined', () => {
  it('drops undefined keys and keeps null, false and 0', () => {
    expect(
      omitUndefined({ a: undefined, b: null, c: false, d: 0, e: 'x' })
    ).toEqual({ b: null, c: false, d: 0, e: 'x' });
    expect(Object.keys(omitUndefined({ a: undefined }))).toEqual([]);
  });

  it('returns the same object when nothing is undefined', () => {
    const props = { a: 1, b: 'x' };
    expect(omitUndefined(props)).toBe(props);
  });

  it('does not mutate the input', () => {
    const props = { a: undefined, b: 1 };
    omitUndefined(props);
    expect(props).toEqual({ a: undefined, b: 1 });
    expect('a' in props).toBe(true);
  });
});
