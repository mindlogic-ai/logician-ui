import { Tag, TagLabel } from '@mindlogic-ai/logician-ui';

export const Mixed = () => (
  <>
    {/* Tag 4.x default = neutral/soft */}
    <Tag>
      <TagLabel>plain</TagLabel>
    </Tag>
    <Tag>primary/—</Tag>
    <Tag tone="danger">danger/soft</Tag>
    <Tag tone="success">success/outline</Tag>
    <Tag selected>primary/solid</Tag>
    <Tag /* TODO(logician-ui 5.0): neutral/solid has no 5.0 equivalent; now a plain Tag — use selected? */
    >
      —/solid (neutral default)
    </Tag>
    <Tag
      /* TODO(logician-ui 5.0): warning/solid has no filled 5.0 Tag; now tone="warning" (soft) */
      tone="warning"
    >
      warning/solid
    </Tag>
    <Tag tone="warning">aliased chip</Tag>
    <Tag selected>
      <TagLabel>second import</TagLabel>
    </Tag>
  </>
);
