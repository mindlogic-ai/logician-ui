import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Modal } from './Modal';
import { ModalContent } from './ModalContent';
import { ModalHeader } from './ModalHeader';

const renderModal = (header: React.ReactNode) =>
  render(
    <ChakraProvider value={system}>
      <Modal open>
        <ModalContent>{header}</ModalContent>
      </Modal>
    </ChakraProvider>
  );

describe('ModalHeader', () => {
  it('names the dialog with the title and describes it with the subtitle', async () => {
    renderModal(<ModalHeader subtitle="s">T</ModalHeader>);
    const dialog = await screen.findByRole('dialog', { name: 'T' });
    expect(dialog).toHaveAccessibleDescription('s');
  });

  it('stacks the subtitle under the title', async () => {
    renderModal(<ModalHeader subtitle="s">T</ModalHeader>);
    await screen.findByRole('dialog');
    const header = screen.getByText('s').parentElement!;
    expect(getComputedStyle(header).flexDirection).toBe('column');
  });

  it('text mixed with expressions is one title heading', async () => {
    const where = 'Top';
    renderModal(<ModalHeader>Placement: {where}</ModalHeader>);
    await screen.findByRole('dialog', { name: 'Placement: Top' });
    expect(
      screen.getByRole('heading', { name: 'Placement: Top' })
    ).toBeInTheDocument();
  });

  it('a caller heading is not nested inside another heading', async () => {
    renderModal(
      <ModalHeader>
        <h3>Own heading</h3>
      </ModalHeader>
    );
    await screen.findByRole('dialog', { name: 'Own heading' });
    expect(screen.getAllByRole('heading')).toHaveLength(1);
  });
});
