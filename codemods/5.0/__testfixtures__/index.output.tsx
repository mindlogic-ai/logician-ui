import {
  Button as LButton,
  IconButton,
  Badge,
  Tag,
  TagLabel,
  Card,
} from '@mindlogic-ai/logician-ui';
import Link from 'next/link';

export const A = ({ kind, p }: any) => (
  <div>
    <LButton variant="primary">Go</LButton>
    <LButton variant="secondary" isDestructive onClick={p}>
      Del
    </LButton>
    <LButton
      /* TODO(logician-ui 5.0): colorPalette="secondary" variant="solid" has no exact 5.0 role; set to variant="primary" — pick one */
      variant="primary"
    >
      ?
    </LButton>
    <LButton variant={kind}>dyn</LButton>
    <LButton variant="subtle" {...p}>
      spread
    </LButton>
    <IconButton isDestructive aria-label="x" />
    <IconButton variant="secondary" aria-label="x" />
    <Badge>b</Badge>
    <Tag tone="danger">c</Tag>
    <Tag selected>c</Tag>
    <Card
      /* TODO(logician-ui 5.0): Card variant="gradient" was removed; now the default card — choose wash/elevated or a bg */
      p={2}
    >
      x
    </Card>
    <Link href="/" color="fg.link">
      l
    </Link>
    <div
      style={{
        color: 'primary.washActive',
        borderColor: `var(--chakra-colors-neutral-5)`,
      }}
    />
    <span color="border.strong" bg="blue.500" />
  </div>
);
