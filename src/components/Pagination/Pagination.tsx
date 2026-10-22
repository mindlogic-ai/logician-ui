import { useMemo, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Subtext, Subtitle } from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';

import { SelectField } from '../Select';
import { PaginationProps } from './Pagination.types';

/**
 * Previous / next page buttons with a "current / last" counter, and an
 * optional page-size select. The last page is derived:
 * `Math.ceil(numTotalItems / itemsPerPage)`; the buttons are hidden when there
 * is only one page.
 *
 * - **Controlled:** pass `currentPage` and update it from `onBack` / `onNext`
 *   (and `onCurrentPageChange`, which fires when a larger page size puts the
 *   current page past the new last page).
 * - **Uncontrolled:** leave `currentPage` out and the component keeps the page
 *   itself.
 *
 * `itemsPerPage` is always controlled: update it from
 * `onItemsPerPageOptionChange`.
 */
export const Pagination = ({
  currentPage: controlledCurrentPage,
  onCurrentPageChange,
  numTotalItems,
  onBack,
  onNext,
  itemsPerPageOptions,
  itemsPerPage,
  onItemsPerPageOptionChange,
  ...rest
}: PaginationProps) => {
  const translate = useTranslate();
  const [uncontrolledCurrentPage, setUncontrolledCurrentPage] =
    useState<number>(1);
  const maxPage = useMemo(
    () => Math.ceil(numTotalItems / itemsPerPage),
    [numTotalItems, itemsPerPage]
  );

  const currentPage = controlledCurrentPage ?? uncontrolledCurrentPage; // Use controlled or internal number state
  const handleBack = () => {
    setUncontrolledCurrentPage((prev) => Math.max(prev - 1, 1));
    if (onBack && currentPage > 1) {
      // Controlled mode: call the provided onBack
      onBack();
    }
  };

  const handleNext = () => {
    setUncontrolledCurrentPage((prev) => Math.min(prev + 1, maxPage));
    if (onNext && currentPage < maxPage) {
      // Controlled mode: call the provided onNext
      onNext();
    }
  };

  const handleItemsPerPageOptionChange = (newItemsPerPage: number | null) => {
    if (newItemsPerPage != null) {
      onItemsPerPageOptionChange?.(newItemsPerPage);

      const newMaxPage = Math.ceil(numTotalItems / newItemsPerPage);

      // If this makes the current page out of range, set the current page to the last page
      if (currentPage > newMaxPage) {
        setUncontrolledCurrentPage(newMaxPage);
        onCurrentPageChange?.(newMaxPage);
      }
    }
  };

  return (
    <Flex align="center" justify="space-between" w="100%" {...rest}>
      <Flex align="center" gap={2}>
        {itemsPerPageOptions && (
          <Flex align="center" gap={2}>
            <SelectField<number>
              size="sm"
              width="5.5rem"
              // The visible label for this control is the "개씩 보기" text beside
              // it, which the select itself cannot claim — so it carries the
              // same words as its own hidden label rather than shipping
              // nameless (KWCAG 5.3.4.1 레이블 제공).
              ariaLabel={translate('pagination_items_per_page') as string}
              options={itemsPerPageOptions.map((option) => ({
                label: option.toString(),
                value: option,
              }))}
              value={itemsPerPage}
              onChange={handleItemsPerPageOptionChange}
            />
            <Subtext whiteSpace="nowrap">
              {translate('pagination_items_per_page')}
            </Subtext>
          </Flex>
        )}
      </Flex>
      <Flex align="center" gap={2}>
        <Subtitle>
          {currentPage} / {maxPage}
        </Subtitle>
        {maxPage > 1 && (
          <Flex align="center">
            <IconButton
              variant="ghost"
              aria-label={translate('previous') as string}
              onClick={handleBack}
              disabled={currentPage <= 1}
              color={currentPage === 1 ? 'fg.subtle' : 'fg.muted'}
            >
              <ChevronLeftIcon boxSize="sm" />
            </IconButton>
            <IconButton
              variant="ghost"
              aria-label={translate('go_next_page_button') as string}
              onClick={handleNext}
              disabled={currentPage >= maxPage}
              color={currentPage === maxPage ? 'fg.subtle' : 'fg.muted'}
            >
              <ChevronRightIcon boxSize="sm" />
            </IconButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
