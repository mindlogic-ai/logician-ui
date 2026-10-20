import { describe, expect, it } from 'vitest';

import { getEdgeLabelVariant } from './edgeLabelVariant';

describe('getEdgeLabelVariant', () => {
  it('maps guardrail exits to semantic pass/fail', () => {
    expect(getEdgeLabelVariant('pass')).toBe('pass');
    expect(getEdgeLabelVariant('fail')).toBe('fail');
  });

  it('maps the if-else fallback to else (dashed)', () => {
    expect(getEdgeLabelVariant('else')).toBe('else');
  });

  it('maps if-else branches and classify categories to neutral keys', () => {
    expect(getEdgeLabelVariant('branch_0')).toBe('key');
    expect(getEdgeLabelVariant('branch_12')).toBe('key');
    expect(getEdgeLabelVariant('cat_refund')).toBe('key');
  });

  it('falls back to default for plain/unknown handles', () => {
    expect(getEdgeLabelVariant('out')).toBe('default');
    expect(getEdgeLabelVariant(undefined)).toBe('default');
    expect(getEdgeLabelVariant(null)).toBe('default');
  });
});
