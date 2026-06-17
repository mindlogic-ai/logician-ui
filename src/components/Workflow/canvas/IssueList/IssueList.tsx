'use client';

import { Box, Flex, HStack } from '@chakra-ui/react';

import { Subtext, Text } from '@/components/Typography';

import type { Issue } from '../../Workflow.types';
import { severityColorToken } from '../issueSeverity';
import { SeverityDot } from '../SeverityDot';

/**
 * Severity-bucketed list of node issues rendered inside the floating canvas
 * banner's dropdown. Row-style — each issue is an inline row with a thin
 * severity bar, sized for dense scanning rather than block-level reading.
 */
export function IssueList({
  label,
  tone,
  issues,
  onIssueClick,
  resolveMessage,
}: {
  label: string;
  tone: 'error' | 'warning';
  issues: Issue[];
  /**
   * Optional row click handler — when present, each row becomes a button
   * that jumps the inspector to the offending field. Stops propagation so
   * the parent bucket's own click (jump to node) doesn't also fire.
   */
  onIssueClick?: (issue: Issue) => void;
  /**
   * Map an issue to its display message. Defaults to `issue.message`
   * (English). Callers wire in `useWorkflowIssueMessage` to get the
   * localized form.
   */
  resolveMessage?: (issue: Issue) => string;
}) {
  const color = severityColorToken(tone);
  return (
    <Box>
      <HStack gap={1} px={3} pt={1.5} pb={0.5}>
        <SeverityDot severity={tone} />
        <Subtext
          fontWeight="medium"
          color={color}
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {label} · {issues.length}
        </Subtext>
      </HStack>
      {issues.map((issue, i) => (
        <Flex
          key={`${issue.code}_${i}`}
          gap={2}
          px={3}
          py={1.5}
          align="center"
          cursor={onIssueClick ? 'pointer' : undefined}
          _hover={onIssueClick ? { bg: 'slate.50' } : undefined}
          onClick={
            onIssueClick
              ? (e) => {
                  e.stopPropagation();
                  onIssueClick(issue);
                }
              : undefined
          }
        >
          <Box
            w="3px"
            flexShrink={0}
            borderRadius="full"
            bg={severityColorToken(issue.severity)}
          />
          <Text fontSize="sm" color="slate.1200">
            {resolveMessage ? resolveMessage(issue) : issue.message}
          </Text>
        </Flex>
      ))}
    </Box>
  );
}
