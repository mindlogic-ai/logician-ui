import { forwardRef } from 'react';
import { Button, ButtonProps, Tabs, TabsTriggerProps } from '@chakra-ui/react';

import {
  horizontalSelectedStyles,
  verticalSelectedStyles,
  verticalStyles,
} from './Tab.styles';

export type TabProps = TabsTriggerProps & Omit<ButtonProps, 'value'>;

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, children, ...props }, ref) => {
    if (!value) {
      throw new Error('Tab component requires a "value" prop');
    }

    return (
      <Tabs.Trigger value={value} asChild>
        <Button
          ref={ref}
          variant="ghost"
          colorPalette="neutral"
          borderRadius="none"
          color="gray.800"
          py={3}
          _selected={horizontalSelectedStyles}
          css={{
            '&[data-orientation=vertical]': {
              ...verticalStyles,
              '&[data-selected]': verticalSelectedStyles,
            },
          }}
          {...props}
        >
          {children}
        </Button>
      </Tabs.Trigger>
    );
  }
);

Tab.displayName = 'Tab';
