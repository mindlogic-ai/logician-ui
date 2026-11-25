import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Table } from '../Table/Table';
import { TableContainer } from '../Table/TableContainer';
import { Th } from '../Table/Th';
import { Thead } from '../Table/Thead';
import { Tr } from '../Table/Tr';
import { Modal } from './Modal';
import { ModalContent } from './ModalContent';
import { ModalHeader } from './ModalHeader';

/**
 * ModalHeader and Th set a `textStyle` default before spreading the caller's
 * props. An explicit `undefined` (a conditional prop's falsy branch) must keep
 * that default. Chakra emits atomic class names, so equal class lists mean
 * equal styles.
 */
// One dialog, re-rendered with each header: the dialog only mounts its parts
// once per open, so a fresh render per variant would race its own unmount.
const modal = (header: React.ReactNode) => (
  <ChakraProvider value={system}>
    <Modal open>
      <ModalContent>{header}</ModalContent>
    </Modal>
  </ChakraProvider>
);
const headerClassName = () =>
  waitFor(() => {
    const el = document.querySelector('.chakra-dialog__header');
    if (!el) throw new Error('header not mounted');
    return el.className;
  });

const thClass = (props: Record<string, unknown>) => {
  const { unmount } = render(
    <ChakraProvider value={system}>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th {...props}>Name</Th>
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
    </ChakraProvider>
  );
  const className = screen.getByRole('columnheader').className;
  unmount();
  return className;
};

describe('explicit undefined props keep the default', () => {
  it('ModalHeader: textStyle={undefined}', async () => {
    const { rerender } = render(modal(<ModalHeader>T</ModalHeader>));
    const base = await headerClassName();
    rerender(modal(<ModalHeader textStyle={undefined}>T</ModalHeader>));
    expect(await headerClassName()).toBe(base);
    rerender(modal(<ModalHeader textStyle="xs">T</ModalHeader>));
    expect(await headerClassName()).not.toBe(base);
  });

  it('Th: textStyle, color and fontWeight set to undefined', () => {
    const base = thClass({});
    expect(
      thClass({ textStyle: undefined, color: undefined, fontWeight: undefined })
    ).toBe(base);
    expect(thClass({ textStyle: 'xs' })).not.toBe(base);
  });
});
