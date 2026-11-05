import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { system } from '@/theme';

import { ViewModal } from './ViewModal';

const renderView = (props: Partial<Parameters<typeof ViewModal>[0]> = {}) =>
  render(
    <ChakraProvider value={system}>
      <ViewModal open onClose={() => {}} title="그룹 지정 결과" {...props}>
        12명 지정
      </ViewModal>
    </ChakraProvider>
  );

describe('ViewModal', () => {
  it('names the dialog with the title', async () => {
    renderView();
    expect(
      await screen.findByRole('dialog', { name: '그룹 지정 결과' })
    ).toBeInTheDocument();
  });

  it('has one footer button, labelled 닫기 by default, that closes', async () => {
    const onClose = vi.fn();
    renderView({ onClose });
    await screen.findByRole('dialog');
    // The X carries the same name; the footer button is the visible text one.
    const buttons = screen.getAllByRole('button', { name: '닫기' });
    expect(buttons).toHaveLength(2);
    fireEvent.click(screen.getByText('닫기'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('takes a caller label', async () => {
    renderView({ closeLabel: '확인' });
    expect(await screen.findByRole('button', { name: '확인' })).toBeVisible();
  });
});
