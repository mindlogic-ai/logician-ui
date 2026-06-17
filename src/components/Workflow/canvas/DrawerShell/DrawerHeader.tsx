'use client';

import { type ReactNode } from 'react';
import { HStack } from '@chakra-ui/react';

import { RxDotsHorizontal, TbX } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Menu } from '@/components/Menu';
import { Subtext, Text } from '@/components/Typography';

import { useWorkflowTranslate } from '../../WorkflowContext';

interface DrawerHeaderProps {
  /**
   * Title text shown semibold on the left. Node drawers render an icon
   * cluster ahead of it via `icon`; edge drawers render only the text.
   */
  title: string;
  /**
   * Muted text trailing the title. Node drawers pass the node-type label here
   * when the title is an instance name (e.g. "고객 응대 · Agent") so the kind
   * stays identifiable next to author-chosen names.
   */
  subtitle?: string;
  /** Optional leading icon cluster (node drawers pass the node-type icon). */
  icon?: ReactNode;
  /**
   * Clamp the title to a single line (edge connection titles can be long).
   * Node labels are short and render unclamped.
   */
  lineClampTitle?: boolean;
  /**
   * Overflow-menu contents (pre-built `Menu.Item` nodes from the caller).
   * When omitted, no overflow menu renders at all — this preserves the
   * pinned-node behavior of showing only the close button.
   */
  menuItems?: ReactNode;
  /** Close button handler. */
  onClose: () => void;
}

/**
 * Shared inspector-drawer header: a fixed-height bar with a left title cluster
 * and a right action cluster (optional overflow `Menu` + a close button). Stays
 * domain-free — each drawer passes its own title bits and `Menu.Item`s.
 */
export function DrawerHeader({
  title,
  subtitle,
  icon,
  lineClampTitle,
  menuItems,
  onClose,
}: DrawerHeaderProps) {
  const translate = useWorkflowTranslate();
  return (
    <HStack
      justify="space-between"
      align="center"
      px={4}
      py={3}
      borderBottom="1px solid"
      borderColor="slate.200"
    >
      <HStack gap={2} minW={0} flex="1">
        {icon}
        <Text fontWeight="semibold" lineClamp={lineClampTitle ? 1 : undefined}>
          {title}
        </Text>
        {subtitle ? (
          <Subtext color="slate.700" flexShrink={0}>
            {subtitle}
          </Subtext>
        ) : null}
      </HStack>
      <HStack gap={0.5}>
        {menuItems ? (
          <Menu>
            <Menu.Trigger asChild>
              <IconButton
                aria-label={translate('workflow_node_overflow_label') as string}
                size="xs"
                variant="ghost"
                colorPalette="neutral"
              >
                <RxDotsHorizontal boxSize="xs" />
              </IconButton>
            </Menu.Trigger>
            <Menu.List zIndex="popover">{menuItems}</Menu.List>
          </Menu>
        ) : null}
        <IconButton
          aria-label={translate('workflow_node_close') as string}
          size="xs"
          variant="ghost"
          colorPalette="neutral"
          onClick={onClose}
        >
          <TbX boxSize="xs" aria-hidden />
        </IconButton>
      </HStack>
    </HStack>
  );
}
