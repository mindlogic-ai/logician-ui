import { Tag, TagLabel } from '@mindlogic-ai/logician-ui';

export const Mixed = () => (
  <>
    {/* Tag 4.x default = neutral/soft */}
    <Tag>
      <TagLabel>plain</TagLabel>
    </Tag>
    <Tag>primary/—</Tag>
    <Tag tone="danger">danger/soft</Tag>
    <Tag /* TODO(logician-ui 5.0): success/outline has no outlined 5.0 Tag; now a plain Tag — tone="success"? */
    >
      success/outline
    </Tag>
    <Tag selected>primary/solid</Tag>
    <Tag selected>—/solid (neutral default)</Tag>
    <Tag
      /* TODO(logician-ui 5.0): warning/solid has no filled 5.0 Tag; now tone="warning" (soft) */
      tone="warning"
    >
      warning/solid
    </Tag>
    <Tag /* TODO(logician-ui 5.0): danger/outline has no outlined 5.0 Tag; now a plain Tag — tone="danger"? */
    >
      danger/outline
    </Tag>
    <Tag selected>neutral/solid</Tag>
    <Tag selected>secondary/solid</Tag>
    <Tag /* TODO(logician-ui 5.0): variant="subtle" is not a Tag variant; now a plain Tag */
    >
      unknown variant
    </Tag>
    <Tag /* TODO(logician-ui 5.0): colorScheme="danger" was ignored by Tag (it reads colorPalette); removed */
    >
      colorScheme on a Tag is not read
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" tone="warning">
      aliased chip
    </Tag>
    <Tag borderRadius="xl" px={3} py={2} fontWeight="medium" selected>
      <TagLabel>second import</TagLabel>
    </Tag>
  </>
);
