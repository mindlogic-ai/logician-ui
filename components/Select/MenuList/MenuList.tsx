import React, { useEffect, useRef } from 'react';
import { components, GroupBase } from 'react-select';

import { MenuListProps } from './MenuList.types';

const { MenuList: DefaultMenuList } = components;

// Utility to merge refs
const mergeRefs = <T extends HTMLElement>(
  refs: Array<React.Ref<T> | null | undefined>,
) => {
  return (value: T) => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(value);
      } else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
};

// Regular MenuList with explicit scroll handling
export const MenuList = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  onMenuScrollToBottom,
  innerRef,
  ...props
}: MenuListProps<Option, IsMulti, Group>) => {
  const menuListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuListRef.current || !onMenuScrollToBottom) return;

    let lastScrollTop = 0;

    const handleScroll = (event: WheelEvent | TouchEvent) => {
      const element = menuListRef.current;
      if (!element) return;

      // Check if scrolled downward
      const scrollingDown = element.scrollTop > lastScrollTop;

      // Check if scrolled to bottom (with small buffer for browser precision)
      const scrolledToBottom =
        Math.abs(
          element.scrollHeight - element.scrollTop - element.clientHeight,
        ) < 2;

      // Only trigger if scrolling down AND reached the bottom
      if (scrollingDown && scrolledToBottom) {
        onMenuScrollToBottom(event);
      }

      // Update last scroll position
      lastScrollTop = element.scrollTop;
    };

    const menuListElement = menuListRef.current;
    menuListElement.addEventListener('scroll', handleScroll as EventListener);
    menuListElement.addEventListener(
      'touchmove',
      handleScroll as EventListener,
    );

    return () => {
      menuListElement.removeEventListener(
        'scroll',
        handleScroll as EventListener,
      );
      menuListElement.removeEventListener(
        'touchmove',
        handleScroll as EventListener,
      );
    };
  }, [onMenuScrollToBottom]);

  // Apply both refs instead of using OR logic
  return (
    <DefaultMenuList {...props} innerRef={mergeRefs([innerRef, menuListRef])} />
  );
};
