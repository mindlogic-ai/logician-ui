'use client';

import { type ReactNode, useMemo } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';

import { AlertTriangle, TbAlertCircle } from '@/components/Icon';
import { Subtext } from '@/components/Typography';

import { useWorkflowIssueMessage } from '../../useWorkflowIssueMessage';
import type { Issue, IssueSeverity } from '../../Workflow.types';
import { useWorkflowTranslate } from '../../WorkflowContext';
import { severityCalloutStyle } from '../issueSeverity';
import { SeverityDot } from '../SeverityDot';

interface DrawerIssuesProps {
  /**
   * Issues to surface in the drawer header band, already filtered by the
   * caller (node drawers pass only orphan / non-field-scoped issues; edge
   * drawers pass all of theirs). Returns null when empty.
   */
  issues: Issue[];
}

/**
 * One severity bucket of node/edge issues, rendered as a tinted callout: a
 * severity icon + a short heading ("Fixes needed" / "Worth checking") on top,
 * then the messages as a bulleted list beneath. Severities never mix in a box
 * so the icon, heading and tint stay meaningful.
 *
 * Markers use the severity's `dark` tone via `SeverityDot` — the CSS list
 * `::marker` defaults to a muted grey that reads as an odd low-contrast dot on
 * the tinted background.
 */
function IssueCallout({
  severity,
  title,
  issues,
  resolveMessage,
}: {
  severity: IssueSeverity;
  title: ReactNode;
  issues: Issue[];
  resolveMessage: (issue: Issue) => string;
}) {
  const { bg, color, borderColor } = severityCalloutStyle(severity);
  const Icon = severity === 'error' ? TbAlertCircle : AlertTriangle;
  return (
    <Box
      border="1px solid"
      borderColor={borderColor}
      borderRadius="md"
      bg={bg}
      px={3}
      py={2}
    >
      <VStack align="stretch" gap={1.5}>
        <HStack gap={1.5} color={color}>
          <Icon boxSize="xs" />
          <Subtext color={color} fontWeight="bold">
            {title}
          </Subtext>
        </HStack>
        <VStack align="stretch" gap={0.5} ps={1}>
          {issues.map((issue, i) => (
            <HStack key={`${issue.code}_${i}`} gap={2} align="flex-start">
              <SeverityDot severity={severity} tone="dark" mt={1.5} />
              <Subtext color={color}>{resolveMessage(issue)}</Subtext>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

/**
 * Header issue band shared by node and edge drawers: groups the given issues
 * by severity and renders one tinted `IssueCallout` per non-empty bucket.
 */
export function DrawerIssues({ issues }: DrawerIssuesProps) {
  const resolveIssueMessage = useWorkflowIssueMessage();
  const translate = useWorkflowTranslate();
  const grouped = useMemo(
    () => ({
      errors: issues.filter((i) => i.severity === 'error'),
      warnings: issues.filter((i) => i.severity === 'warning'),
    }),
    [issues]
  );

  if (issues.length === 0) return null;

  return (
    <Box px={4} py={3}>
      <VStack align="stretch" gap={2}>
        {grouped.errors.length > 0 ? (
          <IssueCallout
            severity="error"
            title={translate('workflow_drawer_issues_error_title')}
            issues={grouped.errors}
            resolveMessage={resolveIssueMessage}
          />
        ) : null}
        {grouped.warnings.length > 0 ? (
          <IssueCallout
            severity="warning"
            title={translate('workflow_drawer_issues_warning_title')}
            issues={grouped.warnings}
            resolveMessage={resolveIssueMessage}
          />
        ) : null}
      </VStack>
    </Box>
  );
}
