'use client';

import type { PropsWithChildren } from 'react';

import { Card, type CardProps } from '@/components/Card';

/**
 * Shared width token (Chakra sizes scale) for the cards that float over the
 * workflow canvas. Kept in one place so the inspector drawer and any host
 * surface that takes the same slot (e.g. the studio test-chat card) can't drift.
 */
export const FLOATING_CARD_WIDTH = '96';

/**
 * Shared chrome for a card floating over the workflow canvas: fixed width,
 * rounded corners, drop shadow, clipped overflow. Positioning is left to the
 * caller (the inspector docks it in its own column; a host may absolutely
 * position it) — pass any `CardProps` through to place and size it.
 */
export function FloatingCard({
  children,
  ...rest
}: PropsWithChildren<CardProps>) {
  return (
    <Card
      width={FLOATING_CARD_WIDTH}
      p={0}
      borderRadius="lg"
      boxShadow="md"
      minHeight={0}
      overflow="hidden"
      {...rest}
    >
      {children}
    </Card>
  );
}
