import { Button } from '@/components/Button';
import { TrashIcon } from '@/components/Icon';
import { ModalFooter } from '@/components/Modal';
import { useFormModalContext } from '@/components/Modal/FormModal/FormModalContext';

import { FormModalFooterProps } from './FormModalFooter.types';

/**
 * The action footer shared by form-in-a-modal surfaces — the form analog of a
 * confirm-modal footer. It standardizes the pair every create/edit modal
 * hand-rolls: a neutral Cancel and the primary submit that carries its own
 * loading + disabled state.
 *
 * The far-left delete (`onDelete`) is deprecated: delete belongs on the list,
 * in a row or card menu that opens a danger confirm, not beside Save.
 *
 * Copy-agnostic by design: as a design-system component it owns no strings, so
 * `cancelLabel` is required — the consuming app supplies its own (translated)
 * labels.
 *
 * Submit path: inside a `<form onSubmit>` leave `onSubmit` unset so the button
 * stays `type="submit"` (Enter submits); for a portaled or no-`<form>` modal
 * pass `onSubmit` and it becomes a `type="button"` onClick. `...rest` forwards to
 * the logician `ModalFooter`, so callers pin it (`position="sticky"` /
 * `flexShrink={0}`) or zero its padding (`px={0}`) per modal.
 *
 * Inside a `FormModal` the submit button is also disabled while the form fails
 * a native constraint (an empty `required` field), on top of `submitDisabled`.
 */
export const FormModalFooter = ({
  onDelete,
  deleteLabel,
  onCancel,
  cancelLabel,
  submitLabel,
  submitColorPalette = 'primary',
  isSubmitting = false,
  submitLoadingText,
  submitDisabled = false,
  onSubmit,
  bordered = false,
  ...rest
}: FormModalFooterProps) => {
  const formModal = useFormModalContext();

  return (
    <ModalFooter
      justifyContent="flex-end"
      gap={2}
      {...(bordered
        ? {
            bg: 'bg.surface',
            borderTop: '1px solid',
            borderColor: 'border.subtle',
          }
        : {})}
      {...rest}
    >
      {onDelete && (
        <Button
          variant="danger"
          type="button"
          onClick={onDelete}
          disabled={isSubmitting}
          mr="auto"
        >
          <TrashIcon boxSize="sm" />
          {deleteLabel}
        </Button>
      )}
      <Button
        variant="secondary"
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelLabel}
      </Button>
      <Button
        // 5.0 has no colour axis: the deprecated `submitColorPalette` only
        // picks between the two filled roles.
        variant={submitColorPalette === 'danger' ? 'danger' : 'primary'}
        type={onSubmit ? 'button' : 'submit'}
        onClick={onSubmit}
        loading={isSubmitting}
        loadingText={submitLoadingText}
        disabled={isSubmitting || submitDisabled || !!formModal?.invalid}
      >
        {submitLabel}
      </Button>
    </ModalFooter>
  );
};
