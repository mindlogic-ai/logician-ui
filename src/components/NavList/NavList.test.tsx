import { forwardRef } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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

    it('a disabled link loses its href and is skipped by Tab', async () => {
      const user = userEvent.setup();
      const { container } = renderUi(
        <NavList aria-label="메뉴">
          <NavList.Item href="/a" isDisabled>
            A
          </NavList.Item>
          <NavList.Item href="/b">B</NavList.Item>
        </NavList>
      );
      const disabled = container.querySelector('[aria-disabled="true"]');
      expect(disabled?.tagName).toBe('A');
      expect(disabled).not.toHaveAttribute('href');
      await user.tab();
      expect(screen.getByRole('link', { name: 'B' })).toHaveFocus();
    });

    it('a disabled asChild link cancels the click and leaves the tab order', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderUi(
        <NavList>
          <NavList.Item asChild isDisabled onClick={onClick}>
            <RouterLink href="/a">A</RouterLink>
          </NavList.Item>
        </NavList>
      );
      const link = screen.getByRole('link', { name: 'A' });
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(link).toHaveAttribute('aria-disabled', 'true');
      await user.click(link);
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
