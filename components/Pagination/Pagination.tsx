import { useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import { Flex, useTheme } from '@chakra-ui/react';

import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Subtext, Subtitle } from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';

import { Select } from '../Select';
import { SelectOption } from '../Select/Select.types';
import { PaginationProps } from './Pagination.types';

/**
 * A pagination component that allows users to navigate through pages.
 * Displays the current page number and the maximum page count.
 * Supports both controlled and uncontrolled modes.
 *
 * - **Controlled Mode**: Pass `currentPage` and `onBack`/`onNext` props to fully control the pagination behavior.
 * - **Uncontrolled Mode**: If `currentPage` is not provided, the component manages its own internal state for the current page.
 *
 * @param {PaginationProps} props - Props for the Pagination component.
 * @param {number} [props.currentPage] - The current page number (controlled mode).
 * @param {number} props.maxPage - The maximum number of pages available.
 * @param {() => void} [props.onBack] - Callback triggered when the "Back" button is clicked.
 * @param {() => void} [props.onNext] - Callback triggered when the "Next" button is clicked.
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
  const theme = useTheme();
  const translate = useTranslate();
  const [uncontrolledCurrentPage, setUncontrolledCurrentPage] =
    useState<number>(1);
  const maxPage = useMemo(
    () => Math.ceil(numTotalItems / itemsPerPage),
    [numTotalItems, itemsPerPage],
  );

  const currentPage = controlledCurrentPage ?? uncontrolledCurrentPage; // Use controlled or internal number state
  const handleBack = () => {
    setUncontrolledCurrentPage(prev => Math.max(prev - 1, 1));
    if (onBack && currentPage > 1) {
      // Controlled mode: call the provided onBack
      onBack();
    }
  };

  const handleNext = () => {
    setUncontrolledCurrentPage(prev => Math.min(prev + 1, maxPage));
    if (onNext && currentPage < maxPage) {
      // Controlled mode: call the provided onNext
      onNext();
    }
  };

  const handleItemsPerPageOptionChange = (
    newValue: SingleValue<SelectOption<number>>,
  ) => {
    if (newValue) {
      const newItemsPerPage = newValue.value;
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
            <Select
              styles={{
                control: (base, state) => ({
                  ...base,
                  fontSize: theme.fontSizes.sm,
                  padding: 0,
                  minHeight: '28px',
                }),
                dropdownIndicator: (base, props) => ({
                  ...base,
                  padding: `0 ${theme.space[1]}`,
                }),
              }}
              options={itemsPerPageOptions.map(option => ({
                label: option.toString(),
                value: option,
              }))}
              value={{
                label: itemsPerPage.toString(),
                value: itemsPerPage,
              }}
              onChange={handleItemsPerPageOptionChange}
            />
            <Subtext>{translate('pagination_items_per_page')}</Subtext>
          </Flex>
        )}
      </Flex>
      <Flex>
        <Subtitle>
          {translate('pagination_range_text', {
            range_start: (currentPage - 1) * itemsPerPage + 1,
            range_end: Math.min(numTotalItems, currentPage * itemsPerPage),
            num_total_items: numTotalItems,
          })}
        </Subtitle>
      </Flex>
      <Flex align="center" gap={2}>
        {maxPage > 1 && (
          <>
            <Subtitle>
              {currentPage} / {maxPage}
            </Subtitle>
            <Flex align="center">
              <IconButton
                icon={<Icon icon="IoIosArrowBack" boxSize="sm" />}
                aria-label={translate('previous') as string}
                onClick={handleBack}
                isDisabled={currentPage <= 1}
                color={currentPage === 1 ? 'gray.400' : 'gray.1500'}
              />
              <IconButton
                icon={<Icon icon="IoChevronForward" boxSize="sm" />}
                aria-label={translate('go_next_page_button') as string}
                onClick={handleNext}
                isDisabled={currentPage >= maxPage}
                color={currentPage === maxPage ? 'gray.400' : 'gray.1500'}
              />
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};
