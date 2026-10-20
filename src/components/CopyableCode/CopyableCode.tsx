import { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';

import { Button } from '../Button';
import { Card } from '../Card';
import { FaCheck, FaRegCopy } from '../Icon';
import { CopyableCodeProps } from './CopyableCode.types';

/** How long the button stays in its confirmed state before reverting, in ms. */
const CONFIRM_HOLD_MS = 1600;

/** How far the label sits from the window when it is not the one showing. */
const LABEL_OFFSET = '8px';

/**
 * The two clocks a label swap needs: the outgoing label clears fast so the
 * incoming one is not read through it, while the travel is slow enough to read
 * as one thing replacing another rather than a flicker.
 */
const LABEL_TRANSITION = [
  'opacity var(--chakra-durations-fast) var(--chakra-easings-standard)',
  'translate var(--chakra-durations-motion-base) var(--chakra-easings-emphasized)',
].join(', ');

/**
 * One of the button's two labels, stacked in the same grid cell as the other.
 *
 * Both labels are always in the layout, so the button is as wide as the longer
 * of them and stops resizing when the state flips. That is the whole point
 * here: this button is absolutely positioned against the right edge, and
 * "복사" → "복사 완료" is two characters wider, so growing walked the button
 * leftwards over the code the moment it was clicked (measured: 59px → 87px).
 *
 * Sizing this way rather than with a hand-tuned `minW` means the lock survives
 * translation, where the longest string is not the one you measured.
 *
 * `past` decides which way the label leaves: the idle label has already
 * happened by the time the confirmation shows, so it leaves upward and the
 * confirmation rises into its place.
 */
const SwapLabel = ({
  show,
  past,
  children,
}: {
  show: boolean;
  past: boolean;
  children: React.ReactNode;
}) => (
  <Box
    gridArea="1 / 1"
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    gap="1.5"
    whiteSpace="nowrap"
    opacity={show ? 1 : 0}
    translate={show ? '0 0' : `0 ${past ? '-' : ''}${LABEL_OFFSET}`}
    pointerEvents={show ? undefined : 'none'}
    aria-hidden={!show || undefined}
    transition={LABEL_TRANSITION}
    animationStyle="composite"
  >
    {children}
  </Box>
);

/**
 * Intended for a quick one-click copy of one-liner code snippets.
 *
 * The button answers for itself: on click the copy icon crosses into a check and
 * the label flips to "copied", then reverts. Copying is otherwise invisible —
 * without a reply the member has no way to know it worked and clicks again — and
 * a global toast is too much ceremony for something this small, so the control
 * that was pressed is the thing that confirms.
 *
 * @example
 * <CopyableCode onCopy={() => {}}>
 *   {`const example = 'This is a code example';
 *    console.log(example);`}
 * </CopyableCode>
 */
export const CopyableCode = ({
  children,
  onCopy,
  containerProps,
}: CopyableCodeProps) => {
  const translate = useTranslate();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // The revert fires 1.6s after the click; unmounting in between would leave it
  // writing into a gone component.
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = () => {
    onCopy?.();
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), CONFIRM_HOLD_MS);
  };

  return (
    <Flex position="relative" width="100%" {...containerProps}>
      <Card overflow="hidden" maxW="100%" p={0} width="100%">
        <Box as="pre" whiteSpace="nowrap" overflowX="scroll" p={4} pr={20}>
          {children}
        </Box>
        <Box
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          w={24}
          // Fade matches the Card surface (bg.surface) so it flips with the
          // mode instead of fading to white on dark.
          bg="linear-gradient(to right, transparent, var(--chakra-colors-bg-surface) 15%)"
          pointerEvents="none"
        />
      </Card>
      <Button
        colorPalette={copied ? 'success' : 'primary'}
        variant="solid"
        size="xs"
        onClick={handleCopy}
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
      >
        {/* Icon *and* label cross together, in one cell — see SwapLabel. The
            window is what keeps the outgoing label from showing above the
            button while it fades. */}
        <Box display="inline-grid" placeItems="center" overflow="hidden">
          {/* Idle is the earlier state, so it leaves upward and the
              confirmation rises from below into its place. */}
          <SwapLabel show={!copied} past>
            <FaRegCopy boxSize="xs" />
            {translate('copy')}
          </SwapLabel>
          <SwapLabel show={copied} past={false}>
            <FaCheck boxSize="xs" />
            {translate('copied')}
          </SwapLabel>
        </Box>
      </Button>
    </Flex>
  );
};
