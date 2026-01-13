'use client';
import React, { useMemo } from 'react';
import type { SystemConfig } from '@chakra-ui/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

import { logicianConfig, system as defaultSystem } from '../../theme';
import { Toaster } from '../Toast/useToast';

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
  children,
}) => {
  const system = useMemo(() => {
    if (!config) {
      return defaultSystem;
    }
    // Merge defaultConfig, logicianConfig, and user config
    return createSystem(defaultConfig, logicianConfig, config);
  }, [config]);

  return (
    <ChakraProvider value={system}>
      {children}
      <Toaster />
    </ChakraProvider>
  );
};

LogicianProvider.displayName = 'LogicianProvider';
