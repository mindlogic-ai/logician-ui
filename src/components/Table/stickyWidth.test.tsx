import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LogicianProvider } from '../LogicianProvider';
import { Table } from './Table';
import { TableContainer } from './TableContainer';
import { Tbody } from './Tbody';
import { Td } from './Td';
import { Th } from './Th';
import { Thead } from './Thead';
import { Tr } from './Tr';

/**
 * A column's width is one number, so it should be measured once — by the header.
 *
 * Before this, every cell measured itself and attached its own `ResizeObserver`.
 * In a static table that is redundant; in a virtualised one it is the dominant
 * cost of scrolling, because rows mount and unmount continuously and each mount
 * forces a synchronous layout. Measured on a 12,000-row admin table (production
 * build): 68 `getBoundingClientRect` calls and 28 observers created *per scroll
 * step*, for three sticky columns whose widths never changed.
 *
 * These count the calls rather than assert on offsets, because the number of
 * measurements is the thing that regressed and the thing a future change would
 * silently undo.
 */
const counters = { gbcr: 0, observers: 0 };

beforeEach(() => {
  // jsdom 에는 없다 — Chakra 의 provider 가 부팅하면서 부른다.
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
  counters.gbcr = 0;
  counters.observers = 0;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
    function (this: Element) {
      counters.gbcr += 1;
      return {
        width: 120,
        height: 40,
        top: 0,
        left: 0,
        right: 120,
        bottom: 40,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect;
    }
  );
  class CountingResizeObserver {
    constructor() {
      counters.observers += 1;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal('ResizeObserver', CountingResizeObserver);
});

const rows = (n: number) =>
  Array.from({ length: n }, (_, i) => (
    <Tr key={i}>
      <Td isSticky stickyDirection="left" stickyIndex={0}>
        row {i}
      </Td>
      <Td>other</Td>
    </Tr>
  ));

/** 표 컴포넌트가 Chakra 위에 있어서 provider 없이는 렌더되지 않는다. */
const inProvider = (ui: ReactNode) => <LogicianProvider>{ui}</LogicianProvider>;

const withHeader = (rowCount: number) =>
  inProvider(
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th isSticky stickyDirection="left" stickyIndex={0}>
              name
            </Th>
            <Th>other</Th>
          </Tr>
        </Thead>
        <Tbody>{rows(rowCount)}</Tbody>
      </Table>
    </TableContainer>
  );

describe('sticky column width — measured once, not once per row', () => {
  it('one observer for the column, however many rows there are', () => {
    render(withHeader(30));
    expect(
      counters.observers,
      '한 열의 너비는 하나인데 행마다 관찰자를 달고 있다'
    ).toBe(1);
  });

  it('adding rows does not add measurements', () => {
    render(withHeader(5));
    const withFive = counters.gbcr;
    counters.gbcr = 0;
    render(withHeader(50));
    expect(
      counters.gbcr,
      '행이 10배가 됐는데 측정 횟수가 따라 늘었다 — 가상 스크롤에서 이게 스크롤 비용이 된다'
    ).toBeLessThanOrEqual(withFive);
  });

  it('a table with no header row still gets a width', () => {
    // 헤더가 없으면 아무도 재지 않아 오프셋이 전부 0이 된다. 그때는 첫 본문 셀이
    // 대신 잰다 — 그래서 body 셀의 측정을 통째로 없애지 않았다.
    render(
      inProvider(
        <TableContainer>
          <Table>
            <Tbody>{rows(20)}</Tbody>
          </Table>
        </TableContainer>
      )
    );
    expect(
      counters.gbcr,
      '헤더 없는 표에서 아무도 너비를 재지 않았다'
    ).toBeGreaterThan(0);
  });
});
