import { HoverCard, Portal } from '@chakra-ui/react';

import { LuInfo } from '../Icon';
import { IconButton } from '../IconButton';
import { ScaledContext } from '../ScaledContext';
import { InfoSprinkleProps } from './InfoSprinkle.types';

export const InfoSprinkle = ({
  children,
  iconButtonProps,
  contentProps,
  baseFontSize = '14px',
  ...rest
}: InfoSprinkleProps) => {
  return (
    <HoverCard.Root
      positioning={{ placement: 'top' }}
      openDelay={0}
      closeDelay={0}
      lazyMount
      {...rest}
    >
      <HoverCard.Trigger asChild>
        <IconButton
          aria-label="Info"
          opacity={0.5}
          transition="opacity 0.2s"
          _hover={{ opacity: 1, ...(iconButtonProps?._hover as any) }}
          {...iconButtonProps}
        >
          <LuInfo
            color={(iconButtonProps?.color as string) ?? 'fg.muted'}
            boxSize={iconButtonProps?.size ?? 'xs'}
          />
        </IconButton>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content p={2} {...contentProps}>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <ScaledContext fontSize={baseFontSize}>{children}</ScaledContext>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  );
};
