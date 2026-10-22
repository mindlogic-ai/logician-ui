import { useState } from 'react';
import { Button, CloseButton, Heading, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Tab } from '@/components/Tabs/Tab/Tab';
import { TAB_RAMP } from '@/components/Tabs/Tab/Tab.styles';
import { TabList } from '@/components/Tabs/TabList';
import { TabPanel } from '@/components/Tabs/TabPanel';
import { TabPanels } from '@/components/Tabs/TabPanels';

import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: 'tab1',
    children: (
      <>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel value="tab1">Tab 1 content</TabPanel>
        <TabPanel value="tab2">Tab 2 content</TabPanel>
        <TabPanel value="tab3">Tab 3 content</TabPanel>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    defaultValue: 'tab1',
    children: (
      <>
        <TabList maxW="300px">
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel value="tab1">Tab 1 content</TabPanel>
        <TabPanel value="tab2">Tab 2 content</TabPanel>
        <TabPanel value="tab3">Tab 3 content</TabPanel>
      </>
    ),
  },
};

interface TabItem {
  id: string;
  title: string;
  content: string;
}

const initialTabs: TabItem[] = [
  { id: '1', title: 'Tab 1', content: 'Content for Tab 1' },
  { id: '2', title: 'Tab 2', content: 'Content for Tab 2' },
  { id: '3', title: 'Tab 3', content: 'Content for Tab 3' },
];

const uuid = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const CustomStyles: Story = {
  args: {
    defaultValue: 'profile',
    children: (
      <>
        <TabList borderBottom="2px solid" borderColor="border.subtle" gap={1}>
          <Tab
            value="profile"
            bg="transparent"
            color="fg.muted"
            fontWeight="medium"
            px={6}
            py={3}
            borderRadius="md"
            _selected={{
              bg: 'category.blue.fg',
              color: 'fg.onPrimary',
              fontWeight: 'bold',
            }}
            _hover={{
              bg: 'category.blue.surface',
              color: 'category.blue.fg',
            }}
          >
            Profile
          </Tab>
          <Tab
            value="settings"
            bg="transparent"
            color="fg.muted"
            fontWeight="medium"
            px={6}
            py={3}
            borderRadius="md"
            _selected={{
              bg: 'category.green.fg',
              color: 'fg.onPrimary',
              fontWeight: 'bold',
            }}
            _hover={{
              bg: 'category.green.surface',
              color: 'category.green.fg',
            }}
          >
            Settings
          </Tab>
          <Tab
            value="notifications"
            bg="transparent"
            color="fg.muted"
            fontWeight="medium"
            px={6}
            py={3}
            borderRadius="md"
            _selected={{
              bg: 'category.purple.fg',
              color: 'fg.onPrimary',
              fontWeight: 'bold',
            }}
            _hover={{
              bg: 'category.purple.surface',
              color: 'category.purple.fg',
            }}
          >
            Notifications
          </Tab>
        </TabList>
        <TabPanel
          value="profile"
          bg="category.blue.surface"
          p={6}
          borderRadius="md"
          mt={4}
        >
          <Heading size="md" mb={3} color="category.blue.fg">
            Profile Settings
          </Heading>
          <Text color="fg.muted">
            Manage your profile information and preferences.
          </Text>
        </TabPanel>
        <TabPanel
          value="settings"
          bg="category.green.surface"
          p={6}
          borderRadius="md"
          mt={4}
        >
          <Heading size="md" mb={3} color="category.green.fg">
            General Settings
          </Heading>
          <Text color="fg.muted">
            Configure your account settings and preferences.
          </Text>
        </TabPanel>
        <TabPanel
          value="notifications"
          bg="category.purple.surface"
          p={6}
          borderRadius="md"
          mt={4}
        >
          <Heading size="md" mb={3} color="category.purple.fg">
            Notification Preferences
          </Heading>
          <Text color="fg.muted">
            Manage how and when you receive notifications.
          </Text>
        </TabPanel>
      </>
    ),
  },
};

