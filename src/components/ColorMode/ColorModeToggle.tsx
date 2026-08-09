'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import type { IconButtonProps } from '@/components/IconButton/IconButton.types';

import { useColorMode } from './useColorMode';

export interface ColorModeToggleProps extends Omit<
  IconButtonProps,
  'children'
> {}

/**
 * A ready-made light/dark toggle button. Shared across products so each app
 * doesn't reinvent the control.
 *
 * Renders nothing until mounted on the client to avoid an SSR/CSR icon
 * mismatch (the resolved mode is only known after hydration).
 *
 * @example
 * ```tsx
 * <ColorModeToggle aria-label="Toggle color mode" />
 * ```
 */
export const ColorModeToggle: React.FC<ColorModeToggleProps> = ({
  'aria-label': ariaLabel = 'Toggle color mode',
  ...rest
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && colorMode === 'dark';

  return (
    <IconButton aria-label={ariaLabel} onClick={toggleColorMode} {...rest}>
      {/* Both icons share one grid cell and cross by rotating out and in, so the
          toggle reads as one object turning rather than two icons swapping. The
          page-wide colour flip stays instant on purpose — `ColorModeProvider`
          sets `disableTransitionOnChange` so the whole UI doesn't wash through
          an intermediate state — this animates the control only. */}
      <Box display="grid" placeItems="center">
        <Box
          gridArea="1 / 1"
          display="grid"
          placeItems="center"
          opacity={isDark ? 1 : 0}
          transform={isDark ? undefined : 'rotate(-90deg) scale(0.5)'}
          transitionProperty="opacity, transform"
          transitionDuration="motion.slow"
          transitionTimingFunction="overshoot"
          _motionReduce={{ transitionDuration: 'motion.instant' }}
        >
          <SunIcon />
        </Box>
        <Box
          gridArea="1 / 1"
          display="grid"
          placeItems="center"
          opacity={isDark ? 0 : 1}
          transform={isDark ? 'rotate(90deg) scale(0.5)' : undefined}
          transitionProperty="opacity, transform"
          transitionDuration="motion.slow"
          transitionTimingFunction="overshoot"
          _motionReduce={{ transitionDuration: 'motion.instant' }}
        >
          <MoonIcon />
        </Box>
      </Box>
    </IconButton>
  );
};

ColorModeToggle.displayName = 'ColorModeToggle';
