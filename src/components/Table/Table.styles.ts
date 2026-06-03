import { TableScrollState } from './TableContext';

export type StickyDirection = 'left' | 'right';

export const getStickyStyles = (
  isSticky: boolean,
  stickyDirection: StickyDirection = 'left',
  scrollState: TableScrollState,
  stickyOffset = 0,
  isLastSticky = false
) => {
  if (!isSticky || !scrollState) return {};
  const { isScrollStart, isScrollEnd, isScrolling } = scrollState;

  // 양쪽 sticky 상태
  const isBothSticky =
    (stickyDirection === 'left' && isScrollEnd) ||
    (stickyDirection === 'right' && isScrollStart);

  // 한쪽 sticky 상태
  const isSingleSticky = isScrolling;

  // Only show shadow if this is the last sticky column on this side
  const shouldShowShadow = isLastSticky && (isSingleSticky || isBothSticky);

  return {
    position: 'sticky' as const,
    overflow: 'visible',
    [stickyDirection]: `${stickyOffset}px`,
    zIndex: 2,
    backgroundColor: 'bg.surface',
    ...(shouldShowShadow && {
      _after: {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: '-1px',
        width: '32px',
        insetInlineEnd: stickyDirection === 'left' ? 0 : '100%',
        translate: stickyDirection === 'left' ? '100%' : '-8',
        boxShadow:
          stickyDirection === 'left'
            ? 'rgba(0, 0, 0, 0.16) 8px 0px 8px -8px inset'
            : 'rgba(0, 0, 0, 0.16) -8px 0px 8px -8px inset',
      },
    }),
  };
};
