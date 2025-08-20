import React, { useEffect, useRef } from 'react';
import { GroupBase } from 'react-select';
import { useTheme } from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { optionStyles } from '../Select.styles';
import { MenuList } from './MenuList';
import { VirtualizedMenuListProps } from './MenuList.types';
import { useVirtualizedMenuListState } from './VirtualizedMenuListContext';
// Custom MenuList component that uses @tanstack/react-virtual when virtualization is enabled
export const VirtualizedMenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  children,
  maxHeight = 35 * 4,
  optionHeight = 35,
  ...props
}: VirtualizedMenuListProps<Option, IsMulti, Group>) => {
  // Get the number of children (options) to render
  const childrenArray = React.Children.toArray(children ?? []);
  const childrenCount = childrenArray.length;
  const menuListRef = useRef(null);
  const theme = useTheme();
  const { isInitialRender, previousChildrenCount } =
    useVirtualizedMenuListState();

  // Set up virtualizer
  const virtualizer = useVirtualizer({
    count: childrenCount,
    getScrollElement: () => menuListRef.current,
    estimateSize: () => optionHeight,
    overscan: 5,
    getItemKey: index => childrenArray[index].key, // Use stable keys
    measureElement: (_, entry, instance) => {
      if (entry) {
        instance.measure();
      }
      return 0;
    },
  });

  // Make sure the menuList takes the full height available to it
  // We need to ensure react-select's menuList is scrollable
  useEffect(() => {
    if (menuListRef.current) {
      // Important: react-select MenuList needs overflow:auto to scroll
      (menuListRef.current as HTMLElement).style.overflowY = 'auto';
    }
  }, [menuListRef.current]);

  // When items change, tell the virtualizer to recalculate
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      previousChildrenCount.current = childrenCount;
      return;
    }
    const itemsWereAdded = childrenCount > previousChildrenCount.current;
    if (itemsWereAdded) {
      // This triggers recalculation while preserving scroll position
      virtualizer.measure();
      virtualizer.scrollToIndex(previousChildrenCount.current - 1, {
        align: 'end',
        behavior: 'auto',
      });
      setTimeout(() => {
        previousChildrenCount.current = childrenCount;
      }, 100);
    }
  }, [childrenArray.length, virtualizer]);

  // Default option styles with fallback values
  const baseOptionStyle = optionStyles({
    isDisabled: false,
    isFocused: false,
    isSelected: false,
  });

  return (
    <MenuList
      {...props}
      innerRef={menuListRef}
      maxHeight={maxHeight}
      // Override the style here to ensure scrolling works
      innerProps={{
        ...props.innerProps,
        style: {
          ...props.innerProps?.style,
          padding: 0,
          height: Math.min(childrenCount * optionHeight, maxHeight),
          maxHeight: Math.min(childrenCount * optionHeight, maxHeight),
          overflow: 'auto',
        },
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            data-index={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
              boxSizing: 'border-box',
              // Apply the base styles from optionStyles
              cursor: baseOptionStyle.cursor,
              borderRadius: baseOptionStyle.borderRadius,
              // Add some necessary styles for proper display
              padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
              userSelect: 'none',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
              display: 'block',
              lineHeight: 2,
              // Don't apply background or text colors here as they're handled by react-select
              // based on interaction state (focus, hover, selected)
            }}
          >
            {childrenArray[virtualRow.index]}
          </div>
        ))}
      </div>
    </MenuList>
  );
};
