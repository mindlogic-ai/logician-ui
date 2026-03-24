import { useMemo, useState } from 'react';
import { createListCollection, Flex, Select } from '@chakra-ui/react';

import { IoChevronForward, IoIosArrowBack } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { SelectContent } from '@/components/Select/SelectContent';
import { SelectItem } from '@/components/Select/SelectItem';
import { SelectTrigger } from '@/components/Select/SelectTrigger';
import { Subtext, Subtitle } from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';

import { PaginationProps } from './Pagination.types';

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

  const currentPage = controlledCurrentPage ?? uncontrolledCurrentPage;
  const handleBack = () => {
    setUncontrolledCurrentPage((prev) => Math.max(prev - 1, 1));
    if (onBack && currentPage > 1) {
      onBack();
    }
  };

  const handleNext = () => {
    setUncontrolledCurrentPage((prev) => Math.min(prev + 1, maxPage));
    if (onNext && currentPage < maxPage) {
      onNext();
    }
  };

  const perPageCollection = useMemo(() => {
    if (!itemsPerPageOptions) return null;
    return createListCollection({
      items: itemsPerPageOptions.map((option) => ({
        label: option.toString(),
        value: String(option),
      })),
    });
  }, [itemsPerPageOptions]);

  return (
    <Flex align="center" justify="space-between" w="100%" {...rest}>
      <Flex align="center" gap={2}>
        {itemsPerPageOptions && perPageCollection && (
          <Flex align="center" gap={2}>
            <Select.Root
              collection={perPageCollection}
              value={[String(itemsPerPage)]}
              onValueChange={(details) => {
                const val = details.value[0];
                if (val) {
                  const newItemsPerPage = Number(val);
                  onItemsPerPageOptionChange?.(newItemsPerPage);

                  const newMaxPage = Math.ceil(numTotalItems / newItemsPerPage);
                  if (currentPage > newMaxPage) {
                    setUncontrolledCurrentPage(newMaxPage);
                    onCurrentPageChange?.(newMaxPage);
                  }
                }
              }}
              size="xs"
              width="70px"
            >
              <SelectTrigger>
                <Select.ValueText />
              </SelectTrigger>
              <SelectContent>
                {perPageCollection.items.map((item) => (
                  <SelectItem key={item.value} item={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select.Root>
            <Subtext whiteSpace="nowrap">
              {translate('pagination_items_per_page')}
            </Subtext>
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
                colorPalette="neutral"
                variant="ghost"
                aria-label={translate('previous') as string}
                onClick={handleBack}
                disabled={currentPage <= 1}
                color={currentPage === 1 ? 'gray.400' : 'gray.1500'}
              >
                <IoIosArrowBack boxSize="sm" />
              </IconButton>
              <IconButton
                colorPalette="neutral"
                variant="ghost"
                aria-label={translate('go_next_page_button') as string}
                onClick={handleNext}
                disabled={currentPage >= maxPage}
                color={currentPage === maxPage ? 'gray.400' : 'gray.1500'}
              >
                <IoChevronForward boxSize="sm" />
              </IconButton>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};
