import { Badge, Badge as Pill } from '@mindlogic-ai/logician-ui';

export const Badges = ({ v, rest }: any) => (
  <>
    <Badge>—</Badge>
    <Badge variant="neutral">neutral</Badge>
    <Badge variant="primary">primary</Badge>
    <Badge variant="secondary" mr={2}>
      secondary
    </Badge>
    <Badge variant="success">success</Badge>
    <Badge variant="warning">warning</Badge>
    <Badge variant="danger">danger</Badge>
    <Badge variant="info">info</Badge>
    <Pill variant="primary">alias</Pill>
    <Badge variant="purple">unknown</Badge>
    <Badge variant={v}>dynamic</Badge>
    <Badge {...rest}>spread</Badge>
  </>
);
