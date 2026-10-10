import { defineSlotRecipe } from '@chakra-ui/react';

import { PRESENCE_TIMING } from '../motion';

/**
 * Logician overrides for Chakra's `accordion` slot recipe.
 *
 * Only the clock. Chakra opens and closes the item content over a symmetric
 * 200 / 200, while `Collapsible` — the same height animation — already runs on
 * the house `presence` policy (300 in, 150 out). Consumers render
 * `Accordion.ItemContent` straight from Chakra, so a component prop cannot
 * reach it; the recipe can. The recipe's own `expand-height` /
 * `collapse-height` names are untouched and still decide what moves.
 */
export const accordionSlotRecipe = defineSlotRecipe({
  slots: ['itemContent'],
  base: {
    itemContent: { ...PRESENCE_TIMING },
  },
});
