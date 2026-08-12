'use client';
import React, {
  Children,
  createContext,
  isValidElement,
  useContext,
} from 'react';
import { Box } from '@chakra-ui/react';

import { SwapCaseProps, SwapProps } from './Swap.types';

interface SwapContextValue {
  /** Position of the showing case in declaration order; -1 if it matched none. */
  activeIndex: number;
  /** Declaration order, keyed by each case's `value`. */
  order: Map<SwapCaseProps['value'], number>;
}

const SwapContext = createContext<SwapContextValue>({
  activeIndex: -1,
  order: new Map(),
});

/** How far a case sits from the window when it is not the one showing. */
const OFFSET = '8px';

/**
 * The two clocks a state swap needs: the outgoing label has to clear fast so the
 * incoming one is not read through it, while the travel is slow enough to be
 * seen as one thing replacing another rather than a flicker.
 */
const SWAP_TRANSITION = [
  'opacity var(--chakra-durations-fast) var(--chakra-easings-standard)',
  'translate var(--chakra-durations-motion-base) var(--chakra-easings-emphasized)',
].join(', ');

/**
 * Swaps between labelled states **without changing size**.
 *
 * Every case is rendered into the same grid cell, so the box is always as wide
 * as its widest state and a button stops resizing when its label changes —
 * "복사" → "복사 완료" would otherwise move the button under the cursor mid-click.
 * The inactive cases stay in the layout (they are what holds the width) but are
 * transparent, unclickable and hidden from assistive tech.
 *
 * Sizing this way rather than with a hand-tuned `minW` means the lock survives
 * translation, where the longest string is not the one you measured.
 *
 * ## Which way a case moves
 *
 * **Declaration order is the running order.** A case listed before the one
 * showing has already happened, so it leaves upward; a case listed after has not
 * happened yet, so it waits below and rises into place. Everything travels the
 * same direction, which is what makes a three-step sequence read as progress
 * rather than as two labels bouncing past each other:
 *
 * ```
 *   저장          ↑ 지나감        ↑ 지나감
 *   저장 중  →      저장 중   →   ↑ 지나감
 *   완료          ↓ 아직         완료
 * ```
 *
 * Order the cases the way the states actually occur. Going backwards is fine —
 * the labels simply run the other way.
 *
 * Cases must be direct children of `Swap`; that is how their order is read.
 *
 * @example
 * ```tsx
 * <Button onClick={copy}>
 *   <Swap value={copied ? 'done' : 'idle'}>
 *     <Swap.Case value="idle"><CopyIcon />복사</Swap.Case>
 *     <Swap.Case value="done"><CheckIcon />복사 완료</Swap.Case>
 *   </Swap>
 * </Button>
 * ```
 */
const SwapRoot = ({ value, children, ...rest }: SwapProps) => {
  const order = new Map<SwapCaseProps['value'], number>();

  Children.toArray(children).forEach((child, index) => {
    if (!isValidElement<SwapCaseProps>(child)) return;
    if (!order.has(child.props.value)) order.set(child.props.value, index);
  });

  const activeIndex = order.get(value) ?? -1;

  return (
    <SwapContext.Provider value={{ activeIndex, order }}>
      <Box
        display="inline-grid"
        placeItems="center"
        // The window the labels slide through: without it the outgoing label
        // would be visible above the button while it fades.
        overflow="hidden"
        {...rest}
      >
        {children}
      </Box>
    </SwapContext.Provider>
  );
};
SwapRoot.displayName = 'Swap';

const SwapCase = ({ value, children, ...rest }: SwapCaseProps) => {
  const { activeIndex, order } = useContext(SwapContext);
  const index = order.get(value) ?? -1;
  const active = index === activeIndex && index !== -1;
  // Past cases have left upward; future ones wait below. An unmatched case (the
  // parent's `value` names nothing) is treated as still to come.
  const resting = index < activeIndex ? `0 -${OFFSET}` : `0 ${OFFSET}`;

  return (
    <Box
      // Every case shares one cell, so the grid takes the widest of them.
      gridArea="1 / 1"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap="1.5"
      whiteSpace="nowrap"
      opacity={active ? 1 : 0}
      translate={active ? '0 0' : resting}
      pointerEvents={active ? undefined : 'none'}
      aria-hidden={!active || undefined}
      transition={SWAP_TRANSITION}
      animationStyle="composite"
      {...rest}
    >
      {children}
    </Box>
  );
};
SwapCase.displayName = 'Swap.Case';

export const Swap = Object.assign(SwapRoot, { Case: SwapCase });
