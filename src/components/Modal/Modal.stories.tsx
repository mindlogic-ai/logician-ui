import { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '.';
import { Button } from '../Button';
import { ButtonVariant } from '../Button/Button.types';

interface ModalArgs {
  headerTitle: string;
  hasCloseButton: boolean;
  footerButtons: { label: string; variant?: ButtonVariant }[];
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    headerTitle: 'Default Header',
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
} satisfies Meta<ModalArgs>;

export default meta;

type Story = StoryObj<ModalArgs>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
  },
};

export const WithHeader: Story = {
  args: {
    headerTitle: 'Welcome to Mindlogic!',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

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
  },
};

export const WithFooterButton: Story = {
  args: {
    headerTitle: 'Welcome to Mindlogic!',
    footerButtons: [{ label: 'Confirm' }],
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

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
  },
};

export const TwoButtons: Story = {
  args: {
    footerButtons: [
      { label: 'Cancel', variant: 'tertiary' },
      { label: 'Save', variant: 'primary' },
    ],
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

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
  },
};
