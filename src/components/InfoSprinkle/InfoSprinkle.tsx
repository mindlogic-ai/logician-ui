import { Popover, Portal } from '@chakra-ui/react';

import { LuInfo } from '../Icon';
import { IconButton } from '../IconButton';
import { IconButtonProps } from '../IconButton/IconButton.types';

export const InfoSprinkle = ({
  children,
  iconButtonProps,
  ...rest
}: {
  children: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
} & Popover.RootProps) => {
  return (
    <Popover.Root
      positioning={{ placement: 'top' }}
      lazyMount
      {...rest}
    >
      <Popover.Trigger {...({ asChild: true } as any)}>
        <IconButton aria-label="Info" {...iconButtonProps}>
          <LuInfo boxSize="sm" color="inherit" />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Content {...({ asChild: true } as any)}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow:
                '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            }}
          >
            <Popover.Arrow />
            <Popover.Body {...({ asChild: true } as any)}>
              <div style={{ padding: '16px', width: 'fit-content' }}>
                {children}
              </div>
            </Popover.Body>
          </div>
        </Popover.Content>
      </Portal>
    </Popover.Root>
  );
};
