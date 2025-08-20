import { FlexProps } from '@chakra-ui/react';

export interface PaginationProps extends FlexProps {
  currentPage?: number;
  onCurrentPageChange?: (page: number) => void;
  onBack?: () => void;
  onNext?: () => void;
  numTotalItems: number;
  itemsPerPageOptions?: Array<number>;
  itemsPerPage: number;
  onItemsPerPageOptionChange?: (option: number) => void;
}
