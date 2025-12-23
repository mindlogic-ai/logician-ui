import { ReactNode } from 'react';
import { Popover, Portal } from '@chakra-ui/react';

import { LuInfo } from '../Icon';
import { IconButton } from '../IconButton';
import { IconButtonProps } from '../IconButton/IconButton.types';

type PopoverRootProps = React.ComponentProps<typeof Popover.Root>;

// Extended types for Chakra v3 compound components
type PopoverTriggerProps = React.ComponentProps<typeof Popover.Trigger> & {
  children?: ReactNode;
  asChild?: boolean;
};
type PopoverPositionerProps = React.ComponentProps<typeof Popover.Positioner> & {
  children?: ReactNode;
};
type PopoverContentProps = React.ComponentProps<typeof Popover.Content> & {
  children?: ReactNode;
  boxShadow?: string;
  w?: string;
};
type PopoverArrowProps = React.ComponentProps<typeof Popover.Arrow> & {
  children?: ReactNode;
};

// Cast components to extended types
const PopoverTrigger = Popover.Trigger as React.FC<PopoverTriggerProps>;
const PopoverPositioner = Popover.Positioner as React.FC<PopoverPositionerProps>;
const PopoverContent = Popover.Content as React.FC<PopoverContentProps>;
const PopoverArrow = Popover.Arrow as React.FC<PopoverArrowProps>;

export const InfoSprinkle = ({
  children,
  iconButtonProps,
  ...rest
}: {
  children: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
} & Omit<PopoverRootProps, 'children'>) => {
  return (
    <Popover.Root
      positioning={{ placement: 'top' }}
      lazyMount
      {...rest}
    >
      <PopoverTrigger asChild>
        <IconButton
          aria-label="Info"
          icon={<LuInfo boxSize="sm" color="inherit" />}
          {...iconButtonProps}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverPositioner>
          <PopoverContent boxShadow="2xl" w="fit-content">
            <PopoverArrow>
              <Popover.ArrowTip />
            </PopoverArrow>
            <Popover.Body>{children}</Popover.Body>
          </PopoverContent>
        </PopoverPositioner>
      </Portal>
    </Popover.Root>
  );
};
