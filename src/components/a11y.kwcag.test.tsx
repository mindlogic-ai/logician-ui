import { render } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { FileInput } from '@/components/FileInput';
import { LogicianProvider } from '@/components/LogicianProvider';
import { Radio, RadioGroup } from '@/components/Radio';
import { SelectField } from '@/components/Select';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@/components/Slider';
import { Subtitle } from '@/components/Typography';

/**
 * Regressions for the accessibility defects a KWCAG 2.1 (한국형 웹 콘텐츠 접근성
 * 지침) audit found in these components.
 *
 * Each one shipped for a while, and each was invisible in review: the screen
 * looked right, and only the accessibility tree or the markup said otherwise.
 * That is exactly the kind of defect a test has to hold, because the next person
 * to touch the component will not see it either.
 *
 * The Korean checkpoint ids are here on purpose — a 웹 접근성 품질인증 evaluator
 * works from those numbers, and a failing test should say which one it is about.
 */

beforeAll(() => {
  // Chakra's color-mode and responsive machinery calls it on mount; jsdom has no
  // implementation.
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

const withProvider = (ui: React.ReactNode) =>
  render(<LogicianProvider>{ui}</LogicianProvider>);

/** The text a screen reader would announce for `element`, via `aria-labelledby`. */
const nameFromLabelledBy = (element: Element | null): string =>
  (element?.getAttribute('aria-labelledby') ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .map((id) => document.getElementById(id)?.textContent ?? '')
    .join(' ')
    .trim();

describe('KWCAG 5.4.1.1 마크업 오류 방지', () => {
  it('라디오 하나가 같은 id 를 두 번 내보내지 않는다', () => {
    const { container } = withProvider(
      <RadioGroup defaultValue="a">
        <Radio value="a">
          <Radio.Control />
          <Radio.Text>A</Radio.Text>
        </Radio>
        <Radio value="b">
          <Radio.Control />
          <Radio.Text>B</Radio.Text>
        </Radio>
      </RadioGroup>
    );

    const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);

    // The control and the indicator inside it used to share Chakra's generated
    // `ids.itemControl`, so every radio on a page carried a duplicate.
    expect(duplicates).toEqual([]);
  });
});

describe('KWCAG 5.3.4.1 레이블 제공', () => {
  it('보이는 레이블이 없어도 셀렉트에 이름이 있다', () => {
    const { container } = withProvider(
      <SelectField
        options={[{ label: 'One', value: '1' }]}
        ariaLabel="분류 선택"
      />
    );

    // The trigger's `aria-labelledby` is emitted whether or not the label part
    // is rendered; without the part it pointed at nothing and the control
    // announced as a bare "button".
    expect(
      nameFromLabelledBy(container.querySelector('[data-part="trigger"]'))
    ).toBe('분류 선택');
  });

  it('보이는 레이블이 없어도 슬라이더에 이름이 있다', () => {
    const { container } = withProvider(
      <Slider ariaLabel="탐색" value={[10]} min={0} max={100}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    );

    expect(
      nameFromLabelledBy(container.querySelector('[data-part="thumb"]'))
    ).toBe('탐색');
  });
});

describe('KWCAG 5.2.4.2 제목 제공', () => {
  it('Subtitle 은 제목이 아니라 문단이다', () => {
    const { container } = withProvider(<Subtitle>보조 설명</Subtitle>);

    // It rendered `<h6>`, which put every call site into the document outline —
    // a paragraph of helper copy announced as a level-6 heading, and a jump from
    // whatever level came before it.
    expect(container.querySelector('h6')).toBeNull();
    expect(container.querySelector('p')?.textContent).toBe('보조 설명');
  });

  it('제목이 필요하면 호출부가 말할 수 있다', () => {
    const { container } = withProvider(<Subtitle as="h2">절 제목</Subtitle>);

    expect(container.querySelector('h2')?.textContent).toBe('절 제목');
  });
});

describe('KWCAG 5.4.2.1 웹 애플리케이션 접근성 준수', () => {
  it('파일 입력이 버튼 안에 컨트롤을 넣지 않는다', () => {
    const { container } = withProvider(<FileInput onChange={() => {}} />);

    // `role="button"` on the wrapper made the real `<input>` an interactive
    // element inside another (axe `nested-interactive`), and `role="group"` on a
    // `<label>` is not an allowed pairing at all (`aria-allowed-role`).
    expect(container.querySelector('[role="button"]')).toBeNull();
    expect(container.querySelector('label[role]')).toBeNull();
  });

  it('호버 시 드러나는 오버레이는 group 클래스로 동작한다', () => {
    const { container } = withProvider(<FileInput onChange={() => {}} />);

    // `_groupHover` compiles to `.group:hover &`, so the CLASS is what makes it
    // fire — the old `role="group"` did nothing for hover or for assistive tech.
    expect(container.querySelector('label')?.className).toContain('group');
  });
});
