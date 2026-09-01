import { describe, expect, it } from 'vitest';

import { system } from './index';

/**
 * These lock in the two decisions the motion scale is built on, both of which
 * are invisible at the call site and easy to undo by accident.
 */
describe('motion tokens', () => {
  it('resolves the prefixed durations, and flattens them to hyphenated vars', () => {
    expect(system.token('durations.motion.instant')).toBe('0ms');
    expect(system.token('durations.motion.press')).toBe('120ms');
    expect(system.token('durations.motion.base')).toBe('300ms');
    expect(system.token('durations.motion.slow')).toBe('500ms');
    expect(system.token('durations.motion.slower')).toBe('700ms');

    // The reason `durations.motion` is a nested object rather than flat
    // `'motion.base'` keys: a literal dot is escaped into the variable name
    // (`--chakra-durations-motion\.base`), which cannot be written by hand in
    // emotion keyframes or a raw `css={{ }}` block.
    expect(system.tokens.getVar('durations.motion.base')).toBe(
      'var(--chakra-durations-motion-base)'
    );
  });

  it('leaves Chakra own duration scale untouched', () => {
    // The whole point of the `motion.` prefix. `slow`/`slower` mean 500/700ms to
    // us and 300/400ms to Chakra, and `dialog`, `drawer` and `progress` read
    // Chakra's — overriding them would retime components we do not own.
    expect(system.token('durations.fast')).toBe('150ms');
    expect(system.token('durations.moderate')).toBe('200ms');
    expect(system.token('durations.slow')).toBe('300ms');
    expect(system.token('durations.slower')).toBe('400ms');
  });

  it('adds easings alongside Chakra own, with no collision', () => {
    expect(system.token('easings.standard')).toBe(
      'cubic-bezier(0.4, 0, 0.2, 1)'
    );
    expect(system.token('easings.emphasized')).toBe(
      'cubic-bezier(0.22, 1, 0.36, 1)'
    );
    expect(system.token('easings.overshoot')).toBe(
      'cubic-bezier(0.34, 1.56, 0.64, 1)'
    );
    expect(system.token('easings.ease-in-smooth')).toBe(
      'cubic-bezier(0.32, 0.72, 0, 1)'
    );
  });
});
