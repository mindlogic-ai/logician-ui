import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { Tag } from '../Tag';
import { H4 } from '../Typography';
import { Modal } from './Modal';
import { ModalCloseButton } from './ModalCloseButton';
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

  it('a text title is an h2 that names the dialog', async () => {
    renderModal(<ModalHeader>Buy credits</ModalHeader>);
    await screen.findByRole('dialog', { name: 'Buy credits' });
    expect(
      screen.getByRole('heading', { level: 2, name: 'Buy credits' })
    ).toBeInTheDocument();
  });

  it('mixed element children are not wrapped in an h2', async () => {
    renderModal(
      <ModalHeader>
        <Tag>Draft</Tag>
        <H4>Privacy policy</H4>
      </ModalHeader>
    );
    await screen.findByRole('dialog');
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    const h4 = screen.getByRole('heading', {
      level: 4,
      name: 'Privacy policy',
    });
    expect(h4.closest('h1, h2, h3, h5, h6')).toBeNull();
  });

  it('fills the header width with the title', async () => {
    renderModal(<ModalHeader subtitle="s">T</ModalHeader>);
    await screen.findByRole('dialog');
    const header = screen.getByText('s').parentElement!;
    expect(getComputedStyle(header).alignItems).toBe('stretch');
  });

  it('warns once in development when ModalCloseButton is inside the header', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      renderModal(
        <ModalHeader>
          Title
          <ModalCloseButton />
        </ModalHeader>
      );
      await screen.findByRole('dialog');
      const calls = warn.mock.calls.filter(([msg]) =>
        String(msg).includes('ModalCloseButton')
      );
      expect(calls).toHaveLength(1);
      expect(String(calls[0][0])).toMatch(/sibling of ModalHeader/);
    } finally {
      warn.mockRestore();
    }
  });
});
