import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { IconTypes } from '@/components/Icon/IconMap';

import { Icon } from './Icon';
import { IconProps } from './Icon.types';

import { getChakraArgTypes } from '@/../.storybook/getChakraArgTypes';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(IconTypes),
      defaultValue: Object.keys(IconTypes)[0],
    },
    ...getChakraArgTypes({ exclude: ['width', 'height'] }),
  },
  args: {
    color: 'black',
    icon: IconTypes.Addition,
  },
};

export default meta;
type Story = StoryFn<typeof Icon>;

export const Single: Story = ({ icon, ...rest }: IconProps) => {
  return <Icon icon={IconTypes[icon]} {...rest} />;
};

export const AllIcons: StoryFn<IconProps> = (
  args: Omit<IconProps, 'glyph'>,
) => (
  <div
    style={{
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
    }}
  >
    {Object.keys(IconTypes).map(iconName => {
      return (
        <div
          key={iconName}
          style={{
            padding: '8px',
            textAlign: 'center',
            border: '1px solid gray',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: '0.5rem',
          }}
        >
          <Icon {...args} icon={IconTypes[iconName]} />
          <div
            style={{
              fontSize: '12px',
              color: 'gray',
              marginTop: '0.5rem',
            }}
          >
            {iconName}
          </div>
        </div>
      );
    })}
  </div>
);
AllIcons.argTypes = {
  icon: { control: false },
};
