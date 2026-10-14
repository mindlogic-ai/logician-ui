import { ChangeEvent, ReactNode, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { LogicianProvider } from '@/components/LogicianProvider';

import { Input } from './Input';

/**
 * 한글(또는 일본어·중국어)을 입력하는 도중 `value` 가 밖에서 다시 써지면 마지막
 * 음절이 깨진다.
 *
 * 제어 입력은 `node.value` 가 항상 `props.value` 와 같다는 약속이고, React 는 커밋
 * 때 둘이 다르면 prop 을 노드에 써서 그 약속을 지킨다. IME 조합이 열려 있는 동안
 * `.value` 를 쓰면 그 조합이 **끝난다**. 만들다 만 자모가 글자로 남고, 완성된 음절이
 * 그 위에 붙는다 — `학사지원` 을 쳤는데 `학사ㅈ지원` 이 남는다.
 *
 * 이 컴포넌트는 prop 을 로컬 state 로 복사해서(`currentValue`) 조건 없이 동기화하고
 * 있었으므로, prop 이 늦게 도착하는 소비자(디바운스된 검색어, 폼 리셋)에서는 매번
 * 이 경로를 밟았다. 충북대 테넌트 관리자가 창 포커스를 잃으면서 조합이 끊길 때
 * 마지막 음절이 사라진다고 신고했다.
 *
 * 그래서 여기서 세는 것은 렌더 결과가 아니라 **조합 중에 무엇을 내보내고 무엇을
 * 받아들이는가** 다.
 */

beforeAll(() => {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
});

const renderInput = (ui: ReactNode) =>
  render(<LogicianProvider>{ui}</LogicianProvider>);

const getInput = () => screen.getByRole('textbox') as HTMLInputElement;

/** 마지막 onChange 가 소비자에게 건넨 문자열. */
const lastValue = (spy: ReturnType<typeof vi.fn>) =>
  (spy.mock.calls.at(-1)?.[0] as ChangeEvent<HTMLInputElement>).target.value;

describe('Input · IME composition', () => {
  it('창 포커스를 잃어 조합이 끊겨도 마지막 음절을 잃지 않는다', () => {
    const onChange = vi.fn();
    // 값이 늦게 돌아오는 소비자 — 조합 중에는 onChange 가 오지 않으므로 prop 은
    // 계속 빈 문자열이다. 예전 구현은 그 빈 문자열을 노드에 되써서 조합을 끊었다.
    renderInput(<Input value="" onChange={onChange} />);
    const input = getInput();

    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: 'ㅎ' } });
    fireEvent.change(input, { target: { value: '하' } });
    fireEvent.change(input, { target: { value: '학' } });

    // 조합 중에는 밖으로 아무것도 내보내지 않는다.
    expect(onChange).not.toHaveBeenCalled();
    expect(input.value).toBe('학');

    // 브라우저는 창이 포커스를 잃을 때 조합을 compositionend 로 닫는다.
    fireEvent.compositionEnd(input, { data: '학' });
    fireEvent.blur(input);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastValue(onChange)).toBe('학');
    expect(input.value).toBe('학');
  });

  it('조합 중에 밖에서 바뀐 값은 버리지 않고 compositionend 에서 적용한다', () => {
    const onChange = vi.fn();
    const { rerender } = renderInput(
      <Input value="가나" onChange={onChange} />
    );
    const input = getInput();
    expect(input.value).toBe('가나');

    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: '가나다' } });

    // 폼 리셋 / 필터 초기화가 조합 한가운데에 도착한다.
    rerender(
      <LogicianProvider>
        <Input value="" onChange={onChange} />
      </LogicianProvider>
    );
    // 지금 받아들이면 조합이 끊긴다 — 미뤄 둔다.
    expect(input.value).toBe('가나다');

    fireEvent.compositionEnd(input, { data: '다' });

    // 미뤄 뒀을 뿐 무시한 것이 아니다.
    expect(input.value).toBe('');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('compositionend 뒤에 따라오는 input 이벤트로 같은 값을 두 번 내보내지 않는다', () => {
    const onChange = vi.fn();
    renderInput(<Input value="" onChange={onChange} />);
    const input = getInput();

    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: '한' } });
    fireEvent.compositionEnd(input, { data: '한' });

    expect(onChange).toHaveBeenCalledTimes(1);

    // 일부 브라우저(그리고 안드로이드 IME)는 compositionend 직후 같은 텍스트를
    // 담은 input 을 한 번 더 보낸다.
    fireEvent.change(input, { target: { value: '한' } });
    expect(onChange).toHaveBeenCalledTimes(1);

    // 그 다음의 진짜 입력은 정상적으로 나간다.
    fireEvent.change(input, { target: { value: '한글' } });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(lastValue(onChange)).toBe('한글');
  });

  it('조합이 끝나면 다시 평범한 제어 입력이다', () => {
    const Controlled = () => {
      const [value, setValue] = useState('');
      return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
    };
    renderInput(<Controlled />);
    const input = getInput();

    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');
  });

  it('maskNumber 서식은 그대로 동작한다', () => {
    const onChange = vi.fn();
    renderInput(
      <Input maskNumber type="number" value={1234} onChange={onChange} />
    );
    const input = getInput();

    // 표시는 서식이 붙은 값, 소비자에게 가는 것은 원시 숫자 문자열.
    expect(input.value).toBe('1,234');

    fireEvent.change(input, { target: { value: '12345' } });
    expect(input.value).toBe('12,345');
    expect(lastValue(onChange)).toBe('12345');

    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
    expect(lastValue(onChange)).toBe('');
  });
});
