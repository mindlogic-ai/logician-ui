import React from 'react';
import { Button } from '@chakra-ui/react';

import { Icon } from '@/components/Icon';
import { useTranslate } from '@/hooks/useTranslate';

import { seeMoreButtonStyles } from './SeeMoreButton.styles';
import { SeeMoreButtonProps } from './SeeMoreButton.types';

/**
 * A button component that allows users to load or see more items.
 * It displays the current count and the maximum count of items.
 *
 * @param {object} props - Props for the SeeMoreButton component.
 * @param {number} props.currentCount - The current number of items shown.
 * @param {number} props.maxCount - The maximum number of items available.
 */
export const SeeMoreButton = ({
  currentCount,
  maxCount,
  ...rest
}: SeeMoreButtonProps) => {
  const translate = useTranslate();

  return (
    <Button
      rightIcon={<Icon icon="IoChevronDownOutline" color="inherit" />}
      {...seeMoreButtonStyles}
      {...rest}
    >
      {translate('see_more')} ({currentCount}/{maxCount})
    </Button>
  );
};
