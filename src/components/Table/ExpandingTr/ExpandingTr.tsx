import { Children, ReactNode } from 'react';
import { Collapsible } from '@chakra-ui/react';

import { Td } from '../Td';
import { Tr } from '../Tr';
import { ExpandingTrProps } from './ExpandingTr.types';

// Cast Collapsible.Content to include children prop
type CollapsibleContentProps = React.ComponentProps<typeof Collapsible.Content> & {
  children?: ReactNode;
};
const CollapsibleContent = Collapsible.Content as React.FC<CollapsibleContentProps>;

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
          <Collapsible.Root open={isExpanded}>
            <CollapsibleContent>{expandedContent}</CollapsibleContent>
          </Collapsible.Root>
        </Td>
      </Tr>
    </>
  );
};
