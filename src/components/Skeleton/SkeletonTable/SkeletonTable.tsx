import { useLoadingContext } from '@/components/LoadingManager/LoadingContext';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/components/Table';

import { Skeleton } from '../Skeleton';
import { SkeletonTableProps } from './SkeletonTable.types';

const NUM_ROWS = 5;
const NUM_COLS = 4;

export const SkeletonTable = ({
  isLoaded: isLoadedProp,
  children,
}: SkeletonTableProps) => {
  const { isLoading } = useLoadingContext();
  if (!isLoading) return <>{children}</>;

  return (
    <TableContainer w="100%">
      <Table variant="simple">
        {/* Table Header */}
        <Thead>
          <Tr>
            <Th>
              <Skeleton
                isLoaded={isLoadedProp ?? !isLoading}
                w="100%"
                height="20px"
              />
            </Th>
            <Th>
              <Skeleton
                isLoaded={isLoadedProp ?? !isLoading}
                w="100%"
                height="20px"
              />
            </Th>
            <Th>
              <Skeleton
                isLoaded={isLoadedProp ?? !isLoading}
                w="100%"
                height="20px"
              />
            </Th>
            <Th>
              <Skeleton
                isLoaded={isLoadedProp ?? !isLoading}
                w="100%"
                height="20px"
              />
            </Th>
          </Tr>
        </Thead>

        {/* Table Body */}
        <Tbody>
          {Array.from({ length: NUM_ROWS }).map((_, rowIndex) => (
            <Tr key={rowIndex}>
              {Array.from({ length: NUM_COLS }).map((_, colIndex) => (
                <Td key={colIndex}>
                  <Skeleton
                    isLoaded={isLoadedProp ?? !isLoading}
                    w="100%"
                    height="20px"
                  />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
