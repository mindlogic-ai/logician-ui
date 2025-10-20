import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import { IoChevronDownOutline, SlSettings } from '../Icon';
import { IconButton } from '../IconButton';
import { Menu, MenuButton, MenuItem, MenuList } from '.';
import { MenuItemProps } from './MenuItem.types';

// Interface for story-specific menu item data
interface StoryMenuItemProps {
  label: string;
  onClick?: () => void;
  itemIcon?: React.ReactElement;
  variant?: MenuItemProps['variant'];
}

const meta: Meta = {
  title: 'Components/Menu',
  component: Menu,
  args: {
    label: 'Trigger',
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
    ],
  },
  argTypes: {
    menuItems: { control: 'object' },
  },
};

export default meta;

type Story = StoryFn<{ label: string; menuItems: StoryMenuItemProps[] }>;

const Template: Story = ({ label, menuItems, ...args }) => (
  <Menu>
    <MenuButton
      aria-label={'storybook button menu'}
      as={Button}
      rightIcon={<IoChevronDownOutline />}
      {...args}
    >
      {label}
    </MenuButton>
    <MenuList>
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          variant={item.variant}
          icon={item.itemIcon}
          onClick={item.onClick}
        >
          {item.label}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export const DefaultMenu = Template.bind({});
DefaultMenu.args = {
  menuItems: [
    { label: 'Profile', onClick: () => alert('Profile clicked') },
    {
      label: 'Settings',
      onClick: () => alert('Settings clicked'),
    },
  ],
};

export const IconMenu = Template.bind({});
IconMenu.args = {
  menuItems: [
    {
      label: 'Profile',
      onClick: () => alert('Profile clicked'),
      itemIcon: <SlSettings />,
    },
    {
      label: 'Settings',
      onClick: () => alert('Settings clicked'),
      itemIcon: <SlSettings />,
    },
  ],
};

export const DangerMenu = Template.bind({});
DangerMenu.args = {
  menuItems: [
    { label: 'Profile', onClick: () => alert('Profile clicked') },
    {
      label: 'Settings',
      onClick: () => alert('Settings clicked'),
      itemIcon: <SlSettings />,
      variant: 'danger',
    },
  ],
};

const IconButtonTemplate: Story = ({ menuItems, ...args }) => (
  <Menu>
    <MenuButton
      aria-label="storybook icon button menu"
      as={IconButton}
      icon={<IoChevronDownOutline />}
      {...args}
    />
    <MenuList>
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          variant={item.variant}
          icon={item.itemIcon}
          onClick={item.onClick}
        >
          {item.label}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export const IconButtonTriggerMenu = IconButtonTemplate.bind({});
IconButtonTriggerMenu.args = {
  menuItems: [
    { label: 'Profile', onClick: () => alert('Profile clicked') },
    {
      label: 'Settings',
      onClick: () => alert('Settings clicked'),
      itemIcon: <SlSettings />,
    },
  ],
};
IconButtonTriggerMenu.argTypes = {
  label: { table: { disable: true } },
};

const SelectiveIconTemplate: Story = ({ label, menuItems, ...args }) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    menuItems[0].label
  );

  const handleItemClick = (label: string, onClick?: () => void) => {
    setSelectedLabel(label);
    onClick && onClick();
  };

  return (
    <Menu>
      <MenuButton
        aria-label={'storybook button menu'}
        as={Button}
        rightIcon={<IoChevronDownOutline />}
        {...args}
      >
        {label}
      </MenuButton>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => handleItemClick(item.label, item.onClick)}
            icon={
              selectedLabel === item.label ? (
                <SlSettings />
              ) : undefined
            }
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export const SelectiveIconMenu = SelectiveIconTemplate.bind({});
SelectiveIconMenu.args = {
  menuItems: [
    { label: 'Profile', onClick: () => alert('Profile clicked') },
    { label: 'Settings', onClick: () => alert('Settings clicked') },
    { label: 'Logout', onClick: () => alert('Logout clicked') },
  ],
};
