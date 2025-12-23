'use client';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { system } from '../../theme';

export interface LogicianProviderProps {
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
  children,
}) => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
};

LogicianProvider.displayName = 'LogicianProvider';
