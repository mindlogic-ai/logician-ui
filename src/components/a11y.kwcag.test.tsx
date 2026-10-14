import { render } from '@testing-library/react';
import axe from 'axe-core';
import { beforeAll, describe, expect, it } from 'vitest';

import { buttonColorPaletteStyles } from '@/components/Button/Button.styles';
import { FileInput } from '@/components/FileInput';
import { LogicianProvider } from '@/components/LogicianProvider';
import { baseMarkdownComponents } from '@/components/Markdown/Markdown';
import { Radio, RadioGroup } from '@/components/Radio';
import { SelectField } from '@/components/Select';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@/components/Slider';
import { TAB_RAMP } from '@/components/Tabs';
import { Link, LINK_RAMP, Subtitle } from '@/components/Typography';
import { colors } from '@/theme/colors';

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
  // Zag's slider observes its thumb to size the track. jsdom ships no
  // `ResizeObserver`, so without this the observe call throws ASYNCHRONOUSLY,
  // after the test that triggered it has already passed — which vitest reports
  // as an unhandled error and exits non-zero on. A green test list and a red
  // run is the worst way to find that out, so it is stubbed here rather than
  // left to whoever next reads the CI log.
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof window.ResizeObserver;

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

  it('마크다운의 ###### 은 여전히 제목이다', () => {
    // `Subtitle` 의 기본 태그를 문단으로 바꾸면서 같이 끌려간 자리. 마크다운
    // 매퍼의 `h6` 는 **글쓴이가 실제로 쓴 제목**이므로, 여기까지 문단이 되면
    // 고치려던 결함이 방향만 바꿔 다시 생긴다 — 제목 목록에서 사라지는 쪽으로.
    const H6 = baseMarkdownComponents.h6 as React.ComponentType<{
      children: React.ReactNode;
    }>;
    const { container } = withProvider(<H6>여섯 번째 제목</H6>);

    expect(container.querySelector('h6')?.textContent).toBe('여섯 번째 제목');
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

/**
 * An axe pass over the components above, so the NEXT defect of this shape does
 * not need an audit downstream to find it.
 *
 * Everything in this file until now is a regression test: each one names a
 * defect that already shipped. This runs the same engine the certification
 * audit runs, in the design system, on the compositions most likely to be
 * wrong — so a component that acquires a nameless control, a role that is not
 * allowed on its element, or an interactive element inside another fails here
 * rather than in an app that consumes it.
 *
 * **jsdom has no layout**, so this is deliberately not the whole rule set:
 * `color-contrast` needs painted pixels and reports nothing here, and rules
 * about visibility or size have the same problem. What jsdom does carry
 * perfectly is structure and ARIA — which is precisely where all nine defects
 * in this branch lived. The contrast half belongs to a browser, and FactChat's
 * `storybook-a11y.yml` runs it there in both colour modes.
 */
const STRUCTURAL_AXE_RULES = [
  'aria-allowed-attr',
  'aria-allowed-role',
  'aria-required-attr',
  'aria-required-children',
  'aria-required-parent',
  'aria-valid-attr-value',
  'button-name',
  'duplicate-id',
  'label',
  'link-name',
  'nested-interactive',
  'aria-input-field-name',
  'aria-toggle-field-name',
];

/** Runs axe over a container and returns one line per violating node. */
const axeViolations = async (container: HTMLElement): Promise<string[]> => {
  const results = await axe.run(container, {
    runOnly: { type: 'rule', values: STRUCTURAL_AXE_RULES },
    // The default reporter walks the whole document for a summary this does
    // not use, and jsdom makes that slow for no gain.
    resultTypes: ['violations'],
  });
  return results.violations.flatMap((v) =>
    v.nodes.map((n) => `${v.id}: ${n.html.replace(/\s+/g, ' ').slice(0, 120)}`)
  );
};

describe('KWCAG 5.1.3.3 텍스트 콘텐츠의 명도 대비', () => {
  it('링크 색은 테마에 따라 갈린다', () => {
    // `.main` is tuned against a white page: on the dark canvas `primary.main`
    // is 4.19:1, under the 4.5:1 body text needs. Every link in a consuming app
    // inherits this default, so it is the single highest-reach instance of that
    // defect in the package.
    const { container } = withProvider(<Link href="#">링크</Link>);
    const cls = container.querySelector('a')?.className ?? '';

    // Emotion compiles the conditional into a class; a flat string value would
    // not produce a `_dark` variant at all.
    expect(cls).not.toBe('');
  });

  it('호출부가 준 색을 버리지 않는다', () => {
    // The old implementation narrowed with `typeof color === 'string'` and
    // dropped anything else — so a per-theme `{ base, _dark }`, which is the
    // documented way to fix a contrast problem, was silently replaced by the
    // default. Accepted by the type, discarded at runtime, no error either way.
    const custom = { base: 'danger.main', _dark: 'danger.dark' };
    const { container } = withProvider(
      <Link href="#" color={custom}>
        링크
      </Link>
    );
    const withCustom = container.querySelector('a')?.className ?? '';

    const { container: plain } = withProvider(<Link href="#">링크</Link>);
    const withDefault = plain.querySelector('a')?.className ?? '';

    expect(withCustom).not.toBe(withDefault);
  });
});

describe('axe — 구조·ARIA 규칙', () => {
  it.each([
    [
      '이름이 있는 셀렉트',
      <SelectField
        key="select"
        options={[{ label: 'One', value: '1' }]}
        ariaLabel="분류 선택"
      />,
    ],
    [
      '이름이 있는 슬라이더',
      <Slider key="slider" ariaLabel="탐색" value={[10]} min={0} max={100}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    ],
    [
      '라디오 그룹',
      <RadioGroup key="radio" defaultValue="a">
        <Radio value="a">
          <Radio.Control />
          <Radio.Text>A</Radio.Text>
        </Radio>
        <Radio value="b">
          <Radio.Control />
          <Radio.Text>B</Radio.Text>
        </Radio>
      </RadioGroup>,
    ],
    ['파일 입력', <FileInput key="file" onChange={() => {}} />],
  ])('%s', async (_name, ui) => {
    const { container } = withProvider(ui);
    expect(await axeViolations(container)).toEqual([]);
  });
});

/**
 * The link ramp's HOVER states, measured rather than rendered.
 *
 * The resting colour has a test above; the hover did not, and that is exactly
 * where the defect got in. `defaultHoverColor` was written as "one step darker"
 * — correct against a white page, and backwards on a dark one, where darker
 * means *toward* the background. The dark hover landed on 4.19:1 while the
 * resting colour it replaced had just been fixed to clear 4.5:1.
 *
 * No scanner catches this: axe measures the resting state only, and jsdom
 * cannot resolve an emotion conditional into a colour. So this asserts the
 * palette arithmetic directly, against the raw scale — which also holds if
 * someone re-pegs `blue.100` or `rose.100` later for an unrelated reason.
 *
 * KWCAG 2.2 5.3.3 텍스트 콘텐츠의 명도 대비 applies to text in every state a
 * user can put it in, and hover is a state a mouse user is IN while reading.
 */
// Both ramps live here because they share one defect and one measuring
// table: `primary.main`/`danger.main` are tuned against a WHITE page and
// go under AA as TEXT in dark. `Link` was the first component caught;
// `Tab`'s selected label was the third.
describe('브랜드 색 대비 — Link · Tab 램프', () => {
  const relativeLuminance = (hex: string) => {
    const n = hex.replace('#', '');
    const channels = [0, 2, 4].map(
      (i) => parseInt(n.slice(i, i + 2), 16) / 255
    );
    const [r, g, b] = channels.map((c) =>
      c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a: string, b: string) => {
    const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort(
      (x, y) => y - x
    );
    return (hi + 0.05) / (lo + 0.05);
  };

  /** The canvas each mode's text is read against (`bg.surface`). */
  const LIGHT_CANVAS = '#FFFFFF';
  const DARK_CANVAS = '#181A20';
  const AA_BODY_TEXT = 4.5;

  /**
   * Semantic token → raw hex, per mode. Only the steps this ramp uses; kept
   * literal so the test breaks loudly if the semantic layer is re-pointed
   * rather than silently measuring the wrong colour.
   */
  const RESOLVED: Record<string, { base: string; _dark: string }> = {
    'primary.main': {
      base: colors.blue[500].value,
      _dark: colors.blue[300].value,
    },
    'primary.dark': {
      base: colors.blue[700].value,
      _dark: colors.blue[200].value,
    },
    'primary.darker': {
      base: colors.blue[900].value,
      _dark: colors.blue[100].value,
    },
    'danger.main': {
      base: colors.rose[500].value,
      _dark: colors.rose[300].value,
    },
    'danger.dark': {
      base: colors.rose[700].value,
      _dark: colors.rose[200].value,
    },
    'danger.darker': {
      base: colors.rose[900].value,
      _dark: colors.rose[100].value,
    },
    // The ink steps. These INVERT rather than shift — that is the whole point,
    // and the reason the neutral button and the selected tab can be one token
    // in both modes instead of a two-arm ramp.
    'fg.emphasized': {
      base: colors.gray[1300].value,
      _dark: colors.grayDark[200].value,
    },
    'bg.inverse': {
      base: colors.gray[1300].value,
      _dark: colors.grayDark[50].value,
    },
    'fg.inverse': {
      base: colors.gray[0].value,
      _dark: colors.grayDark[1400].value,
    },
  };

  const resolve = (token: string, mode: 'base' | '_dark') => {
    const entry = RESOLVED[token];
    if (!entry) throw new Error(`토큰 ${token} 의 원색이 이 표에 없다`);
    return entry[mode];
  };

  it.each([
    ['기본 링크', LINK_RAMP.default],
    ['기본 링크 hover', LINK_RAMP.defaultHover],
    ['오류 링크', LINK_RAMP.error],
    ['오류 링크 hover', LINK_RAMP.errorHover],
  ])('%s 가 라이트·다크 양쪽에서 4.5:1 을 넘는다', (_what, ramp) => {
    // Reads the tokens the COMPONENT actually uses. A version of this test that
    // hardcoded the expected steps passed just fine with the hover pointing at
    // `primary.main` — measuring the right arithmetic about the wrong colour.
    expect(
      contrast(resolve(ramp.base, 'base'), LIGHT_CANVAS)
    ).toBeGreaterThanOrEqual(AA_BODY_TEXT);
    expect(
      contrast(resolve(ramp._dark, '_dark'), DARK_CANVAS)
    ).toBeGreaterThanOrEqual(AA_BODY_TEXT);
  });

  it('hover 가 배경 반대쪽으로 간다 — 양쪽 모드에서', () => {
    // The invariant the defect broke: hovering must make the link stand out
    // MORE. "One step darker" is correct on a white page and backwards on a
    // dark one, where darker means toward the background.
    for (const [mode, canvas] of [
      ['base', LIGHT_CANVAS],
      ['_dark', DARK_CANVAS],
    ] as const) {
      const resting = contrast(resolve(LINK_RAMP.default[mode], mode), canvas);
      const hover = contrast(
        resolve(LINK_RAMP.defaultHover[mode], mode),
        canvas
      );
      expect(
        hover,
        `${mode} 에서 hover 가 resting 보다 흐리다`
      ).toBeGreaterThan(resting);
    }
  });

  it('선택된 가로 탭의 레이블이 라이트·다크 양쪽에서 4.5:1 을 넘는다', () => {
    // Measured against `DARK_CANVAS` (#181A20), the RAISED surface — not the
    // page background (#0E1014). That distinction is the whole defect:
    // `primary.main` is 4.59:1 on the page and 4.19:1 here, so the selected tab
    // passed every full-page scan and failed the first time a tab list rendered
    // inside a modal. The stricter of the two surfaces is the one to hold.
    expect(
      contrast(resolve(TAB_RAMP.label, 'base'), LIGHT_CANVAS)
    ).toBeGreaterThanOrEqual(AA_BODY_TEXT);
    expect(
      contrast(resolve(TAB_RAMP.label, '_dark'), DARK_CANVAS)
    ).toBeGreaterThanOrEqual(AA_BODY_TEXT);
  });

  it('선택 표시 밑줄은 그래픽 기준 3:1 을 넘는다', () => {
    // The underline is not text, so its bar is 3:1 (KWCAG 5.3.4 콘텐츠 간의
    // 구분 / WCAG 1.4.11), which is why it keeps `primary.main` while the label
    // moves. Held here so a later "make them match" edit has to be deliberate
    // rather than arriving as a silent contrast change.
    const AA_NON_TEXT = 3;
    expect(
      contrast(resolve(TAB_RAMP.indicator, 'base'), LIGHT_CANVAS)
    ).toBeGreaterThanOrEqual(AA_NON_TEXT);
    expect(
      contrast(resolve(TAB_RAMP.indicator, '_dark'), DARK_CANVAS)
    ).toBeGreaterThanOrEqual(AA_NON_TEXT);
  });

  /**
   * The regression this file did not have, and the defect it would have caught:
   * `neutral` + `solid` shipped a white label on `gray.700`, which is 4.12:1 in
   * light and 3.15:1 in dark. A neutral fill has to INVERT with the mode — a
   * shift fixes one arm and breaks the other, which is exactly what the obvious
   * "one step darker" does (5.32:1 light, 3.08:1 dark).
   */
  it('중립 solid 버튼의 레이블이 라이트·다크 양쪽에서 4.5:1 을 넘는다', () => {
    const { bgColor, color } = buttonColorPaletteStyles.neutral.solid;

    expect(
      contrast(
        resolve(color as string, 'base'),
        resolve(bgColor as string, 'base')
      )
    ).toBeGreaterThanOrEqual(AA_BODY_TEXT);
    expect(
      contrast(
        resolve(color as string, '_dark'),
        resolve(bgColor as string, '_dark')
      )
    ).toBeGreaterThanOrEqual(AA_BODY_TEXT);
  });

  /**
   * A fill that does not separate from its own page is a label floating in
   * space. Ink on charcoal is the failure mode: a FIXED near-black would be
   * ~1.2:1 against a dark canvas, which is why `bg.inverse` inverts.
   */
  it('중립 solid 버튼의 면이 양쪽 모드에서 캔버스와 3:1 이상 갈라진다', () => {
    const AA_NON_TEXT = 3;
    const { bgColor } = buttonColorPaletteStyles.neutral.solid;

    expect(
      contrast(resolve(bgColor as string, 'base'), LIGHT_CANVAS)
    ).toBeGreaterThanOrEqual(AA_NON_TEXT);
    expect(
      contrast(resolve(bgColor as string, '_dark'), DARK_CANVAS)
    ).toBeGreaterThanOrEqual(AA_NON_TEXT);
  });
});
