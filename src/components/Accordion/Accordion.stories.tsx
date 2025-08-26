import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '.';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    children: 'Default Accordion',
  },
};

export default meta;
type Story = StoryFn<typeof Accordion>;

export const Default: Story = (args) => {
  return (
    <Accordion {...args}>
      <AccordionItem>
        <AccordionButton>Test button</AccordionButton>
        <AccordionPanel>Test panel</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export const TwoItems: Story = (args) => {
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
};
