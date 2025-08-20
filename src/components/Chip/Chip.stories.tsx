import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import { Chip, useCaseStyles } from '.';
import { ChipUseCase } from './Chip.types';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    children: 'Chip',
  },
  argTypes: {},
};

export default meta;
type Story = StoryFn<typeof Chip>;

export const Basic: Story = args => <Chip {...args} />;

export const AllChipVariants: Story = args => {
  const useCases = Object.keys(useCaseStyles) as Array<ChipUseCase>;
  const variants = ['solid', 'outline', 'subtle'];
  return (
    <Box>
      <Flex mb="16px" gap="16px" align="center">
        <p>default</p>
        <Chip {...args} />
      </Flex>
      {useCases.map(useCase => (
        <Flex mb="16px" gap="16px" align="center">
          <p style={{ width: '100px' }}>{useCase}</p>
          {variants.map(variant => (
            <div>
              <p>{variant}</p>
              <Chip {...args} useCase={useCase} variant={variant} />
            </div>
          ))}
        </Flex>
      ))}
    </Box>
  );
};
