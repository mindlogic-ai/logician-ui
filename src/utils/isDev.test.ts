import { afterEach, describe, expect, it, vi } from 'vitest';

import { isDev } from './isDev';

describe('isDev', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('is true outside production', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(isDev()).toBe(true);
    vi.stubEnv('NODE_ENV', 'test');
    expect(isDev()).toBe(true);
  });

  it('is false in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    expect(isDev()).toBe(false);
  });

  it('does not throw when there is no process global (raw browser)', () => {
    vi.stubGlobal('process', undefined);
    expect(() => isDev()).not.toThrow();
    expect(isDev()).toBe(false);
  });

  it('keeps the bare expression bundlers replace', async () => {
    // The whole point of the helper: `typeof process` or `process.env?.` would
    // stop Vite / DefinePlugin from folding it, and the warnings would vanish
    // under Vite dev (no `process` global) — the bug this replaced.
    const { readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const src = readFileSync(join(__dirname, 'isDev.ts'), 'utf8');
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '');
    expect(code).toContain('process.env.NODE_ENV');
    expect(code).not.toMatch(/typeof process/);
    expect(code).not.toMatch(/process\.env\?\./);
  });
});
