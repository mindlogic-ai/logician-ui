import { Button, IconButton as IB } from '@mindlogic-ai/logician-ui';
import { Button as LButton } from '@mindlogic-ai/logician-ui';
import * as LUI from '@mindlogic-ai/logician-ui';
import { Button as OtherButton } from 'some-other-lib';

export const Buttons = ({ kind, palette, rest, ok }: any) => (
  <>
    {/* Button — solid */}
    <Button colorPalette="primary" variant="solid">
      primary/solid
    </Button>
    <Button variant="solid">—/solid</Button>
    <Button colorPalette="neutral" variant="solid">
      neutral/solid
    </Button>
    <Button colorPalette="danger" variant="solid">
      danger/solid
    </Button>
    {/* Button — outline */}
    <Button colorPalette="neutral" variant="outline">
      neutral/outline
    </Button>
    <Button variant="outline">—/outline</Button>
    <Button colorPalette="primary" variant="outline">
      primary/outline
    </Button>
    <Button colorPalette="secondary" variant="outline">
      secondary/outline
    </Button>
    <Button colorPalette="danger" variant="outline">
      danger/outline
    </Button>
    {/* Button — ghost */}
    <Button colorPalette="neutral" variant="ghost">
      neutral/ghost
    </Button>
    <Button variant="ghost" colorPalette="primary">
      primary/ghost
    </Button>
    <Button colorPalette="danger" variant="ghost">
      danger/ghost
    </Button>
    {/* Button — soft / default */}
    <Button colorPalette="danger" variant="soft">
      danger/soft
    </Button>
    <Button colorPalette="danger">danger/—</Button>
    <Button>—/—</Button>
    <Button colorPalette="primary">primary/—</Button>
    <Button colorPalette="secondary">secondary/—</Button>
    <Button colorPalette="primary" variant="soft">
      primary/soft
    </Button>
    <Button colorPalette="neutral" variant="soft">
      neutral/soft
    </Button>
    <Button colorPalette="secondary" variant="soft">
      secondary/soft
    </Button>
    {/* colorScheme (Chakra v2 name) is treated like colorPalette */}
    <Button colorScheme="danger" variant="outline" onClick={ok}>
      colorScheme
    </Button>
    <Button colorPalette={'primary'} variant={`solid`}>
      static expressions
    </Button>
    {/* No exact 5.0 role → TODO + report */}
    <Button colorPalette="secondary" variant="solid">
      secondary/solid
    </Button>
    <Button colorPalette="warning" variant="solid">
      warning/solid
    </Button>
    <Button colorPalette="primary" variant="link">
      unknown variant
    </Button>
    {/* Dynamic → untouched + report */}
    <Button variant={kind}>dynamic variant</Button>
    <Button colorPalette={ok ? 'danger' : 'primary'} variant="solid">
      dynamic palette
    </Button>
    {/* Spread → migrated, reported */}
    <Button {...rest} colorPalette="primary" variant="solid">
      spread
    </Button>
    {/* Already 5.0 → untouched */}
    <Button variant="primary">already</Button>
    <Button variant="ghost" isDestructive>
      already
    </Button>
    {/* Aliases and namespaces */}
    <LButton colorPalette="primary" variant="solid">
      alias
    </LButton>
    <LUI.Button colorPalette="danger" variant="ghost">
      namespace
    </LUI.Button>
    {/* Not logician-ui → untouched */}
    <OtherButton colorPalette="primary" variant="solid">
      other
    </OtherButton>

    {/* IconButton (aliased as IB) */}
    <IB aria-label="a" />
    <IB aria-label="a" colorPalette="neutral" variant="ghost" />
    <IB aria-label="a" variant="ghost" />
    <IB aria-label="a" colorPalette="neutral" variant="soft" />
    <IB aria-label="a" colorPalette="primary" variant="soft" />
    <IB aria-label="a" colorPalette="primary" variant="ghost" />
    <IB aria-label="a" colorPalette="warning" variant="ghost" />
    <IB aria-label="a" colorPalette="neutral" variant="outline" />
    <IB aria-label="a" variant="outline" />
    <IB aria-label="a" colorPalette="primary" variant="solid" />
    <IB aria-label="a" colorPalette="danger" variant="solid" />
    <IB aria-label="a" colorPalette="danger" variant="ghost" />
    <IB aria-label="a" colorPalette="danger" variant="soft" />
    <IB aria-label="a" colorPalette="secondary" variant="solid" />
    <IB aria-label="a" colorPalette={palette} />
    <IB aria-label="a" variant="secondary" />
  </>
);
