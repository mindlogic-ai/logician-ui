'use client';
import React, { useEffect, useMemo } from 'react';
import type { SystemConfig } from '@chakra-ui/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

import type { SupportedLanguage } from '@/components/MonthPicker/constants';
import { LanguageContext } from '@/hooks/useLanguage';

import { logicianConfig, system as defaultSystem } from '../../theme';

const FONT_STYLESHEETS = [
  // Pretendard Variable — covers Korean + Latin with dynamic subsetting
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css',
  // Inter — Latin fallback (Bunny Fonts, GDPR-friendly)
  'https://fonts.bunny.net/css?family=inter:300,400,500,600,700&display=swap',
];

function injectFontLinks() {
  FONT_STYLESHEETS.forEach((href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
}

export interface LogicianProviderProps {
  /**
   * Optional custom configuration to extend or override the default Logician UI system.
   * Your config will be merged with the default Logician config.
   *
   * @example
   * ```tsx
   * import { LogicianProvider } from '@mindlogic/logician-ui';
   * import { defineConfig } from '@chakra-ui/react';
   *
   * // Option 1: Use default Logician system
   * <LogicianProvider>
   *   <App />
   * </LogicianProvider>
   *
   * // Option 2: Extend/override specific parts
   * <LogicianProvider
   *   config={defineConfig({
   *     theme: {
   *       tokens: {
   *         colors: {
   *           brand: { value: '#FF5733' }
   *         }
   *       },
   *       semanticTokens: {
   *         colors: {
   *           primary: {
   *             main: 'brand'
   *           }
   *         }
   *       }
   *     }
   *   })}
   * >
   *   <App />
   * </LogicianProvider>
   * ```
   */
  config?: SystemConfig;

  /**
   * Language code for internationalization.
   * Used by date pickers, month pickers, and other locale-aware components.
   *
   * @default 'en'
   * @example
   * ```tsx
   * <LogicianProvider language="ko">
   *   <App />
   * </LogicianProvider>
   * ```
   */
  language?: SupportedLanguage;

  /**
   * Whether to automatically load Pretendard Variable and Inter fonts from CDN.
   * Set to false if your app already loads these fonts to avoid duplicate requests.
   * @default true
   */
  loadFonts?: boolean;
  children?: React.ReactNode;
}

/**
 * LogicianProvider component that wraps ChakraProvider with the LogicianUI design system.
 *
 * This provider should be placed at the root of your application to provide
 * the Logician design system theme and styling to all child components.
 *
 * @example
 * ```tsx
 * import { LogicianProvider } from '@mindlogic/logician-ui';
 *
 * function App() {
 *   return (
 *     <LogicianProvider>
 *       <YourApp />
 *     </LogicianProvider>
 *   );
 * }
 * ```
 */
export const LogicianProvider: React.FC<LogicianProviderProps> = ({
  config,
  language = 'en',
  loadFonts = true,
  children,
}) => {
  useEffect(() => {
    if (loadFonts) {
      injectFontLinks();
    }
  }, [loadFonts]);

  const system = useMemo(() => {
    if (!config) {
      return defaultSystem;
    }
    // Merge defaultConfig, logicianConfig, and user config
    return createSystem(defaultConfig, logicianConfig, config);
  }, [config]);

  const languageValue = useMemo(() => ({ language }), [language]);

  return (
    <LanguageContext.Provider value={languageValue}>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </LanguageContext.Provider>
  );
};

LogicianProvider.displayName = 'LogicianProvider';
