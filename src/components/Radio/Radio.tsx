import React, { forwardRef } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { RadioProps } from './Radio.types';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ children, ...rest }, ref) => {
    return (
      <RadioGroup.Item ref={ref} {...rest} {...({ asChild: true } as any)}>
        <div>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl {...({ asChild: true } as any)}>
            <div
              style={{
                borderRadius: '50%',
                borderColor: 'var(--chakra-colors-gray-400)',
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
              data-peer
            />
          </RadioGroup.ItemControl>
          <RadioGroup.ItemIndicator />
          {children && (
            <RadioGroup.ItemText {...({ asChild: true } as any)}>
              <span>{children}</span>
            </RadioGroup.ItemText>
          )}
        </div>
      </RadioGroup.Item>
    );
  }
);

Radio.displayName = 'Radio';
