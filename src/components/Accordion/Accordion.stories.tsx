import { Meta, StoryObj } from '@storybook/react';

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
        <AccordionItem>
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
        <AccordionItem>
          <AccordionButton>Test button</AccordionButton>
          <AccordionPanel>Test panel</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Test button 2</AccordionButton>
          <AccordionPanel>Test panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};
