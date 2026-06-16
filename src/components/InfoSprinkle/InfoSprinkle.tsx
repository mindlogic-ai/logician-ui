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
  // HoverCard (zag-js) opens on mouse hover and on focus, but its pointer
  // handlers ignore `pointerType: 'touch'`. Browsers that focus the trigger on
  // tap (e.g. Android Chrome) therefore open it for free, but those that don't
  // focus buttons on tap (e.g. iOS Safari) never open it. To cover both, on
  // non-hover devices we open the card on tap. Closing stays with the machine's
  // own dismissal (tap-outside / blur), and opening is idempotent with the
  // focus-open path so it doesn't fight devices that already open on tap.
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
            // On non-hover (touch) devices, tapping opens the card.
            if (!hasHover) setOpen(true);
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
