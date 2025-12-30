import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { IoChevronDownOutline, SlSettings } from '../Icon';
import { IconButton } from '../IconButton';
import { Menu, MenuButton, MenuItem, MenuList } from '.';
import { MenuItemProps } from './MenuItem.types';
import { Button } from '../Button/Button';

// Interface for story-specific menu item data
interface StoryMenuItemProps {
  label: string;
  onClick?: () => void;
  itemIcon?: React.ReactElement;
  variant?: MenuItemProps['variant'];
}

// Props for the story templates
interface MenuStoryProps {
  label?: string;
  menuItems: StoryMenuItemProps[];
}

const meta = {
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
} satisfies Meta<MenuStoryProps>;

export default meta;

type Story = StoryObj<MenuStoryProps>;

export const DefaultMenu: Story = {
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      {
        label: 'Settings',
        onClick: () => alert('Settings clicked'),
      },
    ],
  },
  render: ({ label, menuItems }) => (
    <Menu>
      <MenuButton
        aria-label={'storybook button menu'}
        as={Button}
        rightIcon={<IoChevronDownOutline />}
      >
        {label}
      </MenuButton>
      <MenuList>
        {menuItems.map((item: StoryMenuItemProps) => (
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
  ),
};

export const IconMenu: Story = {
  args: {
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
  },
  render: ({ label, menuItems }) => (
    <Menu>
      <MenuButton
        aria-label={'storybook button menu'}
        as={Button}
        rightIcon={<IoChevronDownOutline />}
      >
        {label}
      </MenuButton>
      <MenuList>
        {menuItems.map((item: StoryMenuItemProps) => (
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
  ),
};

export const DangerMenu: Story = {
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      {
        label: 'Settings',
        onClick: () => alert('Settings clicked'),
        itemIcon: <SlSettings />,
        variant: 'danger',
      },
    ],
  },
  render: ({ label, menuItems }) => (
    <Menu>
      <MenuButton
        aria-label={'storybook button menu'}
        as={Button}
        rightIcon={<IoChevronDownOutline />}
      >
        {label}
      </MenuButton>
      <MenuList>
        {menuItems.map((item: StoryMenuItemProps) => (
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
  ),
};

export const IconButtonTriggerMenu: Story = {
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      {
        label: 'Settings',
        onClick: () => alert('Settings clicked'),
        itemIcon: <SlSettings />,
      },
    ],
  },
  argTypes: {
    label: { table: { disable: true } },
  },
  render: ({ menuItems }) => (
    <Menu>
      <MenuButton
        aria-label="storybook icon button menu"
        as={IconButton}
        icon={<IoChevronDownOutline />}
      />
      <MenuList>
        {menuItems.map((item: StoryMenuItemProps) => (
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
  ),
};

export const SelectiveIconMenu: Story = {
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
      { label: 'Logout', onClick: () => alert('Logout clicked') },
    ],
  },
  render: function SelectiveIconRender({ label, menuItems }) {
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
        >
          {label}
        </MenuButton>
        <MenuList>
          {menuItems.map((item: StoryMenuItemProps) => (
            <MenuItem
              key={item.label}
              onClick={() => handleItemClick(item.label, item.onClick)}
              icon={
                selectedLabel === item.label ? <SlSettings /> : undefined
              }
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  },
};
