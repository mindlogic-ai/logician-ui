'use client';

import React, {
  FormEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { chakra } from '@chakra-ui/react';

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@/components/Modal';
import { MODAL_MAX_H } from '@/components/Modal/Modal.styles';
import { useTranslate } from '@/hooks/useTranslate';
import { easings, MOTION_DURATION_MS } from '@/theme/motion';

import { FormModalProps } from './FormModal.types';
import { FormModalContext } from './FormModalContext';

/**
 * Big enough to see, small enough not to read as the dialog opening again.
 * Scale rather than a sideways shake: `Shake` means "that answer is wrong", and
 * nothing is wrong here — the dialog is only saying it is still open.
 */
const NUDGE_KEYFRAMES = { scale: ['1', '1.02', '1'] };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * A modal that collects input: create, edit, rename.
 *
 * What it decides so the caller does not:
 *
 * - **A click on the backdrop does not close it.** It nudges the dialog
 *   instead, so a stray click outside never throws away what was typed. The
 *   close button, Esc and Cancel still close it at once — those are deliberate.
 * - **It is a `<form>`.** Enter in a field submits, and `onSubmit` receives no
 *   event to `preventDefault`.
 * - **The submit button waits for the form to be valid.** While any native
 *   constraint fails — an empty `required` field, a malformed
 *   `type="email"` — `FormModalFooter`'s submit button is disabled and Enter
 *   does nothing. Mark fields `required` on the input (`Field.Root required`
 *   does it for you); a rule the browser cannot check goes in the footer's
 *   `submitDisabled`.
 * - **The title is required** and sits in the header, so it names the dialog.
 * - **Tall forms scroll inside.** Past `min(820px, 85dvh)` only the body
 *   scrolls; the header and footer stay put.
 *
 * Children are the body and the footer, so the footer keeps its own options
 * (a far-left delete, a danger submit, loading text):
 *
 * ```tsx
 * <FormModal open={open} onClose={close} title="카테고리 추가"
 *   onSubmit={handleSubmit(save)}>
 *   <ModalBody>…fields…</ModalBody>
 *   <FormModalFooter onCancel={close} cancelLabel="취소"
 *     submitLabel="추가" isSubmitting={isSubmitting} />
 * </FormModal>
 * ```
 *
 * Leave `FormModalFooter`'s `onSubmit` unset here — the button then submits
 * this form, which is what gives Enter and the validity gate.
 */
export const FormModal = ({
  open,
  onClose,
  title,
  subtitle,
  size = 'md',
  onSubmit,
  children,
}: FormModalProps) => {
  const translate = useTranslate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const nudgeRef = useRef<Animation | null>(null);
  const [invalid, setInvalid] = useState(false);

  const readValidity = useCallback(() => {
    const form = formRef.current;
    if (form) setInvalid(!form.checkValidity());
  }, []);

  // Typing is caught by `onInput`/`onChange` below. This catches the rest — a
  // caller resetting or prefilling the fields re-renders through here, and the
  // form only exists once the dialog has mounted. Same value bails out, so
  // running on every render does not loop.
  useLayoutEffect(readValidity);

  const setFormRef = useCallback((node: HTMLFormElement | null) => {
    formRef.current = node;
    // Children commit before this ref is set, so the fields are already there.
    if (node) setInvalid(!node.checkValidity());
  }, []);

  const nudge = useCallback(() => {
    const content = formRef.current?.closest<HTMLElement>(
      '[data-scope="dialog"][data-part="content"]'
    );
    if (!content || typeof content.animate !== 'function') return;
    if (prefersReducedMotion()) return;
    // Only our own animation — cancelling every animation on the element would
    // also cut the dialog's entrance short when the click lands mid-open.
    nudgeRef.current?.cancel();
    nudgeRef.current = content.animate(NUDGE_KEYFRAMES, {
      duration: MOTION_DURATION_MS.base,
      easing: easings.standard.value,
    });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // React events bubble along the component tree, not the DOM, so without
    // this a FormModal opened from inside another form submits that one too.
    event.stopPropagation();
    if (!event.currentTarget.checkValidity()) return;
    onSubmit();
  };

  const ctx = useMemo(() => ({ invalid }), [invalid]);

  return (
    <Modal
      open={open}
      size={size}
      scrollBehavior="inside"
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      // Blocks both ways out that are not a choice: a backdrop click and focus
      // leaving the dialog. Only the click nudges — focus moving away is not
      // something the person did to the dialog.
      closeOnInteractOutside={false}
      onPointerDownOutside={nudge}
    >
      <ModalContent maxH={MODAL_MAX_H}>
        <FormModalContext.Provider value={ctx}>
          {/* `noValidate`: the browser's own bubbles never get a chance to
              show, since submit is disabled until the form is valid. */}
          <chakra.form
            ref={setFormRef}
            noValidate
            onSubmit={handleSubmit}
            onInput={readValidity}
            onChange={readValidity}
            // Keeps the dialog's column layout going through the form, so a
            // tall body still scrolls between a fixed header and footer.
            display="flex"
            flexDirection="column"
            flex="1"
            minH={0}
          >
            <ModalHeader subtitle={subtitle}>{title}</ModalHeader>
            <ModalCloseButton aria-label={translate('close') as string} />
            {children}
          </chakra.form>
        </FormModalContext.Provider>
      </ModalContent>
    </Modal>
  );
};
