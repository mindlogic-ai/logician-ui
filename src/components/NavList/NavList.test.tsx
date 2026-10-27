import { forwardRef, useId } from 'react';
import { renderToString } from 'react-dom/server';
import { ChakraProvider } from '@chakra-ui/react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { LogicianProvider } from '@/components/LogicianProvider';
import { Menu } from '@/components/Menu';
import { Tooltip } from '@/components/Tooltip';

import { system } from '../../theme';
import { SCHEMES } from '../../theme/palette.generated';
import { NavList } from './NavList';
import { NAV_LIST_RAMP } from './NavList.styles';

const renderUi = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

/** Stand-in for `next/link`: a component that renders an `<a>` and forwards its ref. */
const RouterLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => <a ref={ref} data-router-link="" {...props} />);
RouterLink.displayName = 'RouterLink';

/**
 * Every emitted rule whose selector names one of `el`'s classes, as
 * `[at-rule, selector, declarations]`. jsdom runs no transitions and no
 * `:active`, so what is checked is which declarations reach the element —
 * the same approach as `Collapsible.presence.test.tsx`.
 */
const rulesFor = (el: Element) => {
  const css = Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');
  // Split into [at-rule, block] runs: top level, and each `@media` block.
  const blocks: [string, string][] = [];
  const top: string[] = [];
  let i = 0;
  while (i < css.length) {
    const at = css.indexOf('@media', i);
    if (at === -1) {
      top.push(css.slice(i));
      break;
    }
    top.push(css.slice(i, at));
    const open = css.indexOf('{', at);
    let depth = 1;
    let j = open + 1;
    const brace = /[{}]/g;
    while (depth > 0) {
      brace.lastIndex = j;
      const next = brace.exec(css);
      if (!next) break;
      depth += next[0] === '{' ? 1 : -1;
      j = next.index + 1;
    }
    blocks.push([css.slice(at, open), css.slice(open + 1, j - 1)]);
    i = j;
  }
  blocks.push(['', top.join('')]);
  const classes = el.className
    .toString()
    .split(' ')
    .filter((c) => c.startsWith('css-'));
  const rules = blocks.flatMap(([media, text]) =>
    text.split('}').flatMap((piece) => {
      const open = piece.indexOf('{');
      return open === -1
        ? []
        : [
            [
              media,
              piece.slice(0, open).trim(),
              piece.slice(open + 1),
            ] as const,
          ];
    })
  );
  return rules.filter(([, selector]) =>
    classes.some((c) => new RegExp(`\\.${c}(?![\\w-])`).test(selector))
  );
};
/** The declarations on the element itself — no condition, no descendant. */
const ownDeclarations = (el: Element) =>
  rulesFor(el)
    .filter(([media, selector]) => !media && /^\.css-[\w-]+$/.test(selector))
    .map(([, , body]) => body)
    .join(';');
