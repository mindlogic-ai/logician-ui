import { Tag, TagLabel, Chip as StatusChip } from '@mindlogic-ai/logician-ui';
import { Chip } from '@mindlogic-ai/logician-ui';

export const Mixed = () => (
  <>
    {/* Tag 4.x default = neutral/soft */}
    <Tag>
      <TagLabel>plain</TagLabel>
    </Tag>
    <Tag colorPalette="primary">primary/—</Tag>
    <Tag colorPalette="danger" variant="soft">
      danger/soft
    </Tag>
    <Tag colorPalette="success" variant="outline">
      success/outline
    </Tag>
    <Tag colorPalette="primary" variant="solid">
      primary/solid
    </Tag>
    <Tag variant="solid">—/solid (neutral default)</Tag>
    <Tag colorPalette="warning" variant="solid">
      warning/solid
    </Tag>
    <StatusChip colorScheme="warning">aliased chip</StatusChip>
    <Chip colorScheme="primary" variant="solid">
      <TagLabel>second import</TagLabel>
    </Chip>
  </>
);
