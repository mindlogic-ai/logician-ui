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

import { useTranslate } from '@/hooks/useTranslate';
import { easings, MOTION_DURATION_MS } from '@/theme/motion';

import { Modal } from '../Modal';
import { MODAL_MAX_H } from '../Modal.styles';
import { ModalCloseButton } from '../ModalCloseButton';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { FormModalProps } from './FormModal.types';
import { FormModalContext } from './FormModalContext';

/**
 * The same decaying swing as `Shake` (`shake-x` in the theme keyframes), played
 * through the Web Animations API instead of `animationName`: the dialog content
 * already owns `animationName` for its enter and exit, and swapping it would
 * replay the entrance when the shake ended.
 */
const SHAKE_KEYFRAMES: Keyframe[] = [
  { offset: 0, translate: '0 0' },
  { offset: 0.2, translate: '-6px 0' },
  { offset: 0.4, translate: '6px 0' },
  { offset: 0.6, translate: '-3.6px 0' },
  { offset: 0.8, translate: '3.6px 0' },
  { offset: 1, translate: '0 0' },
];

/** Every control's current value, in order — what "the form changed" compares. */
const snapshot = (form: HTMLFormElement) =>
  JSON.stringify(
    Array.from(form.elements).map((el) => {
      if (el instanceof HTMLInputElement) {
        return el.type === 'checkbox' || el.type === 'radio'
          ? el.checked
          : el.value;
      }
      if (
        el instanceof HTMLTextAreaElement ||
        el instanceof HTMLSelectElement
      ) {
        return el.value;
      }
      return null;
    })
  );

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * A modal that collects input: create, edit, rename.
 *
 * What it decides so the caller does not:
 *
 * - **A click on the backdrop closes it only while nothing has been typed.**
 *   Once a field differs from how the dialog opened, a backdrop click (or focus
 *   leaving the dialog) is refused and the dialog shakes, so a stray click
 *   never throws away what was typed. An empty dialog has nothing to lose and
 *   closes like any other. The close button, Esc and Cancel always close at
 *   once — those are deliberate. Pass `dirty` to decide this yourself (e.g.
 *   react-hook-form's `formState.isDirty`).
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
  dirty,
  children,
}: FormModalProps) => {
  const translate = useTranslate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const shakeRef = useRef<Animation | null>(null);
  const [invalid, setInvalid] = useState(false);
  // The values the dialog opened with. Re-taken on every render until the
  // person first types, so a caller that prefills or resets the fields after
  // opening moves the baseline with it instead of counting as an edit.
  const baselineRef = useRef<string | null>(null);
  const touchedRef = useRef(false);

  const readValidity = useCallback(() => {
    const form = formRef.current;
    if (form) setInvalid(!form.checkValidity());
  }, []);

  // Typing is caught by `onInput`/`onChange` below. This catches the rest — a
  // caller resetting or prefilling the fields re-renders through here, and the
  // form only exists once the dialog has mounted. Same value bails out, so
  // running on every render does not loop.
  useLayoutEffect(() => {
    readValidity();
    const form = formRef.current;
    if (form && !touchedRef.current) baselineRef.current = snapshot(form);
  });

  const setFormRef = useCallback((node: HTMLFormElement | null) => {
    formRef.current = node;
    touchedRef.current = false;
    // Children commit before this ref is set, so the fields are already there.
    if (node) {
      setInvalid(!node.checkValidity());
      baselineRef.current = snapshot(node);
    }
  }, []);

  // A dialog that stays mounted while closed would otherwise reopen dirty.
  useLayoutEffect(() => {
    if (open) touchedRef.current = false;
  }, [open]);

  const handleInput = useCallback(() => {
    touchedRef.current = true;
    readValidity();
  }, [readValidity]);

  const isDirty = useCallback(() => {
    if (dirty !== undefined) return dirty;
    const form = formRef.current;
    // Typed and then erased back to the start is not an edit.
    return (
      !!form && touchedRef.current && snapshot(form) !== baselineRef.current
    );
  }, [dirty]);

  const shake = useCallback(() => {
    const content = formRef.current?.closest<HTMLElement>(
      '[data-scope="dialog"][data-part="content"]'
    );
    if (!content || typeof content.animate !== 'function') return;
    if (prefersReducedMotion()) return;
    // Only our own animation — cancelling every animation on the element would
    // also cut the dialog's entrance short when the click lands mid-open.
    shakeRef.current?.cancel();
    shakeRef.current = content.animate(SHAKE_KEYFRAMES, {
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
      // Both ways out that are not a choice — a backdrop click and focus
      // leaving the dialog — are refused once something has been typed. Only
      // the click shakes: focus moving away is not something the person did
      // to the dialog.
      onInteractOutside={(e) => {
        if (isDirty()) e.preventDefault();
      }}
      onPointerDownOutside={() => {
        if (isDirty()) shake();
      }}
    >
      <ModalContent maxH={MODAL_MAX_H}>
        <FormModalContext.Provider value={ctx}>
          {/* `noValidate`: the browser's own bubbles never get a chance to
              show, since submit is disabled until the form is valid. */}
          <chakra.form
            ref={setFormRef}
            noValidate
            onSubmit={handleSubmit}
            onInput={handleInput}
            onChange={handleInput}
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
