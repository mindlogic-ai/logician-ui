import { Button, IconButton as IB } from '@mindlogic-ai/logician-ui';
import { Button as LButton } from '@mindlogic-ai/logician-ui';
import * as LUI from '@mindlogic-ai/logician-ui';
import { Button as OtherButton } from 'some-other-lib';

export const Buttons = ({ kind, palette, rest, ok }: any) => (
  <>
    {/* Button — solid */}
    <Button variant="primary">primary/solid</Button>
    <Button variant="primary">—/solid</Button>
    <Button variant="primary">neutral/solid</Button>
    <Button variant="danger">danger/solid</Button>
    {/* Button — outline */}
    <Button variant="secondary">neutral/outline</Button>
    <Button variant="secondary">—/outline</Button>
    <Button variant="secondary">primary/outline</Button>
    <Button variant="secondary">secondary/outline</Button>
    <Button variant="secondary" isDestructive>
      danger/outline
    </Button>
    {/* Button — ghost */}
    <Button variant="ghost">neutral/ghost</Button>
    <Button variant="ghost">primary/ghost</Button>
    <Button variant="ghost" isDestructive>
      danger/ghost
    </Button>
    {/* Button — soft / default */}
    <Button variant="subtle" isDestructive>
      danger/soft
    </Button>
    <Button variant="subtle" isDestructive>
      danger/—
    </Button>
    <Button variant="subtle">—/—</Button>
    <Button variant="subtle">primary/—</Button>
    <Button variant="subtle">secondary/—</Button>
    <Button variant="subtle">primary/soft</Button>
    <Button variant="subtle">neutral/soft</Button>
    <Button variant="subtle">secondary/soft</Button>
    {/* colorScheme (Chakra v2 name) is treated like colorPalette */}
    <Button variant="secondary" isDestructive onClick={ok}>
      colorScheme
    </Button>
    <Button variant="primary">static expressions</Button>
    {/* No exact 5.0 role → TODO + report */}
    <Button
      /* TODO(logician-ui 5.0): colorPalette="secondary" variant="solid" has no exact 5.0 role; set to variant="primary" — pick one */
      variant="primary"
    >
      secondary/solid
    </Button>
    <Button
      /* TODO(logician-ui 5.0): colorPalette="warning" variant="solid" has no exact 5.0 role; set to variant="primary" — pick one */
      variant="primary"
    >
      warning/solid
    </Button>
    <Button
      /* TODO(logician-ui 5.0): colorPalette="primary" variant="link" has no exact 5.0 role; set to variant="primary" — pick one */
      variant="primary"
    >
      unknown variant
    </Button>
    {/* Dynamic → untouched + report */}
    <Button variant={kind}>dynamic variant</Button>
    <Button colorPalette={ok ? 'danger' : 'primary'} variant="solid">
      dynamic palette
    </Button>
    {/* Spread → migrated, reported */}
    <Button {...rest} variant="primary">
      spread
    </Button>
    {/* Already 5.0 → untouched */}
    <Button variant="primary">already</Button>
    <Button variant="ghost" isDestructive>
      already
    </Button>
    {/* Aliases and namespaces */}
    <LButton variant="primary">alias</LButton>
    <LUI.Button variant="ghost" isDestructive>
      namespace
    </LUI.Button>
    {/* Not logician-ui → untouched */}
    <OtherButton colorPalette="primary" variant="solid">
      other
    </OtherButton>

    {/* IconButton (aliased as IB) */}
    <IB aria-label="a" />
    <IB aria-label="a" />
    <IB aria-label="a" variant="ghost" />
    <IB aria-label="a" />
    <IB aria-label="a" />
    <IB aria-label="a" />
    <IB aria-label="a" />
    <IB aria-label="a" variant="secondary" />
    <IB aria-label="a" variant="secondary" />
    <IB aria-label="a" variant="primary" />
    <IB aria-label="a" variant="danger" />
    <IB aria-label="a" isDestructive />
    <IB aria-label="a" isDestructive />
    <IB
      aria-label="a"
      /* TODO(logician-ui 5.0): colorPalette="secondary" variant="solid" has no exact 5.0 role; set to variant="primary" — pick one */
      variant="primary"
    />
    <IB aria-label="a" colorPalette={palette} />
    <IB aria-label="a" variant="secondary" />
  </>
);
