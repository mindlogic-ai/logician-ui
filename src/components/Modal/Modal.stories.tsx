/**
 * Modal Component Stories
 *
 * Modal 컴포넌트는 Chakra UI v3의 Dialog를 기반으로 합니다.
 *
 * ## 주요 구성 요소
 * - Modal (Dialog.Root): 모달의 루트 컨테이너
 * - ModalContent (Dialog.Content): 모달의 실제 콘텐츠 영역
 * - ModalHeader (Dialog.Header): 모달 헤더
 * - ModalCloseButton (Dialog.CloseTrigger + CloseButton): 닫기 버튼
 * - ModalBody (Dialog.Body): 모달 본문
 * - ModalFooter (Dialog.Footer): 모달 푸터
 *
 * ## 중요: ModalCloseButton 사용법
 * Chakra UI v3에서는 Dialog.CloseTrigger에 asChild 패턴과 CloseButton을 함께 사용해야
 * X 아이콘이 정상적으로 표시됩니다. 단독으로 사용하면 아이콘이 보이지 않습니다.
 *
 * @see ModalCloseButton.tsx - 구현 세부사항 확인
 */
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
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            {args.headerTitle && <ModalHeader>{args.headerTitle}</ModalHeader>}
            {args.hasCloseButton && <ModalCloseButton />}
            <ModalBody>열려라 참깨!</ModalBody>
            {args.footerButtons && (
              <ModalFooter>
                {args.footerButtons.map((button, index) => (
                  <Button key={index} variant={button.variant || 'soft'}>
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
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            {args.headerTitle && <ModalHeader>{args.headerTitle}</ModalHeader>}
            {args.hasCloseButton && <ModalCloseButton />}
            <ModalBody>열려라 참깨!</ModalBody>
            {args.footerButtons && (
              <ModalFooter>
                {args.footerButtons.map((button, index) => (
                  <Button key={index} variant={button.variant || 'soft'}>
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
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            {args.headerTitle && <ModalHeader>{args.headerTitle}</ModalHeader>}
            {args.hasCloseButton && <ModalCloseButton />}
            <ModalBody>열려라 참깨!</ModalBody>
            {args.footerButtons && (
              <ModalFooter>
                {args.footerButtons.map((button, index) => (
                  <Button key={index} variant={button.variant || 'soft'}>
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
      { label: 'Cancel', variant: 'ghost' },
      { label: 'Save', variant: 'solid' },
    ],
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Confirm Modal</Button>
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            {args.headerTitle && <ModalHeader>{args.headerTitle}</ModalHeader>}
            {args.hasCloseButton && <ModalCloseButton />}
            <ModalBody>열려라 참깨!</ModalBody>
            {args.footerButtons && (
              <ModalFooter>
                {args.footerButtons.map((button, index) => (
                  <Button key={index} variant={button.variant || 'soft'}>
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

/**
 * 닫기 버튼이 있는 모달
 *
 * ModalCloseButton은 Chakra UI v3의 Dialog.CloseTrigger와 CloseButton을 조합하여
 * 우측 상단에 X 아이콘을 표시합니다. asChild 패턴을 사용하지 않으면 아이콘이 보이지 않습니다.
 */
export const WithCloseButton: Story = {
  args: {
    headerTitle: 'Modal with Close Button',
    hasCloseButton: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            <ModalHeader>{args.headerTitle}</ModalHeader>
            {/* ModalCloseButton: Dialog.CloseTrigger + CloseButton 조합 */}
            <ModalCloseButton />
            <ModalBody>
              이 모달은 우측 상단에 닫기 버튼이 있습니다. 버튼을 클릭하거나 ESC 키를
              눌러 닫을 수 있습니다.
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

/**
 * 닫기 버튼이 없는 모달
 *
 * ModalCloseButton을 추가하지 않으면 X 아이콘이 표시되지 않습니다.
 * Overlay 클릭 또는 ESC 키로만 닫을 수 있습니다.
 */
export const WithoutCloseButton: Story = {
  args: {
    headerTitle: 'Modal without Close Button',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            <ModalHeader>{args.headerTitle}</ModalHeader>
            {/* ModalCloseButton이 없음 - 닫기 버튼 X 아이콘이 표시되지 않음 */}
            <ModalBody>
              이 모달은 닫기 버튼이 없습니다. Overlay를 클릭하거나 ESC 키를 눌러
              닫을 수 있습니다.
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

export const WithoutHeader: Story = {
  args: {},
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              헤더가 없는 심플한 모달입니다. 닫기 버튼은 우측 상단에 있습니다.
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="solid" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

export const WithoutFooter: Story = {
  args: {
    headerTitle: 'Information',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            <ModalHeader>{args.headerTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              푸터가 없는 모달입니다. 단순 정보 전달용으로 사용할 수 있습니다.
              닫기 버튼이나 Overlay 클릭으로 닫을 수 있습니다.
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

export const FullFeatured: Story = {
  args: {
    headerTitle: 'Complete Modal Example',
    hasCloseButton: true,
    footerButtons: [
      { label: 'Cancel', variant: 'ghost' },
      { label: 'Delete', variant: 'solid' },
    ],
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            <ModalHeader>{args.headerTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              헤더, 바디, 푸터, 닫기 버튼이 모두 포함된 완전한 모달 예제입니다. 모든
              요소가 조화롭게 배치되어 있습니다.
            </ModalBody>
            <ModalFooter>
              {args.footerButtons?.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || 'soft'}
                  onClick={() => setIsOpen(false)}
                >
                  {button.label}
                </Button>
              ))}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

export const MinimalModal: Story = {
  args: {},
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
          <ModalContent>
            <ModalBody>
              헤더, 푸터, 닫기 버튼이 모두 없는 가장 단순한 형태의 모달입니다.
              Overlay 클릭이나 ESC 키로만 닫을 수 있습니다.
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);

    return (
      <>
        <Button onClick={() => setOpenSize('xs')} mr={2}>
          XS Size
        </Button>
        <Button onClick={() => setOpenSize('sm')} mr={2}>
          SM Size
        </Button>
        <Button onClick={() => setOpenSize('md')} mr={2}>
          MD Size
        </Button>
        <Button onClick={() => setOpenSize('lg')} mr={2}>
          LG Size
        </Button>
        <Button onClick={() => setOpenSize('xl')}>XL Size</Button>

        <Modal
          open={!!openSize}
          onOpenChange={(e) => !e.open && setOpenSize(null)}
          size={openSize as any}
        >
          <ModalContent>
            <ModalHeader>Modal Size: {openSize?.toUpperCase()}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              현재 모달 크기는 {openSize}입니다. 다양한 크기의 모달을 테스트해보세요.
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

export const DifferentPlacements: Story = {
  render: () => {
    const [openPlacement, setOpenPlacement] = useState<string | null>(null);

    return (
      <>
        <Button onClick={() => setOpenPlacement('top')} mr={2}>
          Top Placement
        </Button>
        <Button onClick={() => setOpenPlacement('center')} mr={2}>
          Center Placement
        </Button>
        <Button onClick={() => setOpenPlacement('bottom')}>
          Bottom Placement
        </Button>

        <Modal
          open={!!openPlacement}
          onOpenChange={(e) => !e.open && setOpenPlacement(null)}
          placement={openPlacement as any}
        >
          <ModalContent>
            <ModalHeader>
              Placement: {openPlacement?.charAt(0).toUpperCase()}
              {openPlacement?.slice(1)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              모달이 화면의 {openPlacement === 'top' ? '상단' : openPlacement === 'center' ? '중앙' : '하단'}
              에 표시됩니다.
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setOpenPlacement(null)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

export const PreventOutsideClick: Story = {
  args: {
    headerTitle: 'Cannot Close by Outside Click',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          open={isOpen}
          onOpenChange={(e) => setIsOpen(e.open)}
          closeOnInteractOutside={false}
        >
          <ModalContent>
            <ModalHeader>{args.headerTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              이 모달은 Overlay를 클릭해도 닫히지 않습니다. 닫기 버튼이나 ESC 키를
              사용하세요.
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  },
};
