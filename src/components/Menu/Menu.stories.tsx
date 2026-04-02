import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { IoChevronDownOutline, SlSettings } from '../Icon';
import { IconButton } from '../IconButton';
import { Button } from '../Button/Button';
import { Menu } from './Menu';
import { MenuItemProps } from './MenuItem.types';

interface StoryMenuItemData {
  label: string;
  onClick?: () => void;
  itemIcon?: React.ReactElement;
  rightItemIcon?: React.ReactElement;
  variant?: MenuItemProps['variant'];
}

interface MenuStoryProps {
  label?: string;
  baseFontSize?: string;
  menuItems: StoryMenuItemData[];
}

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  args: {
    label: 'Trigger',
    baseFontSize: '14px',
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
    ],
  },
  argTypes: {
    baseFontSize: { control: 'text' },
    menuItems: { control: 'object' },
  },
} satisfies Meta<MenuStoryProps>;

export default meta;

type Story = StoryObj<MenuStoryProps>;

const renderItems = (items: StoryMenuItemData[]) =>
  items.map(item => (
    <Menu.Item
      key={item.label}
      value={item.label}
      variant={item.variant}
      icon={item.itemIcon}
      rightIcon={item.rightItemIcon}
      onClick={item.onClick}
    >
      {item.label}
    </Menu.Item>
  ));

export const Default: Story = {
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="outline">
          {label} <IoChevronDownOutline />
        </Button>
      </Menu.Trigger>
      <Menu.List>{renderItems(menuItems)}</Menu.List>
    </Menu>
  ),
};

export const WithIcons: Story = {
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked'), itemIcon: <SlSettings /> },
      { label: 'Settings', onClick: () => alert('Settings clicked'), itemIcon: <SlSettings /> },
    ],
  },
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="outline">
          {label} <IoChevronDownOutline />
        </Button>
      </Menu.Trigger>
      <Menu.List>{renderItems(menuItems)}</Menu.List>
    </Menu>
  ),
};

export const WithRightIcons: Story = {
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked'), rightItemIcon: <SlSettings /> },
      { label: 'Settings', onClick: () => alert('Settings clicked'), rightItemIcon: <SlSettings /> },
    ],
  },
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="outline">
          {label} <IoChevronDownOutline />
        </Button>
      </Menu.Trigger>
      <Menu.List>{renderItems(menuItems)}</Menu.List>
    </Menu>
  ),
};

export const WithBothIcons: Story = {
  args: {
    menuItems: [
      { label: 'Profile', itemIcon: <SlSettings />, rightItemIcon: <IoChevronDownOutline />, onClick: () => alert('Profile clicked') },
      { label: 'Settings', itemIcon: <SlSettings />, rightItemIcon: <IoChevronDownOutline />, onClick: () => alert('Settings clicked') },
    ],
  },
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="outline">
          {label} <IoChevronDownOutline />
        </Button>
      </Menu.Trigger>
      <Menu.List>{renderItems(menuItems)}</Menu.List>
    </Menu>
  ),
};

export const WithDangerItem: Story = {
  args: {
    menuItems: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Delete', onClick: () => alert('Delete clicked'), itemIcon: <SlSettings />, variant: 'danger' },
    ],
  },
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="outline">
          {label} <IoChevronDownOutline />
        </Button>
      </Menu.Trigger>
      <Menu.List>{renderItems(menuItems)}</Menu.List>
    </Menu>
  ),
};

export const IconButtonTrigger: Story = {
  argTypes: { label: { table: { disable: true } } },
  render: ({ baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <IconButton aria-label="Open menu"><IoChevronDownOutline /></IconButton>
      </Menu.Trigger>
      <Menu.List>{renderItems(menuItems)}</Menu.List>
    </Menu>
  ),
};

export const SelectiveIcon: Story = {
  render: function SelectiveIconRender({ label, baseFontSize, menuItems }) {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(menuItems[0].label);

    return (
      <Menu baseFontSize={baseFontSize}>
        <Menu.Trigger asChild>
          <Button variant="outline">
            {label} <IoChevronDownOutline />
          </Button>
        </Menu.Trigger>
        <Menu.List>
          {menuItems.map(item => (
            <Menu.Item
              key={item.label}
              value={item.label}
              onClick={() => { setSelectedLabel(item.label); item.onClick?.(); }}
              icon={selectedLabel === item.label ? <SlSettings /> : undefined}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.List>
      </Menu>
    );
  },
};
