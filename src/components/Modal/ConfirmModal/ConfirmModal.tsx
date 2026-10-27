'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';

import { Button } from '@/components/Button';
import { Text } from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';

import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalCloseButton } from '../ModalCloseButton';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';
import { ConfirmModalProps } from './ConfirmModal.types';

/**
 * A modal that asks one question before an action: 확인 (`tone="primary"`) or
 * 위험 확인 (`tone="danger"`, for what cannot be undone).
 *
 * The third of the preset modals beside `FormModal` (input) and `ViewModal`
 * (view, result) — pick the kind, and the title, buttons, width and backdrop
 * follow from it:
 *
 * - **The title is required** and sits in the header, so it names the dialog.
 *   It is set at `h5`, one step under the other presets: a confirm is a short
 *   question, not a task.
 * - **[취소] [동작]**, the action last. The confirm label is the action's verb.
 * - **Every way out closes it** — close button, Esc, a backdrop click. Nothing
 *   has been typed, so nothing is lost.
 * - **`md` width**, fixed.
 *
 * ```tsx
 * <ConfirmModal open={open} onClose={close}
 *   title={`'${name}'을 삭제할까요?`}
 *   description="삭제하면 되돌릴 수 없습니다."
 *   tone="danger" confirmLabel="삭제" onConfirm={remove} />
 * ```
 */
export const ConfirmModal = ({
  open,
  onClose,
  title,
  description,
  body,
  confirmLabel,
  tone = 'primary',
  onConfirm,
  cancelLabel,
  loading = false,
  confirmLoadingText,
  confirmDisabled = false,
  secondaryAction,
}: ConfirmModalProps) => {
  const translate = useTranslate();

  return (
    <Modal
      open={open}
      size="md"
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <ModalContent>
        <ModalHeader textStyle="h5">{title}</ModalHeader>
        <ModalCloseButton aria-label={translate('close') as string} />
        <ModalBody>
          <Text whiteSpace="pre-line">{description}</Text>
          {body && <Box mt={4}>{body}</Box>}
        </ModalBody>
        <ModalFooter>
          {secondaryAction ? (
            <Button
              variant={
                (secondaryAction.tone ?? 'danger') === 'danger'
                  ? 'danger'
                  : 'primary'
              }
              onClick={secondaryAction.onClick}
              disabled={loading}
              mr="auto"
            >
              {secondaryAction.label}
            </Button>
          ) : (
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              {cancelLabel ?? translate('cancel')}
            </Button>
          )}
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
            loadingText={confirmLoadingText}
            disabled={confirmDisabled}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
