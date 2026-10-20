import { Badge, Badge as Pill } from '@mindlogic-ai/logician-ui';

export const Badges = ({ v, rest }: any) => (
  <>
    <Badge>—</Badge>
    <Badge>neutral</Badge>
    <Badge>primary</Badge>
    <Badge mr={2}>secondary</Badge>
    <Badge variant="success">success</Badge>
    <Badge variant="warning">warning</Badge>
    <Badge variant="danger">danger</Badge>
    <Badge variant="info">info</Badge>
    <Pill>alias</Pill>
    <Badge /* TODO(logician-ui 5.0): Badge variant="purple" is not a 5.0 variant; removed (neutral) */
    >
      unknown
    </Badge>
    <Badge variant={v}>dynamic</Badge>
    <Badge {...rest}>spread</Badge>
  </>
);
