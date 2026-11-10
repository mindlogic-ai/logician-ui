'use client';

import React from 'react';

import { Button } from '@/components/Button';
import { useTranslate } from '@/hooks/useTranslate';

import { Modal } from '../Modal';
import { MODAL_MAX_H } from '../Modal.styles';
import { ModalBody } from '../ModalBody';
import { ModalCloseButton } from '../ModalCloseButton';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';
import { ViewModalProps } from './ViewModal.types';

/**
 * A modal that only shows something: a detail, a preview, the result of a
 * bulk action. Nothing in it can be lost, so every way out closes it — the
 * close button, Esc, a backdrop click, and the single footer button.
 *
 * The title is required and sits in the header, so it names the dialog. Past
 * `min(820px, 85dvh)` only the body scrolls, and that scroll stops at the
 * dialog instead of carrying on into the page behind it.
 *
 * One button by design. A modal that also needs a [저장] or a [삭제] is a
 * `FormModal` or a confirm, not this.
 *
 * ```tsx
 * <ViewModal open={open} onClose={close} title="그룹 지정 결과">
 *   <ResultTable rows={rows} />
 * </ViewModal>
 * ```
 */
export const ViewModal = ({
  open,
  onClose,
  title,
  subtitle,
  size = 'lg',
  closeLabel,
  children,
}: ViewModalProps) => {
  const translate = useTranslate();

  return (
    <Modal
      open={open}
      size={size}
      scrollBehavior="inside"
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <ModalContent maxH={MODAL_MAX_H}>
        <ModalHeader subtitle={subtitle}>{title}</ModalHeader>
        <ModalCloseButton aria-label={translate('close') as string} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>
            {closeLabel ?? translate('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
