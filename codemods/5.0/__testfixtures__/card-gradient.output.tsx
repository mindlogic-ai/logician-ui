import { Card } from '@mindlogic-ai/logician-ui';

export const Cards = ({ v }: any) => (
  <>
    <Card
      /* TODO(logician-ui 5.0): Card variant="gradient" was removed; now the default card — choose wash/elevated or a bg */
      p={4}
    >
      gradient
    </Card>
    <Card /* TODO(logician-ui 5.0): Card variant="gradient" was removed; now the default card — choose wash/elevated or a bg */
    />
    <Card variant="wash">wash</Card>
    <Card variant={v}>dynamic</Card>
  </>
);
