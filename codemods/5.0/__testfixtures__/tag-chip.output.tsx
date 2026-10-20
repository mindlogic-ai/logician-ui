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
    <Tag>—/—</Tag>
    <Tag>primary/soft</Tag>
    <Tag>secondary/—</Tag>
    <Tag>neutral/soft</Tag>
    <Tag tone="danger">danger/soft</Tag>
    <Tag tone="success">success/—</Tag>
    <Tag tone="warning" size="sm">
      warning/—
    </Tag>
    <Tag selected>primary/solid</Tag>
    <Tag selected>—/solid (primary default)</Tag>
    <Tag>neutral/outline</Tag>
    <Tag tone="danger">danger/outline</Tag>
    <Tag /* TODO(logician-ui 5.0): secondary/solid has no 5.0 equivalent; now a plain Tag — use selected? */
    >
      secondary/solid
    </Tag>
    <Tag colorScheme={cs}>dynamic</Tag>
    <Tag {...rest} tone="success">
      spread
    </Tag>
    <Tag tone="danger" />
    <Fancy>styled</Fancy>
  </Box>
);
