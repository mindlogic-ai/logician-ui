'use client';

import { Box, type BoxProps } from '@chakra-ui/react';

import type { IssueSeverity } from '../../Workflow.types';
import { severityColorToken } from '../issueSeverity';

interface SeverityDotProps extends BoxProps {
  severity: IssueSeverity;
  /**
   * Which half of the status family fills the dot. `fg` reads better as a
   * small marker on a tinted callout background (it's tuned to work on
   * `.bg` too); `solid` suits a header dot on a plain surface. Defaults to
   * `solid`.
   */
  tone?: 'solid' | 'fg';
}

/** Small round severity marker shared by the issue callout and the issue list. */
export function SeverityDot({
  severity,
  tone = 'solid',
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
