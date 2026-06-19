'use client';

import { ReactNode, useId, useState } from 'react';
import { Box, HStack, Stack, type StackProps } from '@chakra-ui/react';

import { TbAlertCircle, TbChevronDown, TbChevronUp } from '@/components/Icon';
import { Subtext } from '@/components/Typography';

export type CollapsibleSectionProps = StackProps & {
  label: string;
  /** Optional initial expanded state. Defaults to true. */
  defaultExpanded?: boolean;
  /**
   * When the section is collapsed AND `hasError` is true, the chevron is
   * replaced by a danger-tinted alert glyph so users don't miss errors
   * hidden behind a collapsed header.
   */
  hasError?: boolean;
  /**
   * Slot for a trailing icon-button in the header row (e.g. an info
   * popover trigger). Click handler on the action is responsible for
   * stopping propagation; otherwise the section also toggles.
   */
  headerAction?: ReactNode;
  children: ReactNode;
};

/**
 * Vertical accordion section used in the node drawer. Each section header
 * is the entire toggle target — the chevron is decorative. Collapse state
 * is session-only per mounted instance; switching to a different node
 * remounts and resets to defaults. The component is style-agnostic about
 * dividers — parents control border/spacing via the spread Stack props
 * (e.g. a `_notFirst` selector on the wrapping Stack).
 */
export function CollapsibleSection({
  label,
  defaultExpanded = true,
  hasError = false,
  headerAction,
  children,
  ...rest
}: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentId = useId();
  const showErrorGlyph = !expanded && hasError;

  return (
    <Stack gap={0} {...rest}>
      <Box
        as="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((e) => !e)}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        gap={2}
        px={3.5}
        py={3.5}
        cursor="pointer"
        bg="transparent"
        border="none"
        textAlign="left"
        _hover={{ bg: 'slate.50' }}
      >
        <Subtext
          fontWeight="bold"
          color="slate.900"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {label}
        </Subtext>
        <HStack gap={1.5} onClick={(e) => e.stopPropagation()}>
          {headerAction}
          <Box color="slate.900" display="flex" alignItems="center">
            {showErrorGlyph ? (
              <TbAlertCircle boxSize="xs" color="danger.main" />
            ) : expanded ? (
              <TbChevronUp boxSize="xs" />
            ) : (
              <TbChevronDown boxSize="xs" />
            )}
          </Box>
        </HStack>
      </Box>
      {expanded ? (
        <Box id={contentId} px={3.5} pb={4} pt={1}>
          {children}
        </Box>
      ) : null}
    </Stack>
  );
}
