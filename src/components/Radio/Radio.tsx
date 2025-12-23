import React, { forwardRef, ReactNode } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { RadioProps } from './Radio.types';

// Extended types for RadioGroup compound components
type RadioGroupItemProps = React.ComponentProps<typeof RadioGroup.Item> & {
  children?: ReactNode;
  css?: Record<string, any>;
  ref?: React.Ref<HTMLDivElement>;
};

type RadioGroupItemTextProps = React.ComponentProps<typeof RadioGroup.ItemText> & {
  children?: ReactNode;
};

const RadioItem = RadioGroup.Item as React.ForwardRefExoticComponent<RadioGroupItemProps>;
const RadioItemText = RadioGroup.ItemText as React.FC<RadioGroupItemTextProps>;

export const Radio = forwardRef<HTMLDivElement, RadioProps>(
  ({ children, value = '', disabled, ...rest }, ref) => {
    return (
      <RadioItem
        ref={ref}
        value={value}
        disabled={disabled}
        css={{
          '& [data-part="control"]': {
            '&[data-checked]': {
              bg: 'primary.main',
              borderColor: 'primary.main',
            },
          },
        }}
        {...(rest as React.ComponentProps<typeof RadioGroup.Item>)}
      >
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemControl />
        {children && <RadioItemText>{children}</RadioItemText>}
      </RadioItem>
    );
  }
);

Radio.displayName = 'Radio';
