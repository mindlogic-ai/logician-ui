import { Children } from 'react';
import { Collapse } from '@chakra-ui/react';

import { Td } from '../Td';
import { Tr } from '../Tr';
import { ExpandingTrProps } from './ExpandingTr.types';

export const ExpandingTr: React.FC<ExpandingTrProps> = ({
  children,
  expandedContent,
  isExpanded,
  onExpandChange,
  expandedRowProps,
  ...rest
}) => {
  const childrenArray = Children.toArray(children);

  return (
    <>
      {/* Main Row */}
      <Tr {...rest}>{children}</Tr>

      {/* Expanded Row */}
      <Tr h={isExpanded ? undefined : 0} {...expandedRowProps}>
        <Td colSpan={childrenArray.length} p={0}>
          <Collapse in={isExpanded}>{expandedContent}</Collapse>
        </Td>
      </Tr>
    </>
  );
};
