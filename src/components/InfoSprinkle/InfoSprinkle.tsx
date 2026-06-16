'use client';

import { useState } from 'react';
import { HoverCard, Portal } from '@chakra-ui/react';

import { useHasHover } from '../../hooks/useHasHover';
import { LuInfo } from '../Icon';
import { IconButton } from '../IconButton';
import { ScaledContext } from '../ScaledContext';
import { InfoSprinkleProps } from './InfoSprinkle.types';

export const InfoSprinkle = ({
  children,
  iconButtonProps,
  contentProps,
  baseFontSize = '14px',
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...rest
}: InfoSprinkleProps) => {
  // HoverCard (zag-js) only opens on mouse hover/focus and ignores touch, so on
  // touch devices we drive the open state ourselves via a tap on the trigger.
  const hasHover = useHasHover();
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);

  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.({ open: next });
  };

  return (
    <HoverCard.Root
      positioning={{ placement: 'top' }}
      openDelay={0}
      closeDelay={0}
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      {...rest}
    >
      <HoverCard.Trigger asChild>
        <IconButton
          aria-label="Info"
          opacity={0.5}
          transition="opacity 0.2s"
          _hover={{ opacity: 1, ...(iconButtonProps?._hover as any) }}
          {...iconButtonProps}
          onClick={(e) => {
            // On non-hover (touch) devices, tapping toggles the card.
            if (!hasHover) setOpen(!open);
            iconButtonProps?.onClick?.(e);
          }}
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
