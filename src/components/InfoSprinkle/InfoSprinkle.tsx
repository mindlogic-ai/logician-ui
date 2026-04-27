import { HoverCard, Portal } from '@chakra-ui/react';

import { LuInfo } from '../Icon';
import { IconButton } from '../IconButton';
import { IconButtonProps } from '../IconButton/IconButton.types';
import { ScaledContext } from '../ScaledContext';

export const InfoSprinkle = ({
  children,
  iconButtonProps,
  contentProps,
  baseFontSize = '14px',
  ...rest
}: {
  children: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
  contentProps?: HoverCard.ContentProps;
  baseFontSize?: string | number;
} & HoverCard.RootProps) => {
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
            color={(iconButtonProps?.color as string) ?? 'gray.1000'}
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
