import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Chip } from '@mindlogic-ai/logician-ui';
import type { ChipProps } from '@mindlogic-ai/logician-ui';

const Fancy = styled(Chip)`
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
    <Chip>—/—</Chip>
    <Chip colorScheme="primary" variant="soft">
      primary/soft
    </Chip>
    <Chip colorScheme="secondary">secondary/—</Chip>
    <Chip colorScheme="neutral" variant="soft">
      neutral/soft
    </Chip>
    <Chip colorScheme="danger" variant="soft">
      danger/soft
    </Chip>
    <Chip colorScheme="success">success/—</Chip>
    <Chip colorScheme="warning" size="sm">
      warning/—
    </Chip>
    <Chip colorScheme="primary" variant="solid">
      primary/solid
    </Chip>
    <Chip variant="solid">—/solid (primary default)</Chip>
    <Chip colorScheme="neutral" variant="outline">
      neutral/outline
    </Chip>
    <Chip colorScheme="danger" variant="outline">
      danger/outline
    </Chip>
    <Chip colorScheme="secondary" variant="solid">
      secondary/solid
    </Chip>
    <Chip colorScheme={cs}>dynamic</Chip>
    <Chip {...rest} colorScheme="success">
      spread
    </Chip>
    <Chip colorScheme="danger" />
    <Fancy>styled</Fancy>
  </Box>
);
