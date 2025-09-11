'use client';
import React from 'react';
import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';

import theme from '../../theme';

/**
 * Deep merge utility function that recursively merges objects
 */
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        // Recursively merge nested objects
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        // Override primitive values, arrays, or null/undefined
        result[key] = sourceValue;
      }
    }
  }

  return result;
}

export interface LogicianProviderProps
  extends Omit<ChakraProviderProps, 'theme'> {
  /**
   * Custom theme to override the default Logician theme
   */
  theme?: ChakraProviderProps['theme'];
}

/**
 * LogicianProvider component that wraps ChakraProvider with the LogicianUI design system theme.
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
  children,
  theme: customTheme,
  ...rest
}) => {
  const mergedTheme = customTheme ? deepMerge(theme, customTheme) : theme;

  return (
    <ChakraProvider theme={mergedTheme} {...rest}>
      {children}
    </ChakraProvider>
  );
};

LogicianProvider.displayName = 'LogicianProvider';
