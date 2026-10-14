'use client';

import { Box, type BoxProps } from '@chakra-ui/react';

import type { IssueSeverity } from '../../Workflow.types';
import { severityColorToken } from '../issueSeverity';

interface SeverityDotProps extends BoxProps {
  severity: IssueSeverity;
  /**
   * Shade of the severity colour. `dark` reads better as a small marker on a
   * tinted callout background; `main` suits a header dot on white. Defaults to
   * `main`.
   */
  tone?: 'main' | 'dark';
}

/** Small round severity marker shared by the issue callout and the issue list. */
export function SeverityDot({
  severity,
  tone = 'main',
  ...rest
}: SeverityDotProps) {
  return (
    <Box
      boxSize="1.5"
      borderRadius="full"
      flexShrink={0}
      bg={severityColorToken(severity, tone)}
      {...rest}
    />
  );
}
