import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { system } from '@/theme';

import { ConfirmModal } from './ConfirmModal';
import type { ConfirmModalProps } from './ConfirmModal.types';

const renderConfirm = (props: Partial<ConfirmModalProps> = {}) =>
  render(
    <ChakraProvider value={system}>
      <ConfirmModal
        open
        onClose={() => {}}
        title="'교육'을 삭제할까요?"
        description="삭제하면 되돌릴 수 없습니다."
        confirmLabel="삭제"
        onConfirm={() => {}}
        {...props}
      />
    </ChakraProvider>
  );

describe('ConfirmModal', () => {
  it('names the dialog with the title and puts it in the header', async () => {
    renderConfirm();
    expect(
      await screen.findByRole('dialog', { name: "'교육'을 삭제할까요?" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: "'교육'을 삭제할까요?" })
    ).toBeInTheDocument();
  });

  it('has Cancel (translated by default) then the action, and routes both', async () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    renderConfirm({ onClose, onConfirm });
    await screen.findByRole('dialog');
    fireEvent.click(screen.getByRole('button', { name: '취소' }));
    fireEvent.click(screen.getByRole('button', { name: '삭제' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('blocks confirm with confirmDisabled', async () => {
    const onConfirm = vi.fn();
    renderConfirm({ onConfirm, confirmDisabled: true });
    const confirm = await screen.findByRole('button', { name: '삭제' });
    expect(confirm).toBeDisabled();
    fireEvent.click(confirm);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('disables Cancel while loading', async () => {
    renderConfirm({ loading: true, confirmLoadingText: '삭제 중' });
    expect(await screen.findByRole('button', { name: '취소' })).toBeDisabled();
  });

  it('swaps Cancel for the secondary action', async () => {
    const onClick = vi.fn();
    renderConfirm({ secondaryAction: { label: '해제', onClick } });
    await screen.findByRole('dialog');
    expect(screen.queryByRole('button', { name: '취소' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '해제' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
