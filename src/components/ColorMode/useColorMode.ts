'use client';
import { useCallback } from 'react';
import { useTheme } from 'next-themes';

import type { ColorMode } from './ColorModeProvider';

export interface UseColorModeReturn {
  /**
   * The resolved color mode actually being rendered: `'light'` or `'dark'`.
   * If a forced mode is active (e.g. factchat's short-term force-light), this
   * reflects the forced value.
   */
  colorMode: ColorMode;
  /** The raw user preference, including `'system'`. */
  colorModePreference: string | undefined;
  /** Set the preference. Accepts `'light' | 'dark' | 'system'`. */
  setColorMode: (mode: ColorMode | 'system') => void;
  /** Toggle between light and dark based on the currently resolved mode. */
  toggleColorMode: () => void;
}

/**
 * Typed color-mode accessor backed by `next-themes`.
 *
 * Must be called under a {@link ColorModeProvider} (mounted by
 * {@link LogicianProvider}).
 *
 * @example
 * ```tsx
 * const { colorMode, toggleColorMode } = useColorMode();
 * ```
 */
export function useColorMode(): UseColorModeReturn {
  const { theme, resolvedTheme, forcedTheme, setTheme } = useTheme();

  const colorMode = (forcedTheme ?? resolvedTheme ?? 'light') as ColorMode;

  const toggleColorMode = useCallback(() => {
    setTheme(colorMode === 'dark' ? 'light' : 'dark');
  }, [colorMode, setTheme]);

  return {
    colorMode,
    colorModePreference: forcedTheme ?? theme,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

/**
 * Returns one of two values based on the resolved color mode — the Logician
 * equivalent of Chakra v2's `useColorModeValue`.
 *
 * Prefer semantic tokens (`color="fg.default"`) over this hook; reach for it
 * only when a value can't be expressed as a token (e.g. a chart color array).
 *
 * @example
 * ```tsx
 * const stroke = useColorModeValue('#1751D0', '#4A79DC');
 * ```
 */
export function useColorModeValue<TLight, TDark>(
  light: TLight,
  dark: TDark
): TLight | TDark {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}
