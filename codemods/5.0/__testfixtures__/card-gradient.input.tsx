import { Card } from '@mindlogic-ai/logician-ui';

export const Cards = ({ v }: any) => (
  <>
    <Card variant="gradient" p={4}>
      gradient
    </Card>
    <Card variant="gradient" />
    <Card variant="wash">wash</Card>
    <Card variant={v}>dynamic</Card>
  </>
);
