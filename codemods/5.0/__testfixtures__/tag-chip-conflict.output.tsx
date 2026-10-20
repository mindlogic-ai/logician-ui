import { Tag } from 'some-other-lib';
import { Button, Tag as LuiTag } from '@mindlogic-ai/logician-ui';

export const Conflict = () => (
  <>
    <Tag kind="other">not ours</Tag>
    <LuiTag tone="danger">ours</LuiTag>
    <Button>keep</Button>
  </>
);
