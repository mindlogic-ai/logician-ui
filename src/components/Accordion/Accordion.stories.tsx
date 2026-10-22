import { Box, Flex, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '.';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    children: 'Default Accordion',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Test button</AccordionButton>
          <AccordionPanel>Test panel</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoItems: Story = {
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Test button</AccordionButton>
          <AccordionPanel>Test panel</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Test button 2</AccordionButton>
          <AccordionPanel>Test panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const EnclosedVariant: Story = {
  args: {
    variant: 'enclosed',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const SubtleVariant: Story = {
  args: {
    variant: 'subtle',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const PlainVariant: Story = {
  args: {
    variant: 'plain',
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const Collapsible: Story = {
  args: {
    collapsible: true,
    multiple: false,
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionButton>Section 1 (only one can be open)</AccordionButton>
          <AccordionPanel>Content for section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionButton>Section 2 (only one can be open)</AccordionButton>
          <AccordionPanel>Content for section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionButton>Section 3 (only one can be open)</AccordionButton>
          <AccordionPanel>Content for section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const WithCustomContent: Story = {
  args: {
    lazyMount: true,
    unmountOnExit: true,
  },
  render: (args) => {
    return (
      <Accordion {...args} borderColor="danger.border">
        <AccordionItem value="errors">
          <AccordionButton
            bg="danger.bg"
            p={3}
            borderBottomColor="danger.border"
          >
            <Flex align="center" gap={2}>
              <Box
                as="span"
                fontSize="xl"
                color="danger.fg"
                aria-label="Error icon"
              >
                ⚠️
              </Box>
              <Text fontWeight="bold" color="fg.default">
                Failed Upload Rows (3 errors)
              </Text>
            </Flex>
          </AccordionButton>
          <AccordionPanel p={4}>
            <Box bg="bg.subtle" p={4} borderRadius="md">
              <Text fontSize="sm" color="fg.muted" mb={2}>
                This heavy content is lazy-loaded only when expanded
              </Text>
              <Box as="ul" pl={4}>
                <li>Error 1: Invalid email format</li>
                <li>Error 2: Duplicate entry</li>
                <li>Error 3: Required field missing</li>
              </Box>
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="warnings">
          <AccordionButton
            bg="warning.bg"
            p={3}
            borderBottomColor="warning.border"
          >
            <Flex align="center" gap={2}>
              <Box
                as="span"
                fontSize="xl"
                color="warning.fg"
                aria-label="Warning icon"
              >
                ⚡
              </Box>
              <Text fontWeight="bold" color="fg.default">
                Warning Messages (2 warnings)
              </Text>
            </Flex>
          </AccordionButton>
          <AccordionPanel p={4}>
            <Box bg="bg.subtle" p={4} borderRadius="md">
              <Text fontSize="sm" color="fg.muted">
                Content is mounted when expanded and unmounted when collapsed
                (check React DevTools)
              </Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Accordion.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

const FAQ = [
  {
    q: '요금제를 바꾸면 남은 크레딧은 어떻게 되나요?',
    a: '남은 크레딧은 새 요금제로 그대로 옮겨집니다.',
  },
  {
    q: '팀원을 추가하면 바로 쓸 수 있나요?',
    a: '초대를 수락하는 즉시 쓸 수 있습니다.',
  },
  {
    q: '영수증은 어디에서 받나요?',
    a: '계정 설정의 결제 내역에서 받을 수 있습니다.',
  },
];

export const DoFaq: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: questions the reader scans, answers on demand',
  render: (args) => (
    <Box maxW="560px">
      <Accordion {...args} defaultValue={['faq-0']}>
        {FAQ.map(({ q, a }, i) => (
          <AccordionItem key={q} value={`faq-${i}`}>
            <AccordionButton>{q}</AccordionButton>
            <AccordionPanel>{a}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  ),
};

export const DontHideRequired: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: required steps behind a closed section",
  render: (args) => (
    <Box maxW="560px">
      <Accordion {...args}>
        <AccordionItem value="basic">
          <AccordionButton>기본 정보</AccordionButton>
          <AccordionPanel>이름, 이메일</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="consent">
          <AccordionButton>필수 약관 동의</AccordionButton>
          <AccordionPanel>서비스 이용약관, 개인정보 처리방침</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  ),
};

export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'focus.ring',
          use: (
            <T
              en="AccordionButton · keyboard focus ring"
              ko="AccordionButton · 키보드 초점 링"
            />
          ),
        },
        {
          token: 'bg.canvas',
          use: <T en="Focus ring inner band" ko="초점 링 안쪽 띠" />,
        },
      ]}
    />
  ),
};
