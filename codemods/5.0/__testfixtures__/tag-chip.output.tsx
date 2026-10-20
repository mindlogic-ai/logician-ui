import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Tag } from '@mindlogic-ai/logician-ui';
import type { ChipProps } from '@mindlogic-ai/logician-ui';

const Fancy = styled(Tag)`
  margin: 0;
`;

export const Chips = ({
  cs,
  rest,
}: {
  cs: ChipProps['colorScheme'];
  rest: object;
}) => (
  <Box>
    {/* Chip 4.x default = primary/soft */}
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium">
      —/—
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium">
      primary/soft
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium">
      secondary/—
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium">
      neutral/soft
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" tone="danger">
      danger/soft
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" tone="success">
      success/—
    </Tag>
    <Tag
      borderRadius="xl"
      px={3}
      py={2}
      fontWeight="medium"
      tone="warning"
      size="sm"
    >
      warning/—
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" selected>
      primary/solid
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" selected>
      —/solid (primary default)
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium">
      neutral/outline
    </Tag>
    <Tag
      /* TODO(logician-ui 5.0): danger/outline has no outlined 5.0 Tag; now a plain Tag — tone="danger"? */
      borderRadius="xl"
      px={3}
      py={2}
      fontWeight="medium"
    >
      danger/outline
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" selected>
      secondary/solid
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" colorScheme={cs}>
      dynamic
    </Tag>
    <Tag
      borderRadius="xl"
      px={3}
      py={2}
      fontWeight="medium"
      {...rest}
      tone="success"
    >
      spread
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" tone="danger" />
    {/* Runtime precedence: colorScheme ?? colorPalette */}
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" tone="danger">
      colorScheme wins
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" tone="success">
      colorPalette fallback
    </Tag>
    {/* Shape the call site already sets is kept */}
    <Tag borderRadius="md" p={1} fontWeight="bold">
      own shape
    </Tag>
    {/* An explicit selected wins over the mapping */}
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" selected={false}>
      explicit selected
    </Tag>
    <Fancy>styled</Fancy>
  </Box>
);
