import { ChangeEvent, ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { LogicianProvider } from '@/components/LogicianProvider';

import { Textarea } from './Textarea';

/**
 * `Input` 과 같은 결함이고 같은 원인이다 — prop 을 로컬 state 로 복사한 뒤 조건 없이
 * 동기화한다. IME 조합이 열려 있는 동안 `.value` 를 쓰면 조합이 끝나고, 만들다 만
 * 자모가 글자로 남는다. `Input` 쪽 테스트 파일의 설명이 전체 배경이다.
 *
 * `Textarea` 는 composition 을 아예 몰랐다는 점만 다르다(`Input` 은 Enter 를
 * 삼키려고 `isComposing` 을 이미 들고 있었다).
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

const renderTextarea = (ui: ReactNode) =>
  render(<LogicianProvider>{ui}</LogicianProvider>);

const getTextarea = () => screen.getByRole('textbox') as HTMLTextAreaElement;

const lastValue = (spy: ReturnType<typeof vi.fn>) =>
  (spy.mock.calls.at(-1)?.[0] as ChangeEvent<HTMLTextAreaElement>).target.value;

describe('Textarea · IME composition', () => {
  it('창 포커스를 잃어 조합이 끊겨도 마지막 음절을 잃지 않는다', () => {
    const onChange = vi.fn();
    renderTextarea(<Textarea value="" onChange={onChange} />);
    const textarea = getTextarea();

    fireEvent.compositionStart(textarea);
    fireEvent.change(textarea, { target: { value: 'ㅎ' } });
    fireEvent.change(textarea, { target: { value: '학' } });

    expect(onChange).not.toHaveBeenCalled();
    expect(textarea.value).toBe('학');

    fireEvent.compositionEnd(textarea, { data: '학' });
    fireEvent.blur(textarea);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastValue(onChange)).toBe('학');
    expect(textarea.value).toBe('학');
  });

  it('조합 중에 밖에서 바뀐 값은 버리지 않고 compositionend 에서 적용한다', () => {
    const onChange = vi.fn();
    const { rerender } = renderTextarea(
      <Textarea value="가나" onChange={onChange} />
    );
    const textarea = getTextarea();
    expect(textarea.value).toBe('가나');

    fireEvent.compositionStart(textarea);
    fireEvent.change(textarea, { target: { value: '가나다' } });

    rerender(
      <LogicianProvider>
        <Textarea value="" onChange={onChange} />
      </LogicianProvider>
    );
    expect(textarea.value).toBe('가나다');

    fireEvent.compositionEnd(textarea, { data: '다' });

    expect(textarea.value).toBe('');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('compositionend 뒤에 따라오는 input 이벤트로 같은 값을 두 번 내보내지 않는다', () => {
    const onChange = vi.fn();
    renderTextarea(<Textarea value="" onChange={onChange} />);
    const textarea = getTextarea();

    fireEvent.compositionStart(textarea);
    fireEvent.change(textarea, { target: { value: '한' } });
    fireEvent.compositionEnd(textarea, { data: '한' });
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.change(textarea, { target: { value: '한' } });
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.change(textarea, { target: { value: '한글' } });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(lastValue(onChange)).toBe('한글');
  });

  it('조합 밖의 입력은 예전과 똑같이 즉시 나간다', () => {
    const onChange = vi.fn();
    renderTextarea(<Textarea value="" onChange={onChange} />);
    const textarea = getTextarea();

    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(lastValue(onChange)).toBe('hello');
    expect(textarea.value).toBe('hello');
  });

  it('소비자의 composition 핸들러도 그대로 호출된다', () => {
    const onCompositionStart = vi.fn();
    const onCompositionEnd = vi.fn();
    renderTextarea(
      <Textarea
        value=""
        onChange={() => {}}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
    );
    const textarea = getTextarea();

    fireEvent.compositionStart(textarea);
    fireEvent.change(textarea, { target: { value: '한' } });
    fireEvent.compositionEnd(textarea, { data: '한' });

    expect(onCompositionStart).toHaveBeenCalledTimes(1);
    expect(onCompositionEnd).toHaveBeenCalledTimes(1);
  });
});
