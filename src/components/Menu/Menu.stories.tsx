import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

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

/**
 * Component Test: Menu 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 메뉴 버튼 클릭 시 메뉴가 열리는지
 * - 메뉴 아이템 클릭 시 메뉴가 닫히는지
 * - 외부 클릭 시 메뉴가 닫히는지
 * - 키보드 화살표로 메뉴 아이템 탐색 가능한지
 *
 * Bad Path:
 * - disabled 메뉴 아이템은 클릭 불가능한지
 */
type InteractionStory = StoryObj<typeof Menu>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [clickedItem, setClickedItem] = useState<string>('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Normal Menu
          </div>
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDownOutline />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setClickedItem('Download')}>Download</MenuItem>
              <MenuItem onClick={() => setClickedItem('Create Copy')}>Create a Copy</MenuItem>
              <MenuItem onClick={() => setClickedItem('Mark as Draft')}>Mark as Draft</MenuItem>
            </MenuList>
          </Menu>
          {clickedItem && (
            <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="clicked-item">
              Clicked: {clickedItem}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Menu with Disabled Item
          </div>
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDownOutline />}>
              Options
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setClickedItem('Edit')}>Edit</MenuItem>
              <MenuItem isDisabled onClick={() => setClickedItem('Delete (Disabled)')}>
                Delete
              </MenuItem>
              <MenuItem onClick={() => setClickedItem('Duplicate')}>Duplicate</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('메뉴 버튼 클릭 시 메뉴가 열리는지 확인', async () => {
      // button 요소 찾기 (텍스트는 pointer-events: none일 수 있음)
      const menuButton = canvas.getByRole('button', { name: /Actions/i });
      await userEvent.click(menuButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 메뉴가 열렸는지 확인 (portal로 렌더링되므로 document에서 찾기)
      const downloadItem = document.querySelector('[role="menuitem"]');
      await expect(downloadItem).toBeInTheDocument();
    });

    await step('메뉴 아이템 클릭 시 메뉴가 닫히는지 확인', async () => {
      // Download 아이템 클릭
      const downloadItem = document.querySelector('[role="menuitem"]') as HTMLElement;
      await userEvent.click(downloadItem);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 클릭된 아이템 표시 확인
      const clickedDisplay = canvas.getByTestId('clicked-item');
      await expect(clickedDisplay.textContent).toContain('Download');

      // 메뉴가 닫혔는지 확인
      await new Promise(resolve => setTimeout(resolve, 300));
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      // 메뉴가 닫혔으므로 아이템이 없거나 보이지 않아야 함
      if (menuItems.length > 0) {
        await expect(menuItems[0]).not.toBeVisible();
      }
    });

    await step('외부 클릭 시 메뉴가 닫히는지 확인', async () => {
      // 메뉴 다시 열기
      const menuButton = canvas.getByRole('button', { name: /Actions/i });
      await userEvent.click(menuButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 메뉴가 열렸는지 확인
      const menuItem = document.querySelector('[role="menuitem"]');
      await expect(menuItem).toBeInTheDocument();

      // 외부 클릭 (canvasElement의 다른 영역)
      const outsideArea = canvas.getByText('Menu with Disabled Item');
      await userEvent.click(outsideArea);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 메뉴가 닫혔는지 확인
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      if (menuItems.length > 0) {
        await expect(menuItems[0]).not.toBeVisible();
      }
    });

    await step('키보드 화살표로 메뉴 아이템 탐색 가능한지 확인', async () => {
      // 메뉴 열기
      const menuButton = canvas.getByRole('button', { name: /Actions/i });
      await userEvent.click(menuButton);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 첫 번째 아이템에 포커스
      const firstItem = document.querySelector('[role="menuitem"]') as HTMLElement;
      firstItem?.focus();
      await new Promise(resolve => setTimeout(resolve, 300));

      // 아래 화살표로 다음 아이템으로 이동
      await userEvent.keyboard('{ArrowDown}');
      await new Promise(resolve => setTimeout(resolve, 300));

      // 포커스된 요소가 두 번째 아이템인지 확인
      const focusedElement = document.activeElement;
      await expect(focusedElement?.textContent).toContain('Create a Copy');

      // 위 화살표로 이전 아이템으로 이동
      await userEvent.keyboard('{ArrowUp}');
      await new Promise(resolve => setTimeout(resolve, 300));

      // 포커스가 첫 번째 아이템으로 돌아갔는지 확인
      const newFocusedElement = document.activeElement;
      await expect(newFocusedElement?.textContent).toContain('Download');

      // Escape로 메뉴 닫기
      await userEvent.keyboard('{Escape}');
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('disabled 메뉴 아이템은 클릭 불가능한지 확인', async () => {
      // Options 메뉴 열기
      const optionsButton = canvas.getByRole('button', { name: /Options/i });
      await userEvent.click(optionsButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Disabled 아이템 찾기
      const deleteItem = Array.from(document.querySelectorAll('[role="menuitem"]')).find(
        (item) => item.textContent?.includes('Delete')
      ) as HTMLElement;

      if (deleteItem) {
        // disabled 아이템 클릭 시도
        await userEvent.click(deleteItem);
        await new Promise(resolve => setTimeout(resolve, 300));

        // 클릭되지 않았는지 확인 (clicked-item에 Delete가 표시되지 않음)
        // disabled 아이템은 onClick이 실행되지 않아야 함
        const clickedDisplay = canvas.queryByTestId('clicked-item');
        if (clickedDisplay) {
          await expect(clickedDisplay.textContent).not.toContain('Delete');
        }
      }

      // 정상 아이템은 클릭 가능한지 확인
      const editItem = Array.from(document.querySelectorAll('[role="menuitem"]')).find(
        (item) => item.textContent?.includes('Edit')
      ) as HTMLElement;

      await userEvent.click(editItem);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Edit가 클릭되었는지 확인
      const clickedDisplay = canvas.getByTestId('clicked-item');
      await expect(clickedDisplay.textContent).toContain('Edit');
    });
  },
};
