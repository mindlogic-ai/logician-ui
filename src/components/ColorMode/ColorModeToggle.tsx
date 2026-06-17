'use client';
import React, { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

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

  return (
    <IconButton aria-label={ariaLabel} onClick={toggleColorMode} {...rest}>
      {mounted && colorMode === 'dark' ? <LuSun /> : <LuMoon />}
    </IconButton>
  );
};

ColorModeToggle.displayName = 'ColorModeToggle';
