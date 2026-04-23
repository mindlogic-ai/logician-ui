import { forwardRef } from 'react';
import {
  Button,
  ButtonProps,
  mergeCss,
  Tabs,
  TabsTriggerProps,
} from '@chakra-ui/react';

import {
  horizontalSelectedStyles,
  verticalSelectedStyles,
  verticalStyles,
} from './Tab.styles';

export type TabProps = TabsTriggerProps & Omit<ButtonProps, 'value'>;

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, children, css, ...props }, ref) => {
    if (!value) {
      throw new Error('Tab component requires a "value" prop');
    }

    return (
      <Tabs.Trigger value={value} asChild>
        <Button
          ref={ref}
          variant="ghost"
          colorPalette="neutral"
          color="gray.800"
          py={3}
          border="none"
          _selected={horizontalSelectedStyles}
          {...props}
          css={mergeCss(
            {
              '&[data-orientation=vertical]': {
                ...verticalStyles,
                '&[data-selected]': verticalSelectedStyles,
              },
            },
            css
          )}
        >
          {children}
        </Button>
      </Tabs.Trigger>
    );
  }
);

Tab.displayName = 'Tab';
