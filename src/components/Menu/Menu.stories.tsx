import { type ReactNode, useState } from 'react';
import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button } from '../Button/Button';
import {
  CopyIcon,
  EditIcon,
  IoChevronDownOutline,
  SlSettings,
  TrashIcon,
  VerticalEllipsisIcon,
} from '../Icon';
import { IconButton } from '../IconButton';
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
  items.map((item) => (
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
        <Button variant="secondary">
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
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="secondary">
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
      {
        label: 'Profile',
        onClick: () => alert('Profile clicked'),
        rightItemIcon: <SlSettings />,
      },
      {
        label: 'Settings',
        onClick: () => alert('Settings clicked'),
        rightItemIcon: <SlSettings />,
      },
    ],
  },
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="secondary">
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
      {
        label: 'Profile',
        itemIcon: <SlSettings />,
        rightItemIcon: <IoChevronDownOutline />,
        onClick: () => alert('Profile clicked'),
      },
      {
        label: 'Settings',
        itemIcon: <SlSettings />,
        rightItemIcon: <IoChevronDownOutline />,
        onClick: () => alert('Settings clicked'),
      },
    ],
  },
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="secondary">
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
      {
        label: 'Delete',
        onClick: () => alert('Delete clicked'),
        itemIcon: <SlSettings />,
        variant: 'danger',
      },
    ],
  },
  render: ({ label, baseFontSize, menuItems }) => (
    <Menu baseFontSize={baseFontSize}>
      <Menu.Trigger asChild>
        <Button variant="secondary">
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
        <IconButton aria-label="Open menu">
          <IoChevronDownOutline />
        </IconButton>
      </Menu.Trigger>
      <Menu.List>{renderItems(menuItems)}</Menu.List>
    </Menu>
  ),
};

export const SelectiveIcon: Story = {
  render: function SelectiveIconRender({ label, baseFontSize, menuItems }) {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(
      menuItems[0].label
    );

    return (
      <Menu baseFontSize={baseFontSize}>
        <Menu.Trigger asChild>
          <Button variant="secondary">
            {label} <IoChevronDownOutline />
          </Button>
        </Menu.Trigger>
        <Menu.List>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.label}
              value={item.label}
              onClick={() => {
                setSelectedLabel(item.label);
                item.onClick?.();
              }}
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

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Menu.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`). Each menu is held open and rendered in place
// (`portalled={false}`) so it sits inside its canvas.

const OpenMenu = ({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) => (
  <Box h="200px">
    <Menu
      open
      closeOnSelect={false}
      positioning={{ placement: 'bottom-start', flip: false }}
    >
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Menu.List portalled={false}>{children}</Menu.List>
    </Menu>
  </Box>
);

// An element, not a component: `Menu.Trigger asChild` passes its ref and
// props to its direct child, which must be the button itself.
const rowTrigger = (
  <IconButton aria-label="김민지 님 작업 메뉴" variant="ghost">
    <VerticalEllipsisIcon aria-hidden />
  </IconButton>
);

export const DoRowActions: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: actions on one row, danger last',
  render: () => (
    <OpenMenu trigger={rowTrigger}>
      <Menu.Item value="rename" icon={<EditIcon aria-hidden />}>
        이름 변경
      </Menu.Item>
      <Menu.Item value="duplicate" icon={<CopyIcon aria-hidden />}>
        복제
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item
        value="delete"
        variant="danger"
        icon={<TrashIcon aria-hidden />}
      >
        삭제
      </Menu.Item>
    </OpenMenu>
  ),
};

export const DontDangerEverywhere: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: danger on actions that are not destructive",
  render: () => (
    <OpenMenu trigger={rowTrigger}>
      <Menu.Item value="rename" variant="danger">
        이름 변경
      </Menu.Item>
      <Menu.Item value="archive" variant="danger">
        보관
      </Menu.Item>
      <Menu.Item value="delete" variant="danger">
        삭제
      </Menu.Item>
    </OpenMenu>
  ),
};

export const DontUnnamedTrigger: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: the same unnamed trigger on every row",
  render: () => (
    <OpenMenu
      trigger={
        <IconButton aria-label="메뉴" variant="ghost">
          <VerticalEllipsisIcon aria-hidden />
        </IconButton>
      }
    >
      <Menu.Item value="rename">이름 변경</Menu.Item>
      <Menu.Item value="delete" variant="danger">
        삭제
      </Menu.Item>
    </OpenMenu>
  ),
};

/** Tokens a menu row reads, as set in `MenuItem.tsx` and `MenuList.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.panel', use: <T en="List" ko="목록" /> },
        {
          token: 'border.subtle',
          use: <T en="List border" ko="목록 테두리" />,
        },
        { token: 'fg.muted', use: <T en="Row · text" ko="줄 · 글자" /> },
        {
          token: 'fg.default',
          use: <T en="Row · highlighted text" ko="줄 · 강조된 글자" />,
        },
        {
          token: 'primary.wash',
          use: <T en="Row · highlighted" ko="줄 · 강조 배경" />,
        },
        {
          token: 'danger.fg',
          use: <T en="Danger row · text" ko="위험 줄 · 글자" />,
        },
        {
          token: 'danger.bg',
          use: <T en="Danger row · highlighted" ko="위험 줄 · 강조 배경" />,
        },
      ]}
    />
  ),
};
