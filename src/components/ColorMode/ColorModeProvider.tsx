'use client';
import React from 'react';
import { ThemeProvider, type ThemeProviderProps } from 'next-themes';

/**
 * The two resolved color modes Logician UI renders.
 *
 * `system` is a *preference* (resolved to one of these at runtime); resolved
 * values are always `'light'` or `'dark'`.
 */
export type ColorMode = 'light' | 'dark';

export interface ColorModeProviderProps extends Omit<
  ThemeProviderProps,
  'themes' | 'attribute' | 'value'
> {}

/**
 * Color-mode runtime for the Logician design system.
 *
 * Chakra UI v3 ships no color-mode runtime of its own — the `_dark` token
 * condition is just a CSS selector (`.dark &`). This provider supplies the
 * piece that toggles that class, backed by `next-themes`.
 *
 * ## Switch contract (the bit SSR no-flash scripts must match)
 * - **Strategy:** class — `next-themes` writes `class="light" | "dark"` on
 *   `<html>`. This is exactly what Chakra's default `_dark` condition
 *   (`.dark &, .dark .chakra-theme:not(.light) &`) keys off of.
 * - **Storage key:** `logician-color-mode` (localStorage).
 * - **`system` resolution:** enabled by default (`enableSystem`); resolves via
 *   `prefers-color-scheme` and is reflected in `useColorMode().colorMode`.
 * - **`color-scheme`:** Logician owns it. `enableColorScheme` lets `next-themes`
 *   set `style="color-scheme:…"` on `<html>` from the resolved mode. Consumers
 *   (e.g. factchat) should NOT also write `color-scheme` — single writer.
 * - **`disableTransitionOnChange`:** on, to avoid color transitions flashing on
 *   toggle.
 *
 * Mounted automatically by {@link LogicianProvider}; exported standalone for
 * apps that compose providers manually.
 *
 * @remarks SSR: the host app must add `suppressHydrationWarning` to its `<html>`
 * element (this is the consumer's responsibility — see the ownership boundary).
 */
export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
      storageKey="logician-color-mode"
      {...props}
    >
      {children}
    </ThemeProvider>
  );
};

ColorModeProvider.displayName = 'ColorModeProvider';
