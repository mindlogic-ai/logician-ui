import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/Button.types';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '.';

interface ModalArgs {
  headerTitle: string;
  hasCloseButton: boolean;
  footerButtons: { label: string; variant?: ButtonVariant }[];
}

export default {
  title: 'Components/Modal',
  component: Modal,
  args: {
    header: 'Default Header',
  },
  argTypes: {
    headerTitle: { control: 'text' },
    hasCloseButton: { control: 'boolean', defaultValue: false },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
} as Meta<typeof Modal>;

export const Default: StoryFn<ModalArgs> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          {args.headerTitle && <ModalHeader>{args.headerTitle}</ModalHeader>}
          {args.hasCloseButton && <ModalCloseButton />}
          <ModalBody>열려라 참깨!</ModalBody>
          {args.footerButtons && (
            <ModalFooter>
              {args.footerButtons.map((button, index) => (
                <Button key={index} variant={button.variant || 'primary'}>
                  {button.label}
                </Button>
              ))}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

Default.args = {};

export const WithHeader = Default.bind({});
WithHeader.args = {
  headerTitle: 'Welcome to Mindlogic!',
};

export const WithFooterButton = Default.bind({});
WithFooterButton.args = {
  headerTitle: 'Welcome to Mindlogic!',
  footerButtons: [{ label: 'Confirm' }],
};

export const TwoButtons = Default.bind({});
TwoButtons.args = {
  footerButtons: [
    { label: 'Cancel', variant: 'tertiary' },
    { label: 'Save', variant: 'primary' },
  ],
};
