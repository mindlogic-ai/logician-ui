import { Meta, StoryFn } from '@storybook/react';
import { ChevronDownIcon, Button } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem } from '.';
import { Icon, IconTypes } from '@/components/Icon';
import { MenuItemProps } from '@/components/Menu/MenuItem.types';
import { IconButton } from '@/components/IconButton';
import { useState } from 'react';

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

type Story = StoryFn<{ label: string; menuItems: MenuItemProps[] }>;

const Template: Story = ({ label, menuItems, ...args }) => (
  <Menu>
    <MenuButton
      aria-label={'storybook button menu'}
      as={Button}
      rightIcon={<ChevronDownIcon />}
      {...args}
    >
      {label}
    </MenuButton>
    <MenuList>
      {menuItems.map(item => (
        <MenuItem
          key={item.label}
          variant={item.variant}
          itemIcon={item.itemIcon}
          onClick={item.onClick}
          label={item.label}
        />
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
      itemIcon: <Icon icon={IconTypes.SlSettings} />,
    },
    {
      label: 'Settings',
      onClick: () => alert('Settings clicked'),
      itemIcon: <Icon icon={IconTypes.SlSettings} />,
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
      itemIcon: <Icon icon={IconTypes.SlSettings} />,
      variant: 'danger',
    },
  ],
};

const IconButtonTemplate: Story = ({ menuItems, ...args }) => (
  <Menu>
    <MenuButton
      aria-label="storybook icon button menu"
      as={IconButton}
      icon={<ChevronDownIcon />}
      {...args}
    />
    <MenuList>
      {menuItems.map(item => (
        <MenuItem
          key={item.label}
          variant={item.variant}
          itemIcon={item.itemIcon}
          onClick={item.onClick}
          label={item.label}
        />
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
      itemIcon: <Icon icon={IconTypes.SlSettings} />,
    },
  ],
};
IconButtonTriggerMenu.argTypes = {
  label: { table: { disable: true } },
};

const SelectiveIconTemplate: Story = ({ label, menuItems, ...args }) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    menuItems[0].label,
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
        rightIcon={<ChevronDownIcon />}
        {...args}
      >
        {label}
      </MenuButton>
      <MenuList>
        {menuItems.map(item => (
          <MenuItem
            key={item.label}
            onClick={() => handleItemClick(item.label, item.onClick)}
            label={item.label}
            itemIcon={
              selectedLabel === item.label ? (
                <Icon icon={IconTypes.SlSettings} />
              ) : (
                <></>
              )
            }
          />
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
