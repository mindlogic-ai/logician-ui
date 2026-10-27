import { FormEvent, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from '@/components/Input';
import { ModalBody } from '@/components/Modal';
import { system } from '@/theme';

import { FieldRow } from '../FieldRow';
import { FormModalFooter } from '../FormModalFooter';
import { FormModal } from './FormModal';

const Harness = ({
  onSubmit = () => {},
  onClose = () => {},
  required = true,
}: {
  onSubmit?: () => void;
  onClose?: () => void;
  required?: boolean;
}) => {
  const [name, setName] = useState('');
  return (
    <ChakraProvider value={system}>
      <FormModal
        open
        onClose={onClose}
        title="카테고리 추가"
        onSubmit={onSubmit}
      >
        <ModalBody>
          <input
            aria-label="이름"
            required={required}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ModalBody>
        <FormModalFooter
          onCancel={onClose}
          cancelLabel="취소"
          submitLabel="추가"
        />
      </FormModal>
    </ChakraProvider>
  );
};

describe('FormModal', () => {
  it('names the dialog with the title', async () => {
    render(<Harness />);
    expect(
      await screen.findByRole('dialog', { name: '카테고리 추가' })
    ).toBeInTheDocument();
  });

  it('keeps submit disabled until every required field is filled', async () => {
    render(<Harness />);
    const submit = await screen.findByRole('button', { name: '추가' });
    expect(submit).toBeDisabled();

    fireEvent.change(screen.getByLabelText('이름'), {
      target: { value: '교육' },
    });
    expect(submit).toBeEnabled();

    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '' } });
    expect(submit).toBeDisabled();
  });

  it('leaves submit enabled when nothing is required', async () => {
    render(<Harness required={false} />);
    expect(await screen.findByRole('button', { name: '추가' })).toBeEnabled();
  });

  it('submits through the form and calls onSubmit once', async () => {
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);
    fireEvent.change(await screen.findByLabelText('이름'), {
      target: { value: '교육' },
    });
    fireEvent.click(screen.getByRole('button', { name: '추가' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('never calls onSubmit while a required field is empty', async () => {
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);
    // Enter in a field submits the form directly, without the button.
    fireEvent.submit(await screen.findByLabelText('이름'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not submit a form it was opened from', async () => {
    const outer = vi.fn((e: FormEvent) => e.preventDefault());
    const inner = vi.fn();
    render(
      <form onSubmit={outer}>
        <Harness onSubmit={inner} required={false} />
      </form>
    );
    fireEvent.click(await screen.findByRole('button', { name: '추가' }));
    expect(inner).toHaveBeenCalledTimes(1);
    expect(outer).not.toHaveBeenCalled();
  });

  it('closes from Cancel', async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    fireEvent.click(await screen.findByRole('button', { name: '취소' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('reads `required` from a FieldRow, with no attribute on the input', async () => {
    render(
      <ChakraProvider value={system}>
        <FormModal
          open
          onClose={() => {}}
          title="이름 바꾸기"
          onSubmit={() => {}}
        >
          <ModalBody>
            <FieldRow label="이름" required>
              <Input defaultValue="" />
            </FieldRow>
          </ModalBody>
          <FormModalFooter
            onCancel={() => {}}
            cancelLabel="취소"
            submitLabel="저장"
          />
        </FormModal>
      </ChakraProvider>
    );
    const submit = await screen.findByRole('button', { name: '저장' });
    expect(submit).toBeDisabled();
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: '새 이름' },
    });
    expect(submit).toBeEnabled();
  });
});
