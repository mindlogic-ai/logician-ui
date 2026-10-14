import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import {
  Menu,
  MenuContentProps as ChakraMenuContentProps,
  Portal,
} from '@chakra-ui/react';

import { staggerProps } from '@/utils/staggerProps';

import { ScaledContext } from '../ScaledContext';
import { useMenuContext } from './Menu.types';

export type MenuListProps = ChakraMenuContentProps & {
  portalled?: boolean;
  /**
   * Deal the rows in one after another instead of showing the menu as one
   * block.
   *
   * Opt-in rather than the default: it suits a short menu opened deliberately,
   * and works against a long one or a menu reopened repeatedly in the same
   * gesture, where the reader already knows what is in it and is only waiting
   * for the row they came for.
   */
  stagger?: boolean;
};

export const MenuList = forwardRef<HTMLDivElement, MenuListProps>(
  ({ children, portalled = true, stagger = false, ...rest }, ref) => {
    const { baseFontSize } = useMenuContext();

    // Cloned rather than asking the call site to thread an index through every
    // `Menu.Item`: the index is a fact about the list, and the list is here.
    // Anything that is not an element — a bare string, the `false` from a
    // `{cond && <Item/>}` branch — passes through untouched rather than
    // throwing. Such a branch still consumes its index, so a hidden row leaves a
    // gap in the rhythm; below the cap that is a 35ms hole nobody sees, and
    // renumbering would cost a second pass to buy nothing.
    const rows = stagger
      ? Children.map(children, (child, index) =>
          isValidElement(child)
            ? cloneElement(child, staggerProps(index))
            : child
        )
      : children;

    const content = (
      <Menu.Positioner>
        <Menu.Content
          ref={ref}
          border="1px solid"
          borderColor="border.subtle"
          borderRadius="md"
          // Light keeps its original near-white halo; dark uses a real dark
          // shadow so the menu doesn't glow against the dark canvas.
          boxShadow={{
            base: '0 5px 20px 1px {colors.gray.50}',
            _dark: '0 5px 20px 1px rgba(0, 0, 0, 0.5)',
          }}
          p="1.5"
          // Chakra's recipe opens the menu in 150ms and closes it in 100 —
          // nearly symmetric, and shorter than everything else that appears
          // over the page. `presence` puts it on the house enter/exit ratio;
          // the slide-from-the-trigger movement is the recipe's and stays.
          animationStyle="presence"
          {...rest}
        >
          <ScaledContext fontSize={baseFontSize}>{rows}</ScaledContext>
        </Menu.Content>
      </Menu.Positioner>
    );

    return portalled ? <Portal>{content}</Portal> : content;
  }
);
MenuList.displayName = 'Menu.List';
