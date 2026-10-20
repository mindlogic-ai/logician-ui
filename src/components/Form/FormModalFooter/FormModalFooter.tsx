import { Button } from '@/components/Button';
import { TrashIcon } from '@/components/Icon';
import { ModalFooter } from '@/components/Modal';

import { FormModalFooterProps } from './FormModalFooter.types';

/**
 * The action footer shared by form-in-a-modal surfaces — the form analog of a
 * confirm-modal footer. It standardizes the button trio every create/edit modal
 * hand-rolls: an optional far-left destructive action, a neutral Cancel, and the
 * primary submit that carries its own loading + disabled state.
 *
 * Copy-agnostic by design: as a design-system component it owns no strings, so
 * `cancelLabel` is required and `deleteLabel` is rendered verbatim — the
 * consuming app supplies its own (translated) labels.
 *
 * Submit path: inside a `<form onSubmit>` leave `onSubmit` unset so the button
 * stays `type="submit"` (Enter submits); for a portaled or no-`<form>` modal
 * pass `onSubmit` and it becomes a `type="button"` onClick. `...rest` forwards to
 * the logician `ModalFooter`, so callers pin it (`position="sticky"` /
 * `flexShrink={0}`) or zero its padding (`px={0}`) per modal.
 */
export const FormModalFooter = ({
  onDelete,
  deleteLabel,
  onCancel,
  cancelLabel,
  submitLabel,
  submitColorPalette = 'primary',
  isSubmitting = false,
  submitDisabled = false,
  onSubmit,
  bordered = false,
  ...rest
}: FormModalFooterProps) => {
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
          colorPalette="danger"
          variant="solid"
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
        colorPalette="neutral"
        variant="outline"
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelLabel}
      </Button>
      <Button
        colorPalette={submitColorPalette}
        variant="solid"
        type={onSubmit ? 'button' : 'submit'}
        onClick={onSubmit}
        loading={isSubmitting}
        disabled={isSubmitting || submitDisabled}
      >
        {submitLabel}
      </Button>
    </ModalFooter>
  );
};
