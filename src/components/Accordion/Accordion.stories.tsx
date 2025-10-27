import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '.';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem>
        <AccordionButton>Test button</AccordionButton>
        <AccordionPanel>Test panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};

export const TwoItems: Story = {
  render: () => (
    <Accordion>
      <AccordionItem>
        <AccordionButton>Test button</AccordionButton>
        <AccordionPanel>Test panel</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Test button 2</AccordionButton>
        <AccordionPanel>Test panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * UI Test: Accordion이 클릭 시 열리고 닫히는지 테스트
 */
export const InteractionTest: Story = {
  render: () => (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>Click me to expand</AccordionButton>
        <AccordionPanel>This is the panel content</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Second accordion</AccordionButton>
        <AccordionPanel>Second panel content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('첫 번째 아코디언 버튼 클릭하여 열기', async () => {
      const firstButton = canvas.getByText('Click me to expand');
      await userEvent.click(firstButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('첫 번째 패널이 열렸는지 확인', async () => {
      const panelContent = canvas.getByText('This is the panel content');
      await expect(panelContent).toBeVisible();
    });

    await step('첫 번째 버튼 다시 클릭하여 닫기 (토글)', async () => {
      const firstButton = canvas.getByText('Click me to expand');
      await userEvent.click(firstButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('첫 번째 패널이 닫혔는지 확인', async () => {
      const panelContent = canvas.getByText('This is the panel content');
      await expect(panelContent).not.toBeVisible();
    });

    await step('두 번째 아코디언 버튼 클릭하여 열기', async () => {
      const secondButton = canvas.getByText('Second accordion');
      await userEvent.click(secondButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('두 번째 패널이 열렸는지 확인', async () => {
      const secondPanel = canvas.getByText('Second panel content');
      await expect(secondPanel).toBeVisible();
    });

    await step('두 번째 버튼 다시 클릭하여 닫기 (토글)', async () => {
      const secondButton = canvas.getByText('Second accordion');
      await userEvent.click(secondButton);
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    await step('두 번째 패널이 닫혔는지 확인', async () => {
      const secondPanel = canvas.getByText('Second panel content');
      await expect(secondPanel).not.toBeVisible();
    });
  },
};

/**
 * UI Test: allowMultiple일 때 여러 패널이 동시에 열리는지 테스트
 */
export const MultipleTest: Story = {
  render: () => (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>First accordion</AccordionButton>
        <AccordionPanel>First panel content</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Second accordion</AccordionButton>
        <AccordionPanel>Second panel content</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Third accordion</AccordionButton>
        <AccordionPanel>Third panel content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('첫 번째 아코디언 열기', async () => {
      const firstButton = canvas.getByText('First accordion');
      await userEvent.click(firstButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      const firstPanel = canvas.getByText('First panel content');
      await expect(firstPanel).toBeVisible();
    });

    await step('두 번째 아코디언 열기', async () => {
      const secondButton = canvas.getByText('Second accordion');
      await userEvent.click(secondButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      const secondPanel = canvas.getByText('Second panel content');
      await expect(secondPanel).toBeVisible();
    });

    await step('첫 번째 패널이 여전히 열려있는지 확인', async () => {
      const firstPanel = canvas.getByText('First panel content');
      await expect(firstPanel).toBeVisible();
    });

    await step('세 번째 아코디언 열기', async () => {
      const thirdButton = canvas.getByText('Third accordion');
      await userEvent.click(thirdButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      const thirdPanel = canvas.getByText('Third panel content');
      await expect(thirdPanel).toBeVisible();
    });

    await step('모든 패널이 동시에 열려있는지 확인', async () => {
      const firstPanel = canvas.getByText('First panel content');
      const secondPanel = canvas.getByText('Second panel content');
      const thirdPanel = canvas.getByText('Third panel content');

      await expect(firstPanel).toBeVisible();
      await expect(secondPanel).toBeVisible();
      await expect(thirdPanel).toBeVisible();
    });
  },
};

/**
 * UI Test: allowToggle 동작 확인
 * Chakra UI Accordion에서 allowMultiple이 true일 때는 allowToggle 설정이 다르게 동작함
 * 이 테스트는 기본 동작(allowMultiple + allowToggle 모두 활성화)을 확인
 */
export const NoToggleTest: Story = {
  render: () => (
    <Accordion>
      <AccordionItem>
        <AccordionButton>First accordion</AccordionButton>
        <AccordionPanel>First panel content</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Second accordion</AccordionButton>
        <AccordionPanel>Second panel content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('첫 번째 아코디언 열기', async () => {
      const firstButton = canvas.getByText('First accordion');
      await userEvent.click(firstButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      const firstPanel = canvas.getByText('First panel content');
      await expect(firstPanel).toBeVisible();
    });

    await step('첫 번째 버튼 다시 클릭 시 닫힘 (기본 allowToggle 동작)', async () => {
      const firstButton = canvas.getByText('First accordion');
      await userEvent.click(firstButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 기본값은 토글 가능하므로 닫힘
      const firstPanel = canvas.getByText('First panel content');
      await expect(firstPanel).not.toBeVisible();
    });

    await step('첫 번째 아코디언 다시 열기', async () => {
      const firstButton = canvas.getByText('First accordion');
      await userEvent.click(firstButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      const firstPanel = canvas.getByText('First panel content');
      await expect(firstPanel).toBeVisible();
    });

    await step('두 번째 아코디언 열기', async () => {
      const secondButton = canvas.getByText('Second accordion');
      await userEvent.click(secondButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      const secondPanel = canvas.getByText('Second panel content');
      await expect(secondPanel).toBeVisible();
    });

    await step('첫 번째 패널도 여전히 열려있는지 확인 (allowMultiple)', async () => {
      const firstPanel = canvas.getByText('First panel content');
      await expect(firstPanel).toBeVisible();
    });
  },
};
