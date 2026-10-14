import React from 'react';
import { Button } from '@chakra-ui/react';

import { ChevronDownIcon } from '@/components/Icon';
import { useTranslate } from '@/hooks/useTranslate';

import { polymorphic } from '../../types/polymorphic';
import { seeMoreButtonStyles } from './SeeMoreButton.styles';
import { SeeMoreButtonOwnProps } from './SeeMoreButton.types';

/**
 * A button component that allows users to load or see more items.
 * It displays the current count and the maximum count of items.
 *
 * @param {object} props - Props for the SeeMoreButton component.
 * @param {number} props.currentCount - The current number of items shown.
 * @param {number} props.maxCount - The maximum number of items available.
 */
const SeeMoreButtonImpl = ({
  currentCount,
  maxCount,
  ...rest
}: SeeMoreButtonOwnProps) => {
  const translate = useTranslate();

  return (
    <Button {...seeMoreButtonStyles} {...rest}>
      {translate('see_more')} ({currentCount}/{maxCount}){' '}
      <ChevronDownIcon color="inherit" />
    </Button>
  );
};

SeeMoreButtonImpl.displayName = 'SeeMoreButton';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const SeeMoreButton =
  polymorphic<SeeMoreButtonOwnProps>(SeeMoreButtonImpl);
