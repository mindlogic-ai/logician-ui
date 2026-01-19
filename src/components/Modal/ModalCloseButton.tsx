import React from 'react';
import { CloseButton, Dialog } from '@chakra-ui/react';

/**
 * Modal Close Button Component
 *
 * IMPORTANT: Chakra UI v3의 Dialog.CloseTrigger는 단독으로 사용하면 아이콘이 표시되지 않습니다.
 * asChild 패턴과 함께 CloseButton 컴포넌트를 내부에 포함해야 X 아이콘이 정상적으로 렌더링됩니다.
 *
 * @example
 * <Modal open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
 *   <ModalOverlay />
 *   <ModalContent>
 *     <ModalHeader>Title</ModalHeader>
 *     <ModalCloseButton />
 *     <ModalBody>Content</ModalBody>
 *   </ModalContent>
 * </Modal>
 */
export const ModalCloseButton = ({ ...rest }: Dialog.CloseTriggerProps) => {
  return (
    <Dialog.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...rest}
      asChild
    >
      <CloseButton
        size="sm"
        color="gray.600"
        _hover={{
          color: 'primary.main',
          backgroundColor: 'transparent',
        }}
      />
    </Dialog.CloseTrigger>
  );
};
