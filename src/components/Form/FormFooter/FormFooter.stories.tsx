import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Subtitle } from '@/components/Typography';

import { FormFooter } from './FormFooter';

const meta: Meta<typeof FormFooter> = {
  title: 'Components/Form/FormFooter',
  component: FormFooter,
  decorators: [
    (Story) => (
      <Box w="420px" bg="bg.canvas">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The sticky footer shell shared by the studio settings footer and ' +
          'the image/video generation footers: an optional left `start` slot ' +
          'against a right group of `meta` + `action`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormFooter>;

/** Studio settings footer shape: destructive start + saved-at meta + save action. */
export const WithStartMetaAndAction: Story = {
  args: {
    start: (
      <Button size="sm" variant="ghost" colorPalette="danger">
        Delete
      </Button>
    ),
    meta: <Subtitle>Updated 2 minutes ago</Subtitle>,
    action: (
      <Button size="sm" variant="solid">
        Save
      </Button>
    ),
  },
};

/** Media generation footer shape: a single full-width action. */
export const FullWidthAction: Story = {
  args: {
    action: (
      <Button variant="solid" size="lg" w="100%">
        Generate image · 12
      </Button>
    ),
  },
};

export const ActionOnly: Story = {
  args: {
    action: (
      <Button size="sm" variant="solid">
        Save
      </Button>
    ),
  },
};
