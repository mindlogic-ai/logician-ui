import {
  Button as LButton,
  IconButton,
  Badge,
  Chip,
  TagLabel,
  Card,
} from '@mindlogic-ai/logician-ui';
import Link from 'next/link';

export const A = ({ kind, p }: any) => (
  <div>
    <LButton colorPalette="primary" variant="solid">
      Go
    </LButton>
    <LButton colorPalette="danger" variant="outline" onClick={p}>
      Del
    </LButton>
    <LButton colorPalette="secondary" variant="solid">
      ?
    </LButton>
    <LButton variant={kind}>dyn</LButton>
    <LButton {...p}>spread</LButton>
    <IconButton colorPalette="danger" variant="soft" aria-label="x" />
    <IconButton colorPalette="neutral" variant="outline" aria-label="x" />
    <Badge variant="primary">b</Badge>
    <Chip colorScheme="danger">c</Chip>
    <Chip variant="solid">c</Chip>
    <Card variant="gradient" p={2}>
      x
    </Card>
    <Link href="/" color="fg.accent">
      l
    </Link>
    <div
      style={{
        color: 'primary.lighter',
        borderColor: `var(--chakra-colors-slate-300)`,
      }}
    />
    <span color="primary.light" bg="blue.500" />
  </div>
);
