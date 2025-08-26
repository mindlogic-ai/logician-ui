import { useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { StoryFn } from '@storybook/react';

import { Button } from '../Button';
import { GuideCue } from './GuideCue';
import { GuideCueProvider } from './GuideCueContext';
export default {
  title: 'Components/GuideCue',
  component: GuideCue,
  args: {
    page: 'storybook',
    index: 0,
    title: 'Hello',
    description: 'This is a description',
  },
};

const Template: StoryFn<typeof GuideCue> = (args) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  return (
    <GuideCueProvider page="storybook" numSteps={1}>
      <Box p={20}>
        <Button ref={containerRef} mb={20} position="relative">
          Trigger
        </Button>
        <GuideCue {...args} containerRef={containerRef} />
      </Box>
    </GuideCueProvider>
  );
};

export const Default = Template.bind({});

export const MultipleSteps: StoryFn<typeof GuideCue> = (args) => {
  const step1Ref = useRef<HTMLButtonElement>(null);
  const step2Ref = useRef<HTMLButtonElement>(null);
  return (
    <GuideCueProvider page="storybook" numSteps={2}>
      <Flex p={20} gap={4}>
        <Button ref={step1Ref} mb={20} position="relative">
          Bottom popover step
        </Button>
        <Button ref={step2Ref} mb={20} position="relative">
          Right popover step
        </Button>
        <GuideCue {...args} index={0} containerRef={step1Ref} />
        <GuideCue
          {...args}
          index={1}
          containerRef={step2Ref}
          placement="right"
        />
      </Flex>
    </GuideCueProvider>
  );
};
