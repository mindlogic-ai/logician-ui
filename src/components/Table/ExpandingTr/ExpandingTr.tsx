import { Children } from 'react';
import { Collapsible } from '@chakra-ui/react';

import { Td } from '../Td';
import { Tr } from '../Tr';
import { ExpandingTrProps } from './ExpandingTr.types';

export const ExpandingTr: React.FC<ExpandingTrProps> = ({
  children,
  expandedContent,
  isExpanded,
  onExpandChange: _onExpandChange,
  expandedRowProps,
  ...rest
}) => {
  const childrenArray = Children.toArray(children);

  return (
    <>
      {/* Main Row */}
      <Tr {...rest}>{children}</Tr>

      {/* Expanded Row - always render for Collapsible animation */}
      <Tr
        h={isExpanded ? undefined : 0}
        style={{
          // When collapsed, make it invisible and non-interactive
          ...(!isExpanded && {
            visibility: 'collapse' as const,
          }),
        }}
        {...expandedRowProps}
      >
        <Td colSpan={childrenArray.length} p={0}>
          <Collapsible.Root open={isExpanded}>
            <Collapsible.Content {...({} as any)}>
              {expandedContent}
            </Collapsible.Content>
          </Collapsible.Root>
        </Td>
      </Tr>
    </>
  );
};
