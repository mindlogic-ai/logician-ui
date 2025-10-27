import React, { useState } from 'react';
import { Stack, Switch, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    isChecked: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'], // Available sizes in Chakra's Switch
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

// Uncontrolled Story: Allows toggling without external state management
export const Uncontrolled: Story = {
  args: {
    size: 'md',
    isDisabled: false,
  },
};

// Controlled Story: Manage state externally
export const Controlled: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
      setIsChecked(!isChecked);
    };

    return (
      <Stack direction="row" align="center" spacing={4}>
        <Switch
          {...args}
          isChecked={isChecked} // Controlled isChecked state
          onChange={handleToggle} // Toggling state
        />
        <Text>{isChecked ? 'On' : 'Off'}</Text>
      </Stack>
    );
  },
  args: {
    size: 'md',
    isDisabled: false,
  },
};

// Disabled Story: Switch in a disabled state
export const Disabled: Story = {
  args: {
    size: 'md',
    isDisabled: true,
    isChecked: true,
  },
};

/**
 * Component Test: Switch 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 클릭 시 on/off 토글되는지
 * - label과 함께 사용 시 정상 작동하는지
 *
 * Bad Path:
 * - disabled 상태에서 토글 불가능한지
 */
export const InteractionTest: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    const [labelChecked, setLabelChecked] = useState(false);

    return (
      <Stack spacing={8} align="flex-start">
        <Stack direction="column" spacing={4}>
          <Text fontWeight="semibold">Toggle Switch</Text>
          <Switch
            data-testid="toggle-switch"
            isChecked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <Text fontSize="sm">Status: {isChecked ? 'On' : 'Off'}</Text>
        </Stack>

        <Stack direction="column" spacing={4}>
          <Text fontWeight="semibold">Switch with Label</Text>
          <Stack direction="row" align="center" spacing={3}>
            <Switch
              id="label-switch"
              isChecked={labelChecked}
              onChange={(e) => setLabelChecked(e.target.checked)}
            />
            <Text as="label" htmlFor="label-switch" cursor="pointer">
              Enable notifications
            </Text>
          </Stack>
          <Text fontSize="sm">Status: {labelChecked ? 'Enabled' : 'Disabled'}</Text>
        </Stack>

        <Stack direction="column" spacing={4}>
          <Text fontWeight="semibold">Disabled Switch</Text>
          <Switch data-testid="disabled-switch" isDisabled />
          <Text fontSize="sm" color="gray.500">
            This switch is disabled
          </Text>
        </Stack>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('초기 상태가 off인지 확인', async () => {
      const toggleWrapper = canvas.getByTestId('toggle-switch');
      // Chakra Switch의 실제 input 요소 찾기
      const toggleSwitch = toggleWrapper.querySelector('input[type="checkbox"]') as HTMLInputElement;

      await expect(toggleSwitch).not.toBeChecked();

      const statusText = canvas.getByText('Status: Off');
      await expect(statusText).toBeInTheDocument();
    });

    await step('클릭 시 on으로 토글되는지 확인', async () => {
      const toggleWrapper = canvas.getByTestId('toggle-switch');
      const toggleSwitch = toggleWrapper.querySelector('input[type="checkbox"]') as HTMLInputElement;

      await userEvent.click(toggleSwitch);
      await expect(toggleSwitch).toBeChecked();

      const statusText = canvas.getByText('Status: On');
      await expect(statusText).toBeInTheDocument();
    });

    await step('다시 클릭 시 off로 토글되는지 확인', async () => {
      const toggleWrapper = canvas.getByTestId('toggle-switch');
      const toggleSwitch = toggleWrapper.querySelector('input[type="checkbox"]') as HTMLInputElement;

      await userEvent.click(toggleSwitch);
      await expect(toggleSwitch).not.toBeChecked();

      const statusText = canvas.getByText('Status: Off');
      await expect(statusText).toBeInTheDocument();
    });

    await step('label 클릭 시 switch가 토글되는지 확인', async () => {
      const label = canvas.getByText('Enable notifications');
      const labelSwitch = canvasElement.querySelector('#label-switch') as HTMLInputElement;

      // label 클릭
      await userEvent.click(label);
      await expect(labelSwitch).toBeChecked();

      const statusText = canvas.getByText('Status: Enabled');
      await expect(statusText).toBeInTheDocument();
    });

    await step('label을 통해 다시 토글되는지 확인', async () => {
      const label = canvas.getByText('Enable notifications');
      const labelSwitch = canvasElement.querySelector('#label-switch') as HTMLInputElement;

      // label 다시 클릭
      await userEvent.click(label);
      await expect(labelSwitch).not.toBeChecked();

      const statusText = canvas.getByText('Status: Disabled');
      await expect(statusText).toBeInTheDocument();
    });

    await step('disabled 상태에서 토글 불가능한지 확인', async () => {
      const disabledWrapper = canvas.getByTestId('disabled-switch');
      const disabledSwitch = disabledWrapper.querySelector('input[type="checkbox"]') as HTMLInputElement;

      await expect(disabledSwitch).toBeDisabled();

      // disabled switch 클릭 시도
      await userEvent.click(disabledSwitch);

      // 여전히 체크되지 않은 상태여야 함
      await expect(disabledSwitch).not.toBeChecked();
    });
  },
};
