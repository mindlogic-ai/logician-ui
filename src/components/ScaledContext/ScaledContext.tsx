'use client';

import React, { forwardRef } from 'react';
import { Box, useChakraContext } from '@chakra-ui/react';

import { ScaledContextProps } from './ScaledContext.types';

const SCOPED_CATEGORIES = new Set(['spacing', 'sizes']);
const LENGTH_RE = /^(-?[\d.]+)(r?em)$/;

// NOTE: relies on system.tokens.cssVarMap and system.tokens.allTokens,
// which are internal Chakra v3 APIs. If Chakra renames these structures in a
// future release, getScopedVars will return {} and scaling will silently stop
// working. The null-check on `base` below guards the most likely failure mode.
const scopedVarsCache = new WeakMap<object, React.CSSProperties>();

function getScopedVars(
  system: ReturnType<typeof useChakraContext>
): React.CSSProperties {
  const cached = scopedVarsCache.get(system);
  if (cached) return cached;

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

  const frozen = result as React.CSSProperties;
  scopedVarsCache.set(system, frozen);
  return frozen;
}

export const ScaledContext = forwardRef<HTMLDivElement, ScaledContextProps>(
  ({ style, children, ...rest }, ref) => {
    const system = useChakraContext();
    const scopedVars = getScopedVars(system);
    const mergedStyle = React.useMemo(
      () => ({ ...scopedVars, ...style }),
      [scopedVars, style]
    );

    return (
      <Box ref={ref} style={mergedStyle} {...rest}>
        {children}
      </Box>
    );
  }
);

ScaledContext.displayName = 'ScaledContext';
