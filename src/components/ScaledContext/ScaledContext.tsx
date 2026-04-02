'use client';

import React from 'react';
import { Box, useChakraContext } from '@chakra-ui/react';

import { ScaledContextProps } from './ScaledContext.types';

const SCOPED_CATEGORIES = new Set(['spacing', 'sizes']);
const LENGTH_RE = /^(-?[\d.]+)(r?em)$/;

function getScopedVars(
  system: ReturnType<typeof useChakraContext>,
): React.CSSProperties {
  const base = system.tokens.cssVarMap.get('base');
  if (!base) return {};

  const result: Record<string, string> = {};

  for (const token of system.tokens.allTokens) {
    const { category, negative, virtual, cssVar } = token.extensions;
    if (negative || virtual || !cssVar) continue;
    if (!SCOPED_CATEGORIES.has(category)) continue;

    const value = base.get(cssVar.var) as string | undefined;
    if (!value) continue;

    const match = LENGTH_RE.exec(value);
    if (!match) continue;

    result[cssVar.var] = `${match[1]}em`;
  }

  return result as React.CSSProperties;
}

export const ScaledContext = ({
  fontSize,
  style,
  children,
  ...rest
}: ScaledContextProps) => {
  const system = useChakraContext();
  const scopedVars = React.useMemo(() => getScopedVars(system), [system]);

  return (
    <Box fontSize={fontSize} style={{ ...scopedVars, ...style }} {...rest}>
      {children}
    </Box>
  );
};

ScaledContext.displayName = 'ScaledContext';
