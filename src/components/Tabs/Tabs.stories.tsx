import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { Tab } from '@/components/Tabs/Tab/Tab';
import { TabList } from '@/components/Tabs/TabList';
import { TabPanel } from '@/components/Tabs/TabPanel';
import { TabPanels } from '@/components/Tabs/TabPanels';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryFn<typeof Tabs>;

const RenderTemplate = (props) => {
  return (
    <Tabs {...props}>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab 1 content</TabPanel>
        <TabPanel>Tab 2 content</TabPanel>
        <TabPanel>Tab 3 content</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const Basic: Story = {
  render: RenderTemplate,
};

export const Vertical: Story = {
  render: RenderTemplate,
  args: {
    orientation: 'vertical',
  },
};

/**
 * Component Test: Tabs 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 탭 클릭 시 해당 패널이 표시되는지
 * - 키보드 화살표로 탭 이동 가능한지
 * - 초기 defaultIndex가 올바르게 선택되는지
 *
 * Bad Path:
 * - disabled 탭은 선택 불가능한지
 */
type InteractionStory = StoryObj<typeof Tabs>;

export const InteractionTest: InteractionStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>
          Normal Tabs (Click & Keyboard)
        </div>
        <Tabs>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Content for Tab 1</TabPanel>
            <TabPanel>Content for Tab 2</TabPanel>
            <TabPanel>Content for Tab 3</TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>
          Another Tabs Group (to test independence)
        </div>
        <Tabs>
          <TabList>
            <Tab>First Tab</Tab>
            <Tab>Second Tab</Tab>
            <Tab>Third Tab</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>First Tab content</TabPanel>
            <TabPanel>Second Tab content</TabPanel>
            <TabPanel>Third Tab content</TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>
          Tabs with Disabled Tab
        </div>
        <Tabs>
          <TabList>
            <Tab>Active Tab 1</Tab>
            <Tab isDisabled>Disabled Tab</Tab>
            <Tab>Active Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Active Tab 1 content</TabPanel>
            <TabPanel>Disabled Tab content (should not be visible)</TabPanel>
            <TabPanel>Active Tab 2 content</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('탭 클릭 시 해당 패널이 표시되는지 확인', async () => {
      // 초기 상태: 첫 번째 탭이 선택되어 있고 첫 번째 패널이 보임
      const tab1Content = canvas.getByText('Content for Tab 1');
      await expect(tab1Content).toBeVisible();

      // Tab 2 클릭
      const tab2Button = canvas.getByText('Tab 2');
      await userEvent.click(tab2Button);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Tab 2 패널이 보이는지 확인
      const tab2Content = canvas.getByText('Content for Tab 2');
      await expect(tab2Content).toBeVisible();

      // Tab 3 클릭
      const tab3Button = canvas.getByText('Tab 3');
      await userEvent.click(tab3Button);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Tab 3 패널이 보이는지 확인
      const tab3Content = canvas.getByText('Content for Tab 3');
      await expect(tab3Content).toBeVisible();
    });

    await step('키보드 화살표로 탭 이동 가능한지 확인', async () => {
      // Tab 1로 돌아가기
      const tab1Button = canvas.getByText('Tab 1');
      await userEvent.click(tab1Button);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Tab 1에 포커스
      tab1Button.focus();
      await new Promise(resolve => setTimeout(resolve, 300));

      // 오른쪽 화살표로 Tab 2로 이동
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 300));

      // Tab 2 패널이 보이는지 확인
      const tab2Content = canvas.getByText('Content for Tab 2');
      await expect(tab2Content).toBeVisible();

      // 오른쪽 화살표로 Tab 3으로 이동
      await userEvent.keyboard('{ArrowRight}');
      await new Promise(resolve => setTimeout(resolve, 300));

      // Tab 3 패널이 보이는지 확인
      const tab3Content = canvas.getByText('Content for Tab 3');
      await expect(tab3Content).toBeVisible();

      // 왼쪽 화살표로 Tab 2로 이동
      await userEvent.keyboard('{ArrowLeft}');
      await new Promise(resolve => setTimeout(resolve, 300));

      // Tab 2 패널이 다시 보이는지 확인
      await expect(tab2Content).toBeVisible();
    });

    await step('초기 선택 상태 확인', async () => {
      // 두 번째 Tabs 그룹도 독립적으로 동작하는지 확인
      // 첫 번째 탭이 기본 선택됨
      const firstContent = canvas.getByText('First Tab content');
      await expect(firstContent).toBeVisible();

      // 두 번째 탭 클릭
      const secondTab = canvas.getByText('Second Tab');
      await userEvent.click(secondTab);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 두 번째 탭 패널이 보이는지 확인
      const secondContent = canvas.getByText('Second Tab content');
      await expect(secondContent).toBeVisible();
    });

    await step('disabled 탭은 선택 불가능한지 확인', async () => {
      // 초기 상태: 첫 번째 탭이 선택됨
      const activeTab1Content = canvas.getByText('Active Tab 1 content');
      await expect(activeTab1Content).toBeVisible();

      // Disabled Tab 클릭 시도
      const disabledTab = canvas.getByText('Disabled Tab');
      await userEvent.click(disabledTab);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 여전히 첫 번째 탭 패널이 보여야 함 (disabled 탭으로 전환되지 않음)
      await expect(activeTab1Content).toBeVisible();

      // disabled 탭의 패널은 보이지 않아야 함
      const disabledContent = canvas.queryByText('Disabled Tab content (should not be visible)');
      if (disabledContent) {
        await expect(disabledContent).not.toBeVisible();
      }

      // Active Tab 2 클릭 (정상 동작 확인)
      const activeTab2 = canvas.getByText('Active Tab 2');
      await userEvent.click(activeTab2);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Active Tab 2 패널이 보이는지 확인
      const activeTab2Content = canvas.getByText('Active Tab 2 content');
      await expect(activeTab2Content).toBeVisible();
    });
  },
};
