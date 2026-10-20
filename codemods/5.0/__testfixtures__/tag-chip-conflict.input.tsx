import { Tag } from 'some-other-lib';
import { Button, Chip } from '@mindlogic-ai/logician-ui';

export const Conflict = () => (
  <>
    <Tag kind="other">not ours</Tag>
    <Chip colorScheme="danger">ours</Chip>
    <Button>keep</Button>
  </>
);