export const DynamicTabs: Story = {
  render: () => {
    const [tabs, setTabs] = useState<TabItem[]>(initialTabs);
    const [selectedTab, setSelectedTab] = useState<string>(initialTabs[0].id);

    const addTab = () => {
      const newTabs = [...tabs];
      const uid = uuid();
      const newTab = {
        id: uid,
        title: `Tab ${tabs.length + 1}`,
        content: `Content for Tab ${tabs.length + 1}`,
      };
      newTabs.push(newTab);
      setTabs(newTabs);
      setSelectedTab(uid);
    };

    const removeTab = (id: string) => {
      if (tabs.length > 1) {
        const newTabs = tabs.filter((tab) => tab.id !== id);
        setTabs(newTabs);
        // If removing the selected tab, select the first tab
        if (id === selectedTab) {
          setSelectedTab(newTabs[0].id);
        }
      }
    };

    return (
      <Tabs
        value={selectedTab}
        onValueChange={(details) => setSelectedTab(details.value)}
      >
        <TabList>
          {tabs.map((item) => (
            <Tab value={item.id} key={item.id}>
              {item.title}
              <CloseButton
                as="span"
                role="button"
                size="xs"
                ms={2}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(item.id);
                }}
              />
            </Tab>
          ))}
          <Button
            alignSelf="center"
            ms={2}
            size="sm"
            variant="ghost"
            onClick={addTab}
          >
            + Add Tab
          </Button>
        </TabList>

        <TabPanels>
          {tabs.map((item) => (
            <TabPanel value={item.id} key={item.id}>
              <Heading size="lg" my={4}>
                {item.title}
              </Heading>
              <Text>{item.content}</Text>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Tabs.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`).

export const DoSectionsOfOnePlace: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: sections of one place, with a named list',
  render: () => (
    <Tabs defaultValue="credit">
      <TabList aria-label="그룹 설정">
        <Tab value="credit">크레딧</Tab>
        <Tab value="security">보안</Tab>
        <Tab value="notice">공지</Tab>
      </TabList>
      <TabPanel value="credit" pt={4}>
        <Text>이 그룹의 월간 크레딧 한도와 사용량입니다.</Text>
      </TabPanel>
      <TabPanel value="security" pt={4}>
        <Text>로그인과 파일 업로드 정책입니다.</Text>
      </TabPanel>
      <TabPanel value="notice" pt={4}>
        <Text>이 그룹에만 보이는 공지입니다.</Text>
      </TabPanel>
    </Tabs>
  ),
};

export const DontTabsAsSteps: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: tabs as the steps of a flow",
  render: () => (
    <Tabs defaultValue="step1">
      <TabList>
        <Tab value="step1">1. 기본 정보</Tab>
        <Tab value="step2">2. 모델 선택</Tab>
        <Tab value="step3">3. 확인</Tab>
      </TabList>
      <TabPanel value="step1" pt={4}>
        <Text>이름과 설명을 입력하세요.</Text>
      </TabPanel>
      <TabPanel value="step2" pt={4}>
        <Text>모델을 고르세요.</Text>
      </TabPanel>
      <TabPanel value="step3" pt={4}>
        <Text>입력한 내용을 확인하세요.</Text>
      </TabPanel>
    </Tabs>
  ),
};

/** Tokens a tab reads: the selected ramp from `TAB_RAMP` in `Tab.styles.ts`, the rest from `Tab.tsx` and `TabList.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: TAB_RAMP.label,
          use: <T en="Selected tab · label" ko="선택된 탭 · 글자" />,
        },
        {
          token: TAB_RAMP.indicator,
          use: <T en="Selected tab · indicator" ko="선택된 탭 · 표시 막대" />,
        },
        {
          token: 'fg.muted',
          use: <T en="Other tabs · label" ko="다른 탭 · 글자" />,
        },
        { token: 'primary.wash', use: <T en="Hover" ko="마우스 올림" /> },
        {
          token: 'bg.muted',
          use: <T en="Vertical · selected fill" ko="세로 탭 · 선택 배경" />,
        },
        { token: 'border.subtle', use: <T en="List rule" ko="목록 아래 선" /> },
      ]}
    />
  ),
};