/** WCAG relative-luminance contrast of two `#rrggbb` colours. */
const contrast = (a: string, b: string) => {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const v = parseInt(hex.slice(i, i + 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

beforeAll(() => {
  // LogicianProvider's color-mode machinery calls it on mount; jsdom has none.
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

describe('NavList', () => {
  describe('structure', () => {
    it('is a named nav landmark around a list when given aria-label', () => {
      renderUi(
        <NavList aria-label="설정">
          <NavList.Item href="/a">A</NavList.Item>
        </NavList>
      );
      const nav = screen.getByRole('navigation', { name: '설정' });
      expect(nav.querySelector(':scope > ul')).not.toBeNull();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    it('is only a list without a name — no anonymous landmark', () => {
      renderUi(
        <NavList>
          <NavList.Item href="/a">A</NavList.Item>
        </NavList>
      );
      expect(screen.queryByRole('navigation')).toBeNull();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('is not tabs: no tablist, tab or aria-selected anywhere', () => {
      const { container } = renderUi(
        <NavList aria-label="필터">
          <NavList.Item isCurrent onClick={() => {}}>
            전체
          </NavList.Item>
          <NavList.Item onClick={() => {}}>이미지</NavList.Item>
        </NavList>
      );
      expect(screen.queryByRole('tablist')).toBeNull();
      expect(screen.queryByRole('tab')).toBeNull();
      expect(container.querySelector('[aria-selected]')).toBeNull();
    });

    it('labels a group list with its title, which is not a heading', () => {
      renderUi(
        <NavList aria-label="드라이브">
          <NavList.Group title="공유 드라이브">
            <NavList.Item onClick={() => {}}>마케팅</NavList.Item>
          </NavList.Group>
        </NavList>
      );
      expect(
        screen.getByRole('list', { name: '공유 드라이브' })
      ).toBeInTheDocument();
      expect(screen.queryByRole('heading')).toBeNull();
    });

    it('puts the trailing action beside the row, not inside it', () => {
      renderUi(
        <NavList aria-label="세션">
          <NavList.Item
            href="/s/1"
            trailingAction={<button type="button">더 보기</button>}
          >
            세션 1
          </NavList.Item>
        </NavList>
      );
      const link = screen.getByRole('link', { name: '세션 1' });
      const action = screen.getByRole('button', { name: '더 보기' });
      expect(link.contains(action)).toBe(false);
      expect(link.closest('li')).toBe(action.closest('li'));
    });

    it('reads the trailing count as part of the row name and hides the icon', () => {
      renderUi(
        <NavList aria-label="필터">
          <NavList.Item
            onClick={() => {}}
            leadingVisual={<svg data-testid="icon" />}
            trailingVisual="12"
          >
            이미지
          </NavList.Item>
        </NavList>
      );
      expect(screen.getByRole('button', { name: '이미지 12' })).toBeVisible();
      expect(
        screen.getByTestId('icon').closest('[aria-hidden]')
      ).not.toBeNull();
    });
  });

  describe('button vs anchor', () => {
    it('renders an <a> with href', () => {
      renderUi(
        <NavList>
          <NavList.Item href="/images">이미지</NavList.Item>
        </NavList>
      );
      const el = screen.getByRole('link', { name: '이미지' });
      expect(el.tagName).toBe('A');
      expect(el).toHaveAttribute('href', '/images');
    });

    it('renders <button type="button"> with only onClick', () => {
      renderUi(
        <NavList>
          <NavList.Item onClick={() => {}}>이미지</NavList.Item>
        </NavList>
      );
      const el = screen.getByRole('button', { name: '이미지' });
      expect(el.tagName).toBe('BUTTON');
      expect(el).toHaveAttribute('type', 'button');
    });

    it('merges onto a router link with asChild, keeping the label and visuals', () => {
      renderUi(
        <NavList>
          <NavList.Item asChild isCurrent trailingVisual="3">
            <RouterLink href="/videos">영상</RouterLink>
          </NavList.Item>
        </NavList>
      );
      const el = screen.getByRole('link', { name: '영상 3' });
      expect(el).toHaveAttribute('data-router-link');
      expect(el).toHaveAttribute('href', '/videos');
      expect(el).toHaveAttribute('aria-current', 'page');
      // One link, not a link inside a link.
      expect(screen.getAllByRole('link')).toHaveLength(1);
    });
  });

  describe('aria-current', () => {
    it('is "page" on the current link only', () => {
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a">A</NavList.Item>
          <NavList.Item href="/b" isCurrent>
            B
          </NavList.Item>
          <NavList.Item href="/c">C</NavList.Item>
        </NavList>
      );
      const current = screen
        .getAllByRole('link')
        .filter((l) => l.hasAttribute('aria-current'));
      expect(current).toHaveLength(1);
      expect(current[0]).toHaveTextContent('B');
      expect(current[0]).toHaveAttribute('aria-current', 'page');
    });

    it('is "true" on the current button only', () => {
      renderUi(
        <NavList aria-label="필터">
          <NavList.Item onClick={() => {}} isCurrent>
            전체
          </NavList.Item>
          <NavList.Item onClick={() => {}}>이미지</NavList.Item>
        </NavList>
      );
      expect(screen.getByRole('button', { name: '전체' })).toHaveAttribute(
        'aria-current',
        'true'
      );
      expect(
        screen.getByRole('button', { name: '이미지' })
      ).not.toHaveAttribute('aria-current');
    });
  });

  describe('keyboard', () => {
    it('Tab visits every row and trailing action in order; arrows do nothing', async () => {
      const user = userEvent.setup();
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a">A</NavList.Item>
          <NavList.Item
            href="/b"
            isCurrent
            trailingAction={<button type="button">B 옵션</button>}
          >
            B
          </NavList.Item>
          <NavList.Item onClick={() => {}}>C</NavList.Item>
        </NavList>
      );
      await user.tab();
      expect(screen.getByRole('link', { name: 'A' })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole('link', { name: 'B' })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole('button', { name: 'B 옵션' })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole('button', { name: 'C' })).toHaveFocus();

      // Not a roving-tabindex widget: arrow keys leave focus where it is.
      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('button', { name: 'C' })).toHaveFocus();
    });

    it('Enter and Space activate a button row', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderUi(
        <NavList aria-label="필터">
          <NavList.Item onClick={onClick}>이미지</NavList.Item>
        </NavList>
      );
      await user.tab();
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('Enter activates a link row', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a" onClick={onClick}>
            A
          </NavList.Item>
        </NavList>
      );
      await user.tab();
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled', () => {
    it('a disabled button is disabled and skipped by Tab', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderUi(
        <NavList aria-label="필터">
          <NavList.Item onClick={onClick} isDisabled>
            이미지
          </NavList.Item>
          <NavList.Item onClick={() => {}}>영상</NavList.Item>
        </NavList>
      );
      expect(screen.getByRole('button', { name: '이미지' })).toBeDisabled();
      await user.tab();
      expect(screen.getByRole('button', { name: '영상' })).toHaveFocus();
      await user.click(screen.getByRole('button', { name: '이미지' }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('a disabled link is still a link, with aria-disabled, no href, skipped by Tab', async () => {
      const user = userEvent.setup();
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a" isDisabled>
            A
          </NavList.Item>
          <NavList.Item href="/b">B</NavList.Item>
        </NavList>
      );
      const disabled = screen.getByRole('link', { name: 'A' });
      expect(disabled.tagName).toBe('A');
      expect(disabled).toHaveAttribute('aria-disabled', 'true');
      expect(disabled).not.toHaveAttribute('href');
      await user.tab();
      expect(screen.getByRole('link', { name: 'B' })).toHaveFocus();
    });

    it('a disabled asChild link drops the router link and its handlers entirely', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const onChildClick = vi.fn();
      const { container } = renderUi(
        <NavList>
          <NavList.Item asChild isDisabled onClick={onClick}>
            <RouterLink href="/a" onClick={onChildClick}>
              A
            </RouterLink>
          </NavList.Item>
        </NavList>
      );
      const link = screen.getByRole('link', { name: 'A' });
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).not.toHaveAttribute('href');
      expect(container.querySelector('[data-router-link]')).toBeNull();
      await user.click(link);
      expect(onClick).not.toHaveBeenCalled();
      expect(onChildClick).not.toHaveBeenCalled();
    });

    it("isCurrent wins over a router link's own aria-current", () => {
      renderUi(
        <NavList>
          <NavList.Item asChild>
            <RouterLink href="/a" aria-current="page">
              A
            </RouterLink>
          </NavList.Item>
        </NavList>
      );
      expect(screen.getByRole('link', { name: 'A' })).not.toHaveAttribute(
        'aria-current'
      );
    });

    it("runs both the item's and the router link's click handlers", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
      const onChildClick = vi.fn();
      renderUi(
        <NavList>
          <NavList.Item asChild onClick={onClick}>
            <RouterLink href="/a" onClick={onChildClick}>
              A
            </RouterLink>
          </NavList.Item>
        </NavList>
      );
      await user.click(screen.getByRole('link', { name: 'A' }));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onChildClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('data-current', () => {
    it('marks the current link, button and router link — and nothing else', () => {
      const { container } = renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a" isCurrent>
            A
          </NavList.Item>
          <NavList.Item onClick={() => {}} isCurrent>
            B
          </NavList.Item>
          <NavList.Item asChild isCurrent>
            <RouterLink href="/c">C</RouterLink>
          </NavList.Item>
          <NavList.Item href="/d">D</NavList.Item>
        </NavList>
      );
      const marked = container.querySelectorAll('[data-current]');
      expect([...marked].map((el) => el.textContent)).toEqual(['A', 'B', 'C']);
      // On the element that carries the role, so `[data-current]` is the row.
      marked.forEach((el) => expect(el).toHaveAttribute('aria-current'));
    });
  });

  describe('new window', () => {
    it('says so in the name of a target=_blank link', () => {
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="https://docs.example" target="_blank">
            문서
          </NavList.Item>
          <NavList.Item href="/a">설정</NavList.Item>
        </NavList>
      );
      expect(
        screen.getByRole('link', { name: '문서 (새 창 열림)' })
      ).toHaveAttribute('target', '_blank');
      expect(screen.getByRole('link', { name: '설정' })).toBeInTheDocument();
    });

    it('reads target from an asChild router link, in the provider language', () => {
      render(
        <LogicianProvider language="en" loadFonts={false}>
          <NavList aria-label="Menu">
            <NavList.Item asChild>
              <RouterLink href="https://docs.example" target="_blank">
                Docs
              </RouterLink>
            </NavList.Item>
          </NavList>
        </LogicianProvider>
      );
      expect(
        screen.getByRole('link', { name: 'Docs (opens in a new window)' })
      ).toBeInTheDocument();
    });

    it('a disabled link opens nothing, so it neither says so nor keeps target', () => {
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="https://x.example" target="_blank" isDisabled>
            문서
          </NavList.Item>
        </NavList>
      );
      const link = screen.getByRole('link', { name: '문서' });
      expect(link).not.toHaveAttribute('target');
    });
  });

  describe('tooltip', () => {
    const hover = async (el: HTMLElement) => {
      fireEvent.pointerMove(el, { pointerType: 'mouse' });
      await act(() => new Promise((r) => setTimeout(r, 400)));
    };

    it('`tooltip` is the row DESCRIPTION, opens on hover and closes on Escape; the click still lands', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item onClick={onClick} tooltip="팀 전체가 쓰는 공간">
            공유 드라이브
          </NavList.Item>
        </NavList>
      );
      const row = screen.getByRole('button', { name: '공유 드라이브' });
      await hover(row);
      const openTip = () =>
        document.querySelector('[data-part="content"][data-state="open"]');
      await waitFor(() =>
        expect(openTip()).toHaveTextContent('팀 전체가 쓰는 공간')
      );
      expect(row).toHaveAccessibleDescription('팀 전체가 쓰는 공간');
      expect(row).toHaveAccessibleName('공유 드라이브');
      await user.keyboard('{Escape}');
      await waitFor(() => expect(openTip()).toBeNull());
      await user.click(row);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it.each([
      // jsdom has no layout, so the popper may flip to the opposite side:
      // only the axis is asserted.
      [undefined, /^(top|bottom)/],
      ['end', /^(left|right)/],
    ] as const)(
      "tooltipPlacement=%s opens an expanded row's tooltip on the %s axis",
      async (tooltipPlacement, side) => {
        renderUi(
          <NavList aria-label="메뉴">
            <NavList.Item
              onClick={() => {}}
              tooltip="팀 전체가 쓰는 공간"
              tooltipPlacement={tooltipPlacement}
            >
              공유 드라이브
            </NavList.Item>
          </NavList>
        );
        await hover(screen.getByRole('button', { name: '공유 드라이브' }));
        await waitFor(() =>
          expect(
            document.querySelector('[data-part="content"][data-state="open"]')
          ).toHaveAttribute('data-placement', expect.stringMatching(side))
        );
      }
    );

    it('an end tooltip on a row with a trailing action measures from the whole <li>', async () => {
      const liRect = vi.spyOn(HTMLLIElement.prototype, 'getBoundingClientRect');
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item
            onClick={() => {}}
            tooltip="회의를 녹음하고 요약을 받아요"
            tooltipPlacement="end"
            trailingAction={<button type="button">고정</button>}
          >
            회의록
          </NavList.Item>
        </NavList>
      );
      await hover(screen.getByRole('button', { name: '회의록' }));
      await waitFor(() =>
        expect(
          document.querySelector('[data-part="content"][data-state="open"]')
        ).not.toBeNull()
      );
      expect(liRect).toHaveBeenCalled();
      liRect.mockRestore();
    });

    it('a disabled row still carries its tooltip as a description, closed', () => {
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item
            onClick={() => {}}
            isDisabled
            tooltip="엔터프라이즈 요금제에서 쓸 수 있습니다"
          >
            SSO
          </NavList.Item>
          <NavList.Item href="/a" isDisabled tooltip="권한이 없습니다">
            감사 로그
          </NavList.Item>
        </NavList>
      );
      expect(
        screen.getByRole('button', { name: 'SSO' })
      ).toHaveAccessibleDescription('엔터프라이즈 요금제에서 쓸 수 있습니다');
      expect(
        screen.getByRole('link', { name: '감사 로그' })
      ).toHaveAccessibleDescription('권한이 없습니다');
      // Not read a second time as text in the list item.
      expect(screen.queryByText('권한이 없습니다')).not.toBeVisible();
    });

    it("keeps the caller's own aria-describedby beside the tooltip's", () => {
      renderUi(
        <>
          <p id="hint">새 기능</p>
          <NavList aria-label="메뉴">
            <NavList.Item href="/a" aria-describedby="hint" tooltip="설명">
              A
            </NavList.Item>
          </NavList>
        </>
      );
      expect(
        screen.getByRole('link', { name: 'A' })
      ).toHaveAccessibleDescription('새 기능 설명');
    });

    it('opens on keyboard focus', async () => {
      const user = userEvent.setup();
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a" tooltip="설명">
            A
          </NavList.Item>
        </NavList>
      );
      await user.tab();
      await waitFor(() =>
        expect(
          document.querySelector('[data-part="content"][data-state="open"]')
        ).toHaveTextContent('설명')
      );
    });

    describe('overflow label', () => {
      afterEach(() => vi.restoreAllMocks());
      const widths = (scroll: number, client: number) => {
        vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(
          scroll
        );
        vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(
          client
        );
      };

      it('shows the full label only when the ellipsis cuts it off, and not as a description', async () => {
        widths(300, 120);
        renderUi(
          <NavList aria-label="메뉴">
            <NavList.Item href="/a">
              영업팀 — 2026년 하반기 제안서와 계약서 보관함
            </NavList.Item>
          </NavList>
        );
        const row = screen.getByRole('link');
        await hover(row);
        await waitFor(() =>
          expect(
            document.querySelector('[data-part="content"][data-state="open"]')
          ).toHaveTextContent('영업팀 — 2026년 하반기 제안서와 계약서 보관함')
        );
        // The label is already the name; reading it again as a description is noise.
        expect(row).toHaveAccessibleDescription('');
        expect(row).toHaveAccessibleName(
          '영업팀 — 2026년 하반기 제안서와 계약서 보관함'
        );
      });

      it('stays closed when the label fits', async () => {
        widths(80, 120);
        renderUi(
          <NavList aria-label="메뉴">
            <NavList.Item href="/a">짧음</NavList.Item>
          </NavList>
        );
        await hover(screen.getByRole('link'));
        expect(
          document.querySelector('[data-part="content"][data-state="open"]')
        ).toBeNull();
      });
    });
  });

  describe('isCollapsed', () => {
    it('keeps the label as the name, drops trailing visuals and actions, and tooltips the label', async () => {
      renderUi(
        <NavList aria-label="메뉴" isCollapsed>
          <NavList.Item
            href="/a"
            isCurrent
            leadingVisual={<svg data-testid="icon" />}
            trailingVisual="12"
            trailingAction={<button type="button">옵션</button>}
          >
            멤버 관리
          </NavList.Item>
        </NavList>
      );
      const row = screen.getByRole('link', { name: '멤버 관리' });
      expect(row).toHaveAttribute('aria-current', 'page');
      // The count stays in the DOM so it can fade with the label, but it is
      // hidden — out of the name (asserted above) and out of sight.
      expect(screen.getByText('12')).not.toBeVisible();
      expect(screen.queryByRole('button', { name: '옵션' })).toBeNull();
      fireEvent.pointerMove(row, { pointerType: 'mouse' });
      await act(() => new Promise((r) => setTimeout(r, 400)));
      await waitFor(() =>
        expect(
          document.querySelector('[data-part="content"][data-state="open"]')
        ).toHaveTextContent('멤버 관리')
      );
      expect(row).toHaveAccessibleDescription('');
      // While open, no reference to a tooltip id that does not exist.
      const ids = (row.getAttribute('aria-describedby') ?? '')
        .split(' ')
        .filter(Boolean);
      ids.forEach((id) => expect(document.getElementById(id)).not.toBeNull());
    });

    it('shows a description under the label and keeps it as the description', async () => {
      renderUi(
        <NavList aria-label="메뉴" isCollapsed>
          <NavList.Item
            href="/a"
            leadingVisual={<svg />}
            tooltip="멤버 초대와 권한"
          >
            멤버 관리
          </NavList.Item>
        </NavList>
      );
      const row = screen.getByRole('link', { name: '멤버 관리' });
      expect(row).toHaveAccessibleDescription('멤버 초대와 권한');
      fireEvent.pointerMove(row, { pointerType: 'mouse' });
      await act(() => new Promise((r) => setTimeout(r, 400)));
      await waitFor(() =>
        expect(
          document.querySelector('[data-part="content"][data-state="open"]')
        ).toHaveTextContent('멤버 관리멤버 초대와 권한')
      );
    });

    it('still names group lists, and shows a collapsible group’s rows', () => {
      renderUi(
        <NavList aria-label="메뉴" isCollapsed>
          <NavList.Group title="관리" isCollapsible defaultOpen={false}>
            <NavList.Item href="/a" leadingVisual={<svg />}>
              A
            </NavList.Item>
          </NavList.Group>
        </NavList>
      );
      expect(screen.getByRole('list', { name: '관리' })).toBeVisible();
      expect(screen.queryByRole('button', { name: '관리' })).toBeNull();
      expect(screen.getByRole('link', { name: 'A' })).toBeVisible();
    });
  });

  describe('trailingActionVisibility="hover"', () => {
    it('keeps the action in the DOM and in the tab order', async () => {
      const user = userEvent.setup();
      renderUi(
        <NavList aria-label="세션">
          <NavList.Item
            href="/s/1"
            trailingActionVisibility="hover"
            trailingAction={<button type="button">세션 1 더 보기</button>}
          >
            세션 1
          </NavList.Item>
        </NavList>
      );
      await user.tab();
      await user.tab();
      expect(
        screen.getByRole('button', { name: '세션 1 더 보기' })
      ).toHaveFocus();
    });
  });

  describe('collapsible group', () => {
    it('is a disclosure: aria-expanded, aria-controls, rows hidden when closed', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Group title="관리" isCollapsible onOpenChange={onOpenChange}>
            <NavList.Item href="/a">A</NavList.Item>
          </NavList.Group>
        </NavList>
      );
      const trigger = screen.getByRole('button', { name: '관리' });
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      const list = screen.getByRole('list', { name: '관리' });
      expect(trigger).toHaveAttribute('aria-controls', list.id);
      await user.click(trigger);
      // On the click, not when the closing animation ends.
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
      // Out of reach while it is still leaving…
      expect(list.inert).toBe(true);
      // …and hidden once it has left.
      await waitFor(() =>
        expect(screen.queryByRole('link', { name: 'A' })).toBeNull()
      );
      expect(list).toHaveAttribute('hidden');
      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(list.inert).toBe(false);
      expect(screen.getByRole('link', { name: 'A' })).toBeVisible();
    });

    it("animates on Collapsible's own motion: its keyframes, the presence clock, a fade under reduced motion", () => {
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Group title="관리" isCollapsible>
            <NavList.Item href="/a">A</NavList.Item>
          </NavList.Group>
        </NavList>
      );
      const list = screen.getByRole('list', { name: '관리' });
      expect(list).toHaveAttribute('data-scope', 'collapsible');
      const rules = rulesFor(list);
      const all = rules.map(([, , body]) => body).join(';');
      // The recipe's height keyframes, not new ones.
      expect(all).toContain('animation-name:expand-height');
      expect(all).toContain('animation-name:collapse-height');
      // The house clock: 300ms in, 150ms out.
      expect(all).toContain(
        'animation-duration:var(--chakra-durations-motion-base)'
      );
      expect(all).toContain('animation-duration:var(--chakra-durations-fast)');
      const reduced = rules
        .filter(([media]) => media.includes('prefers-reduced-motion'))
        .map(([, , body]) => body)
        .join(';');
      expect(reduced).toContain('animation-name:fade-in');
      expect(reduced).toContain('animation-name:fade-out');
      expect(reduced).not.toContain('height');
    });

    it('a closed group starts hidden and inert', () => {
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Group title="관리" isCollapsible defaultOpen={false}>
            <NavList.Item href="/a">A</NavList.Item>
          </NavList.Group>
        </NavList>
      );
      const list = document.getElementById(
        screen
          .getByRole('button', { name: '관리' })
          .getAttribute('aria-controls')!
      )!;
      expect(list).toHaveAttribute('hidden');
      expect(list.inert).toBe(true);
      expect(screen.queryByRole('link', { name: 'A' })).toBeNull();
    });

    it('collapsing the rail opens the group without remounting its rows', () => {
      const ui = (isCollapsed: boolean) => (
        <ChakraProvider value={system}>
          <NavList aria-label="메뉴" isCollapsed={isCollapsed}>
            <NavList.Group title="관리" isCollapsible defaultOpen={false}>
              <NavList.Item href="/a" leadingVisual={<svg />}>
                A
              </NavList.Item>
            </NavList.Group>
          </NavList>
        </ChakraProvider>
      );
      const { rerender } = render(ui(true));
      const row = screen.getByRole('link', { name: 'A' });
      rerender(ui(false));
      rerender(ui(true));
      expect(screen.getByRole('link', { name: 'A' })).toBe(row);
    });

    it('follows a controlled isOpen and only reports clicks', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Group
            title="관리"
            isCollapsible
            isOpen={false}
            onOpenChange={onOpenChange}
          >
            <NavList.Item href="/a">A</NavList.Item>
          </NavList.Group>
        </NavList>
      );
      const trigger = screen.getByRole('button', { name: '관리' });
      await user.click(trigger);
      expect(onOpenChange).toHaveBeenCalledWith(true);
      // Still closed: the caller owns the state.
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('pressed', () => {
    const PRESS = ':has([data-nav-list-row]:active)';
    const liOf = (name: string) =>
      screen.getByRole('link', { name }).closest('li')!;

    it('fills the row one step past hover while the ROW is pressed, current rows included', () => {
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a">A</NavList.Item>
          <NavList.Item href="/b" isCurrent>
            B
          </NavList.Item>
        </NavList>
      );
      ['A', 'B'].forEach((name) => {
        const rules = rulesFor(liOf(name));
        const pressed = rules.filter(([, sel]) => sel.includes(PRESS));
        expect(pressed.find(([media]) => !media)?.[2], name).toContain(
          'background:var(--chakra-colors-border-default)'
        );
        // High contrast turns `border.default` into a stroke grey, so it
        // takes the token high contrast leaves alone.
        expect(
          pressed.find(([media]) =>
            media.includes('prefers-contrast: more')
          )?.[2],
          name
        ).toContain('background:var(--chakra-colors-border-strong)');
        // And again inside hover, or a pointer press loses to the hover
        // rule, which is just as specific and comes later.
        expect(
          pressed.some(
            ([media, sel, body]) =>
              media.includes('hover: hover') &&
              sel.includes(':hover') &&
              body.includes('var(--chakra-colors-border-default)')
          ),
          name
        ).toBe(true);
        // Distinct from hover, which is `bg.emphasized`.
        const hover = rules.find(([, sel]) => sel.includes(':hover'))?.[2];
        expect(hover).toContain('var(--chakra-colors-bg-emphasized)');
      });
      // The row carries the hook the selector names.
      expect(screen.getByRole('link', { name: 'A' })).toHaveAttribute(
        'data-nav-list-row'
      );
    });

    it('does not press a disabled row', () => {
      renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a" isDisabled>
            A
          </NavList.Item>
        </NavList>
      );
      const li = screen.getByRole('link', { name: 'A' }).closest('li')!;
      expect(rulesFor(li).some(([, sel]) => sel.includes(PRESS))).toBe(false);
    });

    it('keeps the label and the count AA on the pressed fill, in every scheme and mode', () => {
      // Light and dark press onto `border.default`; high contrast onto
      // `border.strong` (see NAV_LIST_RAMP). Text and counts need 4.5:1; the
      // fill has to read as a step from hover (the audit's 1.10:1 for
      // neighbouring layers).
      const FILL = {
        light: 'border-default',
        dark: 'border-default',
        hcLight: 'border-strong',
        hcDark: 'border-strong',
      } as const;
      expect(NAV_LIST_RAMP.pressedFill).toBe('border.default');
      expect(NAV_LIST_RAMP.pressedFillMoreContrast).toBe('border.strong');
      Object.entries(SCHEMES).forEach(([scheme, modes]) =>
        Object.entries(FILL).forEach(([mode, fill]) => {
          const t = (modes as Record<string, Record<string, string>>)[mode];
          const where = `${scheme} ${mode}`;
          expect(contrast(t['fg-default'], t[fill]), where).toBeGreaterThan(
            4.5
          );
          expect(contrast(t['fg-muted'], t[fill]), where).toBeGreaterThan(4.5);
          expect(
            contrast(t[fill], t['layer-1-active']),
            where
          ).toBeGreaterThanOrEqual(1.1);
        })
      );
    });
  });

  describe('hover-revealed action layout', () => {
    const setup = (
      visibility: 'hover' | 'always',
      orientation: 'vertical' | 'horizontal' = 'vertical'
    ) => {
      renderUi(
        <NavList aria-label="세션" orientation={orientation}>
          <NavList.Item
            href="/s/1"
            trailingActionVisibility={visibility}
            trailingAction={<button type="button">더 보기</button>}
          >
            아주 긴 세션 제목
          </NavList.Item>
        </NavList>
      );
      const row = screen.getByRole('link', { name: '아주 긴 세션 제목' });
      return { row, li: row.closest('li')! };
    };

    it('hover: the label has the whole row at rest and makes room only while the action shows', () => {
      const { row, li } = setup('hover');
      expect(ownDeclarations(li)).toContain('display:grid');
      expect(ownDeclarations(row)).toContain('grid-column:1/-1');
      const rules = rulesFor(li);
      const giveBack = (selector: string) =>
        rules.some(
          ([media, sel, body]) =>
            !media &&
            sel.includes(selector) &&
            sel.includes('[data-nav-list-row]') &&
            body.includes('grid-column:1')
        );
      expect(giveBack(':hover')).toBe(true);
      expect(giveBack(':focus-within')).toBe(true);
      expect(giveBack('[aria-expanded="true"]')).toBe(true);
      // Touch: shown, with its space kept.
      const touch = rules.filter(([media]) =>
        /hover: ?none\), ?\(pointer: ?coarse/.test(media)
      );
      expect(
        touch.some(
          ([, sel, body]) =>
            sel.includes('[data-nav-list-row]') &&
            body.includes('grid-column:1')
        )
      ).toBe(true);
      expect(
        touch.some(
          ([, sel, body]) =>
            sel.includes('trailing-action') && body.includes('opacity:1')
        )
      ).toBe(true);
    });

    it('always: the action keeps its own space, as before', () => {
      const { row, li } = setup('always');
      expect(ownDeclarations(li)).toContain('display:flex');
      expect(ownDeclarations(row)).not.toContain('grid-column');
    });

    it('a horizontal strip keeps the space: a row there is only as wide as its label', () => {
      const { li } = setup('hover', 'horizontal');
      expect(ownDeclarations(li)).toContain('display:flex');
    });
  });

  describe('right to left', () => {
    it('lays out from CSS: every element zag stamps `dir` on inherits `direction` instead', () => {
      renderUi(
        <div dir="rtl">
          <NavList aria-label="القائمة">
            <NavList.Item href="/1">الرئيسية</NavList.Item>
            <NavList.Group title="الإدارة" isCollapsible>
              <NavList.Item href="/2">الإعدادات</NavList.Item>
            </NavList.Group>
          </NavList>
        </div>
      );
      const stamped = [
        screen.getByRole('link', { name: 'الرئيسية' }),
        screen.getByRole('link', { name: 'الإعدادات' }),
        screen.getByRole('list', { name: 'الإدارة' }),
        screen.getByRole('list', { name: 'الإدارة' }).closest('li')!,
      ];
      stamped.forEach((el) => {
        expect(el).toHaveAttribute('dir');
        expect(ownDeclarations(el)).toContain('direction:inherit');
      });
    });

    it('the server markup carries no layout direction of its own beyond that', () => {
      // What the browser paints before hydration: zag's `dir="ltr"` stamps
      // are in the HTML, and only the CSS above stops them from deciding
      // the layout. Nothing in the markup depends on an effect.
      const html = renderToString(
        <ChakraProvider value={system}>
          <div dir="rtl">
            <NavList aria-label="القائمة">
              <NavList.Item href="/1">الرئيسية</NavList.Item>
            </NavList>
          </div>
        </ChakraProvider>
      );
      const host = document.createElement('div');
      host.innerHTML = html;
      const row = host.querySelector('a')!;
      expect(row.getAttribute('dir')).toBe('ltr');
      expect(row).toHaveAttribute('data-nav-list-row');
      expect(row.querySelector('[style*="direction"]')).toBeNull();
    });
  });

  describe('rail toggle', () => {
    const items = (isCollapsed: boolean) => (
      <ChakraProvider value={system}>
        <NavList aria-label="메뉴" isCollapsed={isCollapsed}>
          <NavList.Item
            href="/a"
            isCurrent
            leadingVisual={<svg />}
            trailingVisual="12"
          >
            멤버 관리
          </NavList.Item>
          <NavList.Group title="도움말">
            <NavList.Item href="/b" leadingVisual={<svg />}>
              사용 가이드
            </NavList.Item>
          </NavList.Group>
        </NavList>
      </ChakraProvider>
    );

    it('keeps the same row, label element and current state across the toggle', () => {
      const { rerender } = render(items(false));
      const row = screen.getByRole('link', { name: '멤버 관리 12' });
      const label = row.querySelector('[data-part="label"]');
      rerender(items(true));
      const collapsed = screen.getByRole('link', { name: '멤버 관리' });
      expect(collapsed).toBe(row);
      expect(collapsed.querySelector('[data-part="label"]')).toBe(label);
      expect(collapsed).toHaveAttribute('aria-current', 'page');
      expect(collapsed).toHaveAttribute('data-current');
      // The group list keeps its name from the folded title.
      expect(screen.getByRole('list', { name: '도움말' })).toBeInTheDocument();
    });

    it('fades the label and count on the feedback clock, which reduced motion zeroes', () => {
      render(items(true));
      const row = screen.getByRole('link', { name: '멤버 관리' });
      const label = row.querySelector('[data-part="label"]')!;
      const count = screen.getByText('12');
      expect(ownDeclarations(label)).toContain('opacity:0');
      expect(ownDeclarations(label)).toContain('transition-property:opacity');
      expect(ownDeclarations(count)).toMatch(
        /transition-property:opacity, ?visibility/
      );
      [label, count].forEach((el) => {
        expect(ownDeclarations(el)).toContain(
          'transition-duration:var(--chakra-durations-fast)'
        );
        expect(
          rulesFor(el).some(
            ([media, , body]) =>
              media.includes('prefers-reduced-motion') &&
              body.includes(
                'transition-duration:var(--chakra-durations-motion-instant)'
              )
          )
        ).toBe(true);
      });
    });

    it('keeps the row padding in both modes, so the icon does not move', () => {
      const { rerender } = render(items(false));
      const row = screen.getByRole('link', { name: '멤버 관리 12' });
      const padding = (decl: string) =>
        decl.match(/padding-inline:[^;]+/)?.[0] ??
        decl.match(/padding-inline-start:[^;]+/)?.[0];
      const expanded = padding(ownDeclarations(row));
      rerender(items(true));
      expect(padding(ownDeclarations(row))).toBe(expanded);
      expect(ownDeclarations(row)).not.toContain('justify-content:center');
    });
  });

  describe('Tooltip + Menu on one trailing-action trigger', () => {
    it('both wrappers take `ids.trigger`, so the menu anchors to the button', async () => {
      const user = userEvent.setup();
      const RowMenu = () => {
        const triggerId = useId();
        return (
          <Menu ids={{ trigger: triggerId }}>
            <Tooltip ids={{ trigger: triggerId }} content="더 보기">
              <Menu.Trigger asChild>
                <button type="button">세션 1 더 보기</button>
              </Menu.Trigger>
            </Tooltip>
            <Menu.List>
              <Menu.Item value="rename">이름 바꾸기</Menu.Item>
            </Menu.List>
          </Menu>
        );
      };
      renderUi(
        <NavList aria-label="세션">
          <NavList.Item
            href="/s/1"
            trailingActionVisibility="hover"
            trailingAction={<RowMenu />}
          >
            세션 1
          </NavList.Item>
        </NavList>
      );
      const button = screen.getByRole('button', { name: '세션 1 더 보기' });
      await user.click(button);
      const menu = await screen.findByRole('menu');
      // One id on the button, and the menu points at it — the reference
      // zag positions the menu from.
      expect(menu).toHaveAttribute('aria-labelledby', button.id);
    });

    it('without the shared id the two triggers disagree — the bug it prevents', async () => {
      const user = userEvent.setup();
      renderUi(
        <Menu>
          <Tooltip content="더 보기">
            <Menu.Trigger asChild>
              <button type="button">더 보기</button>
            </Menu.Trigger>
          </Tooltip>
          <Menu.List>
            <Menu.Item value="rename">이름 바꾸기</Menu.Item>
          </Menu.List>
        </Menu>
      );
      const button = screen.getByRole('button', { name: '더 보기' });
      await user.click(button);
      const menu = await screen.findByRole('menu');
      expect(menu.getAttribute('aria-labelledby')).not.toBe(button.id);
    });
  });

  describe('Skeleton', () => {
    it('renders the requested rows, hidden from assistive tech', () => {
      const { container } = renderUi(<NavList.Skeleton count={3} />);
      const ul = container.querySelector('ul');
      expect(ul).toHaveAttribute('aria-hidden', 'true');
      expect(ul?.querySelectorAll('li')).toHaveLength(3);
    });
  });

  describe('router links', () => {
    it('onClick + preventDefault reaches the router link as defaultPrevented', async () => {
      const user = userEvent.setup();
      let seen: boolean | undefined;
      renderUi(
        <NavList>
          <NavList.Item asChild onClick={(e) => e.preventDefault()}>
            <RouterLink
              href="/a"
              onClick={(e) => {
                seen = e.defaultPrevented;
              }}
            >
              A
            </RouterLink>
          </NavList.Item>
        </NavList>
      );
      await user.click(screen.getByRole('link', { name: 'A' }));
      expect(seen).toBe(true);
    });

    it('leaves modifier clicks alone, so cmd/ctrl-click can open a new tab', () => {
      const onClick = vi.fn();
      renderUi(
        <NavList>
          <NavList.Item href="/a" onClick={onClick}>
            A
          </NavList.Item>
        </NavList>
      );
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        metaKey: true,
      });
      screen.getByRole('link', { name: 'A' }).dispatchEvent(event);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(false);
    });
  });
});
