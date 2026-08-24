import { ReactNode, useMemo, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LogicianProvider } from '../LogicianProvider';
import { Table } from './Table';
import { TableContainer } from './TableContainer';
import { useTableContext } from './TableContext';
import { Tbody } from './Tbody';
import { Td } from './Td';
import { Tr } from './Tr';

/**
 * 표의 컨텍스트 값이 렌더마다 새 객체면, **표 안의 모든 셀이 다시 그려진다**.
 *
 * `Th`/`Td`/`Tr` 은 전부 `useTableContext()` 를 부른다. 컨텍스트 변경은
 * `React.memo` 를 우회한다 — React 는 이미 bail-out 된 서브트리 **안으로** 변경을
 * 전파하므로, 행을 memo 로 감싸도 그 안의 셀은 다시 그려진다.
 *
 * 가상 스크롤 표에서는 이것이 스크롤 비용 그 자체가 된다. 실측(소비자의 12,000행
 * 관리자 표, 프로덕션 빌드): **새 행 하나만 마운트하는 스크롤 한 칸이 `Td` 를 794번**
 * 다시 그렸다. 한 칸에 ~1,050ms 였고, 그 값은 그 칸이 실제로 몇 행을 새로 들였는지와
 * **무관했다**(1.8행과 7.3행이 같은 비용) — 증분 작업이 아니라 표 전체가 다시
 * 그려지고 있다는 신호다.
 *
 * 그래서 이 테스트는 오프셋이 맞는지가 아니라 **`Td` 가 몇 번 그려지는지**를 센다.
 * 그것이 회귀했던 값이고, 다음 변경이 조용히 되돌릴 값이다.
 */
let tdRenders = 0;

/**
 * `Td` 자신을 셀 수는 없으니(패키지 내부 컴포넌트다) **같은 것을 구독하는 대역**을
 * 센다 — `useTableContext()` 를 부르는 컴포넌트. 표 안에서 다시 그려지는 모집단이
 * 정확히 이것이다(`Th`/`Td`/`Tr` 이 전부 이 훅을 부른다).
 *
 * 이 대역이 셀 안에 있어야 의미가 있다: 행 엘리먼트가 고정돼 있어도 컨텍스트 변경은
 * bail-out 된 서브트리 안으로 전파되므로, 여기서 세는 숫자가 곧 스크롤 한 칸의
 * 실제 재렌더 수다.
 */
const ContextProbe = ({ children }: { children: ReactNode }) => {
  useTableContext();
  tdRenders += 1;
  return <>{children}</>;
};

const CountingTd = ({ children }: { children: ReactNode }) => (
  <Td>
    <ContextProbe>{children}</ContextProbe>
  </Td>
);

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
  tdRenders = 0;
});

/**
 * 표를 그대로 둔 채 **표 위쪽만** 다시 그린다 — 가상 스크롤 목록이 스크롤 중에
 * 하는 일이 정확히 이것이다(보이는 구간이 바뀌어 리스트 컴포넌트가 다시 그려진다).
 * 행 엘리먼트는 같은 것을 다시 넘기므로, 셀이 다시 그려질 이유는 컨텍스트뿐이다.
 */
const Harness = ({ rowCount }: { rowCount: number }) => {
  const [tick, setTick] = useState(0);
  /*
   * 행 엘리먼트를 고정한다 — 실제 목록에서 행이 `React.memo` 로 bail-out 되는 것과
   * 같은 상황이다. 이렇게 해야 "부모가 다시 그려졌으니 자식도 다시 그려졌다"는
   * 평범한 이유가 빠지고, 셀이 다시 그려질 수 있는 경로가 **컨텍스트 하나만** 남는다.
   */
  const body = useMemo(
    () => (
      <Tbody>
        {Array.from({ length: rowCount }, (_, i) => (
          <Tr key={i}>
            <CountingTd>row {i}</CountingTd>
          </Tr>
        ))}
      </Tbody>
    ),
    [rowCount]
  );
  return (
    <LogicianProvider>
      <button type="button" onClick={() => setTick((t) => t + 1)}>
        rerender
      </button>
      <span data-testid="tick">{tick}</span>
      <TableContainer>
        <Table>{body}</Table>
      </TableContainer>
    </LogicianProvider>
  );
};

describe('table context identity', () => {
  it('re-rendering the table owner does not re-render every cell', () => {
    render(<Harness rowCount={40} />);
    const afterMount = tdRenders;
    expect(afterMount, '40행이 마운트되지 않았다').toBeGreaterThanOrEqual(40);

    tdRenders = 0;
    fireEvent.click(screen.getByText('rerender'));
    expect(screen.getByTestId('tick')).toHaveTextContent('1');

    // 스크롤 상태도 sticky 너비도 바뀌지 않았으므로 셀은 하나도 다시 그려질 이유가
    // 없다. 컨텍스트 값이 리터럴이면 40개가 전부 다시 그려진다.
    expect(
      tdRenders,
      '표 주인이 다시 그려졌다는 이유만으로 모든 셀이 다시 그려졌다 — ' +
        '컨텍스트 값이 렌더마다 새 객체다'
    ).toBe(0);
  });

  it('the cell count does not scale with row count on a parent re-render', () => {
    const rerenderCost = (rowCount: number) => {
      const view = render(<Harness rowCount={rowCount} />);
      tdRenders = 0;
      fireEvent.click(screen.getByText('rerender'));
      const cost = tdRenders;
      view.unmount();
      return cost;
    };
    const small = rerenderCost(10);
    const large = rerenderCost(100);

    expect(
      large,
      `행이 10배인데 재렌더도 ${small} → ${large} 로 따라 늘었다 — 스크롤 비용이 행 수에 비례한다`
    ).toBe(small);
  });
});
