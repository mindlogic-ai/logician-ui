'use client';
import React, { createContext, useContext } from 'react';
import { Box } from '@chakra-ui/react';

import { SwapCaseProps, SwapProps } from './Swap.types';

const SwapContext = createContext<string | number | null>(null);

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
const SwapRoot = ({ value, children, ...rest }: SwapProps) => (
  <SwapContext.Provider value={value}>
    <Box display="inline-grid" placeItems="center" {...rest}>
      {children}
    </Box>
  </SwapContext.Provider>
);
SwapRoot.displayName = 'Swap';

const SwapCase = ({ value, children, ...rest }: SwapCaseProps) => {
  const active = useContext(SwapContext) === value;

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
      translate={active ? '0 0' : '0 8px'}
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
