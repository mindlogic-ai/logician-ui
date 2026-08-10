import { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';
import { transitions } from '@/theme/motion';

import { Button } from '../Button';
import { Card } from '../Card';
import { FaCheck, FaRegCopy } from '../Icon';
import { CopyableCodeProps } from './CopyableCode.types';

/** How long the button stays in its confirmed state before reverting, in ms. */
const CONFIRM_HOLD_MS = 1600;

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
        {/* Both icons occupy the same cell so the button keeps its width while
            they cross, and the check lands with a slight overshoot. */}
        <Box display="grid" placeItems="center" flexShrink={0}>
          <Box
            gridArea="1 / 1"
            display="grid"
            placeItems="center"
            opacity={copied ? 0 : 1}
            transform={copied ? 'scale(0.5)' : undefined}
            {...transitions.feedback('opacity, transform')}
          >
            <FaRegCopy boxSize="xs" />
          </Box>
          <Box
            gridArea="1 / 1"
            display="grid"
            placeItems="center"
            opacity={copied ? 1 : 0}
            transform={copied ? undefined : 'scale(0.5)'}
            {...transitions.spring('opacity, transform')}
          >
            <FaCheck boxSize="xs" />
          </Box>
        </Box>
        {translate(copied ? 'copied' : 'copy')}
      </Button>
    </Flex>
  );
};
