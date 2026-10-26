import { forwardRef } from 'react';
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

import { system } from '../../theme';
import { NavList } from './NavList';

const renderUi = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

/** Stand-in for `next/link`: a component that renders an `<a>` and forwards its ref. */
const RouterLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => <a ref={ref} data-router-link="" {...props} />);
RouterLink.displayName = 'RouterLink';

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
      expect(screen.queryByText('12')).toBeNull();
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
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
      expect(screen.queryByRole('link', { name: 'A' })).toBeNull();
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
