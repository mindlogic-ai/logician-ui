import { Tag } from 'some-other-lib';
import { Button, Tag as LuiTag } from '@mindlogic-ai/logician-ui';

export const Conflict = () => (
  <>
    <Tag kind="other">not ours</Tag>
    <LuiTag borderRadius="xl" px={3} py={2} fontWeight="medium" tone="danger">
      ours
    </LuiTag>
    <Button>keep</Button>
  </>
);
